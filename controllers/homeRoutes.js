const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const sequelize = require("../config/connection");

//get all posts 
router.get("/", async (req, res) => {
  try {
    const allPostData = await Post.findAll({
      attributes: ["id", "post_title", "post_text", "user_id"],
      include: [
        {
          model: Comment,
          as: "comments",
          attributes: ["comment_text"],
        },
        {
          model: User,
          as: "user",
          attributes: ["name"],
        }
      ],
    })
     const allPosts = allPostData.map((post)=>post.get({plain: true}));
     console.log(allPosts)
     res.render('allposts',{allPosts, loggedIn: req.session.loggedIn})
  } catch (err) {
    res.status(500).json(err)
  }
});

//get one post
router.get("/posts/:id", async (req, res) => {
  try {
    const onePostData = await Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "title", "body", "user_id"],
      include: [
        {
          model: User,
          as: "user",
          attributes: ["username"],
        },
        {
          model: Comment,
          as: "comments",
          attributes: ["id", "comment_text", "user_id"],
        }]
    })
    const onePost = onePostData.get({plain: true});
    const userPost = post.user_id == req.session.user_id;
    res.render('single-post',{
      onePost, loggedIn: req.session.loggedIn, currentUser: userPost
    });
  }catch(err){
    res.status(500).json(err)
  }
});

//serve up the login page
router.get("/login", (req, res) => {
  console.log("Is logged in?", req.session.loggedIn);
  res.render("login", { loggedIn: req.session.loggedIn });
});

//renders create_post view 
router.get("/post", (req, res) => {
  res.render("create-post", { loggedIn: req.session.loggedIn });
});



//renders the edit-post view
router.get("/edit/:id", (req, res) => {
  res.render("edit-post", {
    loggedIn: req.session.loggedIn,
    post_id: req.params.id,
  });
});

module.exports = router;
