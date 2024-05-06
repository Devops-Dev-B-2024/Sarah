const user = require('../../services/usersService')
const db = require('../../models/indexModel')

describe('About users...', () => {

    it("should return list of users", async () => {
        // MOCK //
        users = {
            0: {id: 1, pseudo: "user_1", email: "user_1@gmail.com"},
            1: {id: 2, pseudo: "user_2", email: "user_2@gmail.com"}
        }
        db.users.findAll = jest.fn().mockReturnValue(users)

        // WHEN //
        const result = await user.getUsers()

        // THEN //
        expect(db.users.findAll).toBeCalled()
        expect(result[1]).toStrictEqual({
            id: 2,
            email: "user_2@gmail.com",
            pseudo: "user_2"
        })
        expect(result[0]).toHaveProperty('pseudo', "user_1")
    })

    it("should add a new user", async() => {
        // MOCK //
        db.users.create = jest.fn()

        // WHEN //
        const result = await user.addUser("myPseudo", ",w)gVX)YAvg#+Uh", "myEmail@gmail.com")

        // THEN //
        expect(db.users.create).toBeCalled()
        expect(db.users.create.mock.calls[0][0].email).toBe("myEmail@gmail.com")
        expect(db.users.create.mock.calls[0][0].pseudo).toBe("myPseudo")
        expect(db.users.create.mock.calls[0][0].hashedPassword).toBe(",w)gVX)YAvg#+Uh")
    })

    it("should return a single user", async() => {
        // MOCK //
        db.users.findOne = jest.fn().mockReturnValueOnce({
            id : 1,
            pseudo: "user_1",
            email: "user_1@gmail.com"
        })

        // WHEN //
        const result = await user.getUserById(1)

        // THEN //
        expect(db.users.findOne).toBeCalled()
        expect(db.users.findOne.mock.calls[0][0].where.id).toBe(1)
        expect(result).toStrictEqual({
            id : 1,
            pseudo: "user_1",
            email: "user_1@gmail.com"
        })
    })

    it("should return null because user doesn't exists", async() => {
        // MOCK //
        db.users.findOne = jest.fn().mockReturnValueOnce(null)

        // WHEN //
        const result = await user.getUserById(2)

        // THEN //
        expect(db.users.findOne).toBeCalled()
        expect(db.users.findOne.mock.calls[0][0].where.id).toBe(2)
        expect(result).toBeNull()
    })

    it("should update a single user", async() => {
        // MOCK //
        db.users.update = jest.fn().mockReturnValueOnce({
            pseudo: "myPseudo", 
            hashedPassword: ",w)gVX)YAvg#+Uh",
            email: "myEmail@gmail.com"
        })

        // WHEN //
        const result = await user.putUser(1, "myTest")

        // THEN //
        expect(db.users.update).toBeCalled()
        expect(db.users.update.mock.calls[0][0].pseudo).toBe("myTest")
        expect(db.users.update.mock.calls[0][0].email).toBeUndefined()
        expect(result).toStrictEqual({
            pseudo: "myPseudo", 
            hashedPassword: ",w)gVX)YAvg#+Uh",
            email: "myEmail@gmail.com"
        })
    })

    it("should delete a single user", async() => {
        // MOCK //
        db.users.destroy = jest.fn()

        // WHEN //
        const result = await user.deleteUserById(2)

        // THEN //
        expect(db.users.destroy).toBeCalled()
        expect(db.users.destroy.mock.calls[0][0].where.id).toBe(2)
        expect(result).toBeUndefined()
    })

})
