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

export type Notification = {
  sendOrReceiveCurrency: boolean;
  receiveOrder: boolean;
  recommendation: boolean;
};

export interface UserSecurity {
  enable2fa: boolean;
}

export interface UserPreferences {
  currency: string;
  timeZone: string;
  notification: Notification;
}

export interface UserData {
  name: string;
  username: string;
  email: string;
  password: string;
  birthDate: string;
  presentAddress: string;
  permanentAddress: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface Card {
  id: number;
  transactions: Transaction[];
  investments: Investment[];
  balance: number;
  active: boolean;
}
