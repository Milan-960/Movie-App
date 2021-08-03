import React from "react";

import classes from "./Movie.module.css";

const Movie = (props) => {
  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <p>
        <strong>Director</strong> {props.director}
      </p>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <p>{props.planets}</p>
    </li>
  );
};

export default Movie;
