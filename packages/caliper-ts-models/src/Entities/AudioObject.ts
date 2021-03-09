/** This file was Autogenerated */

import { ISystemIdentifier } from '../SystemIdentifier';
import { IEntity } from './Entity';
import { EntityType } from './EntityType';
import { IMediaObject } from './MediaObject';

export interface IAudioObject extends IMediaObject {
	id: string;
	volumeMin?: string;
	volumeMax?: string;
	volumeLevel?: string;
	muted?: boolean;
}

export interface IAudioObjectParams {
	id: string;
	volumeMin?: string;
	volumeMax?: string;
	volumeLevel?: string;
	muted?: boolean;
	duration?: string;
	mediaType?: string;
	isPartOf?: IEntity;
	datePublished?: string;
	version?: string;
	name?: string;
	description?: string;
	dateCreated?: string;
	dateModified?: string;
	otherIdentifiers?: ISystemIdentifier[];
	extensions?: Record<string, any>;
}

export function AudioObject(params: IAudioObjectParams): IAudioObject {
	return {
		type: EntityType.AudioObject,
		learningObjectives: [],
		keywords: [],
		creators: [],
		...params,
	};
}