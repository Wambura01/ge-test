import React, { useState, useEffect } from "react";

import { Box, Link, Typography, Button } from "@mui/material";
import Loader from "../Loader/loader";

function Movies() {
  const [movies, setMovies] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  //fetch query
  const query = `
  query ($page: Int) {
    Page(page: $page, perPage: 20) {
      media(type: ANIME, sort: START_DATE, startDate_greater: 20200101, genre: "Action") {
        siteUrl
        title {
          native
        }
      }
    }
  }
`;

  // handle next click
  const handleNext = () => {
    setPage(page + 1);
    fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { page: page + 1 },
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((responseData) => {
        setMovies(responseData.data.Page.media);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // handle previous click
  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
      fetch("https://graphql.anilist.co", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query,
          variables: { page: page - 1 },
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((responseData) => {
          setMovies(responseData.data.Page.media);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  // fetch first 20 movies on mounting
  useEffect(() => {
    // fetch function
    const fetchMovies = async () => {
      try {
        return await fetch("https://graphql.anilist.co", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            query,
            variables: { page: 1 },
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setMovies(data.data.Page.media);
            setLoading(false);
          });
      } catch (error) {
        console.log("Error while fetching movies: ", error);
      }
    };

    fetchMovies();
  }, []);

  console.log("MOVIES: ", movies);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loading === false ? (
        <table
          style={{ border: "1px solid black", borderCollapse: "collapse" }}
        >
          <tr>
            <th
              style={{ border: "1px solid black", borderCollapse: "collapse" }}
            >
              <Typography
                sx={{ fontWeight: "bold", fontFamily: "Rubik, sans-serif" }}
              >
                Title
              </Typography>
            </th>
            <th>
              <Typography
                sx={{ fontWeight: "bold", fontFamily: "Rubik, sans-serif" }}
              >
                Site URL
              </Typography>
            </th>
          </tr>
          {movies?.map((movie) => (
            <tr key={movie.siteUrl}>
              <td
                style={{
                  textAlign: "start",
                  border: "1px solid black",
                  borderCollapse: "collapse",
                  paddingLeft: "1rem",
                  paddingRight: "1rem",
                }}
              >
                {movie.title.native}
              </td>
              <td
                style={{
                  textAlign: "start",
                  border: "1px solid black",
                  borderCollapse: "collapse",
                  paddingLeft: "1rem",
                  paddingRight: "1rem",
                }}
              >
                <Link
                  target="_blank"
                  rel="noreferrer"
                  sx={{ fontFamily: "Rubik, sans-serif" }}
                  underline="hover"
                  href={movie.siteUrl}
                >
                  {movie.siteUrl}
                </Link>
              </td>
            </tr>
          ))}
        </table>
      ) : (
        <Loader />
      )}
      {loading === false ? (
        <Box
          sx={{
            mt: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "40%",
          }}
        >
          <Button onClick={handlePrevious} variant="outlined">
            Previous
          </Button>
          <Button onClick={handleNext} variant="outlined">
            Next
          </Button>
        </Box>
      ) : (
        ""
      )}
    </Box>
  );
}

export default Movies;
