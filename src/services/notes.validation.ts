import Joi from 'joi'

export const validarNota = Joi.object({
  nota: Joi.string().required().empty().messages({
    'any.required': 'Insira por favor a sua nota',
    'string.base': 'Insira por favor uma nota válida',
    'string.empty': 'Insira por favor uma nota'
  })
})

export const atualizarNota = Joi.object({
  nota: Joi.string().empty().messages({
    'any.required': 'Insira por favor a sua nota',
    'string.base': 'Insira por favor uma nota válida',
    'string.empty': 'Insira por favor uma nota'
  })
})
