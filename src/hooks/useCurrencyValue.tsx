import { useState } from "react";

import { CurrencyType } from "../enums/types";

export default function useCurrencyValue() {
  const [currencyValue, setCurrencyValue] = useState<string>(CurrencyType.AUD);

  const onShowCurrencyValue = (currency: string) => {
    setCurrencyValue(currency);
  };

  return {
    currencyValue,
    onShowCurrencyValue,
  };
}
