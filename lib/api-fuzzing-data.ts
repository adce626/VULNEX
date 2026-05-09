export interface ApiFuzzingStep {
  id: string
  title: string
  description: string
  commands: { command: string; description: string }[]
  tools?: { name: string; url: string; description: string }[]
  tips?: string[]
}

export const apiFuzzingSteps: ApiFuzzingStep[] = [
  {
    id: "introduction",
    title: "What is API Fuzzing?",
    description:
      "API Fuzzing is an automated security testing technique used to discover vulnerabilities in APIs. It works by sending massive amounts of unexpected, malformed, or random data (payloads) to API endpoints and parameters, then analyzing the responses for errors, crashes, information leaks, or security weaknesses such as input validation failures, injection flaws (SQLi, XSS), authentication/authorization bypass, IDOR, mass assignment, business logic flaws, rate limiting issues, and hidden endpoints or parameters.",
    commands: [],
    tips: [
      "Fuzzing finds unknown vulnerabilities automated tools miss",
      "Test different data types: JSON, XML, form data, headers",
      "Look for error messages that reveal internal information",
    ],
  },
  {
    id: "tools",
    title: "Helpful Tools",
    description:
      "Before starting API fuzzing, you need the right tools installed and configured.",
    commands: [],
    tools: [
      {
        name: "ffuf",
        url: "https://github.com/ffuf/ffuf",
        description: "Fastest and most recommended - Go-based web fuzter",
      },
      {
        name: "wfuzz",
        url: "https://github.com/xmendez/wfuzz",
        description: "Good for complex POST requests",
      },
      {
        name: "SecLists",
        url: "https://github.com/danielmiessler/SecLists",
        description: "Best wordlists collection",
      },
      {
        name: "Burp Suite Intruder",
        url: "https://portswigger.net/burp",
        description: "GUI fuzter - great for beginners",
      },
      {
        name: "RESTler",
        url: "https://github.com/microsoft/restler-fuzzer",
        description: "Smart fuzzing using OpenAPI/Swagger spec",
      },
      {
        name: "Hoppscotch",
        url: "https://hoppscotch.io",
        description: "For manual testing + collection runner",
      },
    ],
    tips: [
      "ffuf is fastest - learn its flags well",
      "SecLists has wordlists for every scenario",
      "Use Burp with ffuf via proxy for full capture",
    ],
  },
  {
    id: "basic-parameter",
    title: "Step 1: Basic Parameter Fuzzing",
    description:
      "Start with simple parameter fuzzing using GET requests. This discovers hidden parameters that may reveal additional functionality or vulnerabilities.",
    commands: [
      {
        command: 'ffuf -u "https://api.target.com/user?id=FUZZ" -w wordlist.txt -mc 200,403',
        description: "Basic parameter fuzzing",
      },
      {
        command: 'ffuf -u "https://api.target.com/search?q=FUZZ" -w wordlist.txt -mc 200',
        description: "Search parameter fuzzing",
      },
      {
        command: 'ffuf -u "https://api.target.com/item/FUZZ" -w wordlist.txt -mc 200,201,204',
        description: "Path parameter fuzzing",
      },
    ],
    tips: [
      "Start with small wordlists for speed",
      "Match multiple status codes with -mc flag",
      "Check for different response sizes with -fs",
    ],
  },
  {
    id: "endpoint-discovery",
    title: "Step 2: Endpoint / Directory Discovery",
    description:
      "Discover hidden API endpoints that may not be documented or publicly accessible.",
    commands: [
      {
        command: 'ffuf -u https://api.target.com/FUZZ -w SecLists/Discovery/Web-Content/api-endpoints.txt -mc 200',
        description: "API endpoint discovery",
      },
      {
        command: 'ffuf -u https://api.target.com/api/v1/FUZZ -w wordlist.txt -mc 200,201,204',
        description: "API v1 endpoint discovery",
      },
      {
        command: 'ffuf -u https://api.target.com/FUZZ -w SecLists/Discovery/Web-Content/data-science.txt -mc 200',
        description: "Alternative wordlist",
      },
    ],
    tips: [
      "Check /api/, /v1/, /v2/ prefixes",
      "Look for admin or internal endpoints",
      "Test common API patterns: rest, graphql, soap",
    ],
  },
  {
    id: "post-json",
    title: "Step 3: POST JSON Fuzzing",
    description:
      "Fuzz POST endpoints with JSON payloads. This is common for authentication and data submission endpoints.",
    commands: [
      {
        command: "ffuf -u https://api.target.com/login -X POST -H \"Content-Type: application/json\" -d '{\"username\":\"admin\",\"password\":\"FUZZ\"}' -w passwords.txt",
        description: "Password fuzzing in JSON",
      },
      {
        command: "ffuf -u https://api.target.com/register -X POST -H \"Content-Type: application/json\" -d '{\"email\":\"FUZZ@test.com\",\"password\":\"test123\"}' -w wordlist.txt",
        description: "Email fuzzing in registration",
      },
      {
        command: "ffuf -u https://api.target.com/api/submit -X POST -H \"Content-Type: application/json\" -d '{\"data\":\"FUZZ\"}' -w wordlist.txt",
        description: "Generic data fuzzing",
      },
    ],
    tips: [
      "Always set correct Content-Type header",
      "Test for SQL injection in JSON fields",
      "Look for error messages in responses",
    ],
  },
  {
    id: "clusterbomb",
    title: "Step 4: Multiple Positions (Clusterbomb)",
    description:
      "Use clusterbomb mode to fuzz multiple parameters simultaneously. This is useful for credential stuffing and multi-field testing.",
    commands: [
      {
        command: "ffuf -mode clusterbomb -u https://api.target.com/login -X POST -d '{\"username\":\"USER\",\"password\":\"PASS\"}' -w users.txt:USER -w passwords.txt:PASS -mc 200",
        description: "Username + password fuzzing",
      },
      {
        command: "ffuf -mode clusterbomb -u https://api.target.com/search -d '{\"query\":\"QUERY\",\"filter\":\"FILTER\"}' -w queries.txt:QUERY -w filters.txt:FILTER -mc 200",
        description: "Multiple parameter fuzzing",
      },
      {
        command: "ffuf -mode clusterbomb -u https://api.target.com/transfer -X POST -d '{\"from\":\"FROM\",\"to\":\"TO\",\"amount\":\"AMOUNT\"}' -w accounts.txt:FROM -w amounts.txt:AMOUNT -fc 401,403",
        description: "Transfer parameter fuzzing",
      },
    ],
    tips: [
      "Clusterbomb tries all combinations",
      "Use -fc to filter error codes",
      "Can generate many requests - use -t to limit",
    ],
  },
  {
    id: "header-fuzzing",
    title: "Step 5: Header Fuzzing",
    description:
      "Fuzz HTTP headers to discover authentication bypass, API key exposure, or rate limiting issues.",
    commands: [
      {
        command: 'ffuf -u https://api.target.com/admin -H "Authorization: Bearer FUZZ" -w tokens.txt -mc 200,403',
        description: "Authorization header fuzzing",
      },
      {
        command: 'ffuf -u https://api.target.com/api -H "X-Api-Key: FUZZ" -w api-keys.txt -mc 200',
        description: "API key header fuzzing",
      },
      {
        command: 'ffuf -u https://api.target.com/user -H "X-Forwarded-For: FUZZ" -w ips.txt -fs 0',
        description: "IP spoofing header fuzzing",
      },
      {
        command: 'ffuf -u https://api.target.com/admin -H "X-Admin: FUZZ" -w wordlist.txt -mc 200,403',
        description: "Custom header fuzzing",
      },
    ],
    tips: [
      "Common headers: Authorization, X-API-Key, X-Token",
      "Test for host header injection too",
      "Look for different responses when headers change",
    ],
  },
  {
    id: "cookie-fuzzing",
    title: "Step 6: Cookie Fuzzing",
    description:
      "Fuzz cookies to discover session handling issues, authentication bypass, or privilege escalation.",
    commands: [
      {
        command: 'ffuf -u https://api.target.com/dashboard -H "Cookie: session=FUZZ" -w cookies.txt -mc 200,403',
        description: "Session cookie fuzzing",
      },
      {
        command: 'ffuf -u https://api.target.com/profile -H "Cookie: auth=FUZZ" -w tokens.txt -mc 200',
        description: "Auth token fuzzing",
      },
      {
        command: 'ffuf -u https://api.target.com/admin -H "Cookie: role=user" -H "Cookie: user_id=FUZZ" -w ids.txt',
        description: "IDOR via cookie fuzzing",
      },
    ],
    tips: [
      "Look for predictable session tokens",
      "Test for privilege escalation",
      "Check if cookies are properly validated",
    ],
  },
  {
    id: "hidden-parameters",
    title: "Step 7: Hidden Parameter Discovery",
    description:
      "Discover hidden parameters that may not be visible in forms or documented APIs.",
    commands: [
      {
        command: 'ffuf -u "https://api.target.com/api?FUZZ=test" -w SecLists/Discovery/Web-Content/burp-parameter-names.txt -fs 148',
        description: "Hidden parameter discovery",
      },
      {
        command: 'ffuf -u "https://api.target.com/user?id=1&FUZZ=1" -w wordlist.txt -fs 0,23',
        description: "Additional parameter fuzzing",
      },
      {
        command: 'ffuf -u "https://api.target.com/search?q=test&FUZZ" -w SecLists/Discovery/Web-Content/burp-parameter-names.txt -fc 404',
        description: "Filter common responses",
      },
    ],
    tips: [
      "Use -fs to filter known response sizes",
      "Common hidden params: debug, admin, internal, _id",
      "Also test POST with hidden parameters",
    ],
  },
  {
    id: "recursive",
    title: "Step 8: Recursive Fuzzing",
    description:
      "Use recursive scanning to discover nested directories and API paths.",
    commands: [
      {
        command: 'ffuf -u https://api.target.com/FUZZ -w directories.txt -recursion -recursion-depth 3',
        description: "Recursive directory fuzzing",
      },
      {
        command: 'ffuf -u https://api.target.com/FUZZ -w directories.txt -recursion -e .json,.xml,.bak',
        description: "Recursive with extensions",
      },
      {
        command: 'ffuf -u https://api.target.com/api/v1/FUZZ -w wordlist.txt -recursion -recursion-depth 2 -mc 200',
        description: "API version fuzzing",
      },
    ],
    tips: [
      "Be careful with recursion depth",
      "Use extensions to find config files",
      "Can find backup files this way",
    ],
  },
  {
    id: "naughty-strings",
    title: "Step 9: Naughty Strings (Input Validation)",
    description:
      "Test with special characters and edge cases to find input validation vulnerabilities.",
    commands: [
      {
        command: "ffuf -u https://api.target.com/users -X POST -d '{\"name\":\"FUZZ\"}' -w SecLists/Fuzzing/big-list-of-naughty-strings.txt -mc 500",
        description: "Input validation fuzzing",
      },
      {
        command: "ffuf -u \"https://api.target.com/search?q=FUZZ\" -w SecLists/Fuzzing/Injection-SQL.txt -mc 500,400",
        description: "SQL injection fuzzing",
      },
      {
        command: "ffuf -u \"https://api.target.com/user?name=FUZZ\" -w SecLists/Fuzzing/Soft/web-proxies.txt -mc 400,500",
        description: "XSS character fuzzing",
      },
    ],
    tips: [
      "Watch for 500 status - internal errors",
      "SQLi, XSS, Command injection possible",
      "Check for reflected data in response",
    ],
  },
  {
    id: "subdomain-vhost",
    title: "Step 10: Subdomain & VHost Fuzzing",
    description:
      "Discover API subdomains and virtual hosts that may contain different functionality.",
    commands: [
      {
        command: 'ffuf -u https://FUZZ.api.target.com -w subdomains.txt -mc 200',
        description: "Subdomain fuzzing",
      },
      {
        command: 'ffuf -u https://api.target.com -H "Host: FUZZ" -w vhosts.txt -fs 12345',
        description: "VHost fuzzing",
      },
      {
        command: 'ffuf -u https://FUZZ.target.com -w wordlist.txt -mc 200,403',
        description: "Alternative subdomain approach",
      },
    ],
    tips: [
      "Look for api-internal, dev, staging",
      "VHost can reveal different content",
      "Check DNS records for additional targets",
    ],
  },
  {
    id: "xml-fuzzing",
    title: "Step 11: XML Fuzzing",
    description:
      "Test SOAP and other XML-based APIs for vulnerabilities.",
    commands: [
      {
        command: "ffuf -u https://api.target.com/user -X POST -H \"Content-Type: application/xml\" -d '<user><FUZZ>value</FUZZ></user>' -w fields.txt",
        description: "XML field fuzzing",
      },
      {
        command: "ffuf -u https://api.target.com/soap -X POST -H \"Content-Type: application/xml\" -d '<?xml version=\"1.0\"?><soap><FUZZ></FUZZ></soap>' -w xml-tags.txt",
        description: "SOAP envelope fuzzing",
      },
      {
        command: "ffuf -u https://api.target.com/api -X POST -H \"Content-Type: application/xml\" -d '<request><FUZZ>test</FUZZ></request>' -w fields.txt -fc 400,500",
        description: "XML error filtering",
      },
    ],
    tips: [
      "SOAP APIs often haveXXE vulnerabilities",
      "Test for XXE with external entities",
      "Check XML parser behavior",
    ],
  },
  {
    id: "useful-flags",
    title: "Useful ffuf Flags Reference",
    description:
      "Common flags to enhance your fuzzing commands. Master these for efficient testing.",
    commands: [
      {
        command: "-t 100",
        description: "100 threads for faster fuzzing",
      },
      {
        command: "-mc 200,201,204,301,403",
        description: "Match specific status codes",
      },
      {
        command: "-fs 1234",
        description: "Filter response size",
      },
      {
        command: "-fw 50",
        description: "Filter word count",
      },
      {
        command: "-o results.json -of json",
        description: "Save output to JSON",
      },
      {
        command: "-x http://127.0.0.1:8080",
        description: "Use Burp proxy",
      },
      {
        command: "-v",
        description: "Verbose mode",
      },
      {
        command: "-s",
        description: "Silent mode (no progress)",
      },
      {
        command: "-rate 50",
        description: "Limit requests per second",
      },
      {
        command: "-timeout 10",
        description: "Request timeout in seconds",
      },
    ],
    tips: [
      "Combine -mc and -fc for precision",
      "Use -o for reporting to clients",
      "Always use proxy for bug bounty programs",
    ],
  },
  {
    id: "wfuzz-alternatives",
    title: "wfuzz Examples (Alternative)",
    description:
      "wfuzz is another powerful fuzzer with slightly different syntax. Good alternative for specific scenarios.",
    commands: [
      {
        command: 'wfuzz -c -z file,users.txt -z file,passwords.txt -d "username=FUZZ&password=FUZZ2" --hs "Invalid" https://api.target.com/login',
        description: "Login brute force (hide Invalid)",
      },
      {
        command: 'wfuzz -c -z file,parameters.txt -u "https://api.target.com/?FUZZ=1"',
        description: "Parameter fuzzing",
      },
      {
        command: 'wfuzz -c -z file,wordlist.txt -u "https://api.target.com/FUZZ" --hc 404',
        description: "Hide 404 responses",
      },
{
        command: "wfuzz -c -z file,wordlist.txt -u \"https://api.target.com/api/FUZZ\" -w highcard.txt",
        description: "High cardinality mode",
      },
    ],
    tips: [
      "wfuzz syntax differs from ffuf",
      "Use --hc/--hs to filter responses",
      "Good for complex filtering scenarios",
    ],
  },
  {
    id: "best-practices",
    title: "Best Practices & Tips",
    description:
      "Follow these best practices for effective and safe API fuzzing.",
    commands: [],
    tips: [
      "Always start with small wordlists",
      "Use proxies when testing live targets",
      "Test on authorized bug bounty programs or labs only",
      "Document all findings with steps to reproduce",
      "Check rate limiting - don't get blocked",
      "Look for information in error messages",
      "Test all HTTP methods: GET, POST, PUT, DELETE, PATCH",
      "Analyze response times for timing-based attacks",
      "Check for business logic vulnerabilities",
      "Don't forget to test headers and cookies",
    ],
  },
]