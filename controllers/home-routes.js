const sequelize = require('../config/connection');
const { User, Posts, Comments } = require('../models');
const router = require('express').Router();

router.get('/', (req, res) => {
    Posts.findAll({
        attributes:[
            'id',
            'title',
            'content',
            'created_at',
        ],
        include:[
            {
            model: Comments,
            attributes:['id','comment_text','post_id','user_id', 'created_at'],
            include:{
                model: User,
                attributes:['username']
            }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
});

router.get('/post/:id', (req, res) =>{
    Posts.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'content',
            'title',
            'created_at'
        ],
        include: [{
            model: Comments,
            attributes:['id','comment_text','post_id','user_id', 'created_at'],
            include:{
                model: User,
                attributes:['username']
            }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        if(!dbPostData) { 
        res.status(404).json({message: 'No post found with this id'});
        return;
        }
        const post = dbPostData.get({ plain:true });
        res.render('single-post',{ post, loggedIn: req.session.length});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
router.get('/posts-comments', (req,res) => {
    Posts.findOne({
        where:{
            id: req.params.id
        },
        attributes: [
            'id',
            'content',
            'title',
            'created_at'
        ],
        include: [{
            model: Comments,
            attributes:['id','comment_text','post_id','user_id', 'created_at'],
            include:{
                model: User,
                attributes:['username']
            }
        },
            {
                model: User,
                attributes: ['username']
            },
        ]
        .then(dbPostData => {
            if(!dbPostData) { 
            res.status(404).json({message: 'No post found with this id'});
            return;
            }
            const post = dbPostData.get({ plain:true });
            res.render('single-post',{ post, loggedIn: req.session.length});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    });
});

module.exports = router;