const FilterBar = () => {
  return (
    <>
      <div className="filter">
        <label htmlFor="categories">Category</label>
        <select id="categories">
          <option value="front-end">Front-End</option>
          <option value="back-end">Back-End</option>
          <option value="devops">Devops</option>
          <option value="networking">Networking</option>
        </select>
      </div>
    </>
  );
};

export default FilterBar;
