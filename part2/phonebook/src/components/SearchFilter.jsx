import React from "react";

const SearchFilter = ({searchValue, handleSearchChange}) => {
  return (
    <div>
      <span>filter shown with</span>
      <input value={searchValue} onChange={handleSearchChange} />
    </div>
  );
};

export default SearchFilter;
