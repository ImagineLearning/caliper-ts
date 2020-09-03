export enum JsonLdContextVersion {
	v1p0 = 'v1p0',
	v1p1 = 'v1p1',
	v1p1_feedback = 'v1p1_feedback',
	v1p1_resourceManagement = 'v1p1_resourceManagement',
	v1p1_search = 'v1p1_search',
	v1p1_survey = 'v1p1_survey',
	v1p1_toolLaunch = 'v1p1_toolLaunch',
	v1p1_toolUse = 'v1p1_toolUse',
	v1p2 = 'v1p2'
}

export interface Config {
	dataFormat: string;
	dataVersion: string;
	dateTimeFormat: string;
	jsonldContext: Record<JsonLdContextVersion, string>;
	testFixturesBaseDir?: Record<string, string>;
	uuidVersion: number;
}

export const DEFAULT_CONFIG: Config = {
	dataFormat: 'JSON-LD',
	dataVersion: 'http://purl.imsglobal.org/ctx/caliper/v1p1',
	dateTimeFormat: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
	jsonldContext: {
		v1p0: 'http://purl.imsglobal.org/ctx/caliper/v1/Context',
		v1p1: 'http://purl.imsglobal.org/ctx/caliper/v1p1',
		v1p1_feedback: 'http://purl.imsglobal.org/ctx/caliper/v1p1/FeedbackProfile-extension',
		v1p1_resourceManagement: 'http://purl.imsglobal.org/ctx/caliper/v1p1/ResourceManagementProfile-extension',
		v1p1_search: 'http://purl.imsglobal.org/ctx/caliper/v1p1/SearchProfile-extension',
		v1p1_survey: 'http://purl.imsglobal.org/ctx/caliper/v1p1/SurveyProfile-extension',
		v1p1_toolLaunch: 'http://purl.imsglobal.org/ctx/caliper/v1p1/ToolLaunchProfile-extension',
		v1p1_toolUse: 'http://purl.imsglobal.org/ctx/caliper/v1p1/ToolUseProfile-extension',
		v1p2: 'https://purl.imsglobal.org/caliper/v1p2/context/Core'
	},
	testFixturesBaseDir: {
		v1p0: '../caliper-spec/fixtures/v1p0/',
		v1p1: '../caliper-spec/fixtures/v1p1/',
		v1p2: '../caliper-spec/fixtures/v1p2/'
	},
	uuidVersion: 4
};
