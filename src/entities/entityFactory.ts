import { DEFAULT_CONFIG } from '../config/config';
import { Entity } from './entity';

export function createEntity(delegate: Entity) {
	return { '@context': DEFAULT_CONFIG.jsonldExternalCaliperContext, ...delegate } as Entity;
}
