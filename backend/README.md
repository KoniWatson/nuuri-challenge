## Scalability 

How to scale to 30 000 concurrent users

* **Load balancing** - This meaning splitting of resources to spread across multiple services/servers. This ensuring that no one service/server is overloaded. If using a google environment i.e. google cloud functions or google cloud run then load balancing is made easy.
* **Rate limiting** - Limit the amount of times a user is able to send requests to the API within a certain timeframe. This will also provide a layer of protection against abuse i.e. brute force attacks.  
* **Utilise GraphQL** - This acting like an API gateway but using modern technologies. With the tech stack that might be used and data being a big driver of the platform GraphQL could be a good avenue. It can provide a single endpoint using query language so only the data the user needs is returned.
* **Database** - With all the potential data from partners using a database can help mange and maintain this data more efficiently. It will also allow for faster search queries, therefore faster processing.
* **Caching** - Caching of database responses and temporary storing them in memory would mean the database is not constantly hit. Caching the response can ensure the database can handle the request sent, plus the user won't need wait on data they have already queried.

## Getting Started

```bash
npm i
node index.js
```
## Testing

```bash
npm run test
```