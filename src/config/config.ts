export enum JsonLdContextVersion {
	none = 'none',
	v1p0 = 'v1p0',
	v1p1 = 'v1p1',
	v1p2 = 'v1p2'
}

type JsonLdContexts = {
	default: string;
	feedback: string;
	resourceManagement: string;
	search: string;
	survey: string;
	toolLaunch: string;
	toolUse: string;
};

export interface Config {
	dataFormat: string;
	dataVersion: string;
	dateTimeFormat: string;
	jsonldContext: Record<JsonLdContextVersion, JsonLdContexts | string | undefined>;
	testFixturesBaseDir?: Omit<Record<JsonLdContextVersion, string>, JsonLdContextVersion.none>;
	uuidVersion: number;
}

export const DEFAULT_CONFIG: Config = {
	dataFormat: 'JSON-LD',
	dataVersion: 'http://purl.imsglobal.org/ctx/caliper/v1p1',
	dateTimeFormat: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
	jsonldContext: {
		[JsonLdContextVersion.none]: undefined,
		[JsonLdContextVersion.v1p0]: 'http://purl.imsglobal.org/ctx/caliper/v1/Context',
		[JsonLdContextVersion.v1p1]: {
			default: 'http://purl.imsglobal.org/ctx/caliper/v1p1',
			feedback: 'http://purl.imsglobal.org/ctx/caliper/v1p1/FeedbackProfile-extension',
			resourceManagement: 'http://purl.imsglobal.org/ctx/caliper/v1p1/ResourceManagementProfile-extension',
			search: 'http://purl.imsglobal.org/ctx/caliper/v1p1/SearchProfile-extension',
			survey: 'http://purl.imsglobal.org/ctx/caliper/v1p1/SurveyProfile-extension',
			toolLaunch: 'http://purl.imsglobal.org/ctx/caliper/v1p1/ToolLaunchProfile-extension',
			toolUse: 'http://purl.imsglobal.org/ctx/caliper/v1p1/ToolUseProfile-extension'
		},
		[JsonLdContextVersion.v1p2]: 'https://purl.imsglobal.org/caliper/v1p2/context/Core'
	},
	testFixturesBaseDir: {
		v1p0: '../caliper-spec/fixtures/v1p0/',
		v1p1: '../caliper-spec/fixtures/v1p1/',
		v1p2: '../caliper-spec/fixtures/v1p2/'
	},
	uuidVersion: 4
};

export function getJsonLdContext(config: Config, version: JsonLdContextVersion, subVersion: keyof JsonLdContexts = 'default') {
	const context = config.jsonldContext[version];
	return typeof context === 'object' ? context[subVersion] : context;
}
