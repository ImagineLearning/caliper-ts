export enum JsonLdContextVersion {
	None = 'none',
	V1P1 = 'v1p1',
	V2P2 = 'v1p2',
}

interface JsonLdContexts {
	default: string;
	feedback: string;
	resourceManagement: string;
	search: string;
	survey: string;
	toolLaunch: string;
	toolUse: string;
}

export interface Config {
	dataFormat: string;
	dataVersion: JsonLdContextVersion;
	dateTimeFormat: string;
	jsonldContext: Record<JsonLdContextVersion, JsonLdContexts | string | undefined>;
	uuidVersion: number;
}

export const DEFAULT_CONFIG: Config = {
	dataFormat: 'JSON-LD',
	dataVersion: JsonLdContextVersion.V1P1,
	dateTimeFormat: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
	jsonldContext: {
		[JsonLdContextVersion.None]: undefined,
		[JsonLdContextVersion.V1P1]: {
			default: 'http://purl.imsglobal.org/ctx/caliper/v1p1',
			feedback: 'http://purl.imsglobal.org/ctx/caliper/v1p1/FeedbackProfile-extension',
			resourceManagement:
				'http://purl.imsglobal.org/ctx/caliper/v1p1/ResourceManagementProfile-extension',
			search: 'http://purl.imsglobal.org/ctx/caliper/v1p1/SearchProfile-extension',
			survey: 'http://purl.imsglobal.org/ctx/caliper/v1p1/SurveyProfile-extension',
			toolLaunch: 'http://purl.imsglobal.org/ctx/caliper/v1p1/ToolLaunchProfile-extension',
			toolUse: 'http://purl.imsglobal.org/ctx/caliper/v1p1/ToolUseProfile-extension',
		},
		[JsonLdContextVersion.V2P2]: 'http://purl.imsglobal.org/ctx/caliper/v1p2',
	},
	uuidVersion: 4,
};

export function getJsonLdContext(
	config: Config,
	version: JsonLdContextVersion = DEFAULT_CONFIG.dataVersion,
	subVersion: keyof JsonLdContexts = 'default'
) {
	const context = config.jsonldContext[version];
	return typeof context === 'object' ? context[subVersion] : context;
}

export function compareJsonLdContextVersions(
	context1?: JsonLdContextVersion,
	context2?: JsonLdContextVersion
) {
	if (context1 === context2) {
		return 0;
	}
	if (
		!context1 ||
		context1 === JsonLdContextVersion.None ||
		(context1 === JsonLdContextVersion.V1P1 && context2 === JsonLdContextVersion.V2P2)
	) {
		return -1;
	}
	return 1;
}
