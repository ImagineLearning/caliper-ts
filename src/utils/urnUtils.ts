import { v4 } from 'uuid';

export interface URN {
	nid: string;
	nss: string;
}

export function getFormattedUrn(urn: URN) {
	return `urn:${urn.nid}:${urn.nss}`.toLowerCase();
}

export function getFormattedUrnUuid(uuid?: string) {
	if (uuid) {
		return `urn:uuid:${uuid}`.toLowerCase();
	}
	return `urn:uuid:${v4()}`;
}
