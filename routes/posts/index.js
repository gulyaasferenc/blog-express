const { Post, Comment } = require('../../database')
const Sequelize = require('sequelize')

const Op = Sequelize.Op

module.exports = {
  getPosts: async function (req, res) {
    try {
      const pageNum = req.params.pageNum
      let filter = null
      if (req.params.filter === 'all') {
        filter = {
          order: [
            ['createdAt', 'DESC']
          ],
          offset: Number(pageNum) * 10,
          limit: 10,
          include: [{ model: Comment, as: 'comments' }]
        }
      } else {
        filter = {
          where: {
            [Op.or]: [
              {
                title: { [Op.iLike]: `%${req.params.filter}%` }
              },
              {
                text: { [Op.iLike]: `%${req.params.filter}%` }
              }
            ]
          },
          order: [
            ['createdAt', 'DESC']
          ],
          offset: Number(pageNum) * 10,
          limit: 10,
          include: [{ model: Comment, as: 'comments' }]
        }
      }
      const posts = await Post.findAll(filter)
      res.status(200).json({ message: 'got posts', data: posts })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Something went wrong', error: error })
    }
  },
  getOnePost: async function (req, res) {
    try {
      console.log(req.headers)
      const id = req.params.id
      const myPost = await Post.findByPk(id)
      res.status(200).json({ myPost })
    } catch (err) {
      console.log(error)
      res.status(500).json({ message: 'Something went wrong', error: error })
    }
  },
  createPost: async function (req, res) {
    try {
      const post = Post.build(req.body)
      const newPost = await post.save()
      res.status(201).json({ 'message': 'New post created', data: newPost })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Something went wrong', error: error })
    }
  },
  modifyPost: async function (req, res) {
    try {
      await Post.update(req.body, {
        where: {
          id: req.body.id
        }
      })
      res.status(201).json({ 'message': 'Post modified', data: req.body.id })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Something went wrong', error: error })
    }
  }
}