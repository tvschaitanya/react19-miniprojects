const CoinCard = ({ coin }) => {
  if (!coin) return null;

  return (
    <div className="coin-card">
      <div className="coin-header">
        <img
          src={coin.image || ""}
          alt={coin.name || "Unknown"}
          className="coin-image"
        />
        <div>
          <h2>{coin.name?.toUpperCase() || "N/A"}</h2>
          <p>{coin.symbol?.toUpperCase() || "N/A"}</p>
        </div>
      </div>
      <p>Price: ${coin.current_price?.toLocaleString() || "N/A"}</p>
      <p
        className={
          coin.price_change_percentage_24h >= 0 ? "positive" : "negative"
        }
      >
        {coin.price_change_percentage_24h != null
          ? coin.price_change_percentage_24h.toFixed(2)
          : "0.00"}
        %
      </p>
      <p>Market Cap: {coin.market_cap?.toLocaleString() || "N/A"}</p>
    </div>
  );
};

export default CoinCard;
