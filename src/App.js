import { useEffect, createContext, useState } from "react";

import Main from "./components/Main";
import LikeList from "./components/LikeList";
import "./App.css";

import { useSelector, useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  const likeList = useSelector((store) => store.likeList);
  const theme = useSelector((store) => store.theme);

  const [showFv, setShowFv] = useState(!window.innerWidth < 800);

  const findInLikeList = (joke) => {
    return likeList.find((item) => item.id === joke.id);
  };

  const onResize = () => setShowFv(window.innerWidth > 1024);

  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize");
    };
  }, []);

  return (
    <div className="app row" style={theme}>
      <img
        className="show-fv"
        onClick={() => setShowFv(!showFv)}
        src={showFv ? "/close.png" : "/menu.png"}
        alt="action"
      />

      <likeListOperations.Provider value={{ findInLikeList }}>
        <div className="main-wrapper column">
          <Main />
          <div className="theme-wrapper row centered">
            <div
              className="round-theme"
              onClick={() =>
                dispatch({
                  type: "SWITCH_THEME",
                  payload: { color: "black", background: "white" },
                })
              }
              style={{ background: "white" }}></div>
            <div
              className="round-theme"
              onClick={() =>
                dispatch({
                  type: "SWITCH_THEME",
                  payload: {
                    color: "white",
                    background: "linear-gradient(40deg, purple, blue)",
                  },
                })
              }
              style={{
                background: "linear-gradient(40deg, purple, blue)",
              }}></div>
            <div
              className="round-theme"
              onClick={() =>
                dispatch({
                  type: "SWITCH_THEME",
                  payload: { color: "white", background: "rgb(20,20,20)" },
                })
              }
              style={{ background: "#333333" }}></div>
          </div>
        </div>
        {showFv && <LikeList list={likeList} />}
      </likeListOperations.Provider>
    </div>
  );
};

export const likeListOperations = createContext();

export default App;
