import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Card, Transaction } from "../types/data";

interface CardsStore {
  cards: Card[];
  switchActive: () => void;
  makeTransfer: (cardId: number | undefined, t: Transaction) => void;
  addMockTransactions: (
    cardId: number | undefined,
    mockTrans: Transaction[],
  ) => void;
}

export const useCardsStore = create<CardsStore>()(
  persist(
    (set) => ({
      cards: [
        { id: 1, transactions: [], balance: 5555, active: true },
        { id: 2, transactions: [], balance: 5555, active: false },
      ],

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
    }),
    { name: "cards" },
  ),
);