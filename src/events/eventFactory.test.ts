import { Action } from '../actions/actions';
import { Entity } from '../entities/entity';
import { EventType } from './eventType';
import { createEvent } from './eventFactory';

describe('createEvent(..)', () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('creates event of the specified type', () => {
		jest.spyOn(Date, 'now').mockImplementation(() => Date.parse('2020-09-02T12:00:00.000Z'));
		const event = createEvent({
			type: EventType.Session,
			action: Action.LoggedIn,
			actor: {} as Entity,
			id: 'event-id',
			object: 'object-id'
		});

		expect(event).toEqual({
			'@context': 'http://purl.imsglobal.org/ctx/caliper/v1p1',
			eventTime: '2020-09-02T12:00:00.000Z',
			type: 'SessionEvent',
			action: 'LoggedIn',
			actor: {},
			id: 'event-id',
			object: 'object-id'
		});
	});
});
