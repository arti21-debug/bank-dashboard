export interface Investment {
  name: string;
  amount: number;
  date: number;
}

export interface Transaction {
  description: string;
  category: string;
  amount: number;
  date: number;
  status: string;
}

export interface Card {
  id: number;
  transactions: Transaction[];
  investments: Investment[];
  balance: number;
  active: boolean;
}