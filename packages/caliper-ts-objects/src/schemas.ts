import { GroupCreatedEventSchema } from './Events/GroupCreatedEvent';
import { GroupUpdatedEventSchema } from './Events/GroupUpdatedEvent';
import { GroupDeletedEventSchema } from './Events/GroupDeletedEvent';
import { IlpIdentifiedEventSchema } from './Events/IlpIdentifiedEvent';
import { IlpRetrievedEventSchema } from './Events/IlpRetrievedEvent';
import { LessonStartedEventSchema } from './Events/LessonStartedEvent';
import { LessonCompletedEventSchema } from './Events/LessonCompletedEvent';
import { LessonSkippedEventSchema } from './Events/LessonSkippedEvent';
import { LessonResetEventSchema } from './Events/LessonResetEvent';
import { LessonGradedEventSchema } from './Events/LessonGradedEvent';
import { LogoutEventSchema } from './Events/LogoutEvent';
import { LoginSuccessEventSchema } from './Events/LoginSuccessEvent';
import { LoginFailedEventSchema } from './Events/LoginFailedEvent';
import { MembershipCreatedEventSchema } from './Events/MembershipCreatedEvent';
import { MembershipDeletedEventSchema } from './Events/MembershipDeletedEvent';
import { NavigationEventSchema } from './Events/NavigationEvent';
import { OrganizationCreatedEventSchema } from './Events/OrganizationCreatedEvent';
import { OrganizationUpdatedEventSchema } from './Events/OrganizationUpdatedEvent';
import { OrganizationDeletedEventSchema } from './Events/OrganizationDeletedEvent';
import { OrganizationActivatedEventSchema } from './Events/OrganizationActivatedEvent';
import { OrganizationDeactivatedEventSchema } from './Events/OrganizationDeactivatedEvent';
import { UserCreatedEventSchema } from './Events/UserCreatedEvent';
import { UserUpdatedEventSchema } from './Events/UserUpdatedEvent';
import { UserDeletedEventSchema } from './Events/UserDeletedEvent';
import { UserActivatedEventSchema } from './Events/UserActivatedEvent';
import { UserDeactivatedEventSchema } from './Events/UserDeactivatedEvent';

export const schemas = {
	[GroupCreatedEventSchema.context]: GroupCreatedEventSchema.schema,
	[GroupUpdatedEventSchema.context]: GroupUpdatedEventSchema.schema,
	[GroupDeletedEventSchema.context]: GroupDeletedEventSchema.schema,
	[IlpIdentifiedEventSchema.context]: IlpIdentifiedEventSchema.schema,
	[IlpRetrievedEventSchema.context]: IlpRetrievedEventSchema.schema,
	[LessonStartedEventSchema.context]: LessonStartedEventSchema.schema,
	[LessonCompletedEventSchema.context]: LessonCompletedEventSchema.schema,
	[LessonSkippedEventSchema.context]: LessonSkippedEventSchema.schema,
	[LessonResetEventSchema.context]: LessonResetEventSchema.schema,
	[LessonGradedEventSchema.context]: LessonGradedEventSchema.schema,
	[LogoutEventSchema.context]: LogoutEventSchema.schema,
	[LoginSuccessEventSchema.context]: LoginSuccessEventSchema.schema,
	[LoginFailedEventSchema.context]: LoginFailedEventSchema.schema,
	[MembershipCreatedEventSchema.context]: MembershipCreatedEventSchema.schema,
	[MembershipDeletedEventSchema.context]: MembershipDeletedEventSchema.schema,
	[NavigationEventSchema.context]: NavigationEventSchema.schema,
	[OrganizationCreatedEventSchema.context]: OrganizationCreatedEventSchema.schema,
	[OrganizationUpdatedEventSchema.context]: OrganizationUpdatedEventSchema.schema,
	[OrganizationDeletedEventSchema.context]: OrganizationDeletedEventSchema.schema,
	[OrganizationActivatedEventSchema.context]: OrganizationActivatedEventSchema.schema,
	[OrganizationDeactivatedEventSchema.context]: OrganizationDeactivatedEventSchema.schema,
	[UserCreatedEventSchema.context]: UserCreatedEventSchema.schema,
	[UserUpdatedEventSchema.context]: UserUpdatedEventSchema.schema,
	[UserDeletedEventSchema.context]: UserDeletedEventSchema.schema,
	[UserActivatedEventSchema.context]: UserActivatedEventSchema.schema,
	[UserDeactivatedEventSchema.context]: UserDeactivatedEventSchema.schema
};
