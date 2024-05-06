const socket = io("http://localhost:7373");

socket.emit("subscribe", [
  "BTC/USD",
  "ETH/USD",
  "XRP/USD",
  "LTC/USD",
  "BCH/USD",
]);

socket.on("orderBookUpdate", (orderBooks) => {
  const orderBookElement = document.getElementById("orderBook");
  orderBookElement.innerHTML = "";

  for (const pair in orderBooks) {
    const listItem = document.createElement("li");
    listItem.textContent = `${pair}: ${JSON.stringify(orderBooks[pair])}`;
    orderBookElement.appendChild(listItem);
  }
});

socket.on("tradeUpdate", (trades) => {
  const tradeHistoryElement = document.getElementById("tradeHistory");
  tradeHistoryElement.innerHTML = "";

  for (const pair in trades) {
    trades[pair].forEach((trade, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = `Trade ${index + 1} for ${pair}: ${JSON.stringify(trade)}`;
      tradeHistoryElement.appendChild(listItem);
    });
  }
});
