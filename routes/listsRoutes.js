const router = require('express').Router()
const Lists = require('../models/Lists')
const User = require('../models/User')

router.post('/', async (req, res) => {
  const { user, name } = req.body

  let pass = true
  let message = []

  if (!name) {
    pass = false
    message.push({error: 'O campo "Nome" é obrigatório'})
  }
  
  if (!user) {
    pass = false
    message.push({error: 'O campo "User" é obrigatório'})
  }

  if (!pass) {
    res.status(422).json({
      message
    })
    return
  }

  const list = {
    name,
    user,
    status: 'open'
  }

  try {
    await Lists.create(list)

    res.status(201).json({
      success: true,
      data: list
    })
  } catch (error) {
    res.status(500).json({error})
  }
})

router.get('/:id', async (req, res) => {
  const _id = req.params.id

  try {
    const lists = await Lists.find({user: _id})

    res.status(200).json({
      success: true,
      data: lists
    })
  } catch (error) {
    res.status(500).json({error})
  }
})

router.get('/byid/:id', async (req, res) => {
  const _id = req.params.id

  try {
    const lists = await Lists.find({user: _id})

    res.status(200).json({
      success: true,
      data: lists
    })
  } catch (error) {
    res.status(500).json({error})
  }
})

router.post('/create/:id', async (req, res) => {
  const _id = req.params.id

  const { item } = req.body

  const lists = await Lists.findOne({_id})

  const items = [
    ...lists.items,
    item
  ]

  try {

    const list = await Lists.updateOne({_id}, {
      items
    })

    res.status(200).json({
      success: true,
      data: list
    })
  } catch (error) {
    res.status(500).json({error})
  }
})


router.post('/changeStatus/:id', async (req, res) => {
  const _id = req.params.id
  const { status } = req.body

  const lists = await Lists.findOne({_id})

  try {
    await Lists.updateOne({_id}, {
      status
    })

    lists.status = status

    res.status(200).json({
      success: true,
      data: lists
    })
  } catch (error) {
    res.status(500).json({error})
  }
})


router.post('/changeStatusTodo/:id', async (req, res) => {
  const _id = req.params.id
  const { status } = req.body

  const lists = await Lists.findOne({"items._id": _id})

  const items = lists.items.map(item => {
    if (_id === item._id.toString()) {
      const newItem = {
        name: item.name,
        _id: item._id,
        status
      }
      return newItem
    }

    return item
  })

  try {
    await Lists.updateOne({_id: lists._id}, {
      items
    })

    res.status(200).json({
      success: true,
      data: items
    })
  } catch (error) {
    res.status(500).json({error})
  }
})

module.exports = router