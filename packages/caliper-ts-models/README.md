# caliper-ts-models

The [Caliper Analytics&reg; Specification](https://www.imsglobal.org/caliper/v1p1/caliper-spec-v1p1) provides a structured approach to describing, collecting and exchanging learning activity data at scale.
Caliper also defines an application programming interface (the Sensor API™) for marshalling and transmitting event data from instrumented applications to target endpoints for storage, analysis and use.

_caliper-ts-models_ is a reference implementation of Caliper Entities and Events written in TypeScript, generated from the [.NET Caliper Sensor Library](https://github.com/edgenuity/caliper-net).

## Installation

The _caliper-ts-models_ package is available on [GitHub Package Registry](https://github.com/ImagineLearning/caliper-ts/packages).
To install it, you will need to configure your project by adding a `.npmrc` file to the project root with the following content:

```
@imaginelearning:registry=https://npm.pkg.github.com
```

You can then install it using npm or yarn.

```sh
npm install @imaginelearning/caliper-ts-models
```

Or

```sh
yarn add @imaginelearning/caliper-ts-models
```

## Usage

_caliper-ts-models_ provides a number of interfaces and factory functions to facilitate working with the Sensor API in a consistent way.

**NOTE:** To actually send Caliper Events you will need a Caliper Sensor, such as the one provided through the [_caliper-ts_ library](../caliper-ts/REAMDE.md).

### Basic example

Below is a basic example of creating an event using the factory functions.

```ts
// Set Event property values
// Note: only actor and object property assignments shown
const actor = Person({ id: 'https://example.edu/users/554433' });
const object = Assessment({
	id: 'https://example.edu/terms/201801/courses/7/sections/1/assess/1',
	dateToStartOn: getFormattedDateTime('2018-08-16T05:00:00.000Z'),
	dateToSubmit: getFormattedDateTime('2018-09-28T11:59:59.000Z'),
	maxAttempts: 1,
	maxScore: 25.0,
	// ... add additional optional property assignments
});

// ... Use the entity factories to mint additional entity values.
const membership = Membership({
	// ...
});
const session = Session({
	// ...
});

// Create Event
const event = AssessmentEvent({
	actor,
	action: Action.Started,
	object,
	membership,
	session,
});
```