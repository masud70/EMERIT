module.exports = {
    createPost: (req, res, next) => {
        const data = req.body;

        req.db.Post.create({
            body: data.body,
            time: new Date().getTime() / 1000,
            UserId: data.auth.userId
        })
            .then(resp => {
                console.log(resp);
                if (resp) {
                    req.io.emit('loadPost', resp);
                    res.json({
                        status: true,
                        data: resp,
                        message: 'Post created successfully.'
                    });
                } else
                    next(
                        'There was an error creating the post. Please try again.'
                    );
            })
            .catch(error => next(error.message));
    },

    getAllPost: async (req, res, next) => {
        try {
            const posts = await req.db.Post.findAll({
                include: [
                    {
                        association: 'User',
                        attributes: ['username', 'name', 'avatar']
                    }
                ],
                order: [['createdAt', 'DESC']]
            });

            let retData = [];

            for (let i = 0; i < posts.length; i++) {
                const comments = await req.db.Comment.findAll({
                    where: { PostId: posts[i].id },
                    include: [
                        {
                            association: 'User',
                            attributes: ['username', 'name', 'avatar']
                        }
                    ],
                    order: [['createdAt', 'DESC']]
                });

                console.log(comments);

                const { rows } = await req.db.Reaction.findAndCountAll({
                    where: { PostId: posts[i].id },
                    group: ['type']
                });

                const cmnts = { comments: comments };
                const reactions = { reactions: rows };

                retData.push({
                    ...posts[i].dataValues,
                    ...cmnts,
                    ...reactions
                });
            }

            res.json({
                status: true,
                data: retData,
                message: 'Data found.'
            });
        } catch (error) {
            next(error.message);
        }
    },

    postComment: (req, res, next) => {
        data = req.body;

        req.db.Comment.create({
            body: data.body,
            time: new Date().getTime() / 1000,
            UserId: data.auth.userId,
            PostId: data.postId
        })
            .then(resp => {
                if (resp) {
                    req.io.emit('loadPost', resp);
                    res.json({
                        status: true,
                        data: resp,
                        message: 'Comment posted.'
                    });
                } else next('There was an error. Please try again.');
            })
            .catch(error => next(error.message));
    },

    reactionHandler: (req, res, next) => {
        const data = req.body;

        req.db.Reaction.findOne({
            where: { UserId: data.auth.userId, PostId: data.postId }
        })
            .then(resp => {
                if (resp && resp.type !== data.type) {
                    req.db.Reaction.update(
                        { type: data.type },
                        {
                            where: {
                                UserId: resp.userId,
                                PostId: resp.postId,
                                id: resp.id
                            }
                        }
                    )
                        .then(resp2 => {
                            req.io.emit('loadPost', resp2);
                            res.json({
                                status: true,
                                message: 'Reaction updated.'
                            });
                        })
                        .catch(error2 => next(error2.message));
                } else if (!resp) {
                    req.db.Reaction.create({
                        type: data.type,
                        UserId: data.auth.userId,
                        PostId: data.postId
                    })
                        .then(resp3 => {
                            req.io.emit('loadPost', resp3);
                            res.json({
                                status: true,
                                message: 'Reaction added.'
                            });
                        })
                        .catch(error3 => next(error3));
                } else next('Reaction already exists.');
            })
            .catch(error => next(error.message));
    }
};
