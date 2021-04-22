const User = require('./User');
const Comments = require('./Comments');
const Posts = require('./Posts');

User.hasMany(Posts,{
    foreignKey: 'user_id',
});

Posts.belongsTo(User,{
    foreignKey:'user_id',
});

Comments.belongsTo(User,{
    foreignKey:'user_id',
    onDelete:'cascase',
    hooks:true
});

Comments.belongsTo(Posts,{
    foreignKey: 'posts_id',
    onDelete:'cascase',
    hooks:true
});

Posts.hasMany(Comments,{
    foreignKey: 'posts_id',
    onDelete:'cascase',
    hooks:true
});

module.exports = { User, Comments, Posts };