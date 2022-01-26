const router = require('express').Router();
const commentRoutes= require('./commentRoutes.js');
const userRoutes= require('./userRoutes.js');
const postRoutes= require('./postRoutes.js');

router.use('/comments',commentRoutes);
router.use('/users',userRoutes);
router.use('/posts',postRoutes);

module.exports = router;
