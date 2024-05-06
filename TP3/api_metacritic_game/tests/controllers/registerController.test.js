const request = require('supertest')
const app = require('../../app')
const usersService = require('../../services/usersService')

describe('sign up and sign in', () => {
    it('should return a token access for user', async () => {
        const res = await request(app).post('/register/signIn').send({
            email: "user_1@gmail.com",
            password: "user_mdp"
        })
        expect(res.body).not.toBeNull()
        expect(res.body).toHaveProperty('success')
        expect(res.body).toHaveProperty('token')
        expect(res.body.success).toBeTruthy()
        expect(res.statusCode).toEqual(200)
    })

    it('should fail with non existing user', async () => {
        const res = await request(app).post('/register/signIn').send({
            email: "user_test@gmail.com",
            password: "user_test"
        })
        expect(res.body).not.toBeNull()
        expect(res.body).toHaveProperty('success')
        expect(res.body).toHaveProperty('error')
        expect(res.body.success).toBeFalsy()
        expect(res.statusCode).toEqual(404)

    })

    it('should fail with invalid password', async () => {
        const res = await request(app).post('/register/signIn').send({
            email: "user_1@gmail.com",
            password: "user_falseMdp"
        })
        expect(res.body).not.toBeNull()
        expect(res.body).toHaveProperty('success')
        expect(res.body).toHaveProperty('error')
        expect(res.body.success).toBeFalsy()
        expect(res.statusCode).toEqual(401)
    })



    it('should fail with unsubmitted parameters', async () => {
        const res = await request(app).post('/register/signUp').send({
            pseudo: "user_test",
            password: "user_test"
        })
        expect(res.body).not.toBeNull()
        expect(res.body).toHaveProperty('success')
        expect(res.body).toHaveProperty('message')
        expect(res.body.success).toBeFalsy()
        expect(res.statusCode).toEqual(400)
    })
    it('should fail with unvalid email', async () => {
        const res = await request(app).post('/register/signUp').send({
            pseudo: "user_test",
            email: "user_test",
            password: "user_test"
        })
        expect(res.body).not.toBeNull()
        expect(res.body).toHaveProperty('success')
        expect(res.body).toHaveProperty('message')
        expect(res.body.success).toBeFalsy()
        expect(res.statusCode).toEqual(400)
    })
    it('should fail with unvalid pseudo', async () => {
        const res = await request(app).post('/register/signUp').send({
            pseudo: "user!test",
            email: "user_test@gmail.com",
            password: "user_test"
        })
        expect(res.body).not.toBeNull()
        expect(res.body).toHaveProperty('success')
        expect(res.body).toHaveProperty('message')
        expect(res.body.success).toBeFalsy()
        expect(res.statusCode).toEqual(400)
    })
    it('should fail with an already existing user', async () => {
        const res = await request(app).post('/register/signUp').send({
            pseudo: "user_1",
            email: "user_1@gmail.com",
            password: "user_mdp"
        })
        expect(res.body).not.toBeNull()
        expect(res.body).toHaveProperty('success')
        expect(res.body).toHaveProperty('error')
        expect(res.body.success).toBeFalsy()
        expect(res.statusCode).toEqual(400)
    })
    it('should fail with an already existing user', async () => {
        const res = await request(app).post('/register/signUp').send({
            pseudo: "user_1",
            email: "user_1@gmail.com",
            password: "user_mdp"
        })
        expect(res.body).not.toBeNull()
        expect(res.body).toHaveProperty('success')
        expect(res.body).toHaveProperty('error')
        expect(res.body.success).toBeFalsy()
        expect(res.statusCode).toEqual(400)
    })
    it('should add a new user', async () => {
        const res = await request(app).post('/register/signUp').send({
            pseudo: "user_test",
            email: "user_test@gmail.com",
            password: "user_test"
        })
        expect(res.body).not.toBeNull()
        expect(res.body).toHaveProperty('success')
        expect(res.body).toHaveProperty('message')
        expect(res.body.success).toBeTruthy()
        expect(res.statusCode).toEqual(201)
    })
})