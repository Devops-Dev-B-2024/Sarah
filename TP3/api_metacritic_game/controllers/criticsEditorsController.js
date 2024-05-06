const criticsEditorsService = require('../services/criticsEditorsService')
const createError = require('http-errors')


exports.getCriticsEditors = async (req, res, next) => {
   const criticsEditors = await criticsEditorsService.getCriticsEditors()
   if (criticsEditors) {
      res.json({ data: criticsEditors })
   } else {
      next(createError(404, "no criticsEditors found"))
   }
}

exports.addCriticsEditor = (req, res, next) => {
   const criticsEditorCreated = criticsEditorsService.addCriticsEditor(req.body.evaluation, req.body.note, req.body.date, req.body.idEditor)
   if (criticsEditorCreated) {
      res.status(201).json({id: criticsEditorCreated.id})
   } else {
      next(createError(400, "Error when creating this criticsEditor, verify your args"))
   }
}

exports.getCriticsEditorById = async (req, res, next) => {
   const criticsEditor = await criticsEditorsService.getCriticsEditorById(req.params.id)
   if (criticsEditor) {
      res.json({ data: criticsEditor })
   } else {
      next(createError(404, "no criticsEditor found for this id"))
   }
}

exports.putCriticsEditor = (req, res, next) => {
   const criticsEditorUpdated = criticsEditorsService.putCriticsEditor(req.body.id, req.body.evaluation, req.body.note, req.body.date, req.body.idEditor)
   if (criticsEditorUpdated) {
      res.status(201).json({id: criticsEditorUpdated.id})
   } else {
      next(createError(400, "Error when updating this criticsEditor, verify your args"))
   }
}

exports.deleteCriticsEditorById = (req, res, next) => {
   try {
      criticsEditorsService.deleteCriticsEditorById(req.params.id)
      res.status(204).send()
   } catch(e) {
      next(createError(404, `The criticsEditor with id '${id}' doesn't exists, it cannot be deleted`))
   }
}
