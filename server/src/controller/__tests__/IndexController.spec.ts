import supertest from 'supertest';

const context = require('@server/context');
const request = supertest(context.app);

describe("IndexController API Test", () => {
    beforeAll(() => {
        context.start();
    });

    it("/", async () => {
        const res = await request.get('/').send();
        expect(res.status).toEqual(200);
        expect(res.body).toBe("Hello World");
    });
    
    afterAll(() => {
        context.end();
    });
});
