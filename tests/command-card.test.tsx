import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { CommandCard } from "@/components/command-card"

describe("CommandCard", () => {
  it("renders the command text", () => {
    render(<CommandCard command="nmap -sV target.com" description="Test scan" index={1} />)
    expect(screen.getByText("nmap -sV target.com")).toBeInTheDocument()
    expect(screen.getByText("Test scan")).toBeInTheDocument()
  })

  it("displays the index number", () => {
    render(<CommandCard command="ping -c 1 example.com" index={5} />)
    expect(screen.getByText("5")).toBeInTheDocument()
  })

  it("replaces domain placeholder when domain prop is provided", () => {
    render(<CommandCard command="nmap example.com" index={1} domain="target.org" />)
    expect(screen.getByText("nmap target.org")).toBeInTheDocument()
  })
})
