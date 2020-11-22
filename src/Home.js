// Packages
import React, { useState, useEffect } from "react";
import BottomScrollListener from "react-bottom-scroll-listener";
import { connect } from "react-redux";

// Project
import { cargarPeliculas } from "./action/peliculasactions";
import Tarjetas from "./components/Tarjetas";

// Assets
import Panda from "./assets/logo_org.png";
import "./styles.scss";

function Home(props) {
  const [posicionScroll, setPosicionScroll] = useState(window.scrollY);

  useEffect(() => {
    document.addEventListener("scroll", () => {
      setPosicionScroll(window.scrollY);
    });
  }, []);

  const fetchMoviesAndDispatch = () => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=f5a9acbae74c75e368a8e43b9006eb8c&page=${props.page}`
    )
      .then((res) => res.json())
      .then((data) => {
        props.cargarCatalogo(data);
      });
  };

  useEffect(fetchMoviesAndDispatch, []);

  return (
    <BottomScrollListener onBottom={fetchMoviesAndDispatch}>
      <div className="resolucion">
        <div className={`banner ${posicionScroll >= 100 ? "banner__normal" : "banner__trasparente"}`}>
          <img src={Panda} className="banner__logo animate__animated animate__bounce"/>
        </div>
        <div className="container">
          <Tarjetas peli={props.peliculas} />
        </div>
      </div>
    </BottomScrollListener>
  );
}
const mapStateToProps = (state) => {
  return {
    page: state.page,
    peliculas: state.peliculasApi,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    cargarCatalogo: (peliculas) => dispatch(cargarPeliculas(peliculas)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
