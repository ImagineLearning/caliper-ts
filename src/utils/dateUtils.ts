import intervalToDuration from 'date-fns/intervalToDuration';
import formatISODuration from 'date-fns/formatISODuration';

export function getFormattedDateTime(date?: Date | number | string) {
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

export function getFormattedDuration(startedAtTime: Date | string, endedAtTime: Date | string) {
	const start = startedAtTime instanceof Date ? startedAtTime : new Date(Date.parse(startedAtTime));
	const end = endedAtTime instanceof Date ? endedAtTime : new Date(Date.parse(endedAtTime));

	const duration = intervalToDuration({ start, end });
	const isoDuration = formatISODuration(duration);

	return isoDuration;
}
