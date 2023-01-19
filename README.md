## Express SQL Demo

Fetch location info about an IP Address and store it in the sql db.

### Prerequisites
* Create an account on ipinfo.io website and get your API token
* Node js 16 and npm

### Building the code
1. Clone repository from git
2. Install dependencies
```
cd express-sql-demo
npm install
```
3. Create `.env` file similar to `.env.sample` and edit environment variables.
4. Launch server. Set NODE_ENV variable as necessary
```
export NODE_ENV=local
npm start
```

### More details
We are internally fetching the location info from ipinfo.io using axios.<br>
The details are then stored in a database and can be used for future requests. <br>
Sample request and response structure
```
$ curl ipinfo.io/8.8.8.8?token=<API-TOKEN>
{
  "ip": "8.8.8.8",
  "hostname": "dns.google",
  "anycast": true,
  "city": "Mountain View",
  "region": "California",
  "country": "US",
  "loc": "37.4056,-122.0775",
  "org": "AS15169 Google LLC",
  "postal": "94043",
  "timezone": "America/Los_Angeles"
}
```

#### Database
The environment NODE_ENV=test uses and in memory sql db and NODE_ENV=local uses a database that is stored in a file. <br>
In production we are expected to have a dedicated database. Configure connection accordingly in `db/sql.js` file.

### API details
We have implemented few APIs that can be used to fetch that data locally.
Below are the details. Use better API documentation like `https://github.com/Redocly/redoc` or swagger which are the standard.

1. Fetch location for an IP address. `localhost:3000/ip/<ipAddress>`
```
$ curl localhost:3000/ip/8.8.4.2

{"ip":"8.8.4.2","city":"Mountain View","country":"US","longitude":37.4056,"latitude":-122.0775}
```

2. Fetch list of all ip address. `localhost:3000/ip/all/list`
```
$ curl localhost:3000/ip/all/list

[{"ip":"8.8.4.1"},{"ip":"8.8.4.2"}]
```

3. Fetch all countries. `localhost:3000/ip/all/countries`
```
curl localhost:3000/ip/all/countries

{"countries":["US","US"]
```
