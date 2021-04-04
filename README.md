### Key:
    -  Cyptonator API: Throttle & Cache


curl localhost:4000/ticker
ab -n 1000 -c 100 localhost:4000/ticker
curl https://api.cryptonator.com/api/ticker/btc-usd