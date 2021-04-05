### Setup

1. Docker
    ```
    docker-compose up
    ```
2. Bash
   ```
   cd ./client && npm run start
   cd ./server && npm run start
   ```

### How to use the API
```
curl localhost:4000/ticker
ab -n 1000 -c 100 localhost:4000/ticker
```

### Things to improve:
    - Build a shared npm module for data types (e.g. CurrencyType, CurrencyInformation, GetCurrencyPriceResponse)
    - Use redis as cache instead of in-memory node-cache
    - Create a seperated CDN project and a load balancer for fetch time optimization & minimize API calls to Cryptonator if we need multiple nodes