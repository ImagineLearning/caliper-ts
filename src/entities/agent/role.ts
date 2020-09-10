import { getJsonLdContext, DEFAULT_CONFIG, JsonLdContextVersion } from '../../config/config';
import { ContextTermIri } from '../contextTermIri';

const BASE_IRI = 'http://purl.imsglobal.org/vocab/lis/v2/membership';
const ADMIN_SUBROLE_IRI = 'http://purl.imsglobal.org/vocab/lis/v2/membership/Administrator';
const CONTENT_DEV_SUBROLE_IRI = 'http://purl.imsglobal.org/vocab/lis/v2/membership/ContentDeveloper';
const INSTR_SUBROLE_IRI = 'http://purl.imsglobal.org/vocab/lis/v2/membership/Instructor';
const LEARNER_SUBROLE_IRI = 'http://purl.imsglobal.org/vocab/lis/v2/membership/Learner';
const MANAGER_SUBROLE_IRI = 'http://purl.imsglobal.org/vocab/lis/v2/membership/Manager';
const MEMBER_SUBROLE_IRI = 'http://purl.imsglobal.org/vocab/lis/v2/membership/Member';
const MENTOR_SUBROLE_IRI = 'http://purl.imsglobal.org/vocab/lis/v2/membership/Mentor';
const TEACH_ASST_SUBROLE_IRI = 'http://purl.imsglobal.org/vocab/lis/v2/membership/TeachingAssistant';

export enum Role {
	Learner = 'Learner',
	LearnerExternalLearner = 'Learner#ExternalLearner',
	LearnerGuestLearner = 'Learner#GuestLearner',
	LearnerInstructor = 'Learner#Instructor',
	LearnerLearner = 'Learner#Learner',
	LearnerNonCreditLearner = 'Learner#NonCreditLearner',
	Instructor = 'Instructor',
	InstructorExternalInstructor = 'Instructor#ExternalInstructor',
	InstructorGuestInstructor = 'Instructor#GuestInstructor',
	InstructorLecturer = 'Instructor#Lecturer',
	InstructorPrimaryInstructor = 'Instructor#PrimaryInstructor',
	Administrator = 'Administrator',
	AdministratorAdministrator = 'Administrator#Administrator',
	AdministratorDeveloper = 'Administrator#Developer',
	AdministratorSupport = 'Administrator#Support',
	AdministratorSystemAdministrator = 'Administrator#SystemAdministrator',
	AdministratorExternalDeveloper = 'Administrator#ExternalDeveloper',
	AdministratorExternalSupport = 'Administrator#ExternalSupport',
	AdministratorExternalSystemAdministrator = 'Administrator#ExternalSystemAdministrator',
	ContentDeveloper = 'ContentDeveloper',
	ContentDeveloperContentDeveloper = 'ContentDeveloper#ContentDeveloper',
	ContentDeveloperLibrarian = 'ContentDeveloper#Librarian',
	ContentDeveloperContentExpert = 'ContentDeveloper#ContentExpert',
	ContentDeveloperExternalContentExpert = 'ContentDeveloper#ExternalContentExpert',
	Manager = 'Manager',
	ManagerAreaManager = 'Manager#AreaManager',
	ManagerCourseCoordinator = 'Manager#CourseCoordinator',
	ManagerObserver = 'Manager#Observer',
	ManagerExternalObserver = 'Manager#ExternalObserver',
	Member = 'Member',
	MemberMember = 'Member#Member',
	Mentor = 'Mentor',
	MentorMentor = 'Mentor#Mentor',
	MentorAdvisor = 'Mentor#Advisor',
	MentorAuditor = 'Mentor#Auditor',
	MentorReviewer = 'Mentor#Reviewer',
	MentorTutor = 'Mentor#Tutor',
	MentorLearningFacilitator = 'Mentor#LearningFacilitator',
	MentorExternalMentor = 'Mentor#ExternalMentor',
	MentorExternalAdvisor = 'Mentor#ExternalAdvisor',
	MentorExternalAuditor = 'Mentor#ExternalAuditor',
	MentorExternalReviewer = 'Mentor#ExternalReviewer',
	MentorExternalTutor = 'Mentor#ExternalTutor',
	MentorExternalLearningFacilitator = 'Mentor#ExternalLearningFacilitator',
	TeachingAssistant = 'TeachingAssistant',
	TeachingAssistantTeachingAssistant = 'TeachingAssistant#TeachingAssistant',
	TeachingAssistantGrader = 'TeachingAssistant#Grader',
	TeachingAssistantSection = 'TeachingAssistantSection',
	TeachingAssistantTeachingAssistantSectionAssociation = 'TeachingAssistant#TeachingAssistantSectionAssociation',
	TeachingAssistantTeachingAssistantOffering = 'TeachingAssistant#TeachingAssistantOffering',
	TeachingAssistantTeachingAssistantTemplate = 'TeachingAssistant#TeachingAssistantTemplate',
	TeachingAssistantTeachingAssistantGroup = 'TeachingAssistant#TeachingAssistantGroup'
}

export const RoleRecord: Readonly<Record<Role, Readonly<ContextTermIri>>> = {
	[Role.Learner]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'Learner',
		iri: BASE_IRI + '#Learner'
	},
	[Role.LearnerExternalLearner]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'Learner#ExternalLearner',
		iri: LEARNER_SUBROLE_IRI + '#ExternalLearner'
	},
	[Role.LearnerGuestLearner]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'Learner#GuestLearner',
		iri: LEARNER_SUBROLE_IRI + '#GuestLearner'
	},
	[Role.LearnerInstructor]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'Learner#Instructor',
		iri: LEARNER_SUBROLE_IRI + '#Instructor'
	},
	[Role.LearnerLearner]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'Learner#Learner',
		iri: LEARNER_SUBROLE_IRI + '#Learner'
	},
	[Role.LearnerNonCreditLearner]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'Learner#NonCreditLearner',
		iri: LEARNER_SUBROLE_IRI + '#NonCreditLearner'
	},
	[Role.Instructor]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'Instructor',
		iri: BASE_IRI + '#Instructor'
	},
	[Role.InstructorExternalInstructor]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'Instructor#ExternalInstructor',
		iri: INSTR_SUBROLE_IRI + '#ExternalInstructor'
	},
	[Role.InstructorGuestInstructor]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'Instructor#GuestInstructor',
		iri: INSTR_SUBROLE_IRI + '#GuestInstructor'
	},
	[Role.InstructorLecturer]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'Instructor#Lecturer',
		iri: INSTR_SUBROLE_IRI + '#Lecturer'
	},
	[Role.InstructorPrimaryInstructor]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'Instructor#PrimaryInstructor',
		iri: INSTR_SUBROLE_IRI + '#PrimaryInstructor'
	},
	[Role.Administrator]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'Administrator',
		iri: BASE_IRI + '#Administrator'
	},
	[Role.AdministratorAdministrator]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'Administrator#Administrator',
		iri: ADMIN_SUBROLE_IRI + '#Administrator'
	},
	[Role.AdministratorDeveloper]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'Administrator#Developer',
		iri: ADMIN_SUBROLE_IRI + '#Developer'
	},
	[Role.AdministratorSupport]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'Administrator#Support',
		iri: ADMIN_SUBROLE_IRI + '#Support'
	},
	[Role.AdministratorSystemAdministrator]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'Administrator#SystemAdministrator',
		iri: ADMIN_SUBROLE_IRI + '#SystemAdministrator'
	},
	[Role.AdministratorExternalDeveloper]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'Administrator#ExternalDeveloper',
		iri: ADMIN_SUBROLE_IRI + '#ExternalDeveloper'
	},
	[Role.AdministratorExternalSupport]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'Administrator#ExternalSupport',
		iri: ADMIN_SUBROLE_IRI + '#ExternalSupport'
	},
	[Role.AdministratorExternalSystemAdministrator]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'Administrator#ExternalSystemAdministrator',
		iri: ADMIN_SUBROLE_IRI + '#ExternalSystemAdministrator'
	},
	[Role.ContentDeveloper]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'ContentDeveloper',
		iri: BASE_IRI + '#ContentDeveloper'
	},
	[Role.ContentDeveloperContentDeveloper]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'ContentDeveloper#ContentDeveloper',
		iri: CONTENT_DEV_SUBROLE_IRI + '#ContentDeveloper'
	},
	[Role.ContentDeveloperLibrarian]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'ContentDeveloper#Librarian',
		iri: CONTENT_DEV_SUBROLE_IRI + '#Librarian'
	},
	[Role.ContentDeveloperContentExpert]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'ContentDeveloper#ContentExpert',
		iri: CONTENT_DEV_SUBROLE_IRI + '#ContentExpert'
	},
	[Role.ContentDeveloperExternalContentExpert]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'ContentDeveloper#ExternalContentExpert',
		iri: CONTENT_DEV_SUBROLE_IRI + '#ExternalContentExpert'
	},
	[Role.Manager]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'Manager',
		iri: BASE_IRI + '#Manager'
	},
	[Role.ManagerAreaManager]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'Manager#AreaManager',
		iri: MANAGER_SUBROLE_IRI + '#AreaManager'
	},
	[Role.ManagerCourseCoordinator]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'Manager#CourseCoordinator',
		iri: MANAGER_SUBROLE_IRI + '#CourseCoordinator'
	},
	[Role.ManagerObserver]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'Manager#Observer',
		iri: MANAGER_SUBROLE_IRI + '#Observer'
	},
	[Role.ManagerExternalObserver]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'Manager#ExternalObserver',
		iri: MANAGER_SUBROLE_IRI + '#ExternalObserver'
	},
	[Role.Member]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'Member',
		iri: BASE_IRI + '#Member'
	},
	[Role.MemberMember]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'Member#Member',
		iri: MEMBER_SUBROLE_IRI + '#Member'
	},
	[Role.Mentor]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'Mentor',
		iri: BASE_IRI + '#Mentor'
	},
	[Role.MentorMentor]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'Mentor#Mentor',
		iri: MENTOR_SUBROLE_IRI + '#Mentor'
	},
	[Role.MentorAdvisor]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'Mentor#Advisor',
		iri: MENTOR_SUBROLE_IRI + '#Advisor'
	},
	[Role.MentorAuditor]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'Mentor#Auditor',
		iri: MENTOR_SUBROLE_IRI + '#Auditor'
	},
	[Role.MentorReviewer]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'Mentor#Reviewer',
		iri: MENTOR_SUBROLE_IRI + '#Reviewer'
	},
	[Role.MentorTutor]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'Mentor#Tutor',
		iri: MENTOR_SUBROLE_IRI + '#Tutor'
	},
	[Role.MentorLearningFacilitator]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'Mentor#LearningFacilitator',
		iri: MENTOR_SUBROLE_IRI + '#LearningFacilitator'
	},
	[Role.MentorExternalMentor]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'Mentor#ExternalMentor',
		iri: MENTOR_SUBROLE_IRI + '#ExternalMentor'
	},
	[Role.MentorExternalAdvisor]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'Mentor#ExternalAdvisor',
		iri: MENTOR_SUBROLE_IRI + '#ExternalAdvisor'
	},
	[Role.MentorExternalAuditor]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'Mentor#ExternalAuditor',
		iri: MENTOR_SUBROLE_IRI + '#ExternalAuditor'
	},
	[Role.MentorExternalReviewer]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'Mentor#ExternalReviewer',
		iri: MENTOR_SUBROLE_IRI + '#ExternalReviewer'
	},
	[Role.MentorExternalTutor]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'Mentor#ExternalTutor',
		iri: MENTOR_SUBROLE_IRI + '#ExternalTutor'
	},
	[Role.MentorExternalLearningFacilitator]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'Mentor#ExternalLearningFacilitator',
		iri: MENTOR_SUBROLE_IRI + '#ExternalLearningFacilitator'
	},
	[Role.TeachingAssistant]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'TeachingAssistant',
		iri: BASE_IRI + '#TeachingAssistant'
	},
	[Role.TeachingAssistantTeachingAssistant]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'TeachingAssistant#TeachingAssistant',
		iri: TEACH_ASST_SUBROLE_IRI + '#TeachingAssistant'
	},
	[Role.TeachingAssistantGrader]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'TeachingAssistant#Grader',
		iri: TEACH_ASST_SUBROLE_IRI + '#Grader'
	},
	[Role.TeachingAssistantSection]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'TeachingAssistantSection',
		iri: TEACH_ASST_SUBROLE_IRI + '#TeachingAssistantSection'
	},
	[Role.TeachingAssistantTeachingAssistantSectionAssociation]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'TeachingAssistant#TeachingAssistantSectionAssociation',
		iri: TEACH_ASST_SUBROLE_IRI + '#TeachingAssistantSectionAssociation'
	},
	[Role.TeachingAssistantTeachingAssistantOffering]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'TeachingAssistant#TeachingAssistantOffering',
		iri: TEACH_ASST_SUBROLE_IRI + '#TeachingAssistantOffering'
	},
	[Role.TeachingAssistantTeachingAssistantTemplate]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'TeachingAssistant#TeachingAssistantTemplate',
		iri: TEACH_ASST_SUBROLE_IRI + '#TeachingAssistantTemplate'
	},
	[Role.TeachingAssistantTeachingAssistantGroup]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'TeachingAssistant#TeachingAssistantGroup',
		iri: TEACH_ASST_SUBROLE_IRI + '#TeachingAssistantGroup'
	}
};
