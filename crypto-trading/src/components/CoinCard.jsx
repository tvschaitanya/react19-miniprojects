const CoinCard = ({ coin }) => {
  return (
    <div key={coin.id} className="coin-card">
      <div className="coin-header">
        <img src={coin.image} alt={coin.name} className="coin-image" />
        <div>
          <h2>{coin.name.toUpperCase()}</h2>
          <p>{coin.symbol.toUpperCase()}</p>
        </div>
      </div>
      <p>Price: ${coin.current_price.toLocaleString()}</p>
      <p
        className={
          coin.price_change_percentage_24h >= 0 ? "positive" : "negative"
        }
      >
        {coin.price_change_percentage_24h.toFixed(2)}%
      </p>
      <p>Market Cap: {coin.market_cap.toLocaleString()}</p>
    </div>
  );
};

export default CoinCard;
