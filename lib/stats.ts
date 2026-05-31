import { toolsData } from "./tools-data"

export const SITE_STATS = {
  commandCount: toolsData.reduce((total, tool) => total + tool.commands.length, 0),
  lastUpdated: "2026-05-20",
}
