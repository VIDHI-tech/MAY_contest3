const apiUrl =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

// Fetch data using async/await
async function fetchData() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// Call the async function
fetchData().then((data) => renderTable(data));

// Render table
function renderTable(data) {
  const coinTableBody = document.getElementById("coinTableBody");
  coinTableBody.innerHTML = "";

  data.forEach((coin) => {
    const {
      name,
      image,
      symbol,
      current_price,
      total_volume,
      price_change_percentage_24h,
      market_cap,
    } = coin;

    const row = document.createElement("tr");

    const imageCell = document.createElement("td");
    const imageElement = document.createElement("img");
    imageElement.src = image;
    imageElement.alt = name;
    imageElement.width = 20;
    imageElement.height = 20;
    imageCell.appendChild(imageElement);
    row.appendChild(imageCell);

    const nameCell = document.createElement("td");
    nameCell.textContent = name;
    row.appendChild(nameCell);

    const symbolCell = document.createElement("td");
    symbolCell.textContent = symbol;
    row.appendChild(symbolCell);

    const priceCell = document.createElement("td");
    priceCell.textContent = current_price;
    row.appendChild(priceCell);

    const volumeCell = document.createElement("td");
    volumeCell.textContent = total_volume;
    row.appendChild(volumeCell);

    const percentageCell = document.createElement("td");
    percentageCell.textContent = `${price_change_percentage_24h}%`;

    // Apply color based on percentage value
    if (price_change_percentage_24h < 0) {
      percentageCell.style.color = "red";
    } else {
      percentageCell.style.color = "green";
    }

    row.appendChild(percentageCell);

    const marketCapCell = document.createElement("td");
    marketCapCell.textContent = market_cap;
    row.appendChild(marketCapCell);

    coinTableBody.appendChild(row);
  });
}

// Search button click event
const searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", () => {
  const searchTerm = prompt("Enter the name or symbol to search:");
  if (searchTerm) {
    fetchData().then((data) => {
      const filteredData = data.filter(
        (coin) =>
          coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      );
      renderTable(filteredData);
    });
  } else {
    fetchData().then((data) => renderTable(data));
  }
});

// Sort by Market Cap button click event
const sortMktCapBtn = document.getElementById("sortMktCapBtn");
sortMktCapBtn.addEventListener("click", () => {
  fetchData().then((data) => {
    data.sort((a, b) => b.market_cap - a.market_cap);
    renderTable(data);
  });
});

// Sort by Percentage Change button click event
const sortPercentageBtn = document.getElementById("sortPercentageBtn");
sortPercentageBtn.addEventListener("click", () => {
  fetchData().then((data) => {
    data.sort(
      (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
    );
    renderTable(data);
  });
});
