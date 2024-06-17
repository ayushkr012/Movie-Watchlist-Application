import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state";
import PostWidget from "./PostWidget";
import "../css/PostsWidget.css";

// props data came from  watched folder for  differentiate the watch and unwatched movies
const PostsWidget = ({ watchedMovie, unwatchedMovie }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const { _id } = useSelector((state) => state.user);

  // get all the  post of the user for the movies
  const getPosts = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_Backend_URL}/posts/${_id}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="posts-container">
      {Array.isArray(posts) &&
        posts.map(
          ({
            _id, // id of the post
            userId,
            movieTitle,
            genre,
            releaseYear,
            description,
            imgUrl,
            videoUrl,
            watchedUnwatched,
          }) => (
            <PostWidget
              key={_id}
              postId={_id}
              postUserId={userId}
              movieTitle={movieTitle}
              description={description}
              releaseYear={releaseYear}
              genre={genre}
              watchedUnwatched={watchedUnwatched}
              imgUrl={imgUrl}
              videoUrl={videoUrl}
            />
          )
        )}
    </div>
  );
};

export default PostsWidget;
