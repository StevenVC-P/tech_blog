const User = require('./User');
const Comments = require('./Comments');
const Posts = require('./Posts');

User.hasMany(Posts,{
    foreignKey: 'posts_id',
});

Comments.belongsTo(Posts,{
    foreignKey: 'posts_id',
});

module.exports = { User, Comments, Posts };