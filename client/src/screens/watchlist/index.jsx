import { Box, useMediaQuery, useTheme } from "@mui/material";
import Navbar from "../navbar";
import PostsWidget from "../widgets/PostsWidget";
import { ToastContainer } from "react-toastify";

const Watched = ({ watch, unwatch }) => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <PostsWidget watchedMovie={watch} unwatchedMovie={unwatch} />
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default Watched;
