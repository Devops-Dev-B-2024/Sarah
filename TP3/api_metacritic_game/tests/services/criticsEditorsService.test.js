const criticsEditors = require('../../services/criticsEditorsService')
const db = require('../../models/indexModel')

describe('About critics from editors...', () => {

    it("should return list of critics from editors", async () => {
        // MOCK //
        criticsFromEditors = {
            0: {
                id: 1,
                evaluation: "Good",
                note: 8,
                date: "2023-12-19",
                idEditor: 1
            },
            1: {
                id: 2,
                evaluation: "Bad",
                note: 2,
                date: "2023-12-20",
                idEditor: 1
            },
        }
        db.criticsEditors.findAll = jest.fn().mockReturnValue(criticsFromEditors)

        // WHEN //
        const result = await criticsEditors.getCriticsEditors()

        // THEN //
        expect(db.criticsEditors.findAll).toBeCalled()
        expect(result[1]).toStrictEqual({
            id: 2,
            evaluation: "Bad",
            note: 2,
            date: "2023-12-20",
            idEditor: 1
        })
        expect(result[0]).toHaveProperty('evaluation', "Good")
    })

    it("should add a new critic from editor", async() => {
        // MOCK //
        db.criticsEditors.create = jest.fn()

        // WHEN //
        const result = await criticsEditors.addCriticsEditor("Very Good", 9, "19/12/2023", 1)

        // THEN //
        expect(db.criticsEditors.create).toBeCalled()
        expect(db.criticsEditors.create.mock.calls[0][0].evaluation).toBe("Very Good")
        expect(db.criticsEditors.create.mock.calls[0][0].note).toBe(9)
        expect(db.criticsEditors.create.mock.calls[0][0].idEditor).toBe(1)
    })

    it("should return a single critic", async() => {
        // MOCK //
        db.criticsEditors.findOne = jest.fn().mockReturnValueOnce({
            id: 2,
            evaluation: "Bad",
            note: 2,
            date: "2023-12-20",
            idEditor: 1
        })

        // WHEN //
        const result = await criticsEditors.getCriticsEditorById(2)

        // THEN //
        expect(db.criticsEditors.findOne).toBeCalled()
        expect(db.criticsEditors.findOne.mock.calls[0][0].where.id).toBe(2)
        expect(result).toStrictEqual({
            id: 2,
            evaluation: "Bad",
            note: 2,
            date: "2023-12-20",
            idEditor: 1
        })
    })

    it("should update a single critic", async() => {
        // MOCK //
        db.criticsEditors.update = jest.fn().mockReturnValueOnce({
            evaluation: "Not Bad", 
            note: "6",
            date: "24/12/2023",
            idEditor: 2
        })

        // WHEN //
        const result = await criticsEditors.putCriticsEditor(null, "Good")

        // THEN //
        expect(db.criticsEditors.update).toBeCalled()
        expect(db.criticsEditors.update.mock.calls[0][0].evaluation).toBe("Good")
        expect(db.criticsEditors.update.mock.calls[0][0].note).toBeUndefined()
        expect(result).toStrictEqual({
            evaluation: "Not Bad", 
            note: "6",
            date: "24/12/2023",
            idEditor: 2
        })
    })

    it("should delete a single critic", async() => {
        // MOCK //
        db.criticsEditors.destroy = jest.fn()

        // WHEN //
        const result = await criticsEditors.deleteCriticsEditorById(2)

        // THEN //
        expect(db.criticsEditors.destroy).toBeCalled()
        expect(db.criticsEditors.destroy.mock.calls[0][0].where.id).toBe(2)
        expect(result).toBeUndefined()
    })

})
