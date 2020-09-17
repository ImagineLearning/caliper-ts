import diff from 'jest-diff';
import { DEFAULT_CONFIG, JsonLdContextVersion } from '../config/config';
import { EntityType } from '../entities/entityType';
import { EventType } from '../events/eventType';
import { startCase } from 'lodash';
import { Action } from '../actions/actions';

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
	namespace jest {
		interface Matchers<R> {
			toEqualEntityFixture(type: EntityType, version?: JsonLdContextVersion, extended?: string): CustomMatcherResult;
			toEqualEventFixture(type: EventType, action: Action, version?: JsonLdContextVersion): CustomMatcherResult;
		}
	}
}
/* eslint-enable */

function tryLoadFixture(
	type: EntityType | EventType,
	objectType: 'entity' | 'event',
	version: JsonLdContextVersion = DEFAULT_CONFIG.dataVersion,
	extended?: string
) {
	let path = `../caliper-spec/fixtures/${version}/`;
	if (version === JsonLdContextVersion.v1p0) {
		path += `caliper${type}${startCase(objectType)}${extended ?? ''}.json`;
	} else {
		path += `caliper${startCase(objectType)}${type}${extended ?? ''}.json`;
	}
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let content: any;
	try {
		content = require(path);
	} catch {
		// ignore
	}
	return content;
}

function getMessage({
	expand,
	expected,
	label,
	options,
	pass,
	received,
	utils
}: {
	/* eslint-disable @typescript-eslint/no-explicit-any */
	expand: boolean;
	expected: any;
	label: string;
	options: { comment: string; isNot: boolean; promise: string };
	pass: boolean;
	received: any;
	utils: any;
	/* eslint-enable */
}) {
	return pass
		? () => utils.matcherHint(label, undefined, undefined, options) + `\n\nExpected: not ${expected}\nReceived: ${received}`
		: () => {
				const diffString = diff(expected, received, {
					expand
				});
				return (
					utils.matcherHint(label, undefined, undefined, options) +
					'\n\n' +
					(diffString && diffString.includes('- Expect')
						? `Difference:\n\n${diffString}`
						: `Expected: ${utils.printExpected(expected)}\nReceived: ${utils.printReceived(received)}`)
				);
		  };
}

expect.extend({
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	toEqualEntityFixture(received: any, type: EntityType, version?: JsonLdContextVersion, extended?: string) {
		const options = {
			comment: 'deep equality',
			isNot: this.isNot,
			promise: this.promise
		};
		const expected = tryLoadFixture(type, 'entity', version, extended);
		// If we can't load a fixture, we'll just say it passed ¯\_(ツ)_/¯
		const pass = !expected || this.equals(received, expected);
		const message = getMessage({
			expand: this.expand,
			expected,
			label: 'toEqualEntityFixture',
			options,
			pass,
			received,
			utils: this.utils
		});

		return { actual: received, message, pass };
	},
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	toEqualEventFixture(received: any, type: EventType, action?: Action, version?: JsonLdContextVersion) {
		const options = {
			comment: 'deep equality',
			isNot: this.isNot,
			promise: this.promise
		};
		const expected = tryLoadFixture(type, 'event', version, action);
		const pass = this.equals(received, expected);
		const message = getMessage({
			expand: this.expand,
			expected,
			label: 'toEqualEventFixture',
			options,
			pass,
			received,
			utils: this.utils
		});

		return { actual: received, message, pass };
	}
});
