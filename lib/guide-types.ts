export interface ToolGuide {
  id: string
  name: string
  icon: string
  category: string
  description: string
  installation: {
    title: string
    steps: string[]
    code?: string
  }
  usage: {
    title: string
    description: string
    code?: string
  }
  commands: {
    command: string
    description: string
  }[]
  whenToUse: string[]
  notes: string[]
  commonErrors: {
    error: string
    solution: string
  }[]
  tags: string[]
}
