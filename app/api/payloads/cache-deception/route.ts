import { NextResponse } from "next/server"
import * as data from "@/components/sections/cache-deception/data"

export async function GET() {
  return NextResponse.json({
    sensitivePaths: data.sensitivePaths,
    extensions: data.extensions,
    extensionAppends: data.extensionAppends,
    fakeDirectories: data.fakeDirectories,
    cacheKeyPayloads: data.cacheKeyPayloads,
    cacheKeyUrls: data.cacheKeyUrls,
    openRedirectPayloads: data.openRedirectPayloads,
    delimiters: data.delimiters,
    encodedDelimiters: data.encodedDelimiters,
    semiExtList: data.semiExtList,
    encodedExtList: data.encodedExtList,
    extStarList: data.extStarList,
    detectionCommands: data.detectionCommands.map(c => ({ command: c.cmd, description: c.desc })),
    preventionItems: data.preventionItems,
  })
}
