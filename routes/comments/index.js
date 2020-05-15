const Comment = require('../../database/model/comment')

module.exports = {
  createComment: async function (req, res) {
    try {
      const comment = await Comment.create(req.body)
      res.status(201).json({ message: 'Comment created', data: comment })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Something went wrong', error: error })
    }
  },
  deleteComment: async function (req, res) {
    try {
      const deleted = await Comment.destroy({
        where: { id: req.params.commentId }
      })
      res.status(200).json({ message: 'Comment deleted', data: deleted })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Something went wrong', error: error })
    }
  }
}