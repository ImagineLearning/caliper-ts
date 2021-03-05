import { Validator } from 'jsonschema';

import { IEvent } from './Events/Event';
import { schemas } from './schemas';

export function getSchema(event: IEvent) {
	return schemas[event['@context'][0]];
}

export function validate(event: IEvent, schema?: { [key: string]: any }) {
	if (!schema) {
		schema = getSchema(event);
	}

	const result = validator.validate(event, schema);
	if (!result.valid) {
		throw result.errors.map(error => error.stack);
	}
}

const validator = new Validator();
