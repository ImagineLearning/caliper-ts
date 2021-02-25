import Caliper from './../../Caliper';
import { IAgent } from './../../Entities/Agent';
import { IClass } from './../../Entities/Class';
import { IEntity } from './../../Entities/Entity';
import { EntityType } from './../../Entities/EntityType';
import { IGroup } from './../../Entities/Group';
import { IInstructor } from './../../Entities/Instructor';
import { InstructorPermissions } from './../../Entities/InstructorPermissions';
import { ILtiSession } from './../../Entities/LtiSession';
import { IMembership } from './../../Entities/Membership';
import { IOrganization } from './../../Entities/Organization';
import { Role } from './../../Entities/Role';
import { ISchool } from './../../Entities/School';
import { ISession } from './../../Entities/Session';
import { ISoftwareApplication } from './../../Entities/SoftwareApplication';
import { Status } from './../../Entities/Status';
import { IStudent } from './../../Entities/Student';
import { StudentProfileSettings } from './../../Entities/StudentProfileSettings';
import { IUser } from './../../Entities/User';
import { ISystemIdentifier } from './../../SystemIdentifier';
import { CaliperAction } from './../CaliperAction';
import { CaliperProfile } from './../CaliperProfile';
import { IEvent } from './../Event';
import { EventType } from './../EventType';

export interface IGroupEvent extends IEvent {
	actor: IAgent | ISoftwareApplication | IUser | IInstructor | IStudent;
	object: IGroupEventGroup | IGroupEventClass;
	action: CaliperAction;
}

export interface IGroupEventGroup extends IGroup {
	id: string;
	dateCreated: string;
	dateModified: string;
	status: Status;
	name: string;
	subjects: string[];
	members: IGroupEventUser[] | IGroupEventInstructor[] | IGroupEventStudent[];
	subOrganizationOf: IOrganization | ISchool | IGroup | IClass;
	otherIdentifiers: ISystemIdentifier[];
}

interface IGroupEventGroupParams {
	id: string;
	dateCreated: string;
	dateModified: string;
	status: Status;
	name: string;
	subjects: string[];
	members: IGroupEventUser[] | IGroupEventInstructor[] | IGroupEventStudent[];
	subOrganizationOf: IOrganization | ISchool | IGroup | IClass;
	otherIdentifiers: ISystemIdentifier[];
	description?: string;
	extensions?: Record<string, any>;
}

export function GroupEvent_Group(params: IGroupEventGroupParams): IGroupEventGroup {
	return {
		type: EntityType.Group,
		...params
	};
}

export interface IGroupEventUser extends IUser {
	id: string;
	roles: Role[];
}

interface IGroupEventUserParams {
	id: string;
	roles: Role[];
	status?: Status;
	organizations?: IOrganization[];
	name?: string;
	firstName?: string;
	lastName?: string;
	description?: string;
	dateCreated?: string;
	dateModified?: string;
	otherIdentifiers?: ISystemIdentifier[];
	extensions?: Record<string, any>;
}

export function GroupEvent_User(params: IGroupEventUserParams): IGroupEventUser {
	return {
		type: EntityType.Person,
		...params
	};
}

export interface IGroupEventInstructor extends IGroupEventUser {
	id: string;
	roles: Role[];
	permissions?: InstructorPermissions;
}

interface IGroupEventInstructorParams {
	id: string;
	roles: Role[];
	permissions?: InstructorPermissions;
	status?: Status;
	organizations?: IOrganization[];
	name?: string;
	firstName?: string;
	lastName?: string;
	description?: string;
	dateCreated?: string;
	dateModified?: string;
	otherIdentifiers?: ISystemIdentifier[];
	extensions?: Record<string, any>;
}

export function GroupEvent_Instructor(params: IGroupEventInstructorParams): IGroupEventInstructor {
	return {
		type: EntityType.Instructor,
		...params
	};
}

export interface IGroupEventStudent extends IGroupEventUser {
	id: string;
	roles: Role[];
	gradeLevel?: number;
	settings?: StudentProfileSettings;
}

interface IGroupEventStudentParams {
	id: string;
	roles: Role[];
	gradeLevel?: number;
	settings?: StudentProfileSettings;
	status?: Status;
	organizations?: IOrganization[];
	name?: string;
	firstName?: string;
	lastName?: string;
	description?: string;
	dateCreated?: string;
	dateModified?: string;
	otherIdentifiers?: ISystemIdentifier[];
	extensions?: Record<string, any>;
}

export function GroupEvent_Student(params: IGroupEventStudentParams): IGroupEventStudent {
	return {
		type: EntityType.Student,
		...params
	};
}

export interface IGroupEventClass extends IGroupEventGroup {
	id: string;
	dateCreated: string;
	dateModified: string;
	status: Status;
	name: string;
	subjects: string[];
	members: IGroupEventUser[] | IGroupEventInstructor[] | IGroupEventStudent[];
	subOrganizationOf: IOrganization | ISchool | IGroup | IClass;
	otherIdentifiers: ISystemIdentifier[];
}

interface IGroupEventClassParams {
	id: string;
	dateCreated: string;
	dateModified: string;
	status: Status;
	name: string;
	subjects: string[];
	members: IGroupEventUser[] | IGroupEventInstructor[] | IGroupEventStudent[];
	subOrganizationOf: IOrganization | ISchool | IGroup | IClass;
	otherIdentifiers: ISystemIdentifier[];
	description?: string;
	extensions?: Record<string, any>;
}

export function GroupEvent_Class(params: IGroupEventClassParams): IGroupEventClass {
	return {
		type: EntityType.Class,
		...params
	};
}
