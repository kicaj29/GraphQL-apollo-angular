# apolloV1-angular-examples: integrationWithHotchocolateApp

## Project initialization

### Add [apollo client](https://www.apollographql.com/docs/angular/basics/setup/)
```
ng add apollo-angular@1.9.1
```

>NOTE: I used version 1.9.1 because the newest available version (2.0.3) had some issues with copying graphql schema.

It will install the following packages:
```
"apollo-angular": "^1.9.1",
"apollo-angular-link-http": "^1.10.0",
"apollo-link": "^1.2.11",
"apollo-client": "^2.6.0",
"apollo-cache-inmemory": "^1.6.0",
"graphql-tag": "^2.10.0",
"graphql": "^14.6.0"
```

### Add [graphql-cli](https://github.com/Urigo/graphql-cli)
```
npm install graphql-cli@3.0.14 -D
```