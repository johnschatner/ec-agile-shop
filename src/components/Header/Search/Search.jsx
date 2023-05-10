import "./Search.css";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Search() {
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();
    const searchString = e.target.searchInput.value;
    navigate(`/search/${searchString}`);
  };

  return (
    <>
      <form onSubmit={searchHandler} className="search-field">
        <input type="text" id="searchInput" />
        <button>Search</button>
      </form>
    </>
  );
}
