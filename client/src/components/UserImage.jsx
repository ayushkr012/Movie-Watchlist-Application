import { Box } from "@mui/material";
import { useSelector } from "react-redux";

const UserImage = ({ image, size = "60px" }) => {
  const { picturePath } = useSelector((state) => state.user);
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={picturePath}
        // src="https://th.bing.com/th/id/OIP.XKdZgJT9MaVBqYDg-5JlvgAAAA?rs=1&pid=ImgDetMain"
      />
    </Box>
  );
};

export default UserImage;
