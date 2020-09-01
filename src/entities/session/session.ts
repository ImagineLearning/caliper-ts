import { Entity } from '../entity';
import { Person } from '../agent/agent';

export type Session = {
	user?: Person | string;
	startedAtTime?: string;
	endedAtTime?: string;
	duration?: number;
} & Entity;
