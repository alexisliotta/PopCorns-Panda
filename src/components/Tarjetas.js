import React, { Fragment } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";
import "./styles.scss";

const Tarjetas = (props) => {
  return (
    <Fragment>
      {props.peli &&
        props.peli.map((pelicula) => {
          return (
            <Link to={`/Pelicula/${pelicula.id}`}>
              <div className="card">
                <div className="card__img">
                  <img
                    className="card__img__poster"
                    src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`}
                  ></img>
                </div>
                <div className="card__ranking">
                  <CircularProgressbar
                    maxValue={10}
                    value={pelicula.vote_average}
                    text={pelicula.vote_average}
                    styles={buildStyles({
                      strokeLinecap: "round",
                      textSize: 25,
                      pathTransitionDuration: 3,
                      pathColor: "rgb(228, 190, 65)",
                      textColor: "#ffffff",
                      trailColor: "rgba(0,0,0,0)",
                      backgroundColor: "#ffffff",
                    })}
                  />
                </div>
                <div className="card__title">
                  <h4 className="card__tarjetas">
                    {pelicula.original_title.substring(0, 17)}
                  </h4>
                </div>
              </div>
            </Link>
          );
        })}
    </Fragment>
  );
};

export default Tarjetas;