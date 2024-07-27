import React, { useCallback, useEffect, useState } from "react";
import MoviesList from "./components/MoviesList";
import { Button } from "react-bootstrap";
import AddMovies from "./components/AddMovies";
import Loader from "./components/Loader";

function App() {
  const [moviesData, setMoviesData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteDataID, setDeleteDataID] = useState("");
  const [retry, setRetry] = useState(false);

  const fetchDataHandler = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await fetch(
        "https://moviesapi-5313e-default-rtdb.firebaseio.com/movies.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong...");
      }
      const data = await response.json();
      const loadedMovies = [];

      for (let key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          opening_crawl: data[key].opening_crawl,
          director: data[key].director,
        });
      }

      setMoviesData(loadedMovies);
    } catch (error) {
      setError(error.message);
      setRetry(true);
      console.log(error);
    }
    setLoading(false);
  }, []);

  const addMovieDataHandler = async (movie) => {
    try {
      const response = await fetch(
        "https://moviesapi-5313e-default-rtdb.firebaseio.com/movies.json",
        {
          method: "POST",
          body: JSON.stringify(movie),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Invalid data");
      }

      fetchDataHandler();
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  const deleteMovieHandler = useCallback(
    async (id) => {
      try {
        const response = await fetch(
          `https://moviesapi-5313e-default-rtdb.firebaseio.com/movies/${id}.json`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          throw new Error("ID not found or wrong ID inserted");
        }

        fetchDataHandler();
      } catch (error) {
        console.log(error);
      }
    },
    [fetchDataHandler]
  );

  useEffect(() => {
    fetchDataHandler();
  }, [fetchDataHandler]);

  useEffect(() => {
    if (deleteDataID) {
      deleteMovieHandler(deleteDataID);
    }
  }, [deleteMovieHandler, deleteDataID]);
  const retryHandler = () => {
    setTimeout(() => {
      fetchDataHandler();
    }, 5000);
  };
  const retryCancelHandler = () => {
    setRetry(false);
  };

  return (
    <div>
      <h1>Movies List</h1>
      <Button
        type="submit"
        className="mt-3 text-center btn btn-primary w-auto h-75"
        onClick={fetchDataHandler}
      >
        Fetch Movies
      </Button>
      <AddMovies addMovieDataHandler={addMovieDataHandler} />
      {loading && <Loader />}
      {!loading && moviesData.length === 0 && (
        <div className="text-center mt-4 fs-3">No Data Found</div>
      )}
      {!loading && error && (
        <div className="text-center text-danger">{error}</div>
      )}
      { retry && (
        <div className="text-center">
          <Button className="w-fit-content h-25" onClick={retryHandler}>
            Retry
          </Button>
          <Button className="w-fit-content h-25" onClick={retryCancelHandler}>
            Cancel
          </Button>
        </div>
      )}
      {!loading &&
        moviesData.map((data) => {
          return (
            <MoviesList
              key={data.id}
              id={data.id}
              title={data.title}
              director={data.director}
              opening_crawl={data.opening_crawl}
              setDeleteDataID={setDeleteDataID}
            />
          );
        })}
    </div>
  );
}

export default App;
