import {
  DeleteOutline,
  DeleteOutlined,
  EditOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Typography,
  TextField,
  useTheme,
  InputBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import Dropzone from "react-dropzone";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost, setPosts } from "state";
import { toast } from "react-toastify";
import CloudinaryUploader from "components/CloudinaryUploader";

const PostWidget = ({
  postId,
  postUserId,
  imgUrl,
  videoUrl,
  movieTitle: initialMovieTitle,
  releaseYear: initialReleaseYear,
  genre: initialGenre,
  description: initialDescription,
  watchedUnwatched,
}) => {
  const { palette } = useTheme();
  const mode = useSelector((state) => state.mode);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false); // State for edit modal
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [newDescription, setDescription] = useState(initialDescription);
  const [newMovieTitle, setMovieTitle] = useState(initialMovieTitle);
  const [newReleaseYear, setReleaseYear] = useState(initialReleaseYear);
  const [newGenre, setGenre] = useState(initialGenre);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  // Initialize CloudinaryUploader for save the edited post
  const cloudinaryUploader = CloudinaryUploader();

  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user?._id);

  const main = palette?.neutral?.main;
  const primary = palette?.primary?.main;

  /* -----------------------------> Edit Post Implementation --------------------------< */
  const handleEditPost = async () => {
    try {
      let imgUrl = null;
      let videoUrl = null;

      // Upload image if image is selected
      if (image != null) {
        // Get signature for Image upload
        const { timestamp: imgTimestamp, signature: imgSignature } =
          await cloudinaryUploader.getSignatureForUpload("images");
        console.log("imgTimestamp", imgTimestamp, "imgSignature", imgSignature);
        // Upload image file
        imgUrl = await cloudinaryUploader.uploadFile(
          image,
          "image",
          imgTimestamp,
          imgSignature
        );
      }

      // Upload video if video is selected
      if (video != null) {
        // Get signature for video upload
        const { timestamp: videoTimestamp, signature: videoSignature } =
          await cloudinaryUploader.getSignatureForUpload("videos");
        // Upload video file
        videoUrl = await cloudinaryUploader.uploadFile(
          video,
          "video",
          videoTimestamp,
          videoSignature
        );
      }

      const response = await fetch(
        `${process.env.REACT_APP_Backend_URL}/posts/${postId}/editPost`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            description: newDescription,
            imgUrl,
            videoUrl,
            genre: newGenre,
            releaseYear: newReleaseYear,
            movieTitle: newMovieTitle,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        dispatch(setPost({ post: data.updatedPost }));
        toast.success("Post updated successfully", { autoClose: 1000 });
        setOpenEditModal(false);
        setImage(null);
        setVideo(null);
        setDescription(initialDescription);
        setGenre(initialGenre);
        setReleaseYear(initialReleaseYear);
        setMovieTitle(initialMovieTitle);
      } else {
        // If response.ok is false, handle error
        toast.error("Failed to edit post");
      }
    } catch (error) {
      console.error("Error editing post:", error);
      toast.error("Error editing post");
    }
  };

  /* ----------------- Delete Post Implementation -----------------  */

  const handleDeletePost = async () => {
    try {
      setOpenDeleteDialog(false);
      const response = await fetch(
        // here we pass the postId to delete the post
        // and the loggedInUserId to and isProfile to check when user is on the profile page then we return only userAllPost when user
        // is on the home page then we return all the post
        `${process.env.REACT_APP_Backend_URL}/posts/${postId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const posts = await response.json();
        dispatch(setPosts({ posts }));
        toast.success("Post deleted successfully", { autoClose: 1000 });
      } else {
        toast.error("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Error deleting post");
    }
  };

  return (
    <WidgetWrapper m="2rem 0">
      <div className="movie-card">
        <div className="movie-card card">
          <img className="card-img-top" src={imgUrl} alt="" />
          <div className="card-body">
            <h4 className="card-title">{initialMovieTitle}</h4>
            <h6 className="card-subtitle mb-2 text-muted">{initialGenre}</h6>
            <p className="text-justify" style={{ fontSize: "14px" }}>
              {initialDescription}
            </p>
          </div>
          <div className="card-footer">
            <div className="clearfix">
              <div className="float-left mt-1">
                {/* <StarRating rating={props.movie.rating} /> */}
              </div>
              <div className="card-footer-badge float-right badge badge-primary badge-pill">
                {/* {props.movie.rating} */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <form>
        <TextField
          label="movieTitle"
          type="text"
          name="movieTitle"
          value={newMovieTitle}
          onChange={(e) => setMovieTitle(e.target.value)}
          placeholder="Movie Title"
          margin="normal"
          fullWidth={!isNonMobileScreens}
          sx={{ gridColumn: "span 2" }}
        />
        <TextField
          label="releaseYear"
          type="text"
          name="releaseYear"
          value={newReleaseYear}
          onChange={(e) => setReleaseYear(e.target.value)}
          placeholder="Release Year"
          margin="normal"
          fullWidth={!isNonMobileScreens}
          sx={{ gridColumn: "span 2" }}
        />

        <TextField
          releaseYear
          label="genre"
          type="number"
          name="genre"
          value={newGenre}
          onChange={(e) => setGenre(e.target.value)}
          placeholder="Genre"
          margin="normal"
          fullWidth={!isNonMobileScreens}
          sx={{ gridColumn: "span 2" }}
        />
        <TextField
          label="description"
          type="text"
          name="description"
          value={newDescription}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          margin="normal"
          fullWidth={!isNonMobileScreens}
          sx={{ gridColumn: "span 2" }}
        />
      </form> */}

      {/*  -----------------------> watched and unwatched, Comment and edit Section ----------------------------< */}
      <FlexBetween mt="0.25rem">
        <FlexBetween>
          <FlexBetween>
            <IconButton onClick={() => setOpenDeleteDialog(true)}>
              <DeleteOutline />
            </IconButton>
            <IconButton onClick={() => setOpenEditModal(true)}>
              <EditOutlined />
            </IconButton>
          </FlexBetween>
        </FlexBetween>
      </FlexBetween>

      {/* ----------------------->   Edit Post Modal dialog --------------------< */}
      <Dialog
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        aria-labelledby="edit-post-dialog-title"
        PaperProps={{
          sx: {
            borderRadius: "2.5rem",
          },
        }}
      >
        <DialogTitle
          id="edit-post-dialog-title"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: palette.background.alt,
            color: palette.text.primary,
            fontSize: "1.2rem",
            fontWeight: "bold",
            padding: "1.5rem 0", // Adjust padding as needed
          }}
        >
          Update Post
        </DialogTitle>
        <Divider
          sx={{
            backgroundColor: palette.text.primary,
            borderTop: `1px solid ${palette.divider}`, // Add a border at the top for separation
          }}
        />

        <Divider
          sx={{
            backgroundColor: palette.text.primary,
            borderTop: `1px solid ${palette.divider}`, // Add a border at the top for separation
          }}
        />
        <DialogContent sx={{ backgroundColor: palette.background.alt }}>
          <InputBase
            placeholder="What's on your mind..."
            onChange={(e) => setDescription(e.target.value)}
            value={newDescription}
            sx={{
              width: "100%",
              backgroundColor: palette.neutral.light,
              borderRadius: "2rem",
              padding: "1rem 2rem",
            }}
          />

          {/* Container for Dropzone and image */}
          <Box position="relative" width="100%">
            {/* Dropzone component */}
            <Dropzone
              acceptedFiles={["image/*", "video/*"]} // Accept only images and videos
              multiple={false}
              onDrop={(acceptedFiles) => {
                const file = acceptedFiles[0];
                if (file.type.startsWith("image")) {
                  setImage(file);
                  setVideo(null); // Reset video if image is selected
                } else if (file.type.startsWith("video")) {
                  setVideo(file);
                  setImage(null); // Reset image if video is selected
                }
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <Box {...getRootProps()} position="relative">
                  {/* Input for Dropzone */}
                  <input {...getInputProps()} />

                  {/* when newImage are not selected then we display the curernt image or video of the post */}
                  {!image && !video && (
                    <div>
                      {/* if image in the post then we display the image */}
                      {imgUrl && (
                        <img
                          width="100%"
                          height="auto"
                          alt="post"
                          style={{
                            borderRadius: "0.75rem",
                            marginTop: "0.75rem",
                          }}
                          src={imgUrl}
                        />
                      )}
                      {/* if video in the post then we display the video */}
                      {videoUrl && (
                        <video
                          width="100%"
                          height="auto"
                          controls
                          style={{
                            borderRadius: "0.75rem",
                            marginTop: "0.75rem",
                          }}
                        >
                          <source src={videoUrl} />
                          {/* Optionally, provide fallback content here */}
                        </video>
                      )}
                    </div>
                  )}

                  {/* display when user select the image */}
                  {image && (
                    <img
                      width="100%"
                      height="auto"
                      alt="post"
                      style={{
                        borderRadius: "0.75rem",
                        marginTop: "0.75rem",
                      }}
                      src={URL.createObjectURL(image)}
                    />
                  )}

                  {/* display when user select the video */}
                  {video && (
                    <video
                      width="100%"
                      height="auto"
                      controls
                      style={{
                        borderRadius: "0.75rem",
                        marginTop: "0.75rem",
                      }}
                    >
                      <source src={URL.createObjectURL(video)} />
                      {/* Optionally, provide fallback content here */}
                    </video>
                  )}

                  {/* Render edit icon at the top right corner when image or video is not selected*/}
                  {!image && !video && (
                    <IconButton
                      sx={{
                        position: "absolute",
                        top: "0.5rem",
                        right: "0.5rem",
                        backgroundColor:
                          mode === "dark"
                            ? palette.grey[800]
                            : palette.grey[200],
                        borderRadius: "50%",
                        "&:hover": {
                          backgroundColor:
                            mode === "dark"
                              ? palette.grey[900]
                              : palette.grey[300],
                        },
                        "& .MuiIconButton-label": {
                          fontSize: "1.5rem",
                        },
                      }}
                    >
                      <EditOutlined />
                    </IconButton>
                  )}
                </Box>
              )}
            </Dropzone>
            {/* Render delete icon if either image or video  is selected */}
            {(image || video) && (
              <IconButton
                onClick={() => {
                  setImage(null);
                  setVideo(null);
                }}
                sx={{
                  position: "absolute",
                  top: "0.5rem",
                  right: "0.5rem",
                  backgroundColor:
                    mode === "dark" ? palette.grey[800] : palette.grey[200],
                  borderRadius: "50%",
                  "&:hover": {
                    backgroundColor:
                      mode === "dark" ? palette.grey[900] : palette.grey[300],
                  },
                  "& .MuiIconButton-label": {
                    fontSize: "1.5rem",
                  },
                }}
              >
                <DeleteOutlined />
              </IconButton>
            )}
          </Box>
        </DialogContent>

        <DialogActions
          sx={{
            justifyContent: "space-between",
            padding: "1rem",
            backgroundColor: palette.background.alt,
            borderTop: `1px solid ${palette.divider}`, // Add a border at the top for separation
          }}
        >
          <Button
            onClick={() => {
              setOpenEditModal(false);
              setImage(null);
              setVideo(null);
            }}
            sx={{
              cursor: "pointer",
            }}
          >
            Cancel
          </Button>
          {(image || newDescription !== initialDescription || video) && (
            <Button variant="contained" onClick={handleEditPost}>
              Save
            </Button>
          )}
        </DialogActions>
      </Dialog>
      {/*---------------->  Delete confirmation dialog -------------<*/}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Post?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this post?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeletePost} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </WidgetWrapper>
  );
};

export default PostWidget;
