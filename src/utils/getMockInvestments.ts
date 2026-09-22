const investments = [
  { name: "Apple", amount: 12500 },
  { name: "Microsoft", amount: 9800 },
  { name: "Amazon", amount: 7500 },
  { name: "NVIDIA", amount: 15200 },
  { name: "Tesla", amount: 6300 },
  { name: "Google", amount: 11400 },
  { name: "Meta", amount: 8700 },
  { name: "Netflix", amount: 5200 },
  { name: "Adobe", amount: 6800 },
  { name: "AMD", amount: 9100 },
  { name: "Intel", amount: 4300 },
  { name: "PayPal", amount: 5900 },
  { name: "Coca-Cola", amount: 7200 },
  { name: "McDonald's", amount: 8100 },
  { name: "Visa", amount: 10300 },
  { name: "Mastercard", amount: 9600 },
  { name: "Johnson & Johnson", amount: 6700 },
  { name: "Nike", amount: 4800 },
  { name: "Disney", amount: 5600 },
  { name: "Spotify", amount: 3900 },
];

export function generateDemoInvest() {
  const newInvestments = investments.map((invest) => {
    const now = Date.now();
    const fiveYearsAgo = now - 365 * 24 * 60 * 60 * 1000 * 5;
    const randomDate = new Date(
      Math.random() * (now - fiveYearsAgo) + fiveYearsAgo,
    );

    return {
      ...invest,
      date: randomDate.getFullYear(),
    };
  });

  const arrShuffle = newInvestments.sort(() => Math.random() - 0.5);
  return arrShuffle;
}