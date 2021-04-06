const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const sequelize = require("../config/connection");
//get all posts 
router.get("/", async (req, res) => {
  try {
    Post.findAll({
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
        },
      ],
    })
    // render what you get back -- might have to map over the data before rendering
    // res.render(allPosts)
  } catch (err) {
    console.status(500).console(err)
  }
});

//get one post
router.get("/posts/:id", async (req, res) => {
  try {
    Post.findOne({
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
  }catch(err){
    console.status(500).console(err)
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
  //    post_id: req.postID,
  res.render("edit-post", {
    loggedIn: req.session.loggedIn,
    post_id: req.params.id,
  });
});

module.exports = router;
