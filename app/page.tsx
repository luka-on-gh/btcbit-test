import { Profile } from "./_components/Profile";
import { ENDPOINTS } from "./_config";
import { mapCurrencyDataWithCurrencyCode } from "./_helpers";

async function getCurrencyBalanceData() {
  try {
    const res = await fetch(ENDPOINTS.CURRENCY_BALANCE);

    if (!res.ok) {
      return undefined;
    }

    const currencyBalanceData = await res.json();

    return mapCurrencyDataWithCurrencyCode(currencyBalanceData);
  } catch (e) {
    console.error(e);
  }
}

async function getCurrencyEarnData() {
  try {
    const res = await fetch(ENDPOINTS.CURRENCY_EARN);

    if (!res.ok) {
      return undefined;
    }

    return await res.json();
  } catch (e) {
    console.error(e);
  }
}

export default async function Home() {
  const currencyBalanceData = await getCurrencyBalanceData();
  const currencyEarnData = await getCurrencyEarnData();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-4 md:px-32 pt-16 pb-32">
      <Profile
        currencyBalanceData={currencyBalanceData}
        currencyEarnData={currencyEarnData}
      />
    </main>
  );
}
