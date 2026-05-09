export interface Dork {
  query: string;
  description?: string;
}

export interface DorkCategory {
  id: string;
  title: string;
  description: string;
  dorks: Dork[];
}

export const googleDorksData: DorkCategory[] = [
  {
    id: "basic-recon",
    title: "Basic Domain Reconnaissance",
    description: "Basic domain enumeration using Google dorks",
    dorks: [
      { query: "site:{domain} -www -shop -share -ir -mfa", description: "Find subdomains excluding common ones" },
      { query: "site:{domain} ext:php inurl:?", description: "Find PHP files with parameters" },
      { query: "site:{domain} inurl:api | site:*/rest | site:*/v1 | site:*/v2 | site:*/v3", description: "Find API endpoints" },
    ],
  },
  {
    id: "sensitive-files",
    title: "Sensitive File Extensions",
    description: "Search for potentially sensitive file extensions",
    dorks: [
      { query: 'site:"{domain}" ext:log | ext:txt | ext:conf | ext:cnf | ext:ini | ext:env | ext:sh | ext:bak | ext:backup | ext:swp | ext:old | ext:~ | ext:git | ext:svn | ext:htpasswd | ext:htaccess | ext:json', description: "Find sensitive config and backup files" },
      { query: "inurl:conf | inurl:env | inurl:cgi | inurl:bin | inurl:etc | inurl:root | inurl:sql | inurl:backup | inurl:admin | inurl:php site:{domain}", description: "Find sensitive directories" },
    ],
  },
  {
    id: "error-pages",
    title: "Error Pages and Exceptions",
    description: "Find pages exposing error messages or exceptions",
    dorks: [
      { query: 'inurl:"error" | intitle:"exception" | intitle:"failure" | intitle:"server at" | inurl:exception | "database error" | "SQL syntax" | "undefined index" | "unhandled exception" | "stack trace" site:{domain}', description: "Find exposed error pages and stack traces" },
    ],
  },
  {
    id: "vuln-params",
    title: "Vulnerability-Prone Parameters",
    description: "Search for potentially vulnerable parameters",
    dorks: [
      { query: "inurl:q= | inurl:s= | inurl:search= | inurl:query= | inurl:keyword= | inurl:lang= inurl:& site:{domain}", description: "Search/query parameters (potential XSS)" },
      { query: "inurl:url= | inurl:return= | inurl:next= | inurl:redirect= | inurl:redir= | inurl:ret= | inurl:r2= | inurl:page= inurl:& inurl:http site:{domain}", description: "Redirect parameters (Open Redirect)" },
      { query: "inurl:id= | inurl:pid= | inurl:category= | inurl:cat= | inurl:action= | inurl:sid= | inurl:dir= inurl:& site:{domain}", description: "ID parameters (potential SQLi)" },
      { query: "inurl:http | inurl:url= | inurl:path= | inurl:dest= | inurl:html= | inurl:data= | inurl:domain= | inurl:page= inurl:& site:{domain}", description: "URL parameters (potential SSRF)" },
      { query: "inurl:include | inurl:dir | inurl:detail= | inurl:file= | inurl:folder= | inurl:inc= | inurl:locate= | inurl:doc= | inurl:conf= inurl:& site:{domain}", description: "File parameters (potential LFI)" },
      { query: "inurl:cmd | inurl:exec= | inurl:query= | inurl:code= | inurl:do= | inurl:run= | inurl:read= | inurl:ping= inurl:& site:{domain}", description: "Command parameters (potential RCE)" },
    ],
  },
  {
    id: "cloud-storage",
    title: "Cloud Storage and Services",
    description: "Find exposed cloud storage and services",
    dorks: [
      { query: 'site:s3.amazonaws.com "{domain}"', description: "AWS S3 buckets" },
      { query: 'site:blob.core.windows.net "{domain}"', description: "Azure Blob storage" },
      { query: 'site:googleapis.com "{domain}"', description: "Google APIs" },
      { query: 'site:drive.google.com "{domain}"', description: "Google Drive files" },
      { query: 'site:dev.azure.com "{domain}"', description: "Azure DevOps" },
      { query: 'site:onedrive.live.com "{domain}"', description: "OneDrive files" },
      { query: 'site:digitaloceanspaces.com "{domain}"', description: "DigitalOcean Spaces" },
      { query: 'site:sharepoint.com "{domain}"', description: "SharePoint files" },
      { query: 'site:s3-external-1.amazonaws.com "{domain}"', description: "AWS S3 external" },
      { query: 'site:s3.dualstack.us-east-1.amazonaws.com "{domain}"', description: "AWS S3 dualstack" },
      { query: 'site:dropbox.com/s "{domain}"', description: "Dropbox shared files" },
      { query: 'site:box.com/s "{domain}"', description: "Box shared files" },
      { query: 'site:docs.google.com inurl:"/d/" "{domain}"', description: "Google Docs" },
      { query: 'site:jfrog.io "{domain}"', description: "JFrog artifacts" },
      { query: 'site:firebaseio.com "{domain}"', description: "Firebase databases" },
    ],
  },
  {
    id: "code-docs",
    title: "Code and Documentation",
    description: "Search for exposed code and documentation",
    dorks: [
      { query: 'site:pastebin.com "{domain}"', description: "Pastebin leaks" },
      { query: 'site:jsfiddle.net "{domain}"', description: "JSFiddle code" },
      { query: 'site:codebeautify.org "{domain}"', description: "CodeBeautify snippets" },
      { query: 'site:codepen.io "{domain}"', description: "CodePen projects" },
      { query: 'inurl:apidocs | inurl:api-docs | inurl:swagger | inurl:api-explorer site:"{domain}"', description: "API documentation" },
      { query: 'site:openbugbounty.org inurl:reports intext:"{domain}"', description: "OpenBugBounty reports" },
      { query: 'site:groups.google.com "{domain}"', description: "Google Groups discussions" },
    ],
  },
  {
    id: "sensitive-content",
    title: "Sensitive Content",
    description: "Find potentially sensitive content",
    dorks: [
      { query: 'site:{domain} "choose file"', description: "File upload forms" },
      { query: "inurl:login | inurl:signin | intitle:login | intitle:signin | inurl:secure site:{domain}", description: "Login pages" },
      { query: "inurl:test | inurl:env | inurl:dev | inurl:staging | inurl:sandbox | inurl:debug | inurl:temp | inurl:internal | inurl:demo site:{domain}", description: "Development/staging environments" },
      { query: "site:{domain} ext:txt | ext:pdf | ext:xml | ext:xls | ext:xlsx | ext:ppt | ext:pptx | ext:doc | ext:docx", description: "Document files" },
      { query: 'intext:"confidential" | intext:"Not for Public Release" | intext:"internal use only" | intext:"do not distribute"', description: "Confidential documents" },
      { query: "inurl:email= | inurl:phone= | inurl:password= | inurl:secret= inurl:& site:{domain}", description: "Sensitive parameters" },
    ],
  },
];
