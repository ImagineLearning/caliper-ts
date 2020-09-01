import { CaliperEventType } from './caliperEventType';
import { DEFAULT_CONFIG } from '../config/config';

export interface CaliperEventConfig {
	context: string;
	term: string;
	iri: string;
}

export const CALIPER_EVENT_CONFIG_MAP: Record<CaliperEventType, CaliperEventConfig> = {
	[CaliperEventType.annotation]: {
		context: DEFAULT_CONFIG.jsonldExternalCaliperContext,
		term: 'AnnotationEvent',
		iri: 'http://purl.imsglobal.org/caliper/AnnotationEvent'
	},
	[CaliperEventType.assessment]: {
		context: DEFAULT_CONFIG.jsonldExternalCaliperContext,
		term: 'AssessmentEvent',
		iri: 'http://purl.imsglobal.org/caliper/AssessmentEvent'
	},
	[CaliperEventType.assessmentItem]: {
		context: DEFAULT_CONFIG.jsonldExternalCaliperContext,
		term: 'AssessmentItemEvent',
		iri: 'http://purl.imsglobal.org/caliper/AssessmentItemEvent'
	},
	[CaliperEventType.assignable]: {
		context: DEFAULT_CONFIG.jsonldExternalCaliperContext,
		term: 'AssignableEvent',
		iri: 'http://purl.imsglobal.org/caliper/AssignableEvent'
	},
	[CaliperEventType.event]: {
		context: DEFAULT_CONFIG.jsonldExternalCaliperContext,
		term: 'Event',
		iri: 'http://purl.imsglobal.org/caliper/Event'
	},
	[CaliperEventType.forum]: {
		context: DEFAULT_CONFIG.jsonldExternalCaliperContext,
		term: 'ForumEvent',
		iri: 'http://purl.imsglobal.org/caliper/ForumEvent'
	},
	[CaliperEventType.grade]: {
		context: DEFAULT_CONFIG.jsonldExternalCaliperContext,
		term: 'GradeEvent',
		iri: 'http://purl.imsglobal.org/caliper/GradeEvent'
	},
	[CaliperEventType.media]: {
		context: DEFAULT_CONFIG.jsonldExternalCaliperContext,
		term: 'MediaEvent',
		iri: 'http://purl.imsglobal.org/caliper/MediaEvent'
	},
	[CaliperEventType.message]: {
		context: DEFAULT_CONFIG.jsonldExternalCaliperContext,
		term: 'MessageEvent',
		iri: 'http://purl.imsglobal.org/caliper/MessageEvent'
	},
	[CaliperEventType.navigation]: {
		context: DEFAULT_CONFIG.jsonldExternalCaliperContext,
		term: 'NavigationEvent',
		iri: 'http://purl.imsglobal.org/caliper/NavigationEvent'
	},
	[CaliperEventType.session]: {
		context: DEFAULT_CONFIG.jsonldExternalCaliperContext,
		term: 'SessionEvent',
		iri: 'http://purl.imsglobal.org/caliper/SessionEvent'
	},
	[CaliperEventType.thread]: {
		context: DEFAULT_CONFIG.jsonldExternalCaliperContext,
		term: 'ThreadEvent',
		iri: 'http://purl.imsglobal.org/caliper/ThreadEvent'
	},
	[CaliperEventType.toolUse]: {
		context: DEFAULT_CONFIG.jsonldExternalCaliperContext,
		term: 'ToolUseEvent',
		iri: 'http://purl.imsglobal.org/caliper/ToolUseEvent'
	},
	[CaliperEventType.view]: {
		context: DEFAULT_CONFIG.jsonldExternalCaliperContext,
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
