import { movies } from "../../src/constants/movies";
import style from "./HomePage.module.scss";
import moment from "moment";
import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Pagination from "../../utils/Pagination/Pagination";

export const HomePage = () => {
  //variable to implement rerouting
  const router = useRouter();

  //setting sorting of the items by different categories
  const [sortedMovies, setSortedMovies] = useState(movies);
  const sortByTitleAz = () => {
    setSortedMovies((prev) => {
      let n = prev.sort((a, b) => a.name.localeCompare(b.name));
      return [...n];
    });
  };
  const sortByTitleZa = () => {
    setSortedMovies((prev) => {
      let n = prev.sort((a, b) => b.name.localeCompare(a.name));
      return [...n];
    });
  };

  const sortByDateOld = () => {
    setSortedMovies((prev) => {
      let x = prev.sort((a, b) => a.release_date - b.release_date);
      return [...x];
    });
  };
  const sortByDateNew = () => {
    setSortedMovies((prev) => {
      let x = prev.sort((a, b) => b.release_date - a.release_date);
      return [...x];
    });
  };

  const handleSelectChange = (event) => {
    const option = event.target.value;
    if (option === "by_title_az") {
      sortByTitleAz();
    } else if (option === "by_title_za") {
      sortByTitleZa();
    } else if (option === "by_date_old") {
      sortByDateOld();
    } else if (option === "by_date_new") {
      sortByDateNew();
    } else if (option === "default" || option === "") {
      setSortedMovies(movies);
    }
  };
  const [perPage, setPerPage] = useState(5);
  const hanldePerPageChange = (e) => {
    const option = e.target.value;
    setPerPage(option);
  };
  //set pagination for the page
  const firstRender = useRef(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!firstRender.current) {
      (async () => {
        const limit = perPage;
        const offset = currentPage * 10 - 10;
        try {
          const response = await fetch(
            `./movies.js/?limit=${limit}&offset=${offset}`
          );
          const result = await response.json();
          if (result) {
            setSortedMovies(result);
          }
        } catch (error) {
          console.error(error);
        }
      })();
    }
    firstRender.current = false;
  }, [currentPage, perPage]);

  return (
    <div className={style.container}>
      <div className={style.selectWrapper}>
        <Select
          onChange={handleSelectChange}
          style={{
            height: "30px",
            margin: "10px",
            marginBottom: "30px",
            width: "300px",
            borderRadius: "4px",
          }}
        >
          <MenuItem value={"default"}>Default</MenuItem>
          <MenuItem value={"by_title_az"}>Sort title by alphabet(A-Z)</MenuItem>
          <MenuItem value={"by_title_za"}>Sort title by alphabet(Z-A)</MenuItem>
          <MenuItem value={"by_date_old"}>Sort date (from old to new)</MenuItem>
          <MenuItem value={"by_date_new"}>Sort date (from new to old)</MenuItem>
        </Select>
        <div style={{ display: "flex", gap: "10px", alignItems: "baseline" }}>
          <InputLabel id="demo-simple-select-label">Items on page</InputLabel>
          <Select
            onChange={hanldePerPageChange}
            style={{
              height: "30px",
              margin: "10px",
              marginBottom: "30px",
              width: "100px",
              borderRadius: "4px",
            }}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
        </div>
      </div>
      <div>
        <Pagination
          handlePageChange={setCurrentPage}
          totalCount={sortedMovies.length}
          siblingCount={2}
          currentPage={currentPage}
          limit={perPage}
        />
      </div>
      <main className={style.main}>
        {sortedMovies?.map((movie, index) => {
          return (
            <div
              key={index}
              className={style.item}
              onClick={() => router.push(`/details/${movie.id}`)}
            >
              <img src={movie.logo_path} alt="logo" className={style.img} />
              <h2 className={style.title}>{movie.name}</h2>
              <h3 className={style.date}>
                {moment(movie.release_date).format("DD-MM-YYYY")}
              </h3>
            </div>
          );
        })}
      </main>
    </div>
  );
};
export default HomePage;
