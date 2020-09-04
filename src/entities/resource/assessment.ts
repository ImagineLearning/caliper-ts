// import { EntityType } from '../entityType';
import { JsonLdContextVersion, DEFAULT_CONFIG } from '../../config/config';
import { DigitalResourceCollection } from './digitalResourceCollection';
import { AssignableDigitalResource } from './assignableDigitalResource';
import { Entity } from '../entity';
import { EntityType } from '../entityType';

export type Assessment = {} & Entity & DigitalResourceCollection & AssignableDigitalResource;

export function createAssessment(
	delegate: Partial<Assessment>,
	contextVersion: JsonLdContextVersion = JsonLdContextVersion.v1p1
): Assessment {
	return {
		...delegate,
		'@context': DEFAULT_CONFIG.jsonldContext[contextVersion],
		type: EntityType.assessment
	} as Assessment;
}
