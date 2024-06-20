"use client";

import { useGlobalContext } from "../_context/Global";
import { Table } from "./Table";
import { CurrencyBalanceData, CurrencyEarnData } from "../_types";

export function Profile({
  currencyBalanceData,
  currencyEarnData,
}: {
  currencyBalanceData: CurrencyBalanceData;
  currencyEarnData: CurrencyEarnData;
}) {
  const { authenticated } = useGlobalContext();

  return authenticated ? (
    <Table
      currencyBalance={currencyBalanceData}
      currencyEarn={currencyEarnData}
    />
  ) : (
    <h1 className="text-xl md:text-2xl mt-40 text-center">
      Participate in global financial markets with us!
    </h1>
  );
}
