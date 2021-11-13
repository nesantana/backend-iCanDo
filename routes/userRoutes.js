const router = require('express').Router()
const User = require('../models/User')

router.post('/create', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body

  let pass = true
  let message = []

  if (!name) {
    pass = false
    message.push({error: 'O campo "Nome" é obrigatório'})
  }
  
  if (!email) {
    pass = false
    message.push({error: 'O campo "E-mail" é obrigatório'})
  }
  
  if (!password) {
    pass = false
    message.push({error: 'O campo "Senha" é obrigatório'})
  }
  
  if (!confirmPassword) {
    pass = false
    message.push({error: 'O campo "Confirmação de Senha" é obrigatório'})
  }

  if (password !== confirmPassword) {
    pass = false
    message.push({error: 'Os campos "Senha" e "Confirmação de Senha" não são iguais'})
  }

  const hasUser = await User.findOne({ email })

  if (hasUser) {
    pass = false
    message.push({error: 'E-mail já cadastrado'})
  }

  if (!pass) {
    res.status(422).json({
      message
    })
    return
  }

  const user = {
    name,
    email,
    password
  }

  try {
    await User.create(user)

    res.status(201).json({
      success: true,
      data: user
    })
  } catch (error) {
    res.status(500).json({error})
  }
})


router.post('/login', async (req, res) => {
  const { email, password } = req.body

  let pass = true
  let message = []

  if (!email) {
    pass = false
    message.push({error: 'O campo "E-mail" é obrigatório'})
  }
  
  if (!password) {
    pass = false
    message.push({error: 'O campo "Senha" é obrigatório'})
  }
  
  try {
    const user = await User.findOne({email})
    
    if (password === user.password) {
      res.status(201).json({
        success: true,
        user: {
          id: user.id,
          email
        }
      })
    } else {
      res.status(201).json({
        success: false,
        message: 'Opss, algo não deu certo. Verifique seus dados e tente novamente.'
      })
    }
  } catch (error) {
    res.status(500).json({error})
  }
})

module.exports = router