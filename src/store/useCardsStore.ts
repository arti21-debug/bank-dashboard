import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  Card,
  Investment,
  Transaction,
  UserData,
  UserPreferences,
  UserSecurity,
} from "../types/data";
import { round2 } from "../utils/money";

// типизация стора: данные пользователя, карты и экшены для их изменения
interface CardsStore {
  cards: Card[];
  userData: UserData;
  userPreferences: UserPreferences;
  userSecurity: UserSecurity;
  userAvatar: string | null; // аватар в base64; null — используется картинка по умолчанию
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
  updatePassword: (data: FormData) => void;
  setAvatar: (base64: string) => void;
  setEnable2fa: (enable: boolean) => void;
}

// Безопасная обёртка localStorage для сохранения состояния
const safeStorage = createJSONStorage(() => ({
  getItem: (k) => localStorage.getItem(k),
  setItem: (k, v) => {
    try {
      localStorage.setItem(k, v);
    } catch (e) {
      console.error("Persist failed (quota?)", e);
    }
  },
  removeItem: (k) => localStorage.removeItem(k),
}));

// глобальный стор; persist сохраняет состояние в localStorage и восстанавливает при перезагрузке
export const useCardsStore = create<CardsStore>()(
  persist(
    // начальное состояние: две карты, активна первая
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
      // профиль пользователя (заполняется на странице настроек)
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
      // настройки валюты, часового пояса и уведомлений
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

      // делает активной карту с переданным id, остальные — неактивными
      switchActive: (id) =>
        set((state) => ({
          cards: state.cards.map((card) => ({
            ...card,
            active: card.id === id,
          })),
        })),

      // добавляет транзакцию перевода к карте и списывает сумму с её баланса
      makeTransfer: (cardId, t) =>
        set((state) => ({
          cards: state.cards.map((card) =>
            card.id === cardId
              ? {
                  ...card,
                  transactions: [
                    ...card.transactions,
                    { ...t, amount: -t.amount },
                  ],
                  balance: round2(card.balance - t.amount), // округляем после вычитания
                }
              : card,
          ),
        })),

      // дописывает демо-транзакции к карте (баланс не меняется)
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

      // дописывает демо-инвестиции к карте
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

      // перезаписывает профиль значениями из формы;
      // отсутствующее в форме поле (get вернул null) становится пустой строкой
      editProfile: (data) => {
        set((state) => ({
          userData: {
            ...state.userData,
            name: String(data.get("name") ?? ""),
            username: String(data.get("username") ?? ""),
            email: String(data.get("email") ?? ""),
            birthDate: String(data.get("birthDate") ?? ""),
            presentAddress: String(data.get("presentAddress") ?? ""),
            permanentAddress: String(data.get("permanentAddress") ?? ""),
            city: String(data.get("city") ?? ""),
            postalCode: String(data.get("postalCode") ?? ""),
            country: String(data.get("country") ?? ""),
          },
        }));
      },

      // обновляет настройки: если поля нет в форме, остаётся текущее значение
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
            // отмеченный чекбокс приходит в FormData как "on",
            // неотмеченный не приходит вовсе → false
            notification: {
              sendOrReceiveCurrency: data.get("sendOrReceiveCurrency") === "on",
              receiveOrder: data.get("receiveOrder") === "on",
              recommendation: data.get("recommendation") === "on",
            },
          },
        }));
      },

      // включение/выключение 2FA по чекбоксу
      setEnable2fa: (enable) => set({ userSecurity: { enable2fa: enable } }),

      // меняет только пароль, остальной профиль не трогает
      updatePassword: (data) => {
        set((state) => ({
          userData: {
            ...state.userData,
            password: String(data.get("newPassword") ?? ""),
          },
        }));
      },

      // сохраняет аватар (base64-строка из выбранного файла)
      setAvatar: (data) => set({ userAvatar: data }),
    }),
    {
      // ключ в localStorage
      name: "cards", storage: safeStorage,
      // в localStorage сохраняется всё, кроме пароля:
      // вырезаем password из userData перед записью
      partialize: (state) => {
        const { userData, ...rest } = state;
        const { password, ...safeUserData } = userData;
        return { ...rest, userData: safeUserData };
      },
    },
  ),
);
