import React from "react";
import { IconButton } from "@mui/material";
import { Star, StarBorder } from "@mui/icons-material";

const StarRating = ({ value, onChange, readOnly = false }) => {
  const handleClick = (newValue) => {
    if (!readOnly) {
      onChange(newValue);
    }
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((starValue) => (
        <IconButton
          key={starValue}
          onClick={() => handleClick(starValue)}
          color={starValue <= value ? "primary" : "default"}
          // disabled={readOnly}
        >
          {starValue <= value ? <Star /> : <StarBorder />}
        </IconButton>
      ))}
    </div>
  );
};

export default StarRating;
