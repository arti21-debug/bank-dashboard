import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  Card,
  Investment,
  Transaction,
  UserData,
  UserPreferences,
  UserSecurity,
} from "../types/data";

interface CardsStore {
  cards: Card[];
  userData: UserData;
  userPreferences: UserPreferences;
  userSecurity: UserSecurity;
  switchActive: () => void;
  makeTransfer: (cardId: number | undefined, t: Transaction) => void;
  addMockTransactions: (
    cardId: number | undefined,
    mockTrans: Transaction[],
  ) => void;
  addMockInvestments: (
    cardId: number | undefined,
    mockInvests: Investment[],
  ) => void;
  editProfile: (data: FormData) => void;
  editPreferences: (data: FormData) => void;
  editSecurity: (data: FormData) => void;
  updatePassword: (data: FormData) => void;
}

export const useCardsStore = create<CardsStore>()(
  persist(
    (set, get) => ({
      cards: [
        {
          id: 1,
          transactions: [],
          investments: [],
          balance: 5555,
          active: true,
        },
        {
          id: 2,
          transactions: [],
          investments: [],
          balance: 5555,
          active: false,
        },
      ],
      userData: {
        name: "",
        username: "",
        email: "",
        password: "",
        birthDate: "",
        presentAddress: "",
        permanentAddress: "",
        city: "",
        postalCode: "",
        country: "",
      },
      userPreferences: {
        currency: "USD",
        timeZone: "(GMT-12:00) International Date Line West",
        notification: {
          sendOrReceiveCurrency: false,
          receiveOrder: false,
          recommendation: false,
        },
      },
      userSecurity: {
        enable2fa: false,
      },

      switchActive: () =>
        set((state) => ({
          cards: state.cards.map((card) => ({
            ...card,
            active: !card.active,
          })),
        })),

      makeTransfer: (cardId, t) =>
        set((state) => ({
          cards: state.cards.map((card) =>
            card.id === cardId
              ? {
                  ...card,
                  transactions: [...card.transactions, t],
                  balance: card.balance - t.amount,
                }
              : card,
          ),
        })),

      addMockTransactions: (cardId, mockTrans) =>
        set((state) => ({
          cards: state.cards.map((card) =>
            card.id === cardId
              ? {
                  ...card,
                  transactions: [...card.transactions, ...mockTrans],
                }
              : card,
          ),
        })),

      addMockInvestments: (cardId, mockInvests) =>
        set((state) => ({
          cards: state.cards.map((card) =>
            card.id === cardId
              ? {
                  ...card,
                  investments: [...card.investments, ...mockInvests],
                }
              : card,
          ),
        })),

      editProfile: (data) => {
        const state = get();
        const userData = Object.fromEntries(
          Object.entries(state.userData).map(([key]) => [
            key,
            data.get(key) ?? "",
          ]),
        ) as unknown as UserData;
        set({ userData });
      },

      editPreferences: (data) => {
        const state = get();
        const userPreferences = Object.fromEntries(
          Object.entries(state.userPreferences).map(([key, val]) =>
            key === "notification"
              ? [
                  key,
                  Object.fromEntries(
                    Object.entries(val).map(([key]) =>
                      data.get(key) === "on" ? [key, true] : [key, false],
                    ),
                  ),
                ]
              : [key, data.get(key)],
          ),
        ) as unknown as UserPreferences;
        set({ userPreferences });
      },

      editSecurity: (data) => {
        const state = get();
        const userSecurity = Object.fromEntries(
          Object.entries(state.userSecurity).map(([key]) => 
            [key, data.get(key) === "on"],
          ),
        ) as unknown as UserSecurity;
        set({ userSecurity });
      },

      updatePassword: (data) => {
        set((state) => ({
          userData: Object.fromEntries(
            Object.entries(state.userData).map(([key, val]) =>
              key === "password" ? [key, data.get("newPassword")] : [key, val],
            ),
          ) as unknown as UserData
        }));
      }
    }),
    { name: "cards" },
  ),
);
