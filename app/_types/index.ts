export type CurrencyBalanceData =
  | {
      amount: string;
      updatedAt: string;
      currencyId: string;
      symbol: string;
    }[]
  | undefined;

export type CurrencyEarnData =
  | {
      APY: string;
      symbol: string;
    }[]
  | undefined;

export type RegistrationData = {
  email?: string;
  password?: string;
  repPassword?: string;
};

export type LoginData = {
  email?: string;
  password?: string;
};

export enum LoginProgress {
  credentials,
  OTP,
}

export enum TableVariant {
  balance = "Balance",
  earn = "APY",
}
