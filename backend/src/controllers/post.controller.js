const PostModel = require("../models/post.model");
const createHttpError = require("http-errors");
const { default: mongoose } = require("mongoose");

//when bad request throw createHttpError(400,"message d'erreur")

module.exports.getPosts = async (req, res, next) => {
  try {
    const posts = await PostModel.find();
    if (!posts) {
      throw createHttpError(404, "null");
    }
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

module.exports.setPost = async (req, response) => {
  //error message
  if (!req.body.message) {
    throw createHttpError(400, "merci de add message");
    // response.status(400).json({ message: "merci de add message" });
  }

  const post = await PostModel.create({
    message: req.body.message,
    author: req.body.author,
  });
  //facultatif
  response.status(200).json(post);
  //   response.json({ message: "ça fonctionne!" });
};

module.exports.updatePost = async (req, res) => {
  const postId = req.params.id;

  if (!mongoose.isValidObjectId(postId)) {
    throw createHttpError(400, "id invalid");
  }

  const post = await PostModel.findById(postId);

  if (!post) {
    res.status(400).json({ message: "Ce post n'existe pas" });
  }

  const updatePost = await PostModel.findByIdAndUpdate(post, req.body, {
    new: true,
  });

  //or just
  //post.params = newParams aka req.param.newParam;
  // const updatedPost = await post.save();
  // res.status(200).json(updatedNote);

  res.status(200).json(updatePost);
};

module.exports.deletePost = async (req, res) => {
  const post = await PostModel.findById(req.params.id);

  if (!post) {
    res.status(400).json({ message: "Ce post n'existe pas" });
  }
  await post.deleteOne();
  res.status(200).json("Message supprimé " + req.params.id);
};

module.exports.likePost = async (req, res) => {
  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likers: req.body.userId } },
      { new: true }
    ).then((data) => res.status(200).send(data));
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports.dislikePost = async (req, res) => {
  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { likers: req.body.userId } },
      { new: true }
    ).then((data) => res.status(200).send(data));
  } catch (err) {
    res.status(400).json(err);
  }
};

// corps standard

/*
module.exports.getPosts = async (req, res, next) => {
  const postId = req.params.id;

  //test a parameters
  if (!req.body.message) {
    throw createHttpError(400, "merci de add message");
  }
  //test the object we search with id
  if (!mongoose.isValidObjectId(postId)) {
    throw createHttpError(400, "id invalid");
  }

  try {
    const posts = await PostModel.find();
    if (!posts) {
      throw createHttpError(404, "null");
    }
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};
*/
