import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import useStore from "../../../../store";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const { courseQuery } = useStore();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      courseQuery.setName(search);
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="searchbar">
      <div>
        <div className="searchbar-icon">
          <FaSearch className="search-symbol" />
        </div>
        <input
          type="text"
          className="searchbar-input"
          placeholder="Search Courses, ..."
          onKeyDown={(e) => handleSearch(e)}
          onChange={(e) => handleOnChange(e)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
