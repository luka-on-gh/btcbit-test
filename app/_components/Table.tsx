"use client";

import { useState, useEffect, useCallback } from "react";
import { useMediaQuery } from "@uidotdev/usehooks";
import { SlTrash, SlClose } from "react-icons/sl";
import { CurrencyBalanceData, CurrencyEarnData } from "../_types";
import { TableVariant } from "../_types";

export function Table({
  currencyBalance,
  currencyEarn,
}: {
  currencyBalance: CurrencyBalanceData;
  currencyEarn: CurrencyEarnData;
}) {
  const [tableColumns, setTableColumns] = useState(1);
  const [tableVariant, setTableVariant] = useState(TableVariant.balance);
  const [currencyBalanceData, setCurrencyBalanceData] =
    useState(currencyBalance);
  const [currencyEarnData, setCurrencyEarnData] = useState(currencyEarn);
  const [currencySymbolSearch, setCurrencySymbolSearch] = useState<string>();
  const isSmallDevice = useMediaQuery("only screen and (max-width : 992px)");

  const handleColumnsChange = useCallback(
    (columns: String) => {
      const newColumns = Math.max(
        1,
        Math.min(isSmallDevice ? 2 : 6, Number(columns))
      );
      setTableColumns(newColumns);
    },
    [isSmallDevice]
  );

  useEffect(() => {
    if (isSmallDevice) handleColumnsChange("2");
  }, [isSmallDevice, handleColumnsChange]);

  const tableHeaderRows = () => {
    const elements = [];

    for (let i = 0; i < tableColumns; i++) {
      elements.push(
        <div key={i} className="flex w-full justify-between pl-4">
          <div className="w-2/6 flex items-center">Name</div>
          <div className="w-3/6 flex items-center">{tableVariant}</div>
          <div className="w-1/6 flex items-center">
            <SlTrash className="flex items-center" />
          </div>
        </div>
      );
    }

    return elements;
  };

  const handleDeleteTableRow = (symbol: string) => {
    const updatedCurrencyBalanceData = currencyBalanceData?.filter(
      (currency) => currency.symbol !== symbol
    );
    setCurrencyBalanceData(updatedCurrencyBalanceData);
  };

  const balanceTableDataRows = currencyBalanceData
    ?.filter((currency) =>
      currencySymbolSearch
        ? currency.symbol === currencySymbolSearch
        : currency.symbol
    )
    .map((currency) => (
      <div
        key={currency.symbol}
        className="flex w-full h-8 pl-4 justify-between hover:bg-gray-500"
      >
        <div className="w-2/6 flex items-center">{currency.symbol}</div>
        <div className="w-3/6 flex items-center">{currency.amount}</div>
        <div className="w-1/6 flex items-center">
          <SlClose
            className="flex items-center cursor-pointer"
            onClick={() => handleDeleteTableRow(currency.symbol)}
          />
        </div>
      </div>
    ));

  const earnTableDataRows = currencyEarnData
    ?.filter((currency) =>
      currencySymbolSearch
        ? currency.symbol === currencySymbolSearch
        : currency.symbol
    )
    .map((currency) => (
      <div
        key={currency.symbol}
        className="flex w-full h-8 pl-4 justify-between hover:bg-gray-500"
      >
        <div className="w-2/6 flex items-center">{currency.symbol}</div>
        <div className="w-3/6 flex items-center">{currency.APY}</div>
        <div className="w-1/6 flex items-center">
          <SlClose
            className="flex items-center cursor-pointer"
            onClick={() => handleDeleteTableRow(currency.symbol)}
          />
        </div>
      </div>
    ));

  return (
    <div className="bg-gray-600 z-10 w-full items-center justify-between font-mono text-sm">
      <div className="flex justify-center h-12">
        <input
          type="number"
          className="text-black w-1/3 text-center md:text-lg outline-none"
          placeholder="number of columns"
          onChange={(e) => handleColumnsChange(e.target.value)}
          value={tableColumns}
        />
        <select
          className="text-black w-1/3 text-center md:text-lg outline-none"
          onChange={() =>
            setTableVariant(
              tableVariant === TableVariant.balance
                ? TableVariant.earn
                : TableVariant.balance
            )
          }
        >
          <option value={TableVariant.balance}>{TableVariant.balance}</option>
          <option value={TableVariant.earn}>{TableVariant.earn}</option>
        </select>
        <input
          type="text"
          className="text-black w-1/3 text-center md:text-lg outline-none"
          placeholder="search by symbol"
          onChange={(e) =>
            setCurrencySymbolSearch(e.target.value.toUpperCase())
          }
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        {(tableVariant === TableVariant.balance && currencyBalanceData) ||
        (tableVariant === TableVariant.earn && currencyEarnData) ? (
          <>
            <div
              className={`w-full h-16 bg-gray-800 grid grid-cols-${tableColumns} justify-items-center`}
            >
              {tableHeaderRows()}
            </div>
            <div className={`w-full grid grid-cols-${tableColumns}`}>
              {tableVariant === TableVariant.balance
                ? balanceTableDataRows
                : earnTableDataRows}
            </div>
          </>
        ) : (
          <div>Data not found...</div>
        )}
      </div>
    </div>
  );
}
