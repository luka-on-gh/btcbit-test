import { RegistrationData, LoginData, CurrencyBalanceData } from "../_types";
import { CURRENCY_CODES } from "../_config";

export const validateUserData = (
  setMessage: (message: string) => void,
  userData?: RegistrationData | LoginData
) => {
  let isValid = true;

  // Validate email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!userData?.email) {
    setMessage("Email is required.");
    isValid = false;
  } else if (!emailPattern.test(userData.email)) {
    setMessage("Invalid email format.");
    isValid = false;
  }

  // Validate password
  if (!userData?.password) {
    setMessage("Password is required.");
    isValid = false;
  } else if (userData.password.length < 6) {
    setMessage("Password must be at least 6 characters long.");
    isValid = false;
  }

  return isValid;
};

export const mapCurrencyDataWithCurrencyCode = (
  currencyBalanceData: CurrencyBalanceData
) => {
  return currencyBalanceData?.map((item) => {
    const currencyCode = item.currencyId;
    const currencySymbol = CURRENCY_CODES[currencyCode];

    const missingCurrencySymbol = "---";
    const symbol = currencySymbol ?? missingCurrencySymbol;

    return {
      ...item,
      symbol,
    };
  });
};
