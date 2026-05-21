export { type ToolGuide } from "./guide-types"

import { assetfinderGuide } from "./guides/assetfinder"
import { findomainGuide } from "./guides/findomain"
import { chaosGuide } from "./guides/chaos"
import { githubsubdomainsGuide } from "./guides/githubsubdomains"
import { crobatGuide } from "./guides/crobat"
import { sublist3rGuide } from "./guides/sublist3r"
import { oneforallGuide } from "./guides/oneforall"
import { dnsxGuide } from "./guides/dnsx"
import { shufflednsGuide } from "./guides/shuffledns"
import { massdnsGuide } from "./guides/massdns"
import { purednsGuide } from "./guides/puredns"
import { altdnsGuide } from "./guides/altdns"
import { dnsgenGuide } from "./guides/dnsgen"
import { hakrevdnsGuide } from "./guides/hakrevdns"
import { mapcidrGuide } from "./guides/mapcidr"
import { tlsxGuide } from "./guides/tlsx"
import { rustscanGuide } from "./guides/rustscan"
import { autoreconGuide } from "./guides/autorecon"
import { unicornscanGuide } from "./guides/unicornscan"
import { zmapGuide } from "./guides/zmap"
import { smapGuide } from "./guides/smap"
import { feroxbusterGuide } from "./guides/feroxbuster"
import { wfuzzGuide } from "./guides/wfuzz"
import { waybackurlsGuide } from "./guides/waybackurls"
import { gauplusGuide } from "./guides/gauplus"
import { uroGuide } from "./guides/uro"
import { hakrawlerGuide } from "./guides/hakrawler"
import { xnlinkfinderGuide } from "./guides/xnlinkfinder"
import { paramethGuide } from "./guides/parameth"
import { qsreplaceGuide } from "./guides/qsreplace"
import { uniscanGuide } from "./guides/uniscan"
import { kxssGuide } from "./guides/kxss"
import { gxssGuide } from "./guides/gxss"
import { secretfinderGuide } from "./guides/secretfinder"
import { linkfinderGuide } from "./guides/linkfinder"
import { jsparserGuide } from "./guides/jsparser"
import { getjsGuide } from "./guides/getjs"
import { subjsGuide } from "./guides/subjs"
import { mantraGuide } from "./guides/mantra"
import { jsluiceGuide } from "./guides/jsluice"
import { aquatoneGuide } from "./guides/aquatone"
import { gowitnessGuide } from "./guides/gowitness"
import { eyewitnessGuide } from "./guides/eyewitness"
import { webscreenshotGuide } from "./guides/webscreenshot"
import { witnessmeGuide } from "./guides/witnessme"
import { webanalyzeGuide } from "./guides/webanalyze"
import { wafw00fGuide } from "./guides/wafw00f"
import { s3scannerGuide } from "./guides/s3scanner"
import { lazys3Guide } from "./guides/lazys3"
import { cloudenumGuide } from "./guides/cloudenum"
import { awsbucketdumpGuide } from "./guides/awsbucketdump"

import { subfinderGuide } from "./guides/subfinder"
import { amassGuide } from "./guides/amass"
import { httpxGuide } from "./guides/httpx"
import { nucleiGuide } from "./guides/nuclei"
import { sqlmapGuide } from "./guides/sqlmap"
import { xsstrikeGuide } from "./guides/xsstrike"
import { burpsuiteGuide } from "./guides/burpsuite"
import { ffufGuide } from "./guides/ffuf"
import { nmapGuide } from "./guides/nmap"
import { cloudfoxGuide } from "./guides/cloudfox"
import { jwtToolGuide } from "./guides/jwt_tool"
import { arjunGuide } from "./guides/arjun"
import { paramSpiderGuide } from "./guides/paramspider"
import { x8Guide } from "./guides/x8"
import { gfGuide } from "./guides/gf"
import { gospiderGuide } from "./guides/gospider"
import { cewlGuide } from "./guides/cewl"
import { gobusterGuide } from "./guides/gobuster"
import { hydraGuide } from "./guides/hydra"
import { whatwebGuide } from "./guides/whatweb"
import { wpscanGuide } from "./guides/wpscan"
import { dirsearchGuide } from "./guides/dirsearch"
import { johnGuide } from "./guides/john"
import { searchsploitGuide } from "./guides/searchsploit"
import { dalfoxGuide } from "./guides/dalfox"
import { gauGuide } from "./guides/gau"
import { katanaGuide } from "./guides/katana"
import { naabuGuide } from "./guides/naabu"
import { masscanGuide } from "./guides/masscan"
import { hashcatGuide } from "./guides/hashcat"
import { trufflehogGuide } from "./guides/trufflehog"
import { kiterunnerGuide } from "./guides/kiterunner"
import { niktoGuide } from "./guides/nikto"
import { theHarvesterGuide } from "./guides/theharvester"
import { metasploitGuide } from "./guides/metasploit"
import { dnsreconGuide } from "./guides/dnsrecon"
import { sherlockGuide } from "./guides/sherlock"
import { festinGuide } from "./guides/festin"
import { gcpbucketbruteGuide } from "./guides/gcpbucketbrute"
import { grayhatwarfareGuide } from "./guides/grayhatwarfare"
import { enumerateiamGuide } from "./guides/enumerateiam"
import { scoutsuiteGuide } from "./guides/scoutsuite"
import { pacuGuide } from "./guides/pacu"
import { mitmproxyGuide } from "./guides/mitmproxy"
import { proxifyGuide } from "./guides/proxify"
import { reconngGuide } from "./guides/recon-ng"
import { spiderfootGuide } from "./guides/spiderfoot"
import { photonGuide } from "./guides/photon"
import { gitleaksGuide } from "./guides/gitleaks"
import { holeheGuide } from "./guides/holehe"
import { maigretGuide } from "./guides/maigret"
import { intelxGuide } from "./guides/intelx"
import { maltegoGuide } from "./guides/maltego"

export const toolsData = [
  subfinderGuide,
  amassGuide,
  httpxGuide,
  nucleiGuide,
  sqlmapGuide,
  xsstrikeGuide,
  burpsuiteGuide,
  nmapGuide,
  cloudfoxGuide,
  jwtToolGuide,
  arjunGuide,
  paramSpiderGuide,
  x8Guide,
  gfGuide,
  ffufGuide,
  gospiderGuide,
  cewlGuide,
  gobusterGuide,
  hydraGuide,
  whatwebGuide,
  wpscanGuide,
  dirsearchGuide,
  johnGuide,
  searchsploitGuide,
  dalfoxGuide,
  gauGuide,
  katanaGuide,
  naabuGuide,
  masscanGuide,
  hashcatGuide,
  trufflehogGuide,
  kiterunnerGuide,
  niktoGuide,
  theHarvesterGuide,
  metasploitGuide,
  dnsreconGuide,
  sherlockGuide,
  assetfinderGuide,
  findomainGuide,
  chaosGuide,
  githubsubdomainsGuide,
  crobatGuide,
  sublist3rGuide,
  oneforallGuide,
  dnsxGuide,
  shufflednsGuide,
  massdnsGuide,
  purednsGuide,
  altdnsGuide,
  dnsgenGuide,
  hakrevdnsGuide,
  mapcidrGuide,
  tlsxGuide,
  rustscanGuide,
  autoreconGuide,
  unicornscanGuide,
  zmapGuide,
  smapGuide,
  feroxbusterGuide,
  wfuzzGuide,
  waybackurlsGuide,
  gauplusGuide,
  uroGuide,
  hakrawlerGuide,
  xnlinkfinderGuide,
  paramethGuide,
  qsreplaceGuide,
  uniscanGuide,
  kxssGuide,
  gxssGuide,
  secretfinderGuide,
  linkfinderGuide,
  jsparserGuide,
  getjsGuide,
  subjsGuide,
  mantraGuide,
  jsluiceGuide,
  aquatoneGuide,
  gowitnessGuide,
  eyewitnessGuide,
  webscreenshotGuide,
  witnessmeGuide,
  webanalyzeGuide,
  wafw00fGuide,
  s3scannerGuide,
  lazys3Guide,
  cloudenumGuide,
  awsbucketdumpGuide,
  festinGuide,
  gcpbucketbruteGuide,
  grayhatwarfareGuide,
  enumerateiamGuide,
  scoutsuiteGuide,
  pacuGuide,
  mitmproxyGuide,
  proxifyGuide,
  reconngGuide,
  spiderfootGuide,
  photonGuide,
  gitleaksGuide,
  holeheGuide,
  maigretGuide,
  intelxGuide,
  maltegoGuide,
]

export const getToolsByCategory = (category: string) =>
  toolsData.filter(tool => tool.category === category)

export const getToolById = (id: string) =>
  toolsData.find(tool => tool.id === id)

export const getAllCategories = () =>
  [...new Set(toolsData.map(tool => tool.category))]
