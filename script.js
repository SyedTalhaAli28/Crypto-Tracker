async function fetchPrices() {
    const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,dogecoin&vs_currencies=usd';
    const res = await fetch(url);
    const data = await res.json();
  
    const pricesDiv = document.getElementById('prices');
    pricesDiv.innerHTML = '';
  
    for (let coin in data) {
      const price = data[coin].usd;
      pricesDiv.innerHTML += `
        <div class="coin">
          <h2>${coin.toUpperCase()}</h2>
          <p>$${price}</p>
        </div>
      `;
    }
  }
  
  fetchPrices();
  setInterval(fetchPrices, 30000); // Refresh every 30s
  
  // ✅ ETH Wallet Tracker
  async function getWalletBalance() {
    const address = document.getElementById('walletAddress').value.trim();
    const apiKey = '1HJXWF7TP3IZNYZ7Q1GCUFZPNVGSS3AXCI'; // <-- Replace this
    if (!address) {
      alert("Please enter a wallet address");
      return;
    }
  
    const url = `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
  
    if (data.status === "1") {
      const balanceInEth = (Number(data.result) / 1e18).toFixed(5);
      document.getElementById('walletBalance').innerText = `Balance: ${balanceInEth} ETH`;
    } else {
      document.getElementById('walletBalance').innerText = `Error: ${data.message}`;
    }
  }
  