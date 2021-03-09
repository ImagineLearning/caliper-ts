import { validate as validateSchema } from 'jsonschema';
import { IEvent } from './Events/Event';
import { schemas } from './schemas';

export function getSchema(event: IEvent) {
	const [context] = event['@context'];
	return schemas[context];
}

export function validate(event: IEvent, schema?: Record<string, any>) {
	const { errors, valid } = validateSchema(event, schema ?? getSchema(event));
	if (!valid) {
		throw errors.map((error) => error.stack);
	}
}
