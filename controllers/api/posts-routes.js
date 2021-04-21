const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Posts, Comments } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req,res) => {
    Posts.findAll({
        attributes: [
            'id',
            'post_title',
            'title',
            'created-at',
        ],

    order:[[ 'created_at', 'DESC']],

    include:[
        {
            model: User,
            attributes: ['username']
        },
        {
            model:Comments,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
            }
        }
    ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (res,req) => {
    Posts.findOne({
        attributes: [
            'id',
            'post_title',
            'title',
            'created-at',
        ],

        include:[
        {
            model: User,
            attributes: ['username']
        },
        {
            model:Comments,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
            }
        }
    ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/:id', withAuth, (req,res) => {
    Posts.update(req.body,
        {
            where: {
                id: req.params.id
            }
        }
    ).then(dbPostData => {
        if(!dbPostData){
            res.status(404).json({ message: 'No post found with this id'});
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/:id', withAuth, (req, res) => {
    Post.update(req.body,
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;