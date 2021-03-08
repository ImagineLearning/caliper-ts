import formatISODuration from 'date-fns/formatISODuration';
import intervalToDuration from 'date-fns/intervalToDuration';
import { v4 } from 'uuid';
import { EntityType } from './Entities/EntityType';
import { ISoftwareApplication } from './Entities/SoftwareApplication';

interface CaliperSettings {
	applicationUri: string | null;
	isValidationEnabled: boolean;
}

type CaliperTimestamp = string;
type CaliperDuration = string;

const settings: CaliperSettings = {
	applicationUri: null,
	isValidationEnabled: true,
};

function guid() {
	return `urn:uuid:${v4()}`;
}

function edApp() {
	if (!settings.applicationUri) {
		return null;
	}

	return {
		id: settings.applicationUri,
		type: EntityType.SoftwareApplication,
	} as ISoftwareApplication;
}

function timestamp(date?: Date | number | string): CaliperTimestamp {
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

function duration(startedAtTime: Date | string, endedAtTime: Date | string): CaliperDuration {
	const start = startedAtTime instanceof Date ? startedAtTime : new Date(Date.parse(startedAtTime));
	const end = endedAtTime instanceof Date ? endedAtTime : new Date(Date.parse(endedAtTime));

	return formatISODuration(intervalToDuration({ start, end }));
}

export default { settings, guid, edApp, timestamp, duration };
