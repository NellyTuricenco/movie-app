import style from "./DetailedPage.module.scss";
import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";

export const DetailedPage = ({ id, movie }) => {
  const router = useRouter();

  //setting list of visited movies in the local storage
  const [visitedMovies, setVisitedMovies] = useState(null);
  const useFirstRender = useRef(true);

  useEffect(() => {
    if (useFirstRender.current) {
      if (localStorage.getItem("visited")) {
        setVisitedMovies(JSON.parse(localStorage.getItem("visited")));
      } else {
        setVisitedMovies(null);
      }
      useFirstRender.current = false;
    }
    if (!useFirstRender.current) {
      if (!visitedMovies ? id : true) {
        const visitedObject = {};
        const countVisitedElements = visitedMovies
          ? Object.keys(visitedMovies).length
          : 0;
        visitedMovies &&
          Object.keys(visitedMovies).map((el, index) => {
            if (countVisitedElements > 9 && index === 0) {
              return;
            }
            visitedObject[el] = visitedMovies[el];
          });
        visitedObject[id] = id;
        localStorage.setItem("visited", JSON.stringify(visitedObject));
      }
    }
  }, [visitedMovies]);

  console.log("[visited]", visitedMovies);

  return (
    <div className={style.container}>
      <button onClick={() => router.back()} className={style.btn}>
        Back
      </button>
      <p>Detailed page for the movie with id - </p>
      {id}
    </div>
  );
};
export default DetailedPage;
