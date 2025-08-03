import { useState, useEffect } from "react";
import CoinCard from "./components/CoinCard";
import LimitSelector from "./components/LimitSelector";
import FilterInput from "./components/FilterInput";
import SortSelector from "./components/SortSelector";

const API_URL = import.meta.env.VITE_API_URL;

const App = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("market_cap_desc");

  useEffect(() => {
    const fetchCoins = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `${API_URL}&order=market_cap_desc&per_page=250&page=1&sparkline=false`
        );

        if (!res.ok) throw new Error("Failed to fetch data");

        const data = await res.json();
        setCoins(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(filter.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(filter.toLowerCase())
  );

  const sortedCoins = filteredCoins.sort((a, b) => {
    switch (sortBy) {
      case "market_cap_desc":
        return b.market_cap - a.market_cap;
      case "market_cap_asc":
        return a.market_cap - b.market_cap;
      case "price_desc":
        return b.current_price - a.current_price;
      case "price_asc":
        return a.current_price - b.current_price;
      default:
        return 0;
    }
  });

  const displayedCoins = sortedCoins.slice(0, limit);

  return (
    <div>
      <h1>Crypto Dash</h1>

      {loading && <p>Loading...</p>}
      {error && <div className="error">{error}</div>}

      <div className="top-controls">
        <FilterInput filter={filter} onFilterChange={setFilter} />
        <LimitSelector limit={limit} onLimitChange={setLimit} />
        <SortSelector sortBy={sortBy} onSortChange={setSortBy} />
      </div>

      {!loading && !error && (
        <main className="grid">
          {displayedCoins.length > 0 ? (
            displayedCoins.map((coin) => <CoinCard key={coin.id} coin={coin} />)
          ) : (
            <p>No Results Found</p>
          )}
        </main>
      )}
    </div>
  );
};

export default App;
