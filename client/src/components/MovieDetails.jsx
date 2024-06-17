import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../screens/navbar";
import StarRating from "./StarRating";

const MovieDetails = () => {
  const { postId } = useParams();
  const [movie, setMovie] = useState({
    initialImgUrl: "",
    initialMovieTitle: "",
    initialReleaseYear: "",
    initialGenre: "",
    initialDescription: "",
    reviews: [],
  });
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_Backend_URL}/posts/${postId}/getMovieDetails`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await response.json();
        if (data.success) {
          setMovie({
            initialImgUrl: data.imgUrl || "",
            initialMovieTitle: data.movieTitle || "",
            initialReleaseYear: data.releaseYear || "",
            initialGenre: data.genre || "",
            initialDescription: data.description || "",
            reviews: data.reviews || [],
          });
        } else {
          console.error("Failed to fetch movie details");
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (postId && token) {
      getMovieDetails();
    }
  }, [postId, token]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <>
      <Navbar />
      <Box p={2} style={{marginLeft:"5%"}}>
        <div style={{ width: "50%", overflow: "hidden", borderRadius: "8px" }}>
          <img
            src={movie.initialImgUrl}
            alt={movie.initialMovieTitle}
            style={{ width: "50%", height: "70%", borderRadius: "8px" }}
          />
        </div>
        <Box mt={2}>
          <Typography variant="h6" gutterBottom>
            <span>Movie Title:</span>{" "}
            <span style={{ color: "#666" }}> {movie.initialMovieTitle}</span>
          </Typography>
          <Typography variant="h6" gutterBottom>
            <span>Release Date:</span>{" "}
            <span style={{ color: "#666" }}> {movie.initialReleaseYear}</span>
          </Typography>
          <Typography variant="h6" gutterBottom>
            <span>Genre:</span>{" "}
            <span style={{ color: "#666" }}> {movie.initialGenre}</span>
          </Typography>
          <Typography style={{ marginTop: "0.5rem" }} variant="h6" gutterBottom>
            <span>Description:</span>
            <p
              className="description text-justify"
              style={{
                fontSize: "14px",
                color: "#666",
                lineHeight: "1.6",
                // maxHeight: "70px",
                // overflow: "hidden",
              }}
            >
              {movie.initialDescription}:""
            </p>
          </Typography>
        </Box>

        <Box mt={4}>
          <Typography variant="h5" gutterBottom>
            Reviews
          </Typography>
          <List>
            {movie.reviews.map((review, index) => (
              <React.Fragment key={index}>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={review.userName}
                    secondary={
                      <>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "8px",
                          }}
                        >
                          <StarRating value={review.rating} readOnly />
                          <Typography
                            component="span"
                            variant="body2"
                            color="textPrimary"
                            style={{ marginLeft: "8px" }}
                          >
                            {review.rating} stars
                          </Typography>
                        </div>
                        <Typography variant="body2" color="textSecondary">
                          {review.review}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                {index < movie.reviews.length - 1 && <Divider component="li" />}
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Box>
    </>
  );
};

export default MovieDetails;
