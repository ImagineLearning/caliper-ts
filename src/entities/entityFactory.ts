import { DEFAULT_CONFIG } from '../config/config';
import { Entity } from './entity';

export function createEntity<T = Entity>(delegate: T) {
	return { '@context': DEFAULT_CONFIG.jsonldExternalCaliperContext, ...delegate } as T;
}
