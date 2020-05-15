const {testConnection} = require('./startDb')
const User = require('./model/user')
const Post = require('./model/post')
const Comment = require('./model/comment')

module.exports = {
  testConnection,
  User,
  Post,
  Comment
}