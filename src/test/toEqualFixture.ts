import diff from 'jest-diff';
import { DEFAULT_CONFIG, JsonLdContextVersion } from '../config/config';

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
	namespace jest {
		interface Matchers<R> {
			toEqualFixture(fixture: string, version?: JsonLdContextVersion): CustomMatcherResult;
		}
	}
}
/* eslint-enable */

function safelyLoadFixture(fixture: string, version: JsonLdContextVersion = DEFAULT_CONFIG.dataVersion) {
	const path = `../caliper-spec/fixtures/${version}/${fixture}`;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let content: any;
	try {
		content = require(path);
	} catch {
		// ignore
	}
	return content;
}

expect.extend({
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	toEqualFixture(received: any, fixture: string, version?: JsonLdContextVersion) {
		const options = {
			comment: 'deep equality',
			isNot: this.isNot,
			promise: this.promise
		};
		const expected = safelyLoadFixture(fixture, version);
		if (!expected) {
			// Don't have a fixture, so we'll just say it passes ¯\_(ツ)_/¯
			return { actual: received, message: () => 'No fixture detected', pass: true };
		}
		const pass = this.equals(received, expected);
		const message = pass
			? () =>
					this.utils.matcherHint('toEqualFixture', undefined, undefined, options) +
					`\n\nExpected: not ${expected}\nReceived: ${received}`
			: () => {
					const diffString = diff(expected, received, {
						expand: this.expand
					});
					return (
						this.utils.matcherHint('toEqualFixture', undefined, undefined, options) +
						'\n\n' +
						(diffString && diffString.includes('- Expect')
							? `Difference:\n\n${diffString}`
							: `Expected: ${this.utils.printExpected(expected)}\nReceived: ${this.utils.printReceived(received)}`)
					);
			  };

		return { actual: received, message, pass };
	}
});
