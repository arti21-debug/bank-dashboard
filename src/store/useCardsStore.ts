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
  userAvatar: string | null;
  switchActive: (id: number) => void;
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
  setAvatar: (base64: string) => void;
}

export const useCardsStore = create<CardsStore>()(
  persist(
    (set) => ({
      cards: [
        {
          id: 1,
          number: "1234 ****",
          transactions: [],
          investments: [],
          balance: 5555,
          active: true,
        },
        {
          id: 2,
          number: "1234 ****",
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
      userAvatar: null,

      switchActive: (id) =>
        set((state) => ({
          cards: state.cards.map((card) => ({
            ...card,
            active: card.id === id,
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
        set((state) => ({
          userData: {
            ...state.userData,
            name: String(data.get("name") ?? ""),
            username: String(data.get("username") ?? ""),
            email: String(data.get("email") ?? ""),
            password: String(data.get("password") ?? ""),
            birthDate: String(data.get("birthDate") ?? ""),
            presentAddress: String(data.get("presentAddress") ?? ""),
            permanentAddress: String(data.get("permanentAddress") ?? ""),
            city: String(data.get("city") ?? ""),
            postalCode: String(data.get("postalCode") ?? ""),
            country: String(data.get("country") ?? ""),
          },
        }));
      },

      editPreferences: (data) => {
        set((state) => ({
          userPreferences: {
            ...state.userPreferences,
            currency: String(
              data.get("currency") ?? state.userPreferences.currency,
            ),
            timeZone: String(
              data.get("timezone") ?? state.userPreferences.timeZone,
            ),
            notification: {
              sendOrReceiveCurrency: data.get("sendOrReceiveCurrency") === "on",
              receiveOrder: data.get("receiveOrder") === "on",
              recommendation: data.get("recommendation") === "on",
            },
          },
        }));
      },

      editSecurity: (data) => {
        set({
          userSecurity: {
            enable2fa: data.get("enable2fa") === "on",
          },
        });
      },

      updatePassword: (data) => {
        set((state) => ({
          userData: {
            ...state.userData,
            password: String(data.get("newPassword") ?? ""),
          },
        }));
      },

      setAvatar: (data) => set({ userAvatar: data }),
    }),
    {
      name: "cards",
      partialize: (state) => {
        const { userData, ...rest } = state;
        const { password, ...safeUserData } = userData;
        return { ...rest, userData: safeUserData };
      },
    },
  ),
);