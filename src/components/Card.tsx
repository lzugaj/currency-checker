import React from "react";

import { CurrencyResponse } from "../api/types";
import { CurrencyValueType } from "../enums/types";

type CardProps = {
  data: CurrencyResponse;
};

export default function Card({ data }: CardProps) {
  return (
    <div className="flex justify-center">
      <div className="hover:animate-pulse block w-full p-5 m-2 rounded-lg shadow-lg bg-white max-w-md">
        <p className="text-xl mb-2 font-bold">{`${data[CurrencyValueType.COUNTRY]} (${
          data[CurrencyValueType.CURRENCY]
        })`}</p>
        <div>
          <div>{`Kupovni za devize: ${data[CurrencyValueType.PURCHASE_FOR_FOREIGN_EXCHANGE]}`}</div>
          <div>{`Srednji za devize: ${data[CurrencyValueType.MEDIUM_FOR_FOREIGN_EXCHANGE]}`}</div>
          <div>{`Prodajni za devize: ${data[CurrencyValueType.FOREIGN_EXCHANGE_SALES]}`}</div>
        </div>
      </div>
    </div>
  );
}
