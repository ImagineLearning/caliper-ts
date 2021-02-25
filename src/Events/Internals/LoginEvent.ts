import Caliper from './../../Caliper';
import { IAgent } from './../../Entities/Agent';
import { CredentialType } from './../../Entities/CredentialType';
import { IDigitalResource } from './../../Entities/DigitalResource';
import { IEntity } from './../../Entities/Entity';
import { EntityType } from './../../Entities/EntityType';
import { IInstructor } from './../../Entities/Instructor';
import { InstructorPermissions } from './../../Entities/InstructorPermissions';
import { LoginType } from './../../Entities/LoginType';
import { ILtiSession } from './../../Entities/LtiSession';
import { IMembership } from './../../Entities/Membership';
import { IOrganization } from './../../Entities/Organization';
import { IPerson } from './../../Entities/Person';
import { Role } from './../../Entities/Role';
import { ISession } from './../../Entities/Session';
import { ISoftwareApplication } from './../../Entities/SoftwareApplication';
import { Status } from './../../Entities/Status';
import { IStudent } from './../../Entities/Student';
import { StudentProfileSettings } from './../../Entities/StudentProfileSettings';
import { IUser } from './../../Entities/User';
import { IUserSession } from './../../Entities/UserSession';
import { ISystemIdentifier } from './../../SystemIdentifier';
import { CaliperAction } from './../CaliperAction';
import { CaliperProfile } from './../CaliperProfile';
import { EventType } from './../EventType';
import { ISessionEvent } from './../SessionEvent';

export interface ILoginEvent extends ISessionEvent {
	actor: IUser | ILoginEventUser | ILoginEventInstructor | ILoginEventStudent;
	object: ISoftwareApplication;
	action: CaliperAction;
	session: ILoginEventUserSession;
	target?: IDigitalResource;
	referrer?: IDigitalResource | ISoftwareApplication;
}

export interface ILoginEventUserSession extends IUserSession {
	id: string;
	loginType: LoginType;
	credentials: CredentialType[];
	scopes: string[];
	userAgent: string;
	ipAddress: string;
	localTimestamp: string;
	user?: IPerson | IUser | IInstructor | IStudent;
}

interface ILoginEventUserSessionParams {
	id: string;
	loginType: LoginType;
	credentials: CredentialType[];
	scopes: string[];
	userAgent: string;
	ipAddress: string;
	localTimestamp: string;
	user?: IPerson | IUser | IInstructor | IStudent;
	startedAtTime?: string;
	endedAtTime?: string;
	duration?: string;
	name?: string;
	description?: string;
	dateCreated?: string;
	dateModified?: string;
	otherIdentifiers?: ISystemIdentifier[];
	extensions?: Record<string, any>;
}

export function LoginEvent_UserSession(params: ILoginEventUserSessionParams): ILoginEventUserSession {
	return {
		type: EntityType.UserSession,
		...params
	};
}

export interface ILoginEventUser extends IUser {
	id: string;
	roles: Role[];
}

interface ILoginEventUserParams {
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

export function LoginEvent_User(params: ILoginEventUserParams): ILoginEventUser {
	return {
		type: EntityType.Person,
		...params
	};
}

export interface ILoginEventInstructor extends ILoginEventUser {
	id: string;
	roles: Role[];
	permissions?: InstructorPermissions;
}

interface ILoginEventInstructorParams {
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

export function LoginEvent_Instructor(params: ILoginEventInstructorParams): ILoginEventInstructor {
	return {
		type: EntityType.Instructor,
		...params
	};
}

export interface ILoginEventStudent extends ILoginEventUser {
	id: string;
	roles: Role[];
	gradeLevel?: number;
	settings?: StudentProfileSettings;
}

interface ILoginEventStudentParams {
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

export function LoginEvent_Student(params: ILoginEventStudentParams): ILoginEventStudent {
	return {
		type: EntityType.Student,
		...params
	};
}
