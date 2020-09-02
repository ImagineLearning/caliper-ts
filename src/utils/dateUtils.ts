export function getFormattedDateTime(date?: Date | number) {
	let dateObj: Date;
	if (!date) {
		dateObj = new Date(Date.now());
	} else if (date instanceof Date) {
		dateObj = date;
	} else {
		dateObj = new Date(date);
	}
	return dateObj.toISOString();
}
