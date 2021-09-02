import React, { useEffect } from "react";
import Joke from "./Joke";

import { useDispatch, useSelector } from "react-redux";

const Main = () => {
  const dispatch = useDispatch();

  const active = useSelector((store) => store.active);
  const categories = useSelector((store) => store.categories);
  const searchVal = useSelector((store) => store.searchVal);
  const category = useSelector((store) => store.category);
  const joke = useSelector((store) => store.joke);

  useEffect(() => {
    fetch(`https://api.chucknorris.io/jokes/categories`)
      .then((response) => response.json())
      .then((categories) =>
        dispatch({ type: "INIT_CATEGORIES", payload: categories })
      );
  }, []);

  const selectRadio = (e) =>
    dispatch({ type: "SWITCH_ACTIVE", payload: e.target.value });

  const selectCategory = (e) =>
    dispatch({
      type: "SET_CATEGORY",
      payload: e.target.getAttribute("data-category"),
    });

  const handleSearch = (e) =>
    dispatch({ type: "UPDATE_SEARCHVAL", payload: e.target.value });

  const searchByCategory = (category) => {
    fetch(`https://api.chucknorris.io/jokes/random?category=${category}`)
      .then((response) => response.json())
      .then((joke) => dispatch({ type: "INIT_JOKE", payload: joke }));
  };

  const searchByRequest = (request) => {
    fetch(`https://api.chucknorris.io/jokes/search?query=${request}`)
      .then((response) => response.json())
      .then((joke) => {
        console.log(joke);
        dispatch({ type: "INIT_JOKE", payload: joke });
        dispatch({ type: "CLEAR_SEARCHVAL", payload: "" });
      });
  };

  const getRandomJoke = () => {
    fetch(`https://api.chucknorris.io/jokes/random`)
      .then((response) => response.json())
      .then((joke) => dispatch({ type: "INIT_JOKE", payload: joke }));
  };

  const getJoke = () => {
    return active === "search" && searchVal
      ? searchByRequest(searchVal)
      : active === "category"
      ? searchByCategory(category)
      : getRandomJoke();
  };

  return (
    <div className="main column">
      <h1>Chuck Norris</h1>
      <h3>Let s try to find a joke for you</h3>
      <div className="column">
        <div className="input-wrapper row">
          <input
            type="radio"
            value="random"
            onChange={selectRadio}
            checked={active === "random"}
          />
          <span>Random</span>
        </div>
        <div className="input-wrapper row">
          <input
            type="radio"
            value="category"
            onChange={selectRadio}
            checked={active === "category"}
          />
          <span>From categories</span>
        </div>
        {active === "category" && categories && (
          <div className="category-wrapper row">
            {categories.map((item, index) => (
              <button
                key={index}
                className={`category row centered ${
                  category === item && "active"
                }`}
                data-category={item}
                onClick={selectCategory}>
                {item}
              </button>
            ))}
          </div>
        )}
        <div className="input-wrapper row">
          <input
            type="radio"
            value="search"
            onChange={selectRadio}
            checked={active === "search"}
          />
          <span>Search</span>
        </div>
        {active === "search" && (
          <input
            type="text"
            id="search"
            onChange={handleSearch}
            value={searchVal || ""}
          />
        )}
      </div>
      <button onClick={getJoke}>Get joke</button>
      {joke && <Joke joke={joke} />}
    </div>
  );
};

export default Main;
