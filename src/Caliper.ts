import { v4 } from 'uuid';
import intervalToDuration from 'date-fns/intervalToDuration';
import formatISODuration from 'date-fns/formatISODuration';
import { Validator } from 'jsonschema';

import { schemas, EntityType, IEvent, ISoftwareApplication } from './';

interface CaliperSettings {
	applicationUri: string | null;
	isValidationEnabled: boolean;
}

type CaliperTimestamp = string;
type CaliperDuration = string;

export const settings: CaliperSettings = {
	applicationUri: null,
	isValidationEnabled: true
};

export function guid() {
	return `urn:uuid:${v4()}`;
}

export function edApp(): ISoftwareApplication {
	if (!settings.applicationUri) {
		return null as any;
	}

	return {
		id: settings.applicationUri,
		type: EntityType.SoftwareApplication
	};
}

export function timestamp(date?: Date | number | string): CaliperTimestamp {
	let dateObj: Date;
	if (!date) {
		dateObj = new Date(Date.now());
	} else if (date instanceof Date) {
		dateObj = date;
	} else if (typeof date === 'string') {
		dateObj = new Date(Date.parse(date));
	} else {
		dateObj = new Date(date);
	}
	return dateObj.toISOString();
}

export function duration(startedAtTime: Date | string, endedAtTime: Date | string): CaliperDuration {
	const start = startedAtTime instanceof Date ? startedAtTime : new Date(Date.parse(startedAtTime));
	const end = endedAtTime instanceof Date ? endedAtTime : new Date(Date.parse(endedAtTime));

	const duration = intervalToDuration({ start, end });
	const isoDuration = formatISODuration(duration);

	return isoDuration;
}

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

export default { settings, guid, edApp, timestamp, duration, getSchema, validate };

const validator = new Validator();
