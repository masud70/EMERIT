const { GraphQLString, GraphQLList, GraphQLInt } = require('graphql');
const db = require('../../models');
const jwt = require('jsonwebtoken');
const { ContestType, RegistrationType, QuestionType, RankListType } = require('./typeDef');
const { Op } = require('sequelize');

module.exports = {
    getAllContest: {
        type: new GraphQLList(ContestType),
        args: {},
        resolve: async (parent, args, ctx, info) => {
            try {
                const upcomingContests = await db.Contest.findAll({
                    where: {
                        start: db.sequelize.literal(
                            'CASE WHEN CONVERT(start, DECIMAL) + duration * 60 > UNIX_TIMESTAMP() THEN start ELSE NULL END'
                        )
                    },
                    order: [[db.sequelize.literal('start'), 'ASC']]
                });
                const pastContests = await db.Contest.findAll({
                    where: {
                        start: db.sequelize.literal(
                            'CASE WHEN CONVERT(start, DECIMAL) + duration * 60 <= UNIX_TIMESTAMP() THEN start ELSE NULL END'
                        )
                    },
                    order: [[db.sequelize.literal('start'), 'DESC']]
                });
                const combinedContests = upcomingContests.concat(pastContests);
                return combinedContests;
            } catch (error) {
                return [
                    {
                        status: false,
                        message: error.message
                    }
                ];
            }
        }
    },

    getContest: {
        type: ContestType,
        args: {
            id: { type: GraphQLInt }
        },
        resolve: async (parent, args, ctx, info) => {
            try {
                const contest = await db.Contest.findOne({
                    attributes: {
                        include: [
                            [db.sequelize.fn('AVG', db.sequelize.col('Ratings.value')), 'rating']
                        ],
                        exclude: ['Ratings']
                    },
                    where: { id: args.id },
                    include: ['User', db.Registration, db.Rating]
                });
                return {
                    status: true,
                    message: 'Data found',
                    ...contest.dataValues
                };
            } catch (error) {
                console.log(error);
                return {
                    status: false,
                    message: error.message
                };
            }
        }
    },

    getContestByUserId: {
        type: new GraphQLList(ContestType),
        args: {
            token: { type: GraphQLString }
        },
        resolve: async (parent, args, ctx, info) => {
            try {
                const decoded = jwt.verify(args.token, process.env.JWT_SECRET);
                const upcomingContests = await db.Contest.findAll({
                    where: {
                        UserId: decoded.userId,
                        start: db.sequelize.literal(
                            'CASE WHEN CONVERT(start, DECIMAL) + duration * 60 > UNIX_TIMESTAMP() THEN start ELSE NULL END'
                        )
                    },
                    include: [db.Question, db.User],
                    order: [[db.sequelize.literal('start'), 'ASC']]
                });
                const pastContests = await db.Contest.findAll({
                    where: {
                        UserId: decoded.userId,
                        start: db.sequelize.literal(
                            'CASE WHEN CONVERT(start, DECIMAL) + duration * 60 <= UNIX_TIMESTAMP() THEN start ELSE NULL END'
                        )
                    },
                    include: [db.Question, db.User],
                    order: [[db.sequelize.literal('start'), 'DESC']]
                });
                const combinedContests = upcomingContests.concat(pastContests);

                return combinedContests;
            } catch (error) {
                return {
                    status: false,
                    message: error.message
                };
            }
        }
    },

    getContestByContestId: {
        type: ContestType,
        args: {
            id: { type: GraphQLInt }
        },
        resolve: async (parent, args, ctx, info) => {
            try {
                const contest = await db.Contest.findOne({
                    where: { id: args.id },
                    include: [db.Question, db.User]
                });
                return contest;
            } catch (error) {
                return {
                    status: false,
                    message: error.message
                };
            }
        }
    },

    getContestQuestionOption: {
        type: ContestType,
        args: {
            id: { type: GraphQLInt }
        },
        resolve: async (parent, args, ctx, info) => {
            try {
                const contest = await db.Contest.findByPk(args.id, {
                    include: [
                        {
                            model: db.Question,
                            include: [db.Option]
                        }
                    ]
                });

                return contest;
            } catch (error) {
                return {
                    status: false,
                    message: error.message
                };
            }
        }
    },

    getAllQuestionByUserId: {
        type: new GraphQLList(QuestionType),
        args: {
            token: { type: GraphQLString }
        },
        resolve: async (parent, args, ctx, info) => {
            try {
                const decoded = jwt.verify(args.token, process.env.JWT_SECRET);
                const questions = await db.Question.findAll({
                    where: {
                        [Op.or]: [
                            {
                                UserId: decoded.userId
                            },
                            {
                                privacy: 'public'
                            }
                        ]
                    }
                });

                return questions;
            } catch (error) {
                return {
                    status: false,
                    message: error.message
                };
            }
        }
    },

    getUserQuestions: {
        type: new GraphQLList(QuestionType),
        args: {
            token: { type: GraphQLString }
        },
        resolve: async (parent, args, ctx, info) => {
            try {
                const { userId } = jwt.verify(args.token, process.env.JWT_SECRET);
                const questions = await db.Question.findAll({
                    attributes: {
                        include: [
                            [
                                db.sequelize.literal(`
                                  (SELECT COUNT(*) FROM Submissions
                                  WHERE Submissions.QuestionId = Question.id)
                                `),
                                'tried'
                            ],
                            [
                                db.sequelize.literal(`
                              (SELECT COUNT(*) FROM Submissions
                              WHERE Submissions.QuestionId = Question.id
                              AND Submissions.solution = Question.answer)
                            `),
                                'solveCount'
                            ],
                            [
                                db.sequelize.literal(`
                                  EXISTS (
                                    SELECT *
                                    FROM Submissions
                                    WHERE Submissions.QuestionId = Question.id
                                    AND Submissions.UserId = :userId
                                    AND Submissions.solution = Question.answer
                                  )
                                `),
                                'isSolved'
                            ]
                        ]
                    },
                    include: [
                        {
                            model: db.User,
                            as: 'User',
                            where: { id: userId }
                        }
                    ],
                    replacements: { userId },
                    order: [['createdAt', 'DESC']]
                });

                return questions.map(item => item.dataValues);
            } catch (error) {
                return {
                    status: false,
                    message: error.message
                };
            }
        }
    },

    getRegistrationStatus: {
        type: RegistrationType,
        args: {
            id: { type: GraphQLInt },
            token: { type: GraphQLString }
        },
        resolve: async (parent, args, ctx, info) => {
            try {
                const decoded = jwt.verify(args.token, process.env.JWT_SECRET);
                const reg = await db.Registration.findOne({
                    where: { ContestId: args.id, UserId: decoded.userId }
                });

                return {
                    status: true,
                    message: 'Registered!',
                    ...reg.dataValues
                };
            } catch (error) {
                return {
                    status: false,
                    message: error.message
                };
            }
        }
    },

    getRankList: {
        type: RankListType,
        args: {
            type: { type: GraphQLInt },
            id: { type: GraphQLInt }
        },
        resolve: async (parent, args, ctx, info) => {
            try {
                const contest = await db.Contest.findByPk(args.id);

                const time = (parseInt(contest.start) + contest.duration * 60) * 1000;

                if ((time >= new Date().getTime() || !contest.resultPublished) && args.type === 1) {
                    return {
                        status: false,
                        message: 'Ranklist not published yet.',
                        title: contest.title
                    };
                }

                const whereCondition = args.type === 1 ? { ContestId: args.id } : {};

                const RankingList = await db.Submission.findAll({
                    attributes: [
                        'UserId',
                        [db.sequelize.literal('User.name'), 'name'],
                        [
                            db.sequelize.fn(
                                'SUM',
                                db.sequelize.literal(
                                    'CASE WHEN Question.answer = Submission.solution THEN 1 ELSE 0 END'
                                )
                            ),
                            'correct'
                        ],
                        [
                            db.sequelize.fn(
                                'SUM',
                                db.sequelize.literal(
                                    `CASE
                                        WHEN Submission.solution IS NOT NULL
                                        AND Question.id NOT IN (
                                            SELECT s2.QuestionId
                                            FROM Submissions AS s2
                                        WHERE s2.UserId = Submission.UserId
                                            AND s2.ContestId = Submission.ContestId
                                            AND s2.solution IS NOT NULL
                                            AND s2.solution = Question.answer
                                    ) THEN 1
                                    ELSE 0
                                  END`
                                )
                            ),
                            'incorrect'
                        ],
                        [
                            db.sequelize.fn(
                                'SUM',
                                db.sequelize.literal(
                                    'CASE WHEN Question.answer = Submission.solution THEN Question.marks ELSE 0 END'
                                )
                            ),
                            'marks'
                        ],
                        [
                            db.sequelize.literal(
                                'ROW_NUMBER() OVER (ORDER BY SUM(CASE WHEN Question.answer = Submission.solution THEN Question.marks ELSE 0 END) DESC)'
                            ),
                            'rank'
                        ]
                    ],
                    include: [db.User, db.Question, db.Contest],
                    where: whereCondition,
                    group: ['UserId'],
                    order: [[db.sequelize.literal('marks'), 'DESC']]
                });

                return {
                    status: true,
                    message: 'Ranklist published.',
                    title: contest.title,
                    Submissions: RankingList.map(item => item.dataValues)
                };
            } catch (error) {
                return {
                    status: false,
                    message: error.message
                };
            }
        }
    },

    getOverallRank: {
        type: RankListType,
        args: {
            token: { type: GraphQLString }
        },
        resolve: async (parent, args, ctx, info) => {
            try {
                const { userId } = jwt.verify(args.token, process.env.JWT_SECRET);
                const RankingList = await db.Submission.findAll({
                    attributes: [
                        'UserId',
                        [db.sequelize.literal('User.name'), 'name'],
                        [
                            db.sequelize.fn(
                                'SUM',
                                db.sequelize.literal(
                                    'CASE WHEN Question.answer = Submission.solution THEN 1 ELSE 0 END'
                                )
                            ),
                            'correct'
                        ],
                        [
                            db.sequelize.fn(
                                'SUM',
                                db.sequelize.literal(
                                    `CASE
                              WHEN Submission.solution IS NOT NULL
                              AND Question.id NOT IN (
                                SELECT s2.QuestionId
                                FROM Submissions AS s2
                                WHERE s2.UserId = Submission.UserId
                                AND s2.ContestId = Submission.ContestId
                                AND s2.solution IS NOT NULL
                                AND s2.solution = Question.answer
                              ) THEN 1
                              ELSE 0
                            END`
                                )
                            ),
                            'incorrect'
                        ],
                        [
                            db.sequelize.fn(
                                'SUM',
                                db.sequelize.literal(
                                    'CASE WHEN Question.answer = Submission.solution THEN Question.marks ELSE 0 END'
                                )
                            ),
                            'marks'
                        ],
                        [
                            db.sequelize.literal(
                                'ROW_NUMBER() OVER (ORDER BY SUM(CASE WHEN Question.answer = Submission.solution THEN Question.marks ELSE 0 END) DESC)'
                            ),
                            'rank'
                        ]
                    ],
                    include: [db.User, db.Question, db.Contest],
                    where: {
                        '$Contest.resultPublished$': true
                    },
                    group: ['UserId'],
                    order: [[db.sequelize.literal('marks'), 'DESC']]
                });

                const extraEntryIndex = RankingList.findIndex(entry => entry.UserId === userId);

                return {
                    status: true,
                    message: 'Ranklist published.',
                    me: RankingList[extraEntryIndex].dataValues,
                    Submissions: RankingList.map(item => item.dataValues)
                };
            } catch (error) {
                return {
                    status: false,
                    message: error.message
                };
            }
        }
    },

    getQuestion: {
        type: QuestionType,
        args: {
            token: { type: GraphQLString },
            id: { type: GraphQLString }
        },
        resolve: async (parent, args, ctx, info) => {
            try {
                const { userId } = jwt.verify(args.token, process.env.JWT_SECRET);
                const question = await db.Question.findOne({
                    where: { UserId: userId, id: args.id },
                    include: [db.Option]
                });
                return question;
            } catch (error) {
                return {
                    status: false,
                    message: error.message
                };
            }
        }
    }
};
