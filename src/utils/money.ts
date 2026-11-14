// utils/money.ts
export type TransferCheck =
  { ok: true; amount: number } | { ok: false; error: string };

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const formatMoney = (n: number) => usd.format(n);

// +$3,500.00 / -$85.30
export const formatSigned = (n: number) =>
(n > 0 ? "+" : n < 0 ? "-" : "") + usd.format(Math.abs(n));

// округление до 2 знаков: убирает хвосты вида 0.30000000000000004
export const round2 = (n: number) => Math.round(n * 100) / 100;

export function validateTransfer(
  raw: string,
  balance: number,
  hasRecipient: boolean,
): TransferCheck {
  if (!hasRecipient) return { ok: false, error: "Select a user for transfer" };

  const normalized = raw.replace(/\.$/, ""); // "5." → "5"
  if (!/^\d+(\.\d{1,2})?$/.test(normalized))
    return { ok: false, error: "Type amount" };

  const amount = Number(normalized);
  if (amount <= 0) return { ok: false, error: "Amount must be greater than 0" };
  if (amount > round2(balance)) return { ok: false, error: "Not enough funds" };

  return { ok: true, amount };
}
