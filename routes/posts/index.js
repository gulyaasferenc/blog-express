const { Post } = require('../../database')
const { Comment } = require('../../database')

module.exports = {
  getPosts: async function (req, res) {
    try {
      const pageNum = req.params.pageNum
      const posts = await Post.findAll({
        order: [
          ['createdAt', 'DESC']
        ],
        offset: Number(pageNum) * 10,
        limit: 10,
        include: [{ model: Comment, as: 'comments' }]
      })
      res.status(200).json({ message: 'got posts', data: posts })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Something went wrong', error: error })
    }
  },
  getOnePost: async function (req, res) {
    try {
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
  }
}