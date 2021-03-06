import { httpClient } from './clients/httpClient';
import { DEFAULT_CONFIG, getJsonLdContext } from './config/config';
import { Sensor } from './sensor';

describe('Sensor', () => {
	let sensor: Sensor;

	beforeEach(() => {
		jest.resetAllMocks();
		sensor = new Sensor('id');
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	describe('constructor(..)', () => {
		it('creates new instance of Sensor', () => {
			expect(sensor).toBeInstanceOf(Sensor);
		});

		it('throws error on initialization if no ID provided', () => {
			expect(() => new Sensor('')).toThrowError(new Error('Caliper Sensor identifier (id) has not been provided.'));
		});
	});

	describe('createEnvelope(..)', () => {
		it('throws error if envelope data is undefined', () => {
			expect(() => sensor.createEnvelope({})).toThrowError(new Error('Caliper Sensor Envelope data has not been provided.'));
		});

		it('creates Envelope with supplied options', () => {
			const envelope = sensor.createEnvelope({
				sensor: 'sensor-id',
				data: [{ hello: 'world' }],
				dataVersion: 'data-version-1',
				sendTime: 'now'
			});
			const { data, dataVersion, sendTime, sensor: id } = envelope;
			expect(data).toEqual([{ hello: 'world' }]);
			expect(dataVersion).toBe('data-version-1');
			expect(sendTime).toBe('now');
			expect(id).toBe('sensor-id');
		});

		it('converts data to array if it is not already an array', () => {
			const envelope = sensor.createEnvelope({
				data: { hello: 'world' }
			});
			const { data } = envelope;
			expect(data).toEqual([{ hello: 'world' }]);
		});

		it('create Envelope with default options if not supplied', () => {
			const date = '2020-08-28T12:00:00.000Z';
			jest.spyOn(Date, 'now').mockImplementation(() => Date.parse(date));
			const envelope = sensor.createEnvelope({
				data: [{ hello: 'world' }]
			});
			const { dataVersion, sendTime, sensor: id } = envelope;
			expect(dataVersion).toBe(getJsonLdContext(DEFAULT_CONFIG, DEFAULT_CONFIG.dataVersion));
			expect(sendTime).toBe(date);
			expect(id).toBe('id');
		});
	});

	describe('getClient(..)', () => {
		it('returns client with specified ID', () => {
			const client = httpClient('id-1', 'https://example.com');
			sensor = new Sensor('id', { 'id-1': client });
			expect(sensor.getClient('id-1')).toBe(client);
		});

		it('returns undefined if client not registered', () => {
			expect(sensor.getClient('fake-client')).toBeUndefined();
		});
	});

	describe('getClients()', () => {
		it('returns array of clients', () => {
			const client1 = httpClient('id-1', 'https://example.com/1');
			const client2 = httpClient('id-2', 'https://example.com/2');
			sensor = new Sensor('id', { 'id-1': client1, 'id-2': client2 });
			expect(sensor.getClients()).toEqual([client1, client2]);
		});

		it('returns empty array if no clients registered', () => {
			expect(sensor.getClients()).toEqual([]);
		});
	});

	describe('getId()', () => {
		it('returns sensor ID', () => {
			expect(sensor.getId()).toBe('id');
		});
	});

	describe('registerClient(..)', () => {
		it('adds client to clients record', () => {
			const client = httpClient('id-1', 'https://example.com');
			sensor.registerClient(client);
			expect(sensor.getClients()).toContain(client);
		});

		it('replaces existing client with new one with same ID', () => {
			const client1 = httpClient('id-1', 'https://example.com');
			const client2 = httpClient('id-1', 'https://example.org');
			sensor.registerClient(client1);
			sensor.registerClient(client2);
			expect(sensor.getClients().length).toBe(1);
			expect(sensor.getClient('id-1')).toBe(client2);
		});
	});

	describe('sendToClient(..)', () => {
		it('sends envelope to specified client', () => {
			const client = httpClient('id-1', 'https://example.com');
			jest.spyOn(client, 'send').mockImplementation(() => Promise.resolve());
			const envelope = sensor.createEnvelope({ data: [{ hello: 'world' }] });
			sensor.registerClient(client);
			sensor.sendToClient(client, envelope);
			expect(client.send).toHaveBeenCalledWith(envelope);
		});

		it('sends envelope to client specified by ID', () => {
			const client = httpClient('id-1', 'https://example.com');
			jest.spyOn(client, 'send').mockImplementation(() => Promise.resolve());
			const envelope = sensor.createEnvelope({ data: [{ hello: 'world' }] });
			sensor.registerClient(client);
			sensor.sendToClient('id-1', envelope);
			expect(client.send).toHaveBeenCalledWith(envelope);
		});

		it('throws error if client not registered', () => {
			const envelope = sensor.createEnvelope({ data: [{ hello: 'world' }] });
			expect(() => sensor.sendToClient('id', envelope)).toThrowError(new Error('Chosen Client has not been registered.'));
		});
	});

	describe('sendToClients(..)', () => {
		it('sends envelope to all clients', () => {
			const client1 = httpClient('id-1', 'https://example.com/1');
			jest.spyOn(client1, 'send').mockImplementation(() => Promise.resolve());
			const client2 = httpClient('id-2', 'https://example.com/2');
			jest.spyOn(client2, 'send').mockImplementation(() => Promise.resolve());
			sensor = new Sensor('id', { 'id-1': client1, 'id-2': client2 });
			const envelope = sensor.createEnvelope({ data: [{ hello: 'world' }] });
			sensor.sendToClients(envelope);
			expect(client1.send).toHaveBeenCalledWith(envelope);
			expect(client2.send).toHaveBeenCalledWith(envelope);
		});

		it('throws error if no clients registered', () => {
			const envelope = sensor.createEnvelope({ data: [{ hello: 'world' }] });
			expect(() => sensor.sendToClients(envelope)).toThrowError(new Error('No Clients have been registered.'));
		});
	});

	describe('unregisterClient(..)', () => {
		it('removes specified client from clients record', () => {
			const client = httpClient('id-1', 'https://example.com/1');
			sensor = new Sensor('id', { 'id-1': client });
			sensor.unregisterClient('id-1');
			expect(sensor.getClient('id-1')).toBeUndefined();
		});
	});
});
