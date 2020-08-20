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