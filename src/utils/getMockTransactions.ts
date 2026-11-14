const transactions = [
  {
    description: "Spotify Subscription",
    category: "Entertainment",
    amount: -12.99,
  },
  {
    description: "Monthly Salary",
    category: "Income",
    amount: 3500,
  },
  {
    description: "Grocery Shopping",
    category: "Shopping",
    amount: -156.42,
  },
  {
    description: "Freelance Payment",
    category: "Income",
    amount: 750,
  },
  {
    description: "Netflix Subscription",
    category: "Entertainment",
    amount: -15.49,
  },
  {
    description: "Electricity Bill",
    category: "Bills",
    amount: -85.3,
  },
  {
    description: "Restaurant Dinner",
    category: "Food",
    amount: -74.8,
  },
  {
    description: "Cashback",
    category: "Income",
    amount: 42.75,
  },
  {
    description: "Amazon Purchase",
    category: "Shopping",
    amount: -129.99,
  },
  {
    description: "Rent Payment",
    category: "Bills",
    amount: -1200,
  },
  {
    description: "Uber Ride",
    category: "Transportation",
    amount: -24.5,
  },
  {
    description: "Coffee Shop",
    category: "Food",
    amount: -6.75,
  },
  {
    description: "Apple Subscription",
    category: "Entertainment",
    amount: -9.99,
  },
  {
    description: "Bonus Payment",
    category: "Income",
    amount: 500,
  },
  {
    description: "Gas Station",
    category: "Transportation",
    amount: -62.4,
  },
  {
    description: "Online Course",
    category: "Education",
    amount: -89,
  },
  {
    description: "Pharmacy",
    category: "Health",
    amount: -45.67,
  },
  {
    description: "Gym Membership",
    category: "Health",
    amount: -39.99,
  },
  {
    description: "Flight Ticket",
    category: "Travel",
    amount: -425,
  },
  {
    description: "Hotel Reservation",
    category: "Travel",
    amount: -680.5,
  },
  {
    description: "Mobile Phone Bill",
    category: "Bills",
    amount: -35,
  },
  {
    description: "Freelance Project",
    category: "Income",
    amount: 1250,
  },
  {
    description: "Clothing Store",
    category: "Shopping",
    amount: -215.8,
  },
  {
    description: "Movie Theater",
    category: "Entertainment",
    amount: -28,
  },
  {
    description: "Supermarket",
    category: "Shopping",
    amount: -94.36,
  },
  {
    description: "Dinner Delivery",
    category: "Food",
    amount: -32.9,
  },
  {
    description: "Public Transport",
    category: "Transportation",
    amount: -18.75,
  },
  {
    description: "Investment Return",
    category: "Income",
    amount: 320,
  },
  {
    description: "Internet Bill",
    category: "Bills",
    amount: -49.99,
  },
  {
    description: "Book Store",
    category: "Education",
    amount: -54.25,
  },
];

// возможные статусы демо-транзакций
const arrStatus = ["Pending", "Completed"];

// генерирует демо-транзакции: каждой транзакции из шаблона назначается
// новый id, случайная дата за последние 90 дней и случайный статус
export function generateDemoData() {
  const newTransactions = transactions.map((t) => {
    const now = Date.now();
    // 90 дней назад в миллисекундах
    const ninetyDaysAgo = now - 90 * 24 * 60 * 60 * 1000;
    // случайный момент в диапазоне [ninetyDaysAgo, now)
    const randomDate = new Date(
      Math.random() * (now - ninetyDaysAgo) + ninetyDaysAgo,
    );

    return {
      ...t,
      // уникальный id: шаблон используется повторно, поэтому id нельзя копировать
      id: crypto.randomUUID(),
      // дата хранится как timestamp (мс)
      date: randomDate.getTime(),
      // случайный статус из arrStatus
      status: arrStatus[Math.floor(Math.random() * arrStatus.length)],
    };
  });

  // перемешиваем порядок транзакций
  // (sort мутирует newTransactions, но это новый массив из map, шаблон не меняется)
  const arrShuffle = newTransactions.sort(() => Math.random() - 0.5);
  return arrShuffle;
}