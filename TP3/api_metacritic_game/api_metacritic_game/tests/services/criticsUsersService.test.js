const criticsUsers = require('../../services/criticsUsersService')
const db = require('../../models/indexModel')

describe('About critics from users...', () => {

    it("should return list of critics from users", async () => {
        // MOCK //
        criticsFromUsers = {
            0: {
                idReview: 1,
                idUser: 1,
                comment: "The best game ever",
                noteU: 10,
                date: "2023-12-19"
            },
            1: {
                idReview: 2,
                idUser: 1,
                comment: "The worst game ever",
                noteU: 0,
                date: "2023-12-20"
            },
        }
        db.criticsUsers.findAll = jest.fn().mockReturnValue(criticsFromUsers)

        // WHEN //
        const result = await criticsUsers.getCriticsUsers()

        // THEN //
        expect(db.criticsUsers.findAll).toBeCalled()
        expect(result[1]).toStrictEqual({
            idReview: 2,
            idUser: 1,
            comment: "The worst game ever",
            noteU: 0,
            date: "2023-12-20"
        })
        expect(result[0]).toHaveProperty('comment', "The best game ever")
    })

    it("should add a new critic from user", async() => {
        // MOCK //
        db.criticsUsers.create = jest.fn()

        // WHEN //
        const result = await criticsUsers.addCriticsUser(3, 1, "Very Good", 9)

        // THEN //
        expect(db.criticsUsers.create).toBeCalled()
        expect(db.criticsUsers.create.mock.calls[0][0].comment).toBe("Very Good")
        expect(db.criticsUsers.create.mock.calls[0][0].noteU).toBe(9)
        expect(db.criticsUsers.create.mock.calls[0][0].idUser).toBe(1)
    })

    it("should return a single critic", async() => {
        // MOCK //
        db.criticsUsers.findOne = jest.fn().mockReturnValueOnce({
            idReview: 2,
            idUser: 1,
            comment: "The worst game ever",
            noteU: 0,
            date: "2023-12-20"
        })

        // WHEN //
        const result = await criticsUsers.getCriticsUserById(2,1)

        // THEN //
        expect(db.criticsUsers.findOne).toBeCalled()
        expect(db.criticsUsers.findOne.mock.calls[0][0].where.idUser).toBe(1)
        expect(result).toStrictEqual({
            idReview: 2,
            idUser: 1,
            comment: "The worst game ever",
            noteU: 0,
            date: "2023-12-20"
        })
    })

    it("should update a single critic", async() => {
        // MOCK //
        db.criticsUsers.update = jest.fn().mockReturnValueOnce({
            comment: "Not Bad", 
            noteU: "6",
            date: "24/12/2023",
            idReview: 2,
            idUser: 3
        })

        // WHEN //
        const result = await criticsUsers.putCriticsUser(2,3,"Good", 7)

        // THEN //
        expect(db.criticsUsers.update).toBeCalled()
        expect(db.criticsUsers.update.mock.calls[0][0].comment).toBe("Good")
        expect(db.criticsUsers.update.mock.calls[0][0].noteU).toBe(7)
        expect(result).toStrictEqual({
            comment: "Not Bad", 
            noteU: "6",
            date: "24/12/2023",
            idReview: 2,
            idUser: 3
        })
    })

    it("should delete a single critic", async() => {
        // MOCK //
        db.criticsUsers.destroy = jest.fn()

        // WHEN //
        const result = await criticsUsers.deleteCriticsUserById(2,4)

        // THEN //
        expect(db.criticsUsers.destroy).toBeCalled()
        expect(db.criticsUsers.destroy.mock.calls[0][0].where.idUser).toBe(4)
        expect(db.criticsUsers.destroy.mock.calls[0][0].where.idReview).toBe(2)
        expect(result).toBeUndefined()
    })

})
