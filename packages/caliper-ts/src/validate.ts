import { validate as validateSchema } from 'jsonschema';
import { IEvent, schemas } from '@imaginelearning/caliper-ts-models';

function getSchema<T extends IEvent>(event: T) {
	const [context] = event['@context'];
	return schemas[context];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validate<T extends IEvent>(event: T, schema?: Record<string, any>) {
	const { errors, valid } = validateSchema(event, schema ?? getSchema(event));
	if (!valid) {
		throw errors.map((error) => error.stack);
	}
}
