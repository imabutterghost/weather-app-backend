const request = require('supertest');
const app = require('../app');

describe('Weather API', () => {
    it('Should return 404 if data not found', async () => {
        const res = await request(app).get('/api/weather/detail?date=2099-01-01&hour=12');
        expect(res.statusCode).toEqual(404);
    });
});