import { compareJsonLdContextVersions, JsonLdContextVersion } from './config';

describe('compareJsonLdContextVersions(..)', () => {
	it('returns 0 if versions are the same', () => {
		expect(compareJsonLdContextVersions(JsonLdContextVersion.V1P1, JsonLdContextVersion.V1P1)).toBe(
			0
		);
	});

	it('returns -1 if first version is undefined', () => {
		expect(compareJsonLdContextVersions(undefined, JsonLdContextVersion.V1P1)).toBe(-1);
	});

	it("returns -1 if first version is 'none'", () => {
		expect(compareJsonLdContextVersions(JsonLdContextVersion.None, JsonLdContextVersion.V1P1)).toBe(
			-1
		);
	});

	it('return -1 if first version is less than second version', () => {
		expect(compareJsonLdContextVersions(JsonLdContextVersion.V1P1, JsonLdContextVersion.V2P2)).toBe(
			-1
		);
	});

	it('returns 1 if first version is greater than second version', () => {
		expect(compareJsonLdContextVersions(JsonLdContextVersion.V2P2, JsonLdContextVersion.V1P1)).toBe(
			1
		);
	});
});
