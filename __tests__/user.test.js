const userRoutes = require("../routes/users");
const request = require("supertest");
const instance = require(".././app")
const mysql = require('../mysql').pool;

describe('Authentication', () => {
    it('its return a 200 status code', async () => {
    const res = await request(instance).post('/user/login').send({ email: "raphaelluiz128@hotmail.com",
    password: "teste12"});
    expect(res.statusCode).toEqual(200);   
} 
)});
