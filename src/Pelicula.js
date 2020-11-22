// Packages
import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import ReactTooltip from 'react-tooltip';
import { Link } from "react-router-dom";


// Project
import { guardarReparto, guardarPeliculas } from "./action/peliculasactions";

//image
import Logo from "./assets/logo_temp.png";
import avatar from "./assets/avatar.png";
import homepage from './assets/homepage.png'

//style
import "./pelicula.scss";

const Pelicula = (props) => {
  const [peliculaId, setPeliculaId] = useState(props.match.params.id);
  const [videos, setVideos] = useState();

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${peliculaId}?api_key=f5a9acbae74c75e368a8e43b9006eb8c`
    )
      .then((res) => res.json())
      .then((data) => {
        props.guardarFilm(data);
      });
  }, []);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${peliculaId}/credits?api_key=f5a9acbae74c75e368a8e43b9006eb8c`
    )
      .then((res) => res.json())
      .then((data) => {
        props.guardarCreditos(data);
      });
  }, []);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${peliculaId}/videos?api_key=f5a9acbae74c75e368a8e43b9006eb8c`
    )
      .then((res) => res.json())
      .then((data) => {
        setVideos(data);
      });
  });

  const generateActorPhoto = (profile_path) => {
    if(profile_path) {
      return `https://image.tmdb.org/t/p/original${profile_path}`;
    } 

    return avatar;
  }
  return (
    <div className='page'>
      <div className='page__banner'
         style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${props.Film.backdrop_path})`,
        }}
      >
        <Link to='/'> <img src={Logo} className='page__banner__logo'/></Link>       
        <a href={props.Film.homepage} target='_blank'>
        <img  className='page__banner__homepage' width='50px' src={homepage}/>
        </a>
      </div>      

      <div className='page__sub-banner'>
        <div className='page__sub-banner__profile'>
        <img className='page__sub-banner__profile__pic' src={`https://image.tmdb.org/t/p/w300${props.Film.poster_path}`}/>
        </div>
        <div className='page__sub-banner__info'>
          <div className='page__sub-banner__info__title'>
          <h1 className='page__sub-banner__info__title__h1'>{props.Film.original_title && props.Film.original_title.substring(0,25)}</h1>
          </div>
          <div className='page__sub-banner__info__container'>
          <h2 className='page__sub-banner__info__container__font'>Release date: {props.Film.release_date}</h2>
          </div>
          <div className='page__sub-banner__info__container'>
          <h2 className='page__sub-banner__info__container__font'>Duration: {props.Film.runtime} min</h2>
          </div>
          <div className='page__sub-banner__info__container'>
          <h2 className='page__sub-banner__info__container__font'>Original Lenguage: {props.Film.original_language} </h2>
          </div>
          <div className='page__sub-banner__info__container'>
          <h2 className='page__sub-banner__info__container__font'>Ranking: {props.Film.vote_average} </h2>
          </div>
          <div className='page__sub-banner__info__container'>
          <h2 className='page__sub-banner__info__container__font'>{props.Film.overview} </h2>
          </div>
        </div>
      </div>
      <div className='page__footer'>     
      <ReactTooltip />
      {videos && videos.results && (
          <iframe
            width="100%"
            height="60%"
            src={`https://www.youtube.com/embed/${videos.results[0].key}`}
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen
            title="video"
          />
        )}
      <h4 className='page__footer__reparto-h4'>Crew</h4>
      {props.reparto && props.reparto.cast && (
        <div className='page__footer__reparto-container'>
          {props.reparto.cast.slice(0,15).map((credito) =>{
            return(
              <div className='page__footer__reparto-container__reparto'>
                <div className='page__footer__reparto-container__reparto__reparto-img'>
                <img                
                    width='90px'
                    src={generateActorPhoto(credito.profile_path)}
                  />
                </div>
                <div className='page__footer__reparto-container__reparto__reparto-name'>
                <h5>{credito.name.substring(0,15)}</h5>
                </div> 
              </div>
            )
          }

          )}
        </div>
      )}


      </div>      
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state);

  return {
    Film: state.pelicula,
    reparto: state.reparto,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    guardarFilm: (peliculas) => dispatch(guardarPeliculas(peliculas)),
    guardarCreditos: (reparto) => dispatch(guardarReparto(reparto)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pelicula);
