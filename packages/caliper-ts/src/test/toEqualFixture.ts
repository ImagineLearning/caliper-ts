import { CaliperAction, EntityType, EventType } from '@imaginelearning/caliper-ts-objects';
import diff from 'jest-diff';
import { startCase } from 'lodash';
import { DEFAULT_CONFIG, JsonLdContextVersion } from '../config/config';

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
	namespace jest {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		interface Matchers<R> {
			toEqualEntityFixture(
				type: EntityType,
				version?: JsonLdContextVersion,
				extended?: string
			): CustomMatcherResult;
			toEqualEventFixture(
				type: EventType,
				action: CaliperAction,
				version?: JsonLdContextVersion
			): CustomMatcherResult;
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
	// EventTypes have an 'Event' suffix that doesn't line up with the fixture file names,
	// so we'll just trim it off.
	const fixedType = objectType === 'event' ? type.replace(/Event?/, '') : type;
	const path = `../caliper-spec/fixtures/${version}/caliper${startCase(objectType)}${fixedType}${
		extended ?? ''
	}.json`;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let content: any;
	try {
		// eslint-disable-next-line
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
	utils,
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
		? () =>
				`${utils.matcherHint(
					label,
					undefined,
					undefined,
					options
				)}\n\nExpected: not ${expected}\nReceived: ${received}`
		: () => {
				const diffString = diff(expected, received, {
					expand,
				});
				return `${utils.matcherHint(label, undefined, undefined, options)}\n\n${
					diffString?.includes('- Expect')
						? `Difference:\n\n${diffString}`
						: `Expected: ${utils.printExpected(expected)}\nReceived: ${utils.printReceived(
								received
						  )}`
				}`;
		  };
}

expect.extend({
	toEqualEntityFixture(
		received: unknown,
		type: EntityType,
		version?: JsonLdContextVersion,
		extended?: string
	) {
		const options = {
			comment: 'deep equality',
			isNot: this.isNot,
			promise: this.promise,
		};
		const expected = tryLoadFixture(type, 'entity', version, extended);
		const pass = this.equals(received, expected);
		const message = getMessage({
			expand: this.expand,
			expected,
			label: 'toEqualEntityFixture',
			options,
			pass,
			received,
			utils: this.utils,
		});

		return { actual: received, message, pass };
	},
	toEqualEventFixture(
		received: unknown,
		type: EventType,
		action?: CaliperAction,
		version?: JsonLdContextVersion
	) {
		const options = {
			comment: 'deep equality',
			isNot: this.isNot,
			promise: this.promise,
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
			utils: this.utils,
		});

		return { actual: received, message, pass };
	},
});
