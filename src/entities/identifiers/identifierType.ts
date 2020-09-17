export enum IdentifierType {
	AccountUserName = 'AccountUserName',
	EmailAddress = 'EmailAddress',
	LisSourcedId = 'LisSourcedId',
	LtiContextId = 'LtiContextId',
	LtiDeploymentId = 'LtiDeploymentId',
	LtiPlatformId = 'LtiPlatformId',
	LtiToolId = 'LtiToolId',
	LtiUserId = 'LtiUserId',
	OneRosterSourcedId = 'OneRosterSourcedId',
	Other = 'Other',
	SisSourcedId = 'SisSourcedId',
	SystemId = 'SystemId'
}

export function getIdentifierTypeIri(type: IdentifierType) {
	return `http://purl.imsglobal.org/vocab/systemIdentifiers/${type}`;
}
