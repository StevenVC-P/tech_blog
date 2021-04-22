const { Comments } = require('../models');

const commentData = [
  {
    comment_text: "Super helful, thank you!",
    post_id: 2,
    user_id: 1
  },
  {
    comment_text: "Handlebars have been amazing to making interactive sites.",
    post_id: 1,
    user_id: 2
  }

];

const seedComments = () => Comments.bulkCreate(commentData);

module.exports = seedComments;