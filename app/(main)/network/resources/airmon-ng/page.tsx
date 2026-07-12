"use client"

import Link from "next/link"
import { Terminal, BookOpen, ChevronRight } from "lucide-react"
import { useState, useCallback } from "react"

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }, [text])

  return (
    <button onClick={handleCopy} className={`network-copy-btn ${copied ? "copied" : ""}`}>
      {copied ? "Copied" : "Copy"}
    </button>
  )
}

function CodeBlock({ cmd }: { cmd: string }) {
  return (
    <div className="mb-3 flex items-start gap-2">
      <code className="network-command-block flex-1 whitespace-pre-wrap break-all">{cmd}</code>
      <CopyButton text={cmd} />
    </div>
  )
}

function OutputBlock({ text }: { text: string }) {
  return (
    <div className="mb-4 rounded-lg border p-3 font-mono text-xs leading-relaxed" style={{ background: "oklch(0.02 0.01 265)", borderColor: "var(--network-border)", color: "var(--network-text-muted)" }}>
      {text}
    </div>
  )
}

interface SectionProps {
  title: string
  children: React.ReactNode
}

function Section({ title, children }: SectionProps) {
  return (
    <div className="mb-8">
      <h2 className="mb-4 text-sm font-bold tracking-wider" style={{ color: "var(--network-primary)" }}>{title}</h2>
      {children}
    </div>
  )
}

const sections = [
  {
    id: "description",
    title: "Description",
    content: (
      <p className="mb-4 text-sm leading-relaxed" style={{ color: "var(--network-text)" }}>
        airmon-ng is a script used to enable monitor mode on wireless interfaces. It can also kill network managers that interfere with aircrack-ng tools, or switch interfaces from monitor mode back to managed mode. Running <code className="font-mono text-xs" style={{ color: "var(--network-primary)" }}>airmon-ng</code> without parameters displays the status of all wireless interfaces.
      </p>
    ),
  },
  {
    id: "usage",
    title: "Usage",
    content: (
      <div className="mb-4">
        <CodeBlock cmd="airmon-ng <start|stop> <interface> [channel]" />
        <CodeBlock cmd="airmon-ng <check|check kill>" />
        <table className="w-full text-xs" style={{ color: "var(--network-text)" }}>
          <thead>
            <tr className="border-b" style={{ borderColor: "var(--network-border)" }}>
              <th className="p-2 text-left font-mono text-xs" style={{ color: "var(--network-primary)" }}>Argument</th>
              <th className="p-2 text-left font-mono text-xs" style={{ color: "var(--network-primary)" }}>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b" style={{ borderColor: "var(--network-border)" }}>
              <td className="p-2 font-mono">&lt;start|stop&gt;</td>
              <td className="p-2">Start or stop monitor mode on the interface (mandatory)</td>
            </tr>
            <tr className="border-b" style={{ borderColor: "var(--network-border)" }}>
              <td className="p-2 font-mono">&lt;interface&gt;</td>
              <td className="p-2">Wireless interface name (e.g. wlan0, wlan0mon) (mandatory)</td>
            </tr>
            <tr className="border-b" style={{ borderColor: "var(--network-border)" }}>
              <td className="p-2 font-mono">[channel]</td>
              <td className="p-2">Optionally set the card to a specific channel</td>
            </tr>
            <tr className="border-b" style={{ borderColor: "var(--network-border)" }}>
              <td className="p-2 font-mono">check</td>
              <td className="p-2">Show processes that might interfere with aircrack-ng tools</td>
            </tr>
            <tr>
              <td className="p-2 font-mono">check kill</td>
              <td className="p-2">Check and automatically kill interfering processes</td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
  },
  {
    id: "examples",
    title: "Usage Examples",
    content: (
      <div className="mb-4 space-y-6">
        <div>
          <h3 className="mb-2 text-xs font-bold tracking-wider" style={{ color: "var(--network-text-muted)" }}>Check Status &amp; List Wireless Interfaces</h3>
          <CodeBlock cmd="airmon-ng" />
          <p className="mb-1 text-xs" style={{ color: "var(--network-text-muted)" }}>Typical output:</p>
          <OutputBlock text={`PHY\tInterface\tDriver\t\tChipset\n\nphy0\twlan0\t\tath9k_htc\tAtheros Communications, Inc. AR9271 802.11n`} />
        </div>

        <div>
          <h3 className="mb-2 text-xs font-bold tracking-wider" style={{ color: "var(--network-text-muted)" }}>Check for Interfering Processes</h3>
          <CodeBlock cmd="airmon-ng check" />
          <p className="mb-1 text-xs" style={{ color: "var(--network-text-muted)" }}>Output:</p>
          <OutputBlock text={`Found 5 processes that could cause trouble.\nIf airodump-ng, aireplay-ng or airtun-ng stops working after\na short period of time, you may want to kill (some of) them!\n\n  PID Name\n  718 NetworkManager\n  870 dhclient\n 1104 avahi-daemon\n 1105 avahi-daemon\n 1115 wpa_supplicant`} />
        </div>

        <div>
          <h3 className="mb-2 text-xs font-bold tracking-wider" style={{ color: "var(--network-text-muted)" }}>Kill Interfering Processes</h3>
          <CodeBlock cmd="airmon-ng check kill" />
          <p className="mb-1 text-xs" style={{ color: "var(--network-text-muted)" }}>Output:</p>
          <OutputBlock text={`Killing these processes:\n\n  PID Name\n  870 dhclient\n 1115 wpa_supplicant`} />
          <p className="text-xs" style={{ color: "var(--network-text-muted)" }}>After this, restart the network manager with: <code className="font-mono" style={{ color: "var(--network-primary)" }}>service network-manager start</code></p>
        </div>

        <div>
          <h3 className="mb-2 text-xs font-bold tracking-wider" style={{ color: "var(--network-text-muted)" }}>Enable Monitor Mode</h3>
          <CodeBlock cmd="airmon-ng start wlan0" />
          <p className="mb-1 text-xs" style={{ color: "var(--network-text-muted)" }}>Creates a monitor mode interface (typically wlan0mon):</p>
          <OutputBlock text={`Found 5 processes that could cause trouble.\n\nPHY\tInterface\tDriver\t\tChipset\n\nphy0\twlan0\t\tath9k_htc\tAtheros Communications, Inc. AR9271 802.11n\n\t\t(mac80211 monitor mode vif enabled for [phy0]wlan0 on [phy0]wlan0mon)\n\t\t(mac80211 station mode vif disabled for [phy0]wlan0)`} />
        </div>

        <div>
          <h3 className="mb-2 text-xs font-bold tracking-wider" style={{ color: "var(--network-text-muted)" }}>Disable Monitor Mode</h3>
          <CodeBlock cmd="airmon-ng stop wlan0mon" />
          <p className="mb-1 text-xs" style={{ color: "var(--network-text-muted)" }}>Output:</p>
          <OutputBlock text={`PHY\tInterface\tDriver\t\tChipset\n\nphy0\twlan0mon\tath9k_htc\tAtheros Communications, Inc. AR9271 802.11n\n\t\t(mac80211 station mode vif enabled on [phy0]wlan0)\n\t\t(mac80211 monitor mode vif disabled for [phy0]wlan0mon)`} />
        </div>

        <div>
          <h3 className="mb-2 text-xs font-bold tracking-wider" style={{ color: "var(--network-text-muted)" }}>Madwifi-ng Driver — Monitor Mode</h3>
          <p className="mb-2 text-xs" style={{ color: "var(--network-text)" }}>Stop existing VAP interfaces, then enable monitor mode on wifi0:</p>
          <CodeBlock cmd="airmon-ng stop ath0" />
          <CodeBlock cmd="airmon-ng start wifi0" />
          <p className="mb-1 text-xs" style={{ color: "var(--network-text-muted)" }}>Verify with iwconfig — ath0 should show Mode:Monitor:</p>
          <OutputBlock text={`ath0      IEEE 802.11g  ESSID:""\n        Mode:Monitor  Frequency:2.452 GHz  Access Point: 00:0F:B5:88:AC:82\n        Bit Rate=2 Mb/s   Tx-Power:18 dBm\n        Encryption key:off\n        Power Management:off`} />
          <p className="text-xs" style={{ color: "var(--network-text-muted)" }}>Set a specific channel: <code className="font-mono" style={{ color: "var(--network-primary)" }}>airmon-ng start wifi0 9</code></p>
        </div>
      </div>
    ),
  },
  {
    id: "tips",
    title: "Usage Tips",
    content: (
      <div className="mb-4 space-y-4">
        <div>
          <h3 className="mb-2 text-xs font-bold tracking-wider" style={{ color: "var(--network-text-muted)" }}>Confirming the Card is in Monitor Mode</h3>
          <CodeBlock cmd="iwconfig" />
          <p className="text-xs" style={{ color: "var(--network-text)" }}>Look for Mode:Monitor in the output. For madwifi-ng drivers, the Access Point field shows the MAC address of the wireless card.</p>
        </div>
        <div>
          <h3 className="mb-2 text-xs font-bold tracking-wider" style={{ color: "var(--network-text-muted)" }}>Determining the Current Channel</h3>
          <CodeBlock cmd="iwlist <interface> channel" />
          <p className="text-xs" style={{ color: "var(--network-text)" }}>The card's channel should match the target AP's channel. Include the channel number when starting monitor mode.</p>
        </div>
        <div>
          <h3 className="mb-2 text-xs font-bold tracking-wider" style={{ color: "var(--network-text-muted)" }}>Go Back to Managed Mode</h3>
          <p className="mb-2 text-xs" style={{ color: "var(--network-text)" }}>For all drivers except madwifi-ng:</p>
          <CodeBlock cmd="airmon-ng stop <interface>" />
          <p className="mb-2 text-xs" style={{ color: "var(--network-text)" }}>For madwifi-ng, stop all athX interfaces then recreate a station VAP:</p>
          <CodeBlock cmd="airmon-ng stop athX" />
          <CodeBlock cmd="wlanconfig ath create wlandev wifi0 wlanmode sta" />
          <p className="text-xs" style={{ color: "var(--network-text)" }}>For mac80211 drivers, airmon-ng keeps the managed interface alongside the monitor interface. To remove the monitor interface: <code className="font-mono" style={{ color: "var(--network-primary)" }}>airmon-ng stop mon0</code></p>
        </div>
      </div>
    ),
  },
  {
    id: "debugging",
    title: "Debugging Issues",
    content: (
      <div className="mb-4 space-y-4">
        <div>
          <h3 className="mb-2 text-xs font-bold tracking-wider" style={{ color: "var(--network-text-muted)" }}>Verbose Output (--verbose)</h3>
          <p className="mb-2 text-xs" style={{ color: "var(--network-text)" }}>Shows system information, kernel version, VM detection, and detailed driver info:</p>
          <CodeBlock cmd="airmon-ng --verbose" />
          <p className="text-xs" style={{ color: "var(--network-text-muted)" }}>Output includes: Linux distribution and kernel, virtual machine detection, driver source (kernel/vendor/staging), wireless stack, firmware version.</p>
        </div>
        <div>
          <h3 className="mb-2 text-xs font-bold tracking-wider" style={{ color: "var(--network-text-muted)" }}>Debug Output (--debug)</h3>
          <p className="mb-2 text-xs" style={{ color: "var(--network-text)" }}>Includes all verbose info plus shell details and bus-level debugging:</p>
          <CodeBlock cmd="airmon-ng --debug" />
          <p className="text-xs" style={{ color: "var(--network-text-muted)" }}>Additional info: shell name and version, wireless adapter debug data (getStack, getBus, getdriver, getchipset), BUS info and device ID.</p>
        </div>
      </div>
    ),
  },
  {
    id: "troubleshooting",
    title: "Usage Troubleshooting",
    content: (
      <div className="mb-4 space-y-4">
        <div>
          <h3 className="mb-2 text-xs font-bold tracking-wider" style={{ color: "var(--network-text-muted)" }}>Interface Not in Monitor Mode</h3>
          <p className="mb-2 text-xs" style={{ color: "var(--network-text)" }}>If airmon-ng says the interface is not in monitor mode when stopping, the network manager likely changed the mode. Kill network managers first, then re-enable monitor mode.</p>
          <CodeBlock cmd="airmon-ng check kill" />
          <CodeBlock cmd="airmon-ng start wlan0" />
        </div>
        <div>
          <h3 className="mb-2 text-xs font-bold tracking-wider" style={{ color: "var(--network-text-muted)" }}>Tools Say Card is Not in Monitor Mode</h3>
          <p className="text-xs" style={{ color: "var(--network-text)" }}>The interface was likely put in monitor mode before killing network managers, and a network manager put it back in managed mode. Kill interfering processes first, then start monitor mode.</p>
        </div>
        <div>
          <h3 className="mb-2 text-xs font-bold tracking-wider" style={{ color: "var(--network-text-muted)" }}>athX Interface Number Rising (ath0, ath1, ath45...)</h3>
          <p className="mb-2 text-xs" style={{ color: "var(--network-text)" }}>Caused by udev persistent net rules creating new entries for each VAP. Fix by editing <code className="font-mono text-xs" style={{ color: "var(--network-primary)" }}>/etc/udev/rules.d/75-persistent-net-generator.rules</code>:</p>
          <CodeBlock cmd="# Change from: KERNEL==\"eth*|ath*|wlan*|ra*|sta*\"" />
          <CodeBlock cmd="# To:           KERNEL==\"eth*|Ath*|wlan*|ra*|sta*\"" />
          <p className="mb-2 text-xs" style={{ color: "var(--network-text)" }}>Capitalize <code className="font-mono text-xs" style={{ color: "var(--network-primary)" }}>a</code> in <code className="font-mono text-xs" style={{ color: "var(--network-primary)" }}>ath*</code> → <code className="font-mono text-xs" style={{ color: "var(--network-primary)" }}>Ath*</code>, then delete the persistent rules file:</p>
          <CodeBlock cmd="rm /etc/udev/rules.d/70-persistent-net.rules" />
          <CodeBlock cmd="modprobe -r ath9k_htc && modprobe ath9k_htc" />
        </div>
        <div>
          <h3 className="mb-2 text-xs font-bold tracking-wider" style={{ color: "var(--network-text-muted)" }}>ioctl(SIOCGIFINDEX) Failed</h3>
          <p className="text-xs" style={{ color: "var(--network-text)" }}>If you see <code className="font-mono text-xs" style={{ color: "var(--network-primary)" }}>SIOCSIFFLAGS: No such file or directory</code> or <code className="font-mono text-xs" style={{ color: "var(--network-primary)" }}>ioctl(SIOCGIFINDEX) failed: No such device</code>, the interface does not exist. Check the interface name with <code className="font-mono text-xs" style={{ color: "var(--network-primary)" }}>iwconfig</code>.</p>
        </div>
        <div>
          <h3 className="mb-2 text-xs font-bold tracking-wider" style={{ color: "var(--network-text-muted)" }}>wlanconfig: command not found</h3>
          <p className="text-xs" style={{ color: "var(--network-text)" }}>The wlanconfig utility is missing. Ensure madwifi-tools are installed. On Ubuntu/Debian: <code className="font-mono text-xs" style={{ color: "var(--network-primary)" }}>apt-get install madwifi-tools</code>. On Kali: the tools are pre-installed.</p>
        </div>
        <div>
          <h3 className="mb-2 text-xs font-bold tracking-wider" style={{ color: "var(--network-text-muted)" }}>add_iface: Permission Denied</h3>
          <p className="text-xs" style={{ color: "var(--network-text)" }}>This usually means an old version of airmon-ng is installed. Upgrade to at least v1.0-rc1. Also ensure you are running as root (or use sudo).</p>
        </div>
        <div>
          <h3 className="mb-2 text-xs font-bold tracking-wider" style={{ color: "var(--network-text-muted)" }}>check kill Fails (Upstart Systems)</h3>
          <p className="text-xs" style={{ color: "var(--network-text)" }}>On systems using upstart instead of systemd, manually stop the services:</p>
          <CodeBlock cmd="service network-manager stop" />
          <CodeBlock cmd="service avahi-daemon stop" />
          <CodeBlock cmd="service upstart-udev-bridge stop" />
          <CodeBlock cmd="pkill dhclient; pkill wpa_supplicant" />
        </div>
        <div>
          <h3 className="mb-2 text-xs font-bold tracking-wider" style={{ color: "var(--network-text-muted)" }}>SIOCSIFFLAGS: Unknown error 132</h3>
          <p className="mb-2 text-xs" style={{ color: "var(--network-text)" }}>RF is blocked on the system. Unblock it:</p>
          <CodeBlock cmd="rfkill unblock all" />
          <p className="text-xs" style={{ color: "var(--network-text)" }}>Also check the physical RF kill switch on your laptop.</p>
        </div>
        <div>
          <h3 className="mb-2 text-xs font-bold tracking-wider" style={{ color: "var(--network-text-muted)" }}>ERROR (-95) — Operation Not Supported</h3>
          <p className="mb-2 text-xs" style={{ color: "var(--network-text)" }}>Known issue on Raspberry Pi (brcmfmac driver). The interface may already be in monitor mode but airodump-ng reports the data linktype is Ethernet. Workaround: reload the driver:</p>
          <CodeBlock cmd="rmmod brcmfmac && modprobe brcmfmac" />
        </div>
      </div>
    ),
  },
]

export default function AirmonNgPage() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="sticky top-0 z-50 flex h-12 items-center justify-between border-b px-6" style={{ background: "var(--network-bg)", borderColor: "var(--network-border)" }}>
        <Link href="/network" className="flex items-center gap-2 text-sm font-bold tracking-wider" style={{ color: "var(--network-primary)" }}>
          <Terminal className="h-4 w-4" /> NETWORK
        </Link>
        <div className="flex items-center gap-5 text-sm">
          <Link href="/network/resources" className="transition-colors hover:text-white" style={{ color: "var(--network-text-muted)" }}>
            &larr; Resources
          </Link>
          <span className="text-xs font-mono" style={{ color: "var(--network-primary)" }}>airmon-ng</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="border-b px-6 py-12" style={{ borderColor: "var(--network-border)" }}>
        <div className="mx-auto max-w-4xl">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: "var(--network-primary-glow)", border: "1px solid var(--network-primary-dim)" }}>
            <Terminal className="h-5 w-5" style={{ color: "var(--network-primary)" }} />
          </div>
          <h1 className="mb-3 text-2xl font-bold tracking-wider" style={{ color: "var(--network-primary)" }}>
            airmon-ng Reference
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed" style={{ color: "var(--network-text-secondary)" }}>
            Complete reference for airmon-ng — the wireless monitor mode management tool from the aircrack-ng suite. 
            Covers usage, examples, debugging, and common troubleshooting scenarios.
          </p>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="border-b px-6 py-6" style={{ borderColor: "var(--network-border)" }}>
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-3 text-xs font-bold tracking-widest" style={{ color: "var(--network-text-muted)" }}>CONTENTS</h2>
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs">
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="transition-colors hover:text-white" style={{ color: "var(--network-primary)" }}>
                {s.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-6 py-8">
        {sections.map((s) => (
          <section key={s.id} id={s.id} className="scroll-mt-20">
            <Section title={s.title}>
              {s.content}
            </Section>
          </section>
        ))}

        {/* Footer */}
        <footer className="mt-12 border-t pt-8 text-center" style={{ borderColor: "var(--network-border)" }}>
          <div className="mx-auto mb-4 h-px max-w-md" style={{ background: "linear-gradient(90deg, transparent, var(--network-primary-dim), transparent)" }} />
          <p className="mb-2 text-xs" style={{ color: "var(--network-text-muted)" }}>
            Source: aircrack-ng.org wiki &mdash; airmon-ng documentation
          </p>
          <Link href="/network/resources" className="inline-flex items-center gap-1 text-xs transition-colors" style={{ color: "var(--network-primary)" }}>
            <Terminal className="h-3 w-3" /> Back to Resources
          </Link>
        </footer>
      </div>
    </div>
  )
}
