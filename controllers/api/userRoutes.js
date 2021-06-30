const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
//get all the users
router.get("/", async(req, res) => {
  try{
    console.log("FEtching /api/user")
  const allUsers = await User.findAll({
    attributes: ["id", "name", "email", "password"],
    include: [
      {
        model: Post,
        as: "posts",
        attributes: ["id", "post_title", "post_text"],
      },
      {
        model: Comment,
        as: "comments",
        attributes: ["id", "comment_text", "post_id"],
      },
    ],
  }) //include the posts and comments of this user
      res.json(allUsers);
}catch(err){
      console.log(err);
      res.status(500).json(err);
    };
});

//get user by id
router.get("/:id", async (req, res) => {
 try{
  const oneUser = await User.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "name", "email", "password"],
    include: [
      {
        model: Post,
        as: "posts",
        attributes: ["id", "post_title", "post_text"],
      },
      {
        model: Comment,
        as: "comments",
        attributes: ["id", "comment_text", "post_id"],
      },
    ],
  }) //include the posts and comments of this user
   res.json(oneUser);
}catch(err){
      console.log(err);
      res.status(500).json(err);
    };
});

//add user
router.post("/", async(req, res) => {
 try{
  const addUser = await User.create({
    //expects username, email, password
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  })
      //save the data into a session
      req.session.save(() => {
        //date from add user to session
        req.session.user_id = addUser.id;
        req.session.username = addUser.username;
        req.session.loggedIn = true;
        res.json(addUser);
      });
    }catch(err){
      res.status(500).json(err);
    };
});
//log in the user
router.post("/login", async(req, res) => {
  //find the user whose logging in
  try{
    console.log("req.body",req.body)
   const dbUserData = await User.findOne({
    where: {
      email: req.body.email,
    },
  })
  console.log("dbUserDAta",dbUserData)
    const validPassword = dbUserData.checkPassword(req.body.password);
      ///if the password isn't correct
      if (!validPassword) {
        res.status(400).json({ message: "Incorrect Password!" });
        return;
      }
  //save things into session
      req.session.save(() => {
        //declare session variables
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
        //send response
        res.json({ user: dbUserData, message: "You are now logged in!" });
      });
  }catch(err){
      console.log(err);
      res.status(500).json(err);
    };
  });
//update user
router.put("/", (req, res) => {
  try{
  res.send(`update user`)
  }catch(err){
    console.log(err);
    res.status(500).json(err)
  }
});
//delete user
router.delete("/:id", async(req, res) => {
  try{ 
  const delUser = await User.destroy({
    where: {
      id: req.params.id,
    },
  })
    res.json(dbUserData);
}catch(err){
      console.log(err);
      res.status(500).json(err);
    };
});

//Log out the user
router.post("/logout",(req, res) => {
  try{
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      // end the session
      res.status(204).end();
    });
  } else {
    res.status(404).end(); // if there was no session
  }
}catch(err){
  console.log(err);
  console.status(500).console(err)
}
});
module.exports = router;