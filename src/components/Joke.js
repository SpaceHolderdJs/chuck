import React, { useContext } from "react";

import { likeListOperations } from "../App";

import { useSelector, useDispatch } from "react-redux";

const Joke = ({ joke }) => {
  const { categories, updated_at, icon_url, id, value } = joke;

  const { findInLikeList } = useContext(likeListOperations);

  const dispatch = useDispatch();

  return (
    <div className="joke column centered">
      {findInLikeList(joke) ? (
        <div
          onClick={() =>
            dispatch({ type: "REMOVE_FROM_LIKELIST", payload: joke })
          }
          className="row centered icon-wrapper"
          style={{ left: "40%", top: "5%" }}>
          <img src="/heart.png" alt="" className="icon heart-icon" />
        </div>
      ) : (
        <div
          onClick={() => dispatch({ type: "ADD_TO_LIKELIST", payload: joke })}
          className="row centered icon-wrapper"
          style={{ left: "40%", top: "5%" }}>
          <img
            src="/heart_none_active.png"
            alt=""
            className="icon heart-icon"
          />
        </div>
      )}

      <div className="column centered">
        <div className="row">
          <span style={{ color: "lightblue" }}>{id}</span>
        </div>
        <p>{value}</p>
        <div
          className="row centered"
          style={{ justifyContent: "space-between", width: "100%" }}>
          <span style={{ color: "lightslategray" }}>
            Last update: {new Date(Date.parse(updated_at)).getHours()} hours
          </span>
          {categories && categories[0] && (
            <div className="category active row centered">
              <span>{categories[0]}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Joke;
