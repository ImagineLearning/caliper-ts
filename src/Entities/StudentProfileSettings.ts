import Caliper from './../Caliper';
import { LanguageTranslationToolSettings } from './LanguageTranslationToolSettings';
import { SpanishLanguageSettings } from './SpanishLanguageSettings';
import { TextToSpeechSettings } from './TextToSpeechSettings';

export interface StudentProfileSettings {
	spanishLanguage?: SpanishLanguageSettings;
	textToSpeech?: TextToSpeechSettings;
	languageTranslationTools?: LanguageTranslationToolSettings;
	individualEducationPlan?: Boolean;
	englishLanguageLearner?: Boolean;
	[key: string]: any;
}
