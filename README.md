# fyleserver

## Tech Stack
  - Database: Postgres 
  - Server: Nodejs (Express)
  - Typescript


## Problem Statment
  Develop a REST API Service

  - Data provided: https://github.com/snarayanank2/indian_banks
  - to be Hosted on Heroku
  - Postgres to be used as Database. 
    - Suggestions: https://clever-cloud.com
  
### Essentials your applications should have:

#### 1. Autocomplete API to return possible matches based on the branch name **ordered by IFSC code** (ascending order) with limit and offset.
  
  1. **Endpoint: /api/branches/autocomplete?q=<>**
  
  2. Example: /api/branches/autocomplete?q=**RTGS**&limit=3&offset=0
  
  3. Sample response:

  ```json
    {
       "branches":[
          {
             "ifsc":"ABHY0065001",
             "bank_id":60,
             "branch":"RTGS-HO",
             "address":"ABHYUDAYA BANK BLDG., B.NO.71, NEHRU NAGAR, KURLA (E), MUMBAI-400024",
             "city":"MUMBAI",
             "district":"GREATER MUMBAI",
             "state":"MAHARASHTRA"
          },
          {
             "ifsc":"ABNA0000001",
             "bank_id":110,
             "branch":"RTGS-HO",
             "address": "414 EMPIRE COMPLEX, SENAPATI BAPAT MARG LOWER PAREL WEST MUMBAI 400013",
             "city":"MUMBAI",
             "district":"GREATER BOMBAY",
             "state":"MAHARASHTRA"
          },
          {
             "ifsc":"ADCB0000001",
             "bank_id":143,
             "branch":"RTGS-HO",
             "address":"75, REHMAT MANZIL, V. N. ROAD, CURCHGATE, MUMBAI - 400020",
             "city":"MUMBAI",
             "district":"MUMBAI CITY",
             "state":"MAHARASHTRA"
          },
          {
             "ifsc":"ADCC0000001",
             "bank_id":61,
             "branch":"RTGS-HO",
             "address": "THE AKOLA DISTRICT CENTRAL COOP. BANK LTD., P.B.NO. 8, CIVIL LINES, S.A. COLLEGE ROAD, AKOLA. 444001",
             "city":"AKOLA",
             "district":"AKOLA",
             "state":"MAHARASHTRA"
          }
       ]
    }
  ```


#### 2. Search API to return possible matches across all columns and all rows, **ordered by IFSC code** (ascending order) with limit and offset.

1. **Endpoint: /api/branches?q=<>**

2. Example: /api/branches?q=**Bangalore**&limit=4&offset=0

3. Sample response:

```json
{
   "branches":[
      {
         "ifsc":"ABNA0100318",
         "bank_id":110,
         "branch":"BANGALORE",
         "address":"PRESTIGE TOWERS', GROUND FLOOR, 99 & 100, RESIDENCY ROAD, BANGALORE 560 025.",
         "city":"BANGALORE",
         "district":"BANGALORE URBAN",
         "state":"KARNATAKA"
      },
      {
         "ifsc":"ADCB0000002",
         "bank_id":143,
         "branch":"BANGALORE",
         "address": "CITI CENTRE, 28, CHURCH STREET, OFF M. G. ROAD BANGALORE 560001",
         "city":"BANGALORE",
         "district":"BANGALORE URBAN",
         "state":"KARNATAKA"
      },
      {
         "ifsc":"ALLA0210217",
         "bank_id":11,
         "branch":"K. G. ROAD",
         "address": "NO. 2, FKCCI BUILDING, K G ROAD, BANGALORE",
         "city":"BANGALORE",
         "district":"BANGALORE URBAN",
         "state":"KARNATAKA"
      },
      {
         "ifsc":"ALLA0210326",
         "bank_id":11,
         "branch": "BANGALORE BASAVANGUDI",
         "address":"121, RM COMPLEX, DR.D.V.GUNDAPPA ROAD, BASAVANGUDI, BANGALORE - 560004",
         "city":"BANGALORE",
         "district":"BANGALORE URBAN",
         "state":"KARNATAKA"
      }
   ]
}
```



## Modifications to the Database

###  tsvector indexes for full text searches. 

1. Alter tabels to store tsvector indexes

```sql
  ALTER TABLE banks ADD "doc_vectors" tsvector;

  ALTER TABLE branches ADD "doc_vectors" tsvector;
```

2. Create Indexes & store it in doc_vectors column 

```sql
  CREATE INDEX idx_fts_doc_vec ON banks USING gin(doc_vectors);

  CREATE INDEX idx_fts_doc_vec ON branches USING gin(doc_vectors);
```

3. Update tables to contain tsvectors for current row in doc_vectors column for the given row.

```sql
  UPDATE branches SET doc_vectors = (to_tsvector(ifsc) || to_tsvector(branch) || to_tsvector(address) || to_tsvector(city) || to_tsvector(district) || to_tsvector(state));

  UPDATE banks SET doc_vectors = (to_tsvector(name));
```

### Build Project

1. Install all dependencies

```shell
  npm install
```

2. Build project 

```shell
  npm run build
```

3. Start 

```shell
  npm run start
```

4. Develop 

```
  npm run dev
```

### Project Structure 

```

.
├── src
├   ├── server.ts 
│   ├── pg
│   │   ├── connect.ts
│   │   └── functions
│   │       └── branches.ts
│   ├── routes
│   │   ├── banks.ts
│   │   └── branches.ts
│   └── shared
│       └── sanitize.ts
├── banks.sql
├── nodemon.json
├── package.json
├── package-lock.json
├── README.md
├── tsconfig.json
|-- .env (Development only)
.

```

* tsconfig.json - typescript project configuration
* nodemon - settings for nodemon development tool
* package.json - contains info about nodejs project & dependencies

* src/pg - logic for communicating with postgres database
  * connect.ts - establishes connection with database, exposes `execQuery()` for executing Queries efficiently.
  * functions/branches.ts - functions for retrieving data from database

* src/routes - REST API routes
  * ./banks.ts - bank details handlers
  * ./branches.ts - branches REST route handlers
* server.ts - project root, main entry file

### Enviornment Variables

1. App Variables 
    - PORT - PORT to listen API calls on.

2. Postgres Connection
    * PG_HOST      - hostname
    * PG_DB        - database 
    * PG_USER      - username
    * PG_PASSWORD  - password
    * PG_PORT      - db port (defaults 5432)

Author: [@pavittarx](https://github.com/pavittarx)

# References

* **text search in Postgres:** https://hevodata.com/blog/postgresql-full-text-search-setup/#a2