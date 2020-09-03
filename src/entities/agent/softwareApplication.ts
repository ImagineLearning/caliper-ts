import { Entity } from '../entity';

export class SoftwareApplication extends Entity {
	version?: string;

	constructor(delegate: Partial<SoftwareApplication>) {
		super(delegate);
		this.version = delegate?.version;
	}
}
