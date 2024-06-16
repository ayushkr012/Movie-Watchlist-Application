import Movies from "../models/Movies.js";

/* CREATE Movie */
export const createMovie = async (req, res) => {
  try {
    const {
      userId,
      movieTitle,
      genre,
      releaseYear,
      description,
      imgUrl,
      videoUrl,
    } = req.body;

    const newPost = new Movies({
      userId,
      movieTitle,
      genre,
      releaseYear,
      // watchedUnwatched: false,
      description: description.length > 0 ? description : "",
      imgUrl: imgUrl ? imgUrl : "",
      videoUrl: videoUrl ? videoUrl : "",
    });

    await newPost.save();

    const posts = await Movies.find().sort({ _id: -1 });
    res.status(201).json(posts);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

/* GET getFeedMovies*/
export const getFeedMovies = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Movies.find({ userId }).sort({ _id: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

/* Update the watched and unwatched the movies */
export const watchedUnwatched = async (req, res) => {
  try {
    const { id } = req.params; // id of the post
    const { userId, postUserId } = req.body;
    const post = await Movies.findById(id);

    // here we check if the user already watched the movies or not
    const watchedUnwatched = post.watchedUnwatched;

    // if the user already watched the movies then we remove the watched true
    if (watchedUnwatched) {
      post.watchedUnwatched = false;
    } else {
      // if the user not watched the movies then we add the watched true
      post.watchedUnwatched = true;
    }
    // after that we return the updated post
    const updatedPost = await post.save();

    await updatedPost.save();

    res.status(200).json({
      updatedPost: updatedPost,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

/* DELETE Movie */

export const deleteMovie = async (req, res) => {
  try {
    const { PostId } = req.params;
    await Movies.findByIdAndDelete(PostId);

    let posts = await Movies.find().sort({ _id: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error!" });
  }
};

/* UPDATE Movie */

export const updateMovie = async (req, res) => {
  try {
    const { postId } = req.params;
    const { movieTitle, genre, releaseYear, description, imgUrl, videoUrl } =
      req.body;

    const post = await Movies.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    if (movieTitle) post.movieTitle = movieTitle;
    if (genre) post.genre = genre;
    if (releaseYear) post.releaseYear = releaseYear;
    if (description) post.description = description;

    if (imgUrl) {
      post.imgUrl = imgUrl;
      post.videoUrl = "";
    }
    if (videoUrl) {
      post.videoUrl = videoUrl;
      post.imgUrl = "";
    }

    const updatedPost = await post.save();

    res.status(200).json({
      success: true,
      message: "Post updated successfully!",
      updatedPost: updatedPost,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};
