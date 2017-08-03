# Simple Product Benchmark
Product benchmark can be heavily boring. So... why not changing that? This project works in a very easy an mangeable way. You just have to configure the sites you want to benchmark and the css selectors for the products category and a series of rules to extract the info about the products you want to benchmark. And we will handle the rest for you.

#### Infrastructure
* Mongodb
* Nodejs

#### To install:
```sh
$ npm install
```

#### To bootstrap data:
```sh
$ ./bootstrap.sh
```

#### To crawl a site:
```sh
$ npm run start:crawler
```

#### To crawl a site menu:
```sh
$ npm run start:crawler:urls
```

#### To crawl a site products:
```sh
$ npm run start:crawler:products
```
