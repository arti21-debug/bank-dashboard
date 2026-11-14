// utils/money.ts

// Результат проверки: при `ok: true` есть `amount`, при `ok: false` есть `error`
export type TransferCheck =
  { ok: true; amount: number } | { ok: false; error: string };

// Форматтер создаётся один раз и переиспользуется (только USD)
const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

// 3500 → "$3,500.00"
export const formatMoney = (n: number) => usd.format(n);

// Со знаком: +$3,500.00 / -$85.30. Знак выбираем сами, форматируем модуль
export const formatSigned = (n: number) =>
  (n > 0 ? "+" : n < 0 ? "-" : "") + usd.format(Math.abs(n));

// Округление до 2 знаков: убирает хвосты вида 0.30000000000000004
export const round2 = (n: number) => Math.round(n * 100) / 100;

// Чистая проверка формы перевода: возвращает первую найденную ошибку
export function validateTransfer(
  raw: string,
  balance: number,
  hasRecipient: boolean,
): TransferCheck {
  // 1. Получатель выбран
  if (!hasRecipient) return { ok: false, error: "Select a user for transfer" };

  // 2. Формат: число с 0–2 знаками после точки ("5." допустимо, "1,5" и "-5" нет)
  const normalized = raw.replace(/\.$/, "");
  if (!/^\d+(\.\d{1,2})?$/.test(normalized))
    return { ok: false, error: "Type amount" };

  const amount = Number(normalized);

  // 3. Сумма больше нуля ("0" и "0.00" проходят формат, но не подходят)
  if (amount <= 0) return { ok: false, error: "Amount must be greater than 0" };

  // 4. Хватает средств (баланс округляем из-за возможных float-хвостов)
  if (amount > round2(balance)) return { ok: false, error: "Not enough funds" };

  return { ok: true, amount };
}
