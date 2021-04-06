const router = require('express').Router();


const homeRoutes = require('../homeRoutes');
const commentRoutes= require('./commentRoutes');
const userRoutes= require('./userRoutes');
const postRoutes= require('./postRoutes');

//using routes
// router.use('/', homeRoutes);
// router.use('/api/comments',commentRoutes);
// router.use('/api/users',userRoutes);
// router.use('/api/posts',postRoutes);
router.use('/', homeRoutes);
router.use('/comments',commentRoutes);
router.use('/users',userRoutes);
router.use('/posts',postRoutes);

module.exports = router;
