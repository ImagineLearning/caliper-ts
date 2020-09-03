import { Entity } from '../entity';
import { Person } from '../agent/agent';
import { EntityType } from '../entityType';
import { DEFAULT_CONFIG } from '../../config/config';

export class Session extends Entity {
	user?: Person | string;
	startedAtTime?: string;
	endedAtTime?: string;
	duration?: number;

	constructor(session?: Partial<Session>) {
		super(session);
		this['@context'] = DEFAULT_CONFIG.jsonldContext.v1p1;
		this.type = EntityType.session;
		this.user = session?.user;
		this.startedAtTime = session?.startedAtTime;
		this.endedAtTime = session?.endedAtTime;
		this.duration = session?.duration;
	}
}
