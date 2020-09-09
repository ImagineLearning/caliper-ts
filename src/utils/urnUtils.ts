export interface URN {
	nid: string;
	nss: string;
}

export function getFormattedUrn(urn: URN) {
	return `urn:${urn.nid}:${urn.nss}`.toLowerCase();
}

export function getFormattedUrnUUID(uuid: string) {
	return `urn:uuid:${uuid}`.toLowerCase();
}
