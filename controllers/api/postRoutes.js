//import router and models
const router = require("express").Router();
const { User, Post, Comment } = require("../../models");


//add post
router.post("/", async(req, res) => {
  try{
  const newPost = await Post.create({
    title: req.body.title,
    body: req.body.body,
    user_id: req.session.user_id,
  })
      res.status(200).json(newPost)   
}catch(err){
      console.log(err);
      res.status(500).json(err);
    };
});
//remove post
router.delete("/:id", async (req, res) => {
  try{
  const delPost= await Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    res.status(200).json(delPost);
}catch(err){
      console.log(err);
      res.status(500).json(err);
    };
});

//update post
// router.put("/:id", async(req, res) => {
//   try{
//   const updatePost = await Post.update(
//     {
//       title: req.body.title,
//       body: req.body.body,
//     },
//     {
//       where: {
//         id: req.params.id,
//       },
//     }
//   )
//       res.json(updatePost);
//   }catch(err){
//       console.log(err);
//       res.json(err);
//     };
// });

// //get all the posts
// router.get("/", async(req, res) => {
//   try{
//   const allPostData= await Post.findAll({
//     attributes: ["id", "post_title", "post_text", "user_id"],
//     include: [
//       {
//         model: Comment,
//         as: "comments",
//         attributes: ["id", "comment_text", "user_id"],
//       },
//     ],
//   })
//    const allPosts = allPostData.map((post)=>post.get({plain: true}));
//    res.render('allposts',{posts})
// }catch(err){
//       console.log(err);
//       res.status(500).json(err);
//     }
// });


// //get post by id
// router.get("/:id", async(req, res) => {
//   try{
//   const onePostData = await Post.findOne({
//     where: {
//       id: req.params.id,
//     },
//     attributes: ["id", "title", "body", "user_id"],
//     include: [
//       {
//         model: Comment,
//         as: "comments",
//         attributes: ["id", "comment_text", "user_id"],
//       },
//     ],
//   })
//   const onePost = onePostData.map((post)=>post.get({plain:true}));
//   res.render('single-post',{post});
// }catch(err){
//       console.log(err);
//       res.status(500).json(err);
//     };
//   });

module.exports = router;