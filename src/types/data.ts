export interface Transaction {
  description: string;
  category: string;
  amount: number;
  date: number;
}

export interface Card {
  id: number;
  transactions: Transaction[];
  balance: number;
  active: boolean;
}