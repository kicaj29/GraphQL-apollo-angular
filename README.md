- [apolloV1-angular-examples: integrationWithHotchocolateApp](#apollov1-angular-examples-integrationwithhotchocolateapp)
  - [Introduction](#introduction)
  - [Project initialization](#project-initialization)
    - [Add apollo client](#add-apollo-client)
    - [Add graphql-cli](#add-graphql-cli)
    - [Generate .graphqlconfig file](#generate-graphqlconfig-file)
    - [Command for copying graphql schema locally](#command-for-copying-graphql-schema-locally)
    - [Add GraphQL Codegen](#add-graphql-codegen)
    - [Initialize graphql-codegen](#initialize-graphql-codegen)
    - [Add ```*.graphql-gen.ts``` to ```.gitignore```](#add-graphql-gents-to-gitignore)
    - [Storing apollo services in dedicated file next to ```*.graphql``` file](#storing-apollo-services-in-dedicated-file-next-to-graphql-file)
  - [First example](#first-example)
    - [Create books component that will display books received from GraphQL endpoint.](#create-books-component-that-will-display-books-received-from-graphql-endpoint)
    - [Create simple query](#create-simple-query)
    - [Generate angular apollo service for the created query](#generate-angular-apollo-service-for-the-created-query)
    - [Use generated angular apollo service](#use-generated-angular-apollo-service)
  - [fetch vs watch](#fetch-vs-watch)
  - [Apollo cache](#apollo-cache)

# apolloV1-angular-examples: integrationWithHotchocolateApp

## Introduction
This project is integrated with backend from this [repo](https://github.com/kicaj29/GraphQL-hotchocolate).

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

### Add [graphql-cli](https://github.com/Urigo/graphql-cli/tree/v3.0.14)
```
npm install graphql-cli@3.0.14 -D
```

### Generate [.graphqlconfig](./.graphqlconfig) file
```
PS D:\GitHub\kicaj29\GraphQL-apollo-angular\apolloV1-angular-examples> npx graphql init
? Enter project name (Enter to skip): integrationWithHotchocolateApp
? Local schema file path: integrationWithHotchocolateApp.schema.graphql
? Endpoint URL (Enter to skip): http://localhost:37926
? Name of this endpoint, for e.g. default, dev, prod: local
? Subscription URL (Enter to skip):
? Do you want to add other endpoints? No
? What format do you want to save your config in? JSON

About to write to D:\GitHub\kicaj29\GraphQL-apollo-angular\apolloV1-angular-examples\.graphqlconfig:

{
  "projects": {
    "integrationWithHotchocolateApp": {
      "schemaPath": "integrationWithHotchocolateApp.schema.graphql",
      "extensions": {
        "endpoints": {
          "local": "http://localhost:37926"
        }
      }
    }
  }
}

? Is this ok? Yes
```

### Command for copying graphql schema locally
```
"gql:update-schema:hotchocolate:local": "graphql get-schema -p integrationWithHotchocolateApp -e local"
```
Run the command to create file [integrationWithHotchocolateApp.schema.graphql](./apolloV1-angular-examples/integrationWithHotchocolateApp.schema.graphql) with the schema.


### Add [GraphQL Codegen](https://graphql-code-generator.com/)
Plugin [Type Script Apollo Angular](https://graphql-code-generator.com/docs/plugins/typescript-apollo-angular) allows generate code for apollo services which next can be used in DI mechanism.
```
npm install @graphql-codegen/cli@1.13.1 -D
```

### Initialize graphql-codegen
```
PS D:\GitHub\kicaj29\GraphQL-apollo-angular\apolloV1-angular-examples> npx graphql-codegen init

    Welcome to GraphQL Code Generator!
    Answer few questions and we will setup everything for you.

? What type of application are you building? Application built with Angular
? Where is your schema?: (path or url) integrationWithHotchocolateApp.schema.graphql
? Where are your operations and fragments?: projects/**/*.graphql
? Pick plugins: TypeScript (required by other typescript plugins), TypeScript Operations (operations and fragments), TypeScript Apollo Angular (typed GQL services)
? Where to write the output: projects/integrationWithHotchocolateApp/src/generated/types.graphql-gen.ts
? Do you want to generate an introspection file? No
? How to name the config file? integrationWithHotchocolateApp.codegen.yml
? What script in package.json should run the codegen? gql:codegen:integrationWithHotchocolateApp

    Config file generated at integrationWithHotchocolateApp.codegen.yml

      $ npm install

    To install the plugins.

      $ npm run gql:codegen:integrationWithHotchocolateApp

    To run GraphQL Code Generator.
```

It will create new command and it will add new packages to ```package.json```
```
"@graphql-codegen/typescript": "1.13.1",
"@graphql-codegen/typescript-operations": "1.13.1",
"@graphql-codegen/typescript-apollo-angular": "1.13.1"
```
Run npm install to install these packages.

### Add ```*.graphql-gen.ts``` to ```.gitignore```

It is good practice to not store generated type script files ```*.graphql-gen.ts``` in repository. Then typical workflow for CI works like this:

* developer on demand updates schema.graphql.
* developer runs npm run gql:codegen to generate new angular apollo services based on the new schema and created ```*.graphql``` files. If everything on local branch works fine then updated schema can be pushed to the remote branch.
* CI once again generates all ```*.graphql-gen.ts``` (because they do not exist in the repo) and in this way can make sure that everything compiles and all possible tests still pass with the new updated schema.

### Storing apollo services in dedicated file next to ```*.graphql``` file
```
npm install @graphql-codegen/near-operation-file-preset@1.13.1 -D
```

Next update [integrationWithHotchocolateApp.codegen.yml](./apolloV1-angular-examples/integrationWithHotchocolateApp.codegen.yml):

```yml
overwrite: true
schema: "integrationWithHotchocolateApp.schema.graphql"
documents: "projects/**/*.graphql"
generates:
  projects/integrationWithHotchocolateApp/src/generated/types.graphql-gen.ts:
    plugins:
      - "typescript"
  projects/integrationWithHotchocolateApp/src/generated:
    preset: near-operation-file
    presetConfig:
      extension: .graphql-gen.ts
      baseTypesPath: types.graphql-gen.ts
    plugins:
      - "typescript"
      - "typescript-operations"
      - "typescript-apollo-angular"
```

## First example

### Create books component that will display books received from GraphQL endpoint.

[books](./apolloV1-angular-examples/projects/integrationWithHotchocolateApp/src/app/books/books.component.ts)

### Create simple query

[books.graphql](./apolloV1-angular-examples/projects/integrationWithHotchocolateApp/src/app/books/books.graphql)

```graphql
query BooksQuery {
    books {
      nodes {
        id
        title
      }
    }
  }
```

### Generate angular apollo service for the created query
```
npm run gql:codegen:integrationWithHotchocolateApp
```

It will create 2 new files (but they are not stored in git):
* ./apolloV1-angular-examples/projects/integrationWithHotchocolateApp/src/generated/types.graphql-gen.ts
* ./apolloV1-angular-examples/projects/integrationWithHotchocolateApp/src/app/books/books.graphql-gen.ts - **this file contains angular apollo service**
  ```ts
    @Injectable({
        providedIn: 'root'
    })
    export class BooksQueryGQL extends Apollo.Query<BooksQueryQuery, BooksQueryQueryVariables> {
        document = BooksQueryDocument;    
    }
  ```

### Use generated angular apollo service

[books.component.ts](./apolloV1-angular-examples/projects/integrationWithHotchocolateApp/src/app/books/books.component.ts) uses ```BooksQueryGQL``` service.

## fetch vs watch
* fetch is executed only once
* watch can be executed multiple times e.g. when watched data in the cache are updated
  
## Apollo cache

Cache in apollo is normalized. It is flat list of records. Thx to this there is no issue with data consistency (e.g. related data are referenced via foreign key). [Article](https://relay.dev/docs/en/thinking-in-graphql#caching-a-graph) about it.


There are [six cache policies](https://medium.com/@galen.corey/understanding-apollo-fetch-policies-705b5ad71980):
* **cache-first (default)** - if data are available in the cache then returns data from the cache, if not available in the cache then request is sent and cache is updated when    
  response is retrieved
* **cache-and-network** - immediately returns data if they are available in the cache, next sends request to the server always even if data is available in the cache. It makes sure that data in the cache is up to date after every request and next returns fresh data from the cache.
  >:warning: it looks that it works differently then in the [medium article described](https://medium.com/@galen.corey/understanding-apollo-fetch-policies-705b5ad71980). **If data is available in the cache it is not immediately returned but it is returned after cache update! MAYBE IT IS BUG in the used version???**
* **network-only** - first request is always sent to the server, **next cache is updated** and finally data are returned from the cache. It works exactly the same way as bugged version of  **cache-and-network**.
* **no-cache** - cache is not used at all. All data are always retrieved from GraphQL endpoint.
* **cache-only** - there no network communication at all. If the data are in the cache then it is returned if not then error if thrown.
* **standby** - only for queries that aren't actively watched, but should be available for refetch and updateQueries.

More about fetch policies [here](https://github.com/apollographql/apollo-client/blob/f08ab2a6d39ca12b1618a1fcabd468fe2a1fb055/src/core/watchQueryOptions.ts#L9).