// Dependencies
// the router and the database
const router = require('express').Router();
const sequelize = require('../config/connection');
// the models
const { User, Posts, Comments } = require('../models/Index');
// the authorization middleware to redirect unauthenticated users to the login page
const withAuth = require('../utils/auth')

router.get('/', withAuth, (req,res) => {
    Posts.finaAll({
        where: {user_id: req.session.user_id
        },
        attributes:[
            'id',
            'post_text',
            'title',
            'create_at',
        ],
        include:[
            {
                model: Comments,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
    // serialize data before passing to template
    const posts = dbPostData.map(post => post.get({ plain:true}));
    res.render('dashboard', {posts, loggedIn:true});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/edit/:id', withAuth, (req,res) => {
    Posts.findOne({
        where: {id: req.params.id
        },
        attributes:[
            'id',
            'post_text',
            'title',
            'create_at',
        ],
        include:[
            {
                model: Comments,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
      // if no post by that id exists, return an error
      if(!dbPostData){
          res.status(404).json({message:'No post found with this id'});
          return;
      }
      // serialize data before passing to template
      const posts = dbPostData.map(post => post.get({ plain:true}));
      res.render('dashboard', {posts, loggedIn:true});
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

router.get('/edituser', withAuth, (req,res) => {
    User.findOne({
        attributes: {exclude: ['password']},
        where:{
            id: req.session.user_id
        }
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({message:'No user found with this id'});
            return;
        }  
        const user = dbPostData.map(post => post.get({ plain:true}));
        res.render('dashboard', {user, loggedIn:true});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});
  
module.exports = router;