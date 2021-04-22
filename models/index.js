const User = require('./User');
const Comment = require('./Comment');
const Post = require('./Post');

User.hasMany(Post,{
    foreignKey: 'user_id',
});

Post.belongsTo(User,{
    foreignKey:'user_id',
});

Comment.belongsTo(User,{
    foreignKey:'user_id',
    onDelete:'cascase',
    hooks:true
});

Comment.belongsTo(Post,{
    foreignKey: 'posts_id',
    onDelete:'cascase',
    hooks:true
});

Post.hasMany(Comment,{
    foreignKey: 'posts_id',
    onDelete:'cascase',
    hooks:true
});

module.exports = { User, Comment, Post };