import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Breadcrumb } from "@/components/breadcrumb"

// Mock next/link
vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

describe("Breadcrumb", () => {
  it("renders home link", () => {
    render(<Breadcrumb items={[{ label: "Tools" }]} />)
    const homeLink = screen.getByRole("link", { name: /home/i })
    expect(homeLink).toBeInTheDocument()
    expect(homeLink.getAttribute("href")).toBe("/")
  })

  it("renders a single item without link", () => {
    render(<Breadcrumb items={[{ label: "Nmap" }]} />)
    expect(screen.getByText("Nmap")).toBeInTheDocument()
  })

  it("renders multiple items with links", () => {
    render(
      <Breadcrumb
        items={[
          { label: "Tools", href: "/tools" },
          { label: "Nmap" },
        ]}
      />
    )
    expect(screen.getByText("Tools")).toBeInTheDocument()
    expect(screen.getByText("Nmap")).toBeInTheDocument()
    const toolsLink = screen.getByText("Tools")
    expect(toolsLink.getAttribute("href")).toBe("/tools")
  })

  it("renders three items", () => {
    render(
      <Breadcrumb
        items={[
          { label: "Vulnerabilities", href: "/vulnerabilities" },
          { label: "SQLi", href: "/vulnerabilities/sql-injection" },
          { label: "Time-Based" },
        ]}
      />
    )
    expect(screen.getByText("Vulnerabilities")).toBeInTheDocument()
    expect(screen.getByText("SQLi")).toBeInTheDocument()
    expect(screen.getByText("Time-Based")).toBeInTheDocument()
  })

  it("renders chevron separators between items", () => {
    const { container } = render(<Breadcrumb items={[{ label: "A" }, { label: "B" }]} />)
    const chevrons = container.querySelectorAll("svg")
    // Home icon + 2 chevrons = 3 SVGs
    expect(chevrons.length).toBe(3)
  })

  it("last item without href is not a link", () => {
    render(<Breadcrumb items={[{ label: "Final" }]} />)
    const finalText = screen.getByText("Final")
    expect(finalText.tagName).not.toBe("A")
  })
})
