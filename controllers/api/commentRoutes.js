//import models and modules
const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

//get all the comments
router.get("/",  async(req, res) => {
 try{
    const allCom = await Comment.findAll({
    attributes: ["id", "comment_text", "user_id", "post_id"],
    include: [
      {
        model: User,
        as: "user",
        attributes: ["username"],
      },
    ],
}) 
  res.json(allCom);
}catch(err){
      console.log(err);
      res.status(500).json(err);
}
});

//get comment by id
router.get("/:id", async (req, res) => {
  try{
   const oneCom= await Comment.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "comment_text", "user_id", "post_id"],
    include: [
      {
        model: User,
        as: "user",
        attributes: ["username"],
      },
    ],
  })
      res.json(oneCom)
    }catch(err){
      console.log(err);
      res.status(500).json(err);
    };
});

//add comment
router.post("/", async(req, res) => {
  //expects comment_text, user_id, post_id
  try{
   const addCom= await Comment.create({
    comment_text: req.body.comment_text,
    user_id: req.session.user_id,
    post_id: req.body.post_id,
  })
    res.json(addCom);
}catch(err){
      console.log(err);
      res.status(500).json(err);
};
});
//update comment
router.put("/", async (req, res) => {
 await res.send(`update comment`);
});

//remove comment
router.delete("/:id", async(req, res) => {
  try{
    const delCom = await Post.destroy({
    where: {
      id: req.params.id,
    },
  })
res.json(allCom);
}catch(err){
      console.log(err);
      res.status(500).json(err);
    };
});



module.exports = router;