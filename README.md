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
Below is a basic example of configuring a sensor and sending an event, as well as more in-depth documentation of the various classes, factories, and utility functions.

### Basic example

```ts
// Initialize Caliper sensor
const sensor = new Sensor('http://example.org/sensors/1');

// Initialize and register client
const client = httpClient(
	'http://example.org/sensors/1/clients/2',
	'https://example.edu/caliper/target/endpoint',
	'40dI6P62Q_qrWxpTk95z8w'
);
sensor.registerClient(client);

// Set Event property values
// Note: only actor and object property assignments shown
const actor = createPerson({ id: 'https://example.edu/users/554433' });
const object = createAssessment({
	id: 'https://example.edu/terms/201801/courses/7/sections/1/assess/1',
	dateToStartOn: getFormattedDateTime('2018-08-16T05:00:00.000Z'),
	dateToSubmit: getFormattedDateTime('2018-09-28T11:59:59.000Z'),
	maxAttempts: 1,
	maxScore: 25.0
	// ... add additional optional property assignments
});

// ... Use the entity factories to mint additional entity values.
const edApp = createSoftwareApplication({
	// ...
});
const membership = createMembership({
	// ...
});
const session = createSession({
	// ...
});

// Create Event
const event = createAssessmentEvent({
	id: getFormattedUrnUuid(),
	actor,
	action: Action.Started,
	object,
	eventTime: getFormattedDateTime(),
	edApp,
	membership,
	session
});

// ... Create additional events and/or entity describes.

// Create envelope with data payload
const envelope = sensor.createEnvelope({
	data: [
		event
		// ... add additional events and/or entity describes
	]
});

// Delegate transmission responsibilities to client
sensor.sendToClient(client, envelope);
```

### `Sensor` class

The `Sensor` class manages clients for interacting with a Sensor API,
as well as providing a helper function for creating properly formatted `Envelope` objects for transmitting Caliper events.

#### Constructor: `new Sensor(id: string, clients?: Record<string, Client>)`

Creates a new instance of a `Sensor` with the specified ID.
Optionally takes a `Record` of objects that implement the `Client` interface, as an alternative to using the `Sensor.registerClient` function.

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

#### `Sensor.getClient(id: string): Client`

Returns the `Client` instance registered under the specified ID.

#### `Sensor.getClients(): Client[]`

Returns an array containing all registered `Client` instances.

#### `Sensor.getId(): string`

Returns the ID of the current `Sensor` instance.

#### `Sensor.registerClient(client: Client): void`

Adds the specified `Client` to the `Sensor` instance's collection of registered clients.

```ts
sensor.registerClient(httpClient('http://example.org/sensors/1/clients/2', 'https://example.edu/caliper/target/endpoint'));
```

#### `Sensor.sendToClient<TEnvelope, TResponse>(client: Client | string, envelope: Envelope<T>): Promise<TResponse>`

Sends the specified `Envelope` via the specified `Client`.
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

Removes the `Client` instance with the specified ID from the `Sensor` instance's collection of registered clients.

### `Client` interface

The `Client` interface defines the required functionality for posting HTTP requests to a Sensor API.
Any object that implements the `Client` interface can be registered with the `Sensor` as a client.
For convenience, _caliper-ts_ includes an [`HttpClient` class](#httpclient-class) which implements the `Client` interface using the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).
However, using the `Client` interface you can implement your own client using your preferred method for making HTTP requests.

The `Client` interface requires the following functions in the implementing class:

-   `getId(): string`: Returns the ID of the client.
-   `send<TEnvelope, TResponse>(envelope: Envelope<TEnvelope>): Promise<TResponse>`: Makes a POST request to a Sensor API endpoint with the specified `Envelope` as the payload. Returns a promise that resolves with the response from the endpoint. This function should also ensure that the appropriate authorization header is included with the request.

### `HttpClient` class

The `HttpClient` is a complete implementation of the `Client` interface using the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).
Depending on what browsers you need to support for your application, you may need to include an appropriate polyfill, such as [_whatwg-fetch_](https://github.com/github/fetch).
Each `HttpClient` is configured for a single endpoint, but multiple clients can be registered with a single sensor.

#### `httpClient(id: string, uri: string, token?: string): HttpClient`

This factory function returns a new instance of the `HttpClient` class, configured with the specified ID, URI, and optional access token.

```ts
// Create HttpClient that will post to https://example.edu/caliper/target/endpoint
// and include the header `Authorization: Bearer 40dI6P62Q_qrWxpTk95z8w`
const client = httpClient(
	'http://example.org/sensors/1/clients/2',
	'https://example.edu/caliper/target/endpoint',
	'40dI6P62Q_qrWxpTk95z8w'
);
```

#### `HttpClient.bearer(token?: string): HttpClient`

Returns a new instance of `HttpClient` configured to include the specified bearer token in the `Authorization` header for any request sent with the `send` function.

```ts
// Create HttpClient that will post to https://example.edu/caliper/target/endpoint
// and configure to include the header `Authorization: Bearer 40dI6P62Q_qrWxpTk95z8w`
const client = httpClient('http://example.org/sensors/1/clients/2', 'https://example.edu/caliper/target/endpoint').bearer(
	'40dI6P62Q_qrWxpTk95z8w'
);
```

#### `HttpClient.getId(): string`

Returns the ID of the client.

```ts
const client = httpClient('http://example.org/sensors/1/clients/2', 'https://example.edu/caliper/target/endpoint');
const id = client.getId();
console.log(id);
// => "http://example.org/sensors/1/clients/2"
```

#### `HttpClient.send<TEnvelope, TResponse>(envelope: TEnvelope): Promise<TResponse>`

Makes a POST request to the configured Sensor API endpoint with the specified `Envelope` as the payload.
It includes the `Authorization` header in the request if the client has been configured with a bearer token.
Returns a promise that resolves with the parsed JSON response.

```ts
const envelope = sensor.createEnvelope<SessionEvent>({ data });
const client = httpClient('http://example.org/sensors/1/clients/2', 'https://example.edu/caliper/target/endpoint2');

client.send<Envelope<SessionEvent>, { success: boolean }>(envelope).then(result => {
	console.log(result);
	// => { "success": true }
});
```

_Note: The `send` function is called by the `Sensor` via the `sendToClient` and `sendToClients` functions. You would not invoke the `send` function directly in a typical application._

### Entity factory functions

Caliper entities can be created through factory functions.
Each factory function takes two parameters: 1) a delegate, which is an object defining values for properties to be set in the entity (see the [Entity Subtypes section of the Caliper Spec](https://www.imsglobal.org/sites/default/files/caliper/v1p1/caliper-spec-v1p1/caliper-spec-v1p1.html#entities)), and 2) an optional `JsonLdContextVersion` to use for constructing the entity object.

The following entity factory functions are available through the _caliper-ts_ library:

-   `createAssessment`
-   `createAssessmentItem`
-   `createAssignableDigitalResource`
-   `createAttempt`
-   `createCourseOffering`
-   `createCourseSection`
-   `createDigitalResource`
-   `createDigitalResourceCollection`
-   `createFillinBlankResponse`
-   `createLearningObjective`
-   `createLtiSession`
-   `createMembership`
-   `createMultipleChoiceResponse`
-   `createMultipleResponseResponse`
-   `createOrganization`
-   `createPerson`
-   `createResponse`
-   `createSelectTextResponse`
-   `createSession`
-   `createSoftwareApplication`
-   `createSystemIdentifier`
-   `createTrueFalseResponse`

```ts
const assessment = createAssessment({
	dateCreated: '2016-08-01T06:00:00.000Z',
	dateModified: '2016-09-02T11:30:00.000Z',
	datePublished: '2016-08-15T09:30:00.000Z',
	dateToActivate: '2016-08-16T05:00:00.000Z',
	dateToShow: '2016-08-16T05:00:00.000Z',
	dateToStartOn: '2016-08-16T05:00:00.000Z',
	dateToSubmit: '2016-09-28T11:59:59.000Z',
	id: 'https://example.edu/terms/201601/courses/7/sections/1/assess/1',
	items: [
		createAssessmentItem({ id: 'https://example.edu/terms/201601/courses/7/sections/1/assess/1/items/1' }),
		createAssessmentItem({ id: 'https://example.edu/terms/201601/courses/7/sections/1/assess/1/items/2' }),
		createAssessmentItem({ id: 'https://example.edu/terms/201601/courses/7/sections/1/assess/1/items/3' })
	],
	maxAttempts: 2,
	maxScore: 15,
	maxSubmits: 2,
	name: 'Quiz One',
	version: '1.0'
});
console.log(assessment);
/* => {
  "@context": "http://purl.imsglobal.org/ctx/caliper/v1p1",
  "id": "https://example.edu/terms/201601/courses/7/sections/1/assess/1",
  "type": "Assessment",
  "name": "Quiz One",
  "items": [
    {
      "id": "https://example.edu/terms/201601/courses/7/sections/1/assess/1/items/1",
      "type": "AssessmentItem"
    },
    {
      "id": "https://example.edu/terms/201601/courses/7/sections/1/assess/1/items/2",
      "type": "AssessmentItem"
    },
    {
      "id": "https://example.edu/terms/201601/courses/7/sections/1/assess/1/items/3",
      "type": "AssessmentItem"
    }
  ],
  "dateCreated": "2016-08-01T06:00:00.000Z",
  "dateModified": "2016-09-02T11:30:00.000Z",
  "datePublished": "2016-08-15T09:30:00.000Z",
  "dateToActivate": "2016-08-16T05:00:00.000Z",
  "dateToShow": "2016-08-16T05:00:00.000Z",
  "dateToStartOn": "2016-08-16T05:00:00.000Z",
  "dateToSubmit": "2016-09-28T11:59:59.000Z",
  "maxAttempts": 2,
  "maxScore": 15.0,
  "maxSubmits": 2,
  "version": "1.0"
}
*/
```

### Event factory functions

Caliper events can be created through factory functions.
Each factory function takes two parameters: 1) a delegate, which is an object defining values for properties to be set in the event (see the [Event Subtypes section of the Caliper Spec](https://www.imsglobal.org/sites/default/files/caliper/v1p1/caliper-spec-v1p1/caliper-spec-v1p1.html#events)), and 2) an optional `JsonLdContextVersion` to use for constructing the entity object.

The following event factory functions are available through the _caliper-ts_ library:

-   `createAssessmentEvent`
-   `createAssessmentItemEvent`
-   `createSessionEvent`

```ts
const sessionEvent = createSessionEvent({
	id: 'urn:uuid:fcd495d0-3740-4298-9bec-1154571dc211',
	action: Action.LoggedIn,
	actor: createPerson({ id: 'https://example.edu/users/554433' }),
	object: createSoftwareApplication({ id: 'https://example.edu', version: 'v2' }, JsonLdContextVersion.none),
	edApp: 'https://example.edu',
	eventTime: '2016-11-15T10:15:00.000Z',
	session: createSession(
		{
			dateCreated: '2016-11-15T10:00:00.000Z',
			id: 'https://example.edu/sessions/1f6442a482de72ea6ad134943812bff564a76259',
			startedAtTime: '2016-11-15T10:00:00.000Z',
			user: 'https://example.edu/users/554433'
		},
		JsonLdContextVersion.none
	)
});
console.log(sessionEvent);
/* => {
  "@context": "http://purl.imsglobal.org/ctx/caliper/v1p1",
  "id": "urn:uuid:fcd495d0-3740-4298-9bec-1154571dc211",
  "type": "SessionEvent",
  "actor": {
    "id": "https://example.edu/users/554433",
    "type": "Person"
  },
  "action": "LoggedIn",
  "object": {
    "id": "https://example.edu",
    "type": "SoftwareApplication",
    "version": "v2"
  },
  "eventTime": "2016-11-15T10:15:00.000Z",
  "edApp": "https://example.edu",
  "session": {
    "id": "https://example.edu/sessions/1f6442a482de72ea6ad134943812bff564a76259",
    "type": "Session",
    "user": "https://example.edu/users/554433",
    "dateCreated": "2016-11-15T10:00:00.000Z",
    "startedAtTime": "2016-11-15T10:00:00.000Z"
  }
}
*/
```

### Utility functions

There are a handful of utility functions provided for convenience in properly formatting dates and IDs.

#### `getFormattedDateTime(date?: Date | number | string): string`

Takes an optional `Date` object, number (Unix timestamp), or string and returns a properly formatted ISO-8601 date and time string.
If no parameter is specified, it uses the current date and time.

```ts
const date = getFormattedDateTime('9/2/2020, 6:00:00 AM');
console.log(date);
// => "2020-09-02T12:00:00.000Z"
```

#### `getFormattedDuration(startedAtTime: Date | string, endedAtTime: Date | string): string`

Takes start and end `Date` objects or strings, calculates the duration between the specified dates, and returns a properly formatted ISO-8601 duration string.

```ts
const duration = getFormattedDuration('1969-07-20T02:56:00+0000', '1969-07-21T17:54:00+0000');
console.log(duration);
// => "P0Y0M1DT14H58M0S"
```

#### `getFormattedUrn(urn: URN): string`

Takes a `URN` object which consists of a namespace ID (`nid`) and namespace-specific string (`nss`) and formats it as a [URN](https://www.imsglobal.org/sites/default/files/caliper/v1p1/caliper-spec-v1p1/caliper-spec-v1p1.html#urnDef) string.

```ts
const urn = getFormattedUrn({ nid: 'WNE', nss: 'GUID_OF_AWESOMENESS' });
console.log(urn);
// => "urn:wne:guid_of_awesomeness"
```

#### `getFormattedUrnUuid(uuid?: string): string`

Takes an optional UUID and formats it as a URN according to [RFC-4122](https://tools.ietf.org/html/rfc4122). If no UUID is provided, a v4 UUID will be generated with [_uuid_](https://github.com/uuidjs/uuid).

```ts
const urn = getFormattedUrnUuid('ff9ec22a-fc59-4ae1-ae8d-2c9463ee2f8f');
console.log(urn);
// => "urn:uuid:ff9ec22a-fc59-4ae1-ae8d-2c9463ee2f8f"
```

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

---

---

## Code Generation

The **code-generator** C# project included in this repo is used to generate typescript definitions for events and entities using the .NET Caliper Sensor Library.

A **generate-caliper.ps1** script file is also included to execute the code-generator project. Before running this script file, it is recommended to first update the nuget package for the .NET caliper sensor library.

**NOTE**: executing the above script will require an active feed from MyGet. This can be accomplished by executing the below command (**replace MY_PREAUTHORIZED_KEY with your actual account key from MyGet**).

```sh
dotnet nuget add source https://edgedev.myget.org/F/edgenuity/auth/MY_PREAUTHORIZED_KEY/api/v3/index.json -n edgenuity
```
