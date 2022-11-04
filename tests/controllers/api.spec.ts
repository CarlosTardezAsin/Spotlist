import request from 'supertest';

import serverInstance from "../../src/app";
import ResponseFormatter from "../../src/helpers/Response";
import PingPongResponse from "../../src/models/ping-pong-response";


describe('GET /ping', () => {

    it('should return 200 OK', () => {
        return request(serverInstance).get('/ping').expect(200)
    });

    it('should return `pong` in response', async () => {
        const expectedResponse =
            ResponseFormatter
            .create<PingPongResponse>(new PingPongResponse('pong'))
            .toJson()

        return request(serverInstance)
            .get('/ping')
            .expect(expectedResponse)
    });
});
