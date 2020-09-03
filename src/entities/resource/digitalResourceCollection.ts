import { DEFAULT_CONFIG } from '../../config/config';
import { EntityType } from '../entityType';
import { DigitalResource } from './digitalResource';

export class DigitalResourceCollection extends DigitalResource {
	items: DigitalResource[] | string[];

	constructor(delegate?: Partial<DigitalResourceCollection>) {
		super(delegate);
		this['@context'] = DEFAULT_CONFIG.jsonldContext.v1p1;
		this.type = EntityType.digitalResourceCollection;
		this.items = delegate?.items;
	}
}
