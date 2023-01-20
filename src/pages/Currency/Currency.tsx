import React, { useState } from "react";

import { CurrencyResponse } from "../../api/types";

import Button from "../../components/Button";
import Card from "../../components/Card";
import Container from "../../components/Container";
import Dropdown from "../../components/Dropdown";

import { ButtonSignType, CurrencyType, OtherSignType, VisibilityType } from "../../enums/types";
import useCurrencyValue from "../../hooks/useCurrencyValue";
import { getCurrentDate } from "../../utils/DateUtil";

export default function Currency() {
  const [currencies, setCurrencies] = useState<CurrencyResponse[]>([]);

  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [showDisplay, setShowDisplay] = useState<boolean>(false);
  const [showReset, setShowReset] = useState<boolean>(false);
  const [disabledDropdown, setDisabledDropdown] = useState<boolean>(false);

  const { currencyValue: firstCurrency, onShowCurrencyValue: showFirstCurrencyValue } = useCurrencyValue();
  const { currencyValue: secondCurrency, onShowCurrencyValue: showSecondCurrencyValue } = useCurrencyValue();

  const [firstButtonSign, setFirstButtonSign] = useState<string>(ButtonSignType.PLUS);
  const [firstButtonVisibility, setFirstButtonVisibility] = useState<string>(VisibilityType.VISIBLE);

  const [secondButtonSign, setSecondButtonSign] = useState<string>(ButtonSignType.MINUS);
  const [secondButtonVisibility, setSecondButtonVisibility] = useState<string>(VisibilityType.INVISIBLE);

  React.useEffect(() => {
    fetchAllCurrencies();
  }, []);

  const fetchAllCurrencies = () => {
    fetch("/tecajn/v1")
      .then((response) => response.json())
      .then((result) => setCurrencies(result));

    setDisabledDropdown(false);
    setShowDropdown(false);
    setShowReset(false);

    showFirstCurrencyValue(CurrencyType.AUD);
    showSecondCurrencyValue(CurrencyType.AUD);

    setFirstButtonSign(ButtonSignType.PLUS);
    setSecondButtonSign(ButtonSignType.MINUS);
    setFirstButtonVisibility(VisibilityType.VISIBLE);
    setSecondButtonVisibility(VisibilityType.INVISIBLE);
  };

  const handleDataForSelectedCurrency = async () => {
    let retrievedData: CurrencyResponse[];
    if (firstButtonSign === ButtonSignType.PLUS) {
      retrievedData = await fetch(`/tecajn/v1?valuta=${firstCurrency}`).then((response) => response.json());
    } else {
      retrievedData = await fetch(`/tecajn/v1?valuta=${firstCurrency}&valuta=${secondCurrency}`).then((response) =>
        response.json()
      );
    }

    setCurrencies(retrievedData);
    setDisabledDropdown(true);
    setShowReset(true);
  };

  const handleNewDropdown = () => {
    if (firstButtonSign === ButtonSignType.PLUS) {
      setFirstButtonSign(ButtonSignType.MINUS);
      setFirstButtonVisibility(VisibilityType.INVISIBLE);
      setSecondButtonVisibility(VisibilityType.VISIBLE);
      setShowDropdown(true);
    } else {
      setFirstButtonSign(ButtonSignType.PLUS);
      setFirstButtonVisibility(VisibilityType.VISIBLE);
      setSecondButtonVisibility(VisibilityType.INVISIBLE);
      showSecondCurrencyValue(CurrencyType.AUD);
      setShowDropdown(false);
    }
  };

  return (
    <Container>
      <div className="flex justify-center p-5 mb-5">
        <p className="text-[20px] text-black">
          Tečajna lista na datum:
          <span className="underline font-bold"> {getCurrentDate()} </span>
        </p>
      </div>
      <div className="flex justify-center p-2">
        <Button
          text={OtherSignType.DOLLAR}
          className="animate-bounce transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-full"
          onClick={() => setShowDisplay(!showDisplay)}
        />
      </div>
      {showDisplay && (
        <div className="justify-center text-center pt-2 m-2">
          <div className="border-2 rounded-md border-black p-5">
            <div className="flex flex-row justify-center">
              <Dropdown
                selectedValue={firstCurrency}
                currencies={currencies}
                disabled={disabledDropdown}
                onChanged={(event) => showFirstCurrencyValue(event.target.value)}
              />
              <Button
                text={firstButtonSign}
                className={`bg-blue-500 text-white font-bold py-2 px-4 rounded-full ml-2 mr-2 ${firstButtonVisibility}`}
                onClick={handleNewDropdown}
              />
            </div>
            {firstButtonSign === ButtonSignType.MINUS && (
              <div className="flex flex-row justify-center mt-2">
                {showDropdown && (
                  <Dropdown
                    selectedValue={secondCurrency}
                    currencies={currencies}
                    disabled={disabledDropdown}
                    onChanged={(event) => showSecondCurrencyValue(event.target.value)}
                  />
                )}
                <Button
                  text={secondButtonSign}
                  className={`bg-blue-500 text-white font-bold py-2 px-4 rounded-full ml-2 mr-2 ${secondButtonVisibility}`}
                  onClick={handleNewDropdown}
                />
              </div>
            )}
            {showReset ? (
              <div className="mt-4">
                <Button
                  text="Reset"
                  className="bg-blue-500 text-white font-bold p-3 px-5 rounded-full ml-2"
                  onClick={fetchAllCurrencies}
                />
              </div>
            ) : (
              <div className="mt-4">
                <Button
                  text="Dohvati"
                  className="bg-blue-500 text-white font-bold p-3 px-5 rounded-full ml-2"
                  onClick={handleDataForSelectedCurrency}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {currencies?.map((value: CurrencyResponse, index: number) => {
        return <Card key={index} data={value} />;
      })}
    </Container>
  );
}
