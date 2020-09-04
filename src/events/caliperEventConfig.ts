import { DEFAULT_CONFIG, getJsonLdContext, JsonLdContextVersion } from '../config/config';
import { CaliperEventType } from './caliperEventType';

export interface CaliperEventConfig {
	context?: string;
	term: string;
	iri: string;
}

export const CALIPER_EVENT_CONFIG_MAP: Record<CaliperEventType, CaliperEventConfig> = {
	[CaliperEventType.annotation]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'AnnotationEvent',
		iri: 'http://purl.imsglobal.org/caliper/AnnotationEvent'
	},
	[CaliperEventType.assessment]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'AssessmentEvent',
		iri: 'http://purl.imsglobal.org/caliper/AssessmentEvent'
	},
	[CaliperEventType.assessmentItem]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'AssessmentItemEvent',
		iri: 'http://purl.imsglobal.org/caliper/AssessmentItemEvent'
	},
	[CaliperEventType.assignable]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'AssignableEvent',
		iri: 'http://purl.imsglobal.org/caliper/AssignableEvent'
	},
	[CaliperEventType.event]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'Event',
		iri: 'http://purl.imsglobal.org/caliper/Event'
	},
	[CaliperEventType.forum]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'ForumEvent',
		iri: 'http://purl.imsglobal.org/caliper/ForumEvent'
	},
	[CaliperEventType.grade]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'GradeEvent',
		iri: 'http://purl.imsglobal.org/caliper/GradeEvent'
	},
	[CaliperEventType.media]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'MediaEvent',
		iri: 'http://purl.imsglobal.org/caliper/MediaEvent'
	},
	[CaliperEventType.message]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'MessageEvent',
		iri: 'http://purl.imsglobal.org/caliper/MessageEvent'
	},
	[CaliperEventType.navigation]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'NavigationEvent',
		iri: 'http://purl.imsglobal.org/caliper/NavigationEvent'
	},
	[CaliperEventType.session]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'SessionEvent',
		iri: 'http://purl.imsglobal.org/caliper/SessionEvent'
	},
	[CaliperEventType.thread]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'ThreadEvent',
		iri: 'http://purl.imsglobal.org/caliper/ThreadEvent'
	},
	[CaliperEventType.toolUse]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'ToolUseEvent',
		iri: 'http://purl.imsglobal.org/caliper/ToolUseEvent'
	},
	[CaliperEventType.view]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'ViewEvent',
		iri: 'http://purl.imsglobal.org/caliper/ViewEvent'
	}

	// assessment,
	// assessmentItem,
	// assignable,
	// event,
	// forum,
	// grade,
	// media,
	// message,
	// navigation,
	// session,
	// thread,
	// toolUse,
	// view
};
