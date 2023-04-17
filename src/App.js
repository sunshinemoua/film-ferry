import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getNowPlaying,
  getPopular,
  getTopRated,
  getUpcoming,
} from "./redux/movieSlice";
import "./App.scss";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

export const NavBar = () => {
  return (
    <div className="navbar">
      <h1> FilmFerry </h1>
      <div className="links-wrapper">
        <NavLink className="link" to="/">
          Movies
        </NavLink>
        <NavLink className="link" to="/tv-shows">
          TV Shows
        </NavLink>
      </div>
    </div>
  );
};

export const Footer = () => {
  return (
    <div className="footer">
      <h1> FilmFerry </h1>
      <h1> &copy; Sunshine Moua </h1>
    </div>
  );
};

export const FilmModal = ({ setShowModal, selectedFilm }) => {
  return (
    <div className="modal-wrapper">
      <div className="modal-content">
        <div className="film-info">
          <div className="button-wrapper">
            <button className="btn" onClick={() => setShowModal(false)}>
              <i className="fa fa-close"></i>
            </button>
          </div>
          <div className="modal-header">
            {selectedFilm.title ? (
              <h4 className="modal-title"> {selectedFilm.title} </h4>
            ) : (
              <h4>{selectedFilm.original_name}</h4>
            )}
          </div>
          <div className="modal-body">
            <img
              src={`https://image.tmdb.org/t/p/w400/${selectedFilm.poster_path}`}
              alt="poster"
            />
          </div>
          <div className="film-stats">
            {selectedFilm.vote_average ? (
              <p>Rating: {selectedFilm.vote_average}/10 </p>
            ) : (
              <p>Rating: N/A</p>
            )}

            {selectedFilm.release_date ? (
              <p>Release Date: {selectedFilm.release_date}</p>
            ) : (
              <p> Release Date: N/A </p>
            )}
          </div>

          <div className="overview-wrapper">
            <h4>Overview</h4>
            {selectedFilm.overview ? (
              <p> {selectedFilm.overview}</p>
            ) : (
              <p> N/A </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const CategoryPreview = (props) => {
  return (
    <div className="preview-wrapper">
      <h1>{props.header}</h1>
      <div className="films-wrapper">
        {props.movies.map((film) => {
          return (
            <div key={film.id} onClick={() => props.modalHandler(film)}>
              <img
                className="grow"
                src={`https://image.tmdb.org/t/p/w200/${film.poster_path}`}
                alt="poster"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const FilmsPage = ({
  header,
  popularTag,
  topRatedTag,
  nowPlayingTag,
  upcomingTag,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState([]);

  const { popular, topRated, nowPlaying, upcoming, loading } = useSelector(
    (state) => state.films
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPopular(popularTag));
    dispatch(getTopRated(topRatedTag));
    dispatch(getNowPlaying(nowPlayingTag));
    dispatch(getUpcoming(upcomingTag));
  }, [dispatch, popularTag, topRatedTag, nowPlayingTag, upcomingTag]);

  const modalHandler = (film) => {
    setShowModal(true);
    setSelectedFilm(film);
  };

  if (loading) <p> Loading...</p>;

  return (
    <div className="films-page-wrapper">
      <NavBar />

      {showModal && (
        <FilmModal setShowModal={setShowModal} selectedFilm={selectedFilm} />
      )}
      <h1 className="page-header">{header}</h1>
      <CategoryPreview
        modalHandler={modalHandler}
        movies={popular}
        header="Most Popular"
      />
      <CategoryPreview
        modalHandler={modalHandler}
        movies={topRated}
        header="Top Rated"
      />
      <CategoryPreview
        modalHandler={modalHandler}
        movies={nowPlaying}
        header="Now Playing"
      />
      {upcomingTag !== "" && (
        <CategoryPreview
          modalHandler={modalHandler}
          movies={upcoming}
          header="Upcoming"
        />
      )}
      <Footer />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter className="app">
      <Routes>
        <Route
          path="/"
          element={
            <FilmsPage
              header="MOVIES"
              popularTag="movie/popular"
              topRatedTag="movie/top_rated"
              nowPlayingTag="movie/now_playing"
              upcomingTag="movie/upcoming"
            />
          }
        />
        <Route
          path="/tv-shows"
          element={
            <FilmsPage
              header="TV SHOWS"
              popularTag="tv/popular"
              topRatedTag="tv/top_rated"
              nowPlayingTag="tv/on_the_air"
              upcomingTag=""
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
