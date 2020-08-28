export interface Config {
	dataFormat: string;
	dataVersion: string;
	dateTimeFormat: string;
	jsonldExternalCaliperContext: string;
	testFixturesBaseDir?: string;
	uuidVersion: number;
}

export const DEFAULT_CONFIG: Config = {
	dataFormat: 'JSON-LD',
	dataVersion: 'http://purl.imsglobal.org/ctx/caliper/v1p1',
	dateTimeFormat: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
	jsonldExternalCaliperContext: 'http://purl.imsglobal.org/ctx/caliper/v1p1',
	uuidVersion: 4
};
