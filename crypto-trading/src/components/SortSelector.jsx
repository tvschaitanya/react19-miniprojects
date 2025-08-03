const SortSelector = ({ sortBy, onSortChange }) => {
  const options = [
    { value: "market_cap_desc", label: "Market Cap: High to Low" },
    { value: "market_cap_asc", label: "Market Cap: Low to High" },
    { value: "price_desc", label: "Price: High to Low" },
    { value: "price_asc", label: "Price: Low to High" },
    { value: "change_desc", label: "24H Change: High to Low" },
    { value: "change_asc", label: "24H Change: Low to High" },
  ];

  return (
    <div>
      <label htmlFor="sort">Sort By:</label>
      <select
        id="sort"
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortSelector;
