import React from "react";

import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function Loader() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress sx={{ color: "black" }} />
      <Typography sx={{ fontFamily: "Rubik, sans-serif", mt: "1rem" }}>
        Data Loading...
      </Typography>
    </Box>
  );
}

export default Loader;
