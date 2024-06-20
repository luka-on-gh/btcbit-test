"use client";

import { useState } from "react";

type Currency = {
  symbol: string;
  amount: number;
};

export function Currencies({ currencyData }: { currencyData: Currency[] }) {
  const [columns, setColumns] = useState(1);

  const handleColumnsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColumns = Number(event.target.value);
    if (newColumns > 0) {
      setColumns(newColumns);
    } else {
      // Handle invalid input (e.g., negative values)
      console.error("Invalid number of columns. Must be a positive integer.");
    }
  };

  const tableHeaderRows = () => {
    const elements = [];

    for (let i = 0; i < columns; i++) {
      elements.push(
        <div key={i} className="flex gap-10">
          <div>Name</div>
          <div>Balance</div>
        </div>
      );
    }

    return elements;
  };

  const tableDataRows = currencyData.map((currency, index) => (
    <div key={currency.symbol} className="flex gap-10">
      <div>{currency.symbol}</div>
      <div>{currency.amount}</div>
    </div>
  ));

  return (
    <>
      <input
        type="number"
        className="text-black"
        placeholder="number of columns"
        onChange={handleColumnsChange}
        value={columns}
      />
      <div className="flex flex-col justify-center items-center">
        <div className={`w-full grid grid-cols-${columns} gap-4`}>
          {tableHeaderRows()}
        </div>
        <div className={`w-full grid grid-cols-${columns} gap-4`}>
          {tableDataRows}
        </div>
      </div>
    </>
  );
}
