export { type ToolGuide } from "./guide-types"

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

export const toolsData = [
  subfinderGuide,
  amassGuide,
  httpxGuide,
  nucleiGuide,
  sqlmapGuide,
  xsstrikeGuide,
  burpsuiteGuide,
  ffufGuide,
  nmapGuide,
  cloudfoxGuide,
  jwtToolGuide,
  arjunGuide,
  paramSpiderGuide,
  x8Guide,
  gfGuide,
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
]

export const getToolsByCategory = (category: string) =>
  toolsData.filter(tool => tool.category === category)

export const getToolById = (id: string) =>
  toolsData.find(tool => tool.id === id)

export const getAllCategories = () =>
  [...new Set(toolsData.map(tool => tool.category))]
