import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

// props data came from homePage/index.jsx
const PostsWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  // get all the  post of the user for the movies
  const getPosts = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_Backend_URL}/posts/${userId}`,
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
    <>
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
    </>
  );
};

export default PostsWidget;
