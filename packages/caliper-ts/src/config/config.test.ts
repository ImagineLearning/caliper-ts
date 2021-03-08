import { compareJsonLdContextVersions, JsonLdContextVersion } from './config';

describe('compareJsonLdContextVersions(..)', () => {
	it('returns 0 if versions are the same', () => {
		expect(compareJsonLdContextVersions(JsonLdContextVersion.v1p1, JsonLdContextVersion.v1p1)).toBe(
			0
		);
	});

	it('returns -1 if first version is undefined', () => {
		expect(compareJsonLdContextVersions(undefined, JsonLdContextVersion.v1p1)).toBe(-1);
	});

	it("returns -1 if first version is 'none'", () => {
		expect(compareJsonLdContextVersions(JsonLdContextVersion.none, JsonLdContextVersion.v1p1)).toBe(
			-1
		);
	});

	it('return -1 if first version is less than second version', () => {
		expect(compareJsonLdContextVersions(JsonLdContextVersion.v1p1, JsonLdContextVersion.v1p2)).toBe(
			-1
		);
	});

	it('returns 1 if first version is greater than second version', () => {
		expect(compareJsonLdContextVersions(JsonLdContextVersion.v1p2, JsonLdContextVersion.v1p1)).toBe(
			1
		);
	});
});
