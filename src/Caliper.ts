import { v4 } from 'uuid';
import intervalToDuration from 'date-fns/intervalToDuration';
import formatISODuration from 'date-fns/formatISODuration';

import { ISoftwareApplication } from './Entities/SoftwareApplication';
import { EntityType } from './Entities/EntityType';

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

export default { settings, guid, edApp, timestamp, duration };
