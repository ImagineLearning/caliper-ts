import { Envelope } from '../envelope';

export interface Client {
	getId(): string;
	send<TEnvelope, TResponse>(envelope: Envelope<TEnvelope>): Promise<TResponse>;
}
