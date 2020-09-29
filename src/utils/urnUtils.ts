import { v4 } from 'uuid';

export interface URN {
	nid: string | string[];
	nss: string | string[];
}

export function getFormattedUrn({ nid, nss }: URN) {
	return `urn:${Array.isArray(nid) ? nid.join(':') : nid}:${Array.isArray(nss) ? nss.join(':') : nss}`.toLowerCase();
}

export function getFormattedUrnUuid(uuid?: string) {
	if (uuid) {
		return `urn:uuid:${uuid}`.toLowerCase();
	}
	return `urn:uuid:${v4()}`.toLowerCase();
}
