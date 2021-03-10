# caliper-ts

The [Caliper Analytics&reg; Specification](https://www.imsglobal.org/caliper/v1p1/caliper-spec-v1p1) provides a structured approach to describing, collecting and exchanging learning activity data at scale.
Caliper also defines an application programming interface (the Sensor API™) for marshalling and transmitting event data from instrumented applications to target endpoints for storage, analysis and use.

_caliper-ts_ is a reference implementation of the Sensor API&trade; written in TypeScript, based on the [_caliper-js_](https://github.com/IMSGlobal/caliper-js) library.

## Installation and usage

The _caliper-ts_ package is available on [GitHub Package Registry](https://github.com/ImagineLearning/caliper-ts/packages).
For more information on installing and using the package, please refer to the [_caliper-ts_ README file](packages/caliper-ts/REAMDE.md).

## Development

### TypeScript projects

This repository contains the code for two TypeScript projects bootstrapped with [TSDX](https://tsdx.io/):

- [`caliper-ts`](packages/caliper-ts): Implementation of the Caliper Sensor API&trade;.
- [`caliper-ts-models`](packages/caliper-ts-models): A set of factory functions for creating Caliper Entities and Events. This code is generated from the [_caliper-net_ .NET Sensor Library](https://github.com/edgenuity/caliper-net).

#### Dependencies

This repo uses [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) to function as a simple mono-repo.
Dependencies for both projects can be installed by running this command from the project's root directory:

```bash
yarn
```

You can add dependencies to a single project in one of two ways:

```bash
# From the project root

yarn workspace @imaginelearning/caliper-ts add [some-dependency]
yarn workspace @imaginelearning/caliper-ts-models add [some-other-dependency]

# Or switch to the individual package directory and use the normal yarn commands

cd packages/caliper-ts
yarn add [some-dependency]

# Or

cd packages/caliper-ts-models
yarn add [some-other-dependency]
```

#### Commands

##### `yarn build:caliper-ts`

Builds the _caliper-ts_ library.

##### `yarn build:caliper-ts-models`

Builds the _caliper-ts-models_ library.

##### `yarn build`

Builds both the _caliper-ts-models_ and _caliper-ts_ libraries.

##### `yarn test:caliper-ts`

Runs Jest in the _caliper-ts_ project with the `--watch` flag.

##### `yarn test:caliper-ts-models`

Runs Jest in the _caliper-ts-models_ project with the `--watch` flag.

##### `yarn test:ci:caliper-ts`

Runs Jest in the _caliper-ts_ project in CI mode.

##### `yarn test:ci:caliper-ts-models`

Runs Jest in the _caliper-ts-models_ project in CI mode.

##### `yarn test:ci`

Runs Jest in both the _caliper-ts-models_ and _caliper-ts_ projects in CI mode.

##### `yarn lint`

Runs ESLint in both the _caliper-ts-models_ and _caliper-ts_ projects.

#### Configuration

Code quality is set up for you with `eslint` using the using the [`@imaginelearning/eslint-config/base` configuration](https://github.com/ImagineLearning/typescript/blob/main/packages/eslint-config-imaginelearning/base.js), `prettier` using the [`@imaginelearning/prettier-config` configuration](https://github.com/ImagineLearning/typescript/tree/main/packages/prettier-config), `husky`, and `lint-staged`.

##### Rollup

TSDX uses [Rollup](https://rollupjs.org) as a bundler and generates multiple rollup configs for various module formats and build settings. See [Optimizations](#optimizations) for details.

##### TypeScript

`tsconfig.json` is set up to interpret `dom` and `esnext` types, as well as `react` for `jsx`. Adjust according to your needs.

#### Optimizations

Please see the main `tsdx` [optimizations docs](https://github.com/palmerhq/tsdx#optimizations). In particular, know that you can take advantage of development-only optimizations:

```js
// ./types/index.d.ts
declare var __DEV__: boolean;

// inside your code...
if (__DEV__) {
	console.log('foo');
}
```

You can also choose to install and use [invariant](https://github.com/palmerhq/tsdx#invariant) and [warning](https://github.com/palmerhq/tsdx#warning) functions.

#### Module formats

CJS, ESModules, and UMD module formats are supported.

The appropriate paths are configured in `package.json` and `dist/index.js` accordingly. Please report if any issues are found.

#### Named exports

Per Palmer Group guidelines, [always use named exports.](https://github.com/palmerhq/typescript#exports) Code split inside your app instead of your library.

### .NET project

This repository also contains a [`code-generator` project](code-generator), which is a C# project used to generate TypeScript definitions for events and entities in the `caliper-ts-models` library using the [.NET Caliper Sensor Library](https://github.com/edgenuity/caliper-net).

A **generate-caliper.ps1** script file is also included to execute the code-generator project. Before running this script file, it is recommended to first update the NuGet package for the .NET caliper sensor library.

**NOTE**: executing the above script will require an active feed from MyGet. This can be accomplished by executing the below command (**replace MY_PREAUTHORIZED_KEY with your actual account key from MyGet**).

```sh
dotnet nuget add source https://edgedev.myget.org/F/edgenuity/auth/MY_PREAUTHORIZED_KEY/api/v3/index.json -n edgenuity
```
