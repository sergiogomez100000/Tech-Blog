const router = require('express').Router();

const apiRoutes = require('./api');

const homeRoutes = require('./homeRoutes');
const commentRoutes= require('./api/commentRoutes');
const userRoutes= require('./api/userRoutes');
const postRoutes= require('./api/postRoutes');


router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/api/comments',commentRoutes);
router.use('/api/users',userRoutes);
router.use('/api/posts',postRoutes);

module.exports = router;
