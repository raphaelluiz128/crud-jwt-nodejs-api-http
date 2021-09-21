const users = require("../controllers/users-controller");
const userRoutes = require("../routes/users");

describe('Authentication', () => {
    it('its return a 200 status code', async () => {
    const res = await request(userRoutes).post('/login').send({email : "raphaelluiz128@hotmail.com", password: "teste12"});
    expect(res.statusCode).toEqual(200);   
    } 
)});