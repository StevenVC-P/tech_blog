const sequelize = require('../config/connection');
const { User, Posts, Comments} = require('../models');

const userData = require('./user-seeds.json');
const postData = require('./post-seeds.json');
const commentData = require('./comment-seeds.json');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const post of postData) {
    await Posts.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const comment of commentData) {
    await Comments.create({
      ...comment,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedAll();