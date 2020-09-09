# caliper-ts

The [Caliper Analytics&reg; Specification](https://www.imsglobal.org/caliper/v1p1/caliper-spec-v1p1) provides a structured approach to describing, collecting and exchanging learning activity data at scale.
Caliper also defines an application programming interface (the Sensor API™) for marshalling and transmitting event data from instrumented applications to target endpoints for storage, analysis and use.

_caliper-ts_ is a reference implementation of the Sensor API&trade; written in TypeScript, based on the [_caliper-js_](https://github.com/IMSGlobal/caliper-js) library.

## Installation

The _caliper-ts_ package is available on [GitHub Package Registry](https://github.com/ImagineLearning/caliper-ts/packages).
To install it, you will need to configure your project by adding a `.npmrc` file to the project root with the following content:

```
@imaginelearning:registry=https://npm.pkg.github.com
```

You can then install it using npm or yarn.

```sh
npm install @imaginelearning/caliper-ts
```

Or

```sh
yarn add @imaginelearning/caliper-ts
```

## Caliper vocabulary

The [Caliper Analytics&reg; Specification](https://www.imsglobal.org/caliper/v1p1/caliper-spec-v1p1)
defines a set of concepts, relationships and rules for describing learning activities. Each activity
domain modeled is described in a profile. Each profile is composed of one or more `Event` types
(e.g., `AssessmentEvent`, `NavigationEvent`). Each `Event` type is associated with a set of actions
undertaken by learners, instructors, and others. Various `Entity` types representing people, groups,
and resources are provided in order to better describe both the relationships established between
participating entities and the contextual elements relevant to the interaction (e.g., `Assessment`,
`Attempt`, `CourseSection`, `Person`).

_caliper-ts_ is still a work in progress and only implements some profiles described in
[Caliper Analytics&reg; Specification](https://www.imsglobal.org/caliper/v1p1/caliper-spec-v1p1).

## Usage

_caliper-ts_ provides a number of classes and factory functions to facilitate working with the Sensor API in a consistent way.

### `Sensor` class

This is the class that manages clients for interacting with a Sensor API,
as well as providing a helper function for creating properly formatted `Envelope` objects for transmitting Caliper events.

#### Constructor: `new Sensor(id: string, clients?: Record<string, HttpClient>)`

Creates a new instance of a `Sensor` with the specified ID.
Optionally takes a `Record` of `HttpClient` objects, as an alternative to using the `Sensor.registerClient` function.

```ts
const sensor1 = new Sensor('http://example.org/sensors/1');

// Or with HttpClients

const client = httpClient(
	'http://example.org/sensors/1/clients/2',
	'https://example.edu/caliper/target/endpoint',
	'40dI6P62Q_qrWxpTk95z8w'
);
const sensor2 = new Sensor('http://example.org/sensors/2', {
	[client.getId()]: client
});
```

#### `Sensor.createEnvelope<T>(opts: EnvelopeOptions<T>): Envelope<T>`

Creates a new `Envelope` object with the specified options, where the `data` field is an array of type `T`.

`EnvelopeOptions<T>` contains the following properties:

-   `sensor: string`: ID of the sensor
-   `sendTime?: string`: ISO 8601 formatted date with time (defaults to current date and time)
-   `dataVersion?: string`: Version of the Caliper context being used (defaults to `http://purl.imsglobal.org/ctx/caliper/v1p1`)
-   `data?: T | T[]`: Object(s) to be transmitted in the envelope, typically an `Event`, `Entity`, or combination.

```ts
const data = createSessionEvent({
	// See documentation on creating events
});
const envelope = sensor.createEnvelope<SessionEvent>({ data });
console.log(envelope);
/* => {
  sensor: 'http://example.org/sensors/1',
  sendTime: '2020-09-09T21:47:01.959Z',
  dataVersion: 'http://purl.imsglobal.org/ctx/caliper/v1p1',
  data: [
    {
      "@context": "http://purl.imsglobal.org/ctx/caliper/v1p1",
      "id": "urn:uuid:fcd495d0-3740-4298-9bec-1154571dc211",
      "type": "SessionEvent",
      ...
    }
  ]
}
*/
```

#### `Sensor.getClient(id: string): HttpClient`

Returns the `HttpClient` instance registered under the specified ID.

#### `Sensor.getClients(): HttpClient[]`

Returns an array containing all registered `HttpClient` instances.

#### `Sensor.getId(): string`

Returns the ID of the current `Sensor` instance.

#### `Sensor.registerClient(client: HttpClient): void`

Adds the specified `HttpClient` to the `Sensor` instance's collection of registered clients.

```ts
sensor.registerClient(httpClient('http://example.org/sensors/1/clients/2', 'https://example.edu/caliper/target/endpoint'));
```

#### `Sensor.sendToClient<TEnvelope, TResponse>(client: HttpClient | string, envelope: Envelope<T>): Promise<TResponse>`

Sends the specified `Envelope` via the specified `HttpClient`.
Returns `Promise<TResponse>` that resolves when the HTTP request has completed.

```ts
// Register HttpClient with Sensor
const client = httpClient('http://example.org/sensors/1/clients/2', 'https://example.edu/caliper/target/endpoint');
sensor.registerClient(client);

// Create Envelope
const envelope = sensor.createEnvelope<SessionEvent>({ data });

// Send via client by reference
sensor.sendToClient<SessionEvent, { success: boolean }>(client, envelope).then(response => {
	console.log(response);
	// => { success: true }
});

// Or send via client by ID
sensor.sendToClient<SessionEvent, { success: boolean }>('http://example.org/sensors/1/clients/2', envelope).then(response => {
	console.log(response);
	// => { success: true }
});
```

#### `Sensor.sendToClients<TEnvelope, TResponse>(envelope: Envelope<TEnvelope>): Promise<TResponse[]>`

Sends the specified `Envelope` via all registered `HttpClient` instances.
Returns `Promise<TResponse[]>` that resolves when all HTTP requests have completed.

```ts
// Register clients
const client1 = httpClient('http://example.org/sensors/1/clients/1', 'https://example.edu/caliper/target/endpoint1');
sensor.registerClient(client1);

const client2 = httpClient('http://example.org/sensors/1/clients/2', 'https://example.edu/caliper/target/endpoint2');
sensor.registerClient(client2);

// Create Envelope
const envelope = sensor.createEnvelope<SessionEvent>({ data });

// Sends posts envelope to both endpoints
sensor.sendToClients<SessionEvent, { success: boolean }>(envelope).then(response => {
	console.log(response);
	// => [{ success: true }, { success: true }]
});
```

#### `Sensor.unregisterClient(id: string): void`

Removes the `HttpClient` instance with the specified ID from the `Sensor` instance's collection of registered clients.

## Local development

This project was bootstrapped with [TSDX](https://tsdx.io/).

### Commands

TSDX scaffolds your new library inside `/src`.

To run TSDX, use:

```bash
yarn start
```

This builds to `/dist` and runs the project in watch mode so any edits you save inside `src` causes a rebuild to `/dist`.

To do a one-off build, use `yarn build`.

To run tests, use `yarn test`.

### Configuration

Code quality is set up for you with `prettier`, `husky`, and `lint-staged`.

#### Jest

Jest tests are set up to run with `yarn test`. You can generate a code coverage report with `yarn test:coverage`.

#### Rollup

TSDX uses [Rollup](https://rollupjs.org) as a bundler and generates multiple rollup configs for various module formats and build settings. See [Optimizations](#optimizations) for details.

#### TypeScript

`tsconfig.json` is set up to interpret `dom` and `esnext` types, as well as `react` for `jsx`. Adjust according to your needs.

### Optimizations

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

### Module formats

CJS, ESModules, and UMD module formats are supported.

The appropriate paths are configured in `package.json` and `dist/index.js` accordingly. Please report if any issues are found.

### Named exports

Per Palmer Group guidelines, [always use named exports.](https://github.com/palmerhq/typescript#exports) Code split inside your app instead of your library.
