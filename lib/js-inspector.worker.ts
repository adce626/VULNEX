import { analyzeJsSourceChunked } from "./js-inspector-patterns"
import type { InspectorFinding } from "./js-inspector-patterns"

interface WorkerMessage {
  input?: string
  buf?: ArrayBuffer
}

interface ProgressPayload {
  type: "progress"
  percent: number
  phase: string
}

interface ResultPayload {
  type: "result"
  findings: InspectorFinding[]
}

interface ErrorPayload {
  type: "error"
  error: string
}

type OutgoingMessage = ProgressPayload | ResultPayload | ErrorPayload

const ctx = self as unknown as {
  onmessage: ((e: MessageEvent<WorkerMessage>) => void) | null
  postMessage(message: OutgoingMessage): void
}

ctx.onmessage = async (e: MessageEvent<WorkerMessage>) => {
  const { input, buf } = e.data

  try {
    let text = input || ""

    if (buf) {
      const decoder = new TextDecoder("utf-8", { fatal: false })
      text = decoder.decode(buf)
    }

    ctx.postMessage({ type: "progress", percent: 0, phase: `Analyzing ${(text.length / 1_000_000).toFixed(1)} MB...` } satisfies OutgoingMessage)

    const findings = await analyzeJsSourceChunked(
      text,
      (percent, phase) => {
        ctx.postMessage({ type: "progress", percent, phase } satisfies OutgoingMessage)
      }
    )

    ctx.postMessage({ type: "result", findings } satisfies OutgoingMessage)
  } catch (err) {
    ctx.postMessage({ type: "error", error: String(err) } satisfies OutgoingMessage)
  }
}
