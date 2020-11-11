# Load Balancer
I dag skal vi kigge på load balancing, der samtidig er jeres næste aflevering. Vi skal lave en simpel load balancer, baseret på Round Robin-metoden, der ligeligt uddeler requests til serverne.
Vi gør det her med en http-server, og bruger derfor to komponenter til at bygge den: **node-http-proxy** (https://github.com/nodejitsu/node-http-proxy), som er en programmerbar HTTP-proxy bibliotek og **seaport**, der er en service register og kan bruges til at dele requests ud til en given port.

Hvis I har klonet dette repository, burde disse komponenter gerne være der. 

## Server.js
### Step 1
Vi starter med serveren. Her skal I require 'http' og 'seaport' og gemme dem i en variabel. Samtidig skal I gemme en variabel bestående af objektet seaport.connect('localhost', 9090). Det er fra denne seaport instans, hvor jeres servere registreres.

### Step 2
For at simulere et eller andet funktionalitet, lav en funktion, der indeholder et for-loop, der for eksempel tæller summen af alle tal under 100000 og returnerer resultatet.

### Step 3
Lav nu jeres socket med http.createServer(). Heri kan I placerer en callback-function, der giver en response. Det kunne for eksempel være resultatet fra tidligere og serverens port.

### Step 4
Til sidst i serveren, skal I skrive *SOCKET*.listen(*SEAPORT VAR*.register('server')). Dette får jeres server til at lytte igennem jeres seaport instans efter eventuelle request.
Heri kan I have endnu en callback-function, der eventuelt logger "server is listening".

## Load-balancer.js
### Step 1
Nu skal vi arbejde på load balanceren. Start med at require 'http' og 'seaport' som før, samt 'http-proxy' denne gang. Samtidig skal I lave en seaport.connect('localhost', 9090)-instans ligesom før.

### Step 2
Lav nu en proxy ved hjælp af httpProxy.createProxyServer(). Denne vil gøre det muligt for jer at videresende request til et mål I selv definerer.

### Step 3
Lav nu en http-socket som I har gjort på serveren. Heri kan lave en callback-function der bruger *SEAPORT VARIABEL*.query() som søger igennem alle registrerede servere. Dette kan gemmes som et array. Hvis denne array er tom, kan der for eksempel sendes en respons, der siger at ingen server er ledig.

### Step 4
Næste skridt er at sørge for at vores proxy itererer igennem vores array hver gang den får en request. Jeg har givet jer en måde hvorpå det kan gøres. Heri bruges *i* som tælle-variabel, og hver gang instansen bliver initieret, sætter vi *i* til restværdien af i + 1 og længden af array'en. Til sidst bruges vores proxy-instans til at kalde proxy.web og sender vores request videre til vores mål. Hvis I bruger dette, skal det blot implementeres i http-socket'ens callback-function.

### Step 5
Til slut skal load balanceren sættes til at lytte på en port (8080 for http), ligesom vi har gjort i vores andre øvelser.

For at starte jeres loadbalancer skal i skrive:
- npm run seaport listen 9090 (hvis i har brugt port 9090)
- node load-balancer.js (I en anden terminal)
- node server.js (I lige så mange terminaler som i har lyst. Hver gang dette skrives, initieres en ny server).
Hvis alt er gået som planlagt, burde I kunne skrive *curl http://localhost:8000* i jeres terminal, for at sende en request til jeres load balancer. Hver anden request vil blive sendt til en anden port. 
