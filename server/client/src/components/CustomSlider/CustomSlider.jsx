import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

export default function CustomSlider({ onChange, value,sign,maxPrice }) {
  return (
    <Box sx={{ width: 300 }}>
      <Slider
        value={value}
        onChange={onChange}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => `${value}${sign}`}
        max={maxPrice}
      />
    </Box>
  );
}
