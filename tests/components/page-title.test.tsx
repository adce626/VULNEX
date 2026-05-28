import { describe, it, expect, afterEach } from "vitest"
import { render } from "@testing-library/react"
import { PageTitle } from "@/components/page-title"

describe("PageTitle", () => {
  afterEach(() => {
    document.title = "VULNEX"
  })

  it("sets the document title", () => {
    render(<PageTitle title="Nmap Guide" />)
    expect(document.title).toBe("Nmap Guide | VULNEX")
  })

  it("renders nothing", () => {
    const { container } = render(<PageTitle title="Test" />)
    expect(container.innerHTML).toBe("")
  })

  it("updates title when prop changes", () => {
    const { rerender } = render(<PageTitle title="First" />)
    expect(document.title).toBe("First | VULNEX")
    rerender(<PageTitle title="Second" />)
    expect(document.title).toBe("Second | VULNEX")
  })

  it("handles special characters in title", () => {
    render(<PageTitle title="C++ & Java" />)
    expect(document.title).toBe("C++ & Java | VULNEX")
  })
})
