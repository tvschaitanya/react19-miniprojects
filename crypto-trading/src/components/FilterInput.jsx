const FilterInput = ({ filter, onFilterChange }) => {
  return (
    <div className="filter ">
      <input
        type="text"
        value={filter}
        placeholder="Filter Coins by Name or Symbol"
        onChange={(e) => onFilterChange(e.target.value)}
      />
    </div>
  );
};

export default FilterInput;
