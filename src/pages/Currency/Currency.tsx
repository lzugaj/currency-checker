import React, { useState } from "react";
import { CurrencyResponse } from "../../api/types";

import { getCurrentDate } from "../../utils/DateUtil";

import Button from "../../components/Button";
import Card from "../../components/Card";
import Container from "../../components/Container";
import Dropdown from "../../components/Dropdown";

import { ButtonSignType } from "../../enums/ButtonSignType";
import { CurrencyType } from "../../enums/CurrencyType";
import { CurrencyValueType } from "../../enums/CurrencyValueType";
import { DisplayType } from "../../enums/DisplayType";
import { VisibilityType } from "../../enums/VisibilityType";

/**x
 * TODO:
 * 1. Spinner
 * 2. Container height
 * 4. Remove currency from first dropdown
 * 5. UI design
 * */

export default function Currency() {
	const [ showDropdown, setShowDropdown ] = useState<boolean>(false);
	const [ disabledDropdown, setDisabledDropdown ] = useState<boolean>(false);
	const [ showAddDropdownButton, setShowAddDropdownButton ] = useState<boolean>(true);
	const [ currencies, setCurrencies ] = useState<CurrencyResponse[]>([]);
	const [ firstCurrency, setFirstCurrency ] = useState<string>("");
	const [ secondCurrency, setSecondCurrency ] = useState<string>("");
	const [ display, setDisplay ] = useState<string>(DisplayType.HIDDEN);
	const [ firstButtonSign, setFirstButtonSign ] = useState<string>(ButtonSignType.PLUS);
	const [ firstButtonVisibility, setFirstButtonVisibility ] = useState<string>(VisibilityType.VISIBLE);
	const [ secondButtonSign, setSecondButtonSign ] = useState<string>(ButtonSignType.MINUS);
	const [ secondButtonVisibility, setSecondButtonVisibility ] = useState<string>(VisibilityType.INVISIBLE);
	const [ resetCurrenciesVisibility, setResetCurrenciesVisibility ] = useState<boolean>(false);

	React.useEffect(() => {
		fetchAllCurrencies();

		setResetCurrenciesVisibility(false);
		setFirstCurrency(CurrencyType.AUD);
		setSecondCurrency(CurrencyType.AUD);
	}, []);

	const fetchAllCurrencies = () => {
		fetch("/tecajn/v1")
			.then(response => response.json())
			.then(result => setCurrencies(result));

		setShowAddDropdownButton(true);
		setDisabledDropdown(false);
		setShowDropdown(false);
		setFirstButtonSign(ButtonSignType.PLUS);
		setSecondButtonSign(ButtonSignType.MINUS);
		setDisplay(DisplayType.HIDDEN);
		setResetCurrenciesVisibility(false);

		setFirstCurrency(CurrencyType.AUD);
		setSecondCurrency(CurrencyType.AUD);
		setFirstButtonVisibility(VisibilityType.VISIBLE);
		setSecondButtonVisibility(VisibilityType.INVISIBLE);
	}

	const handleDataForSelectedCurrency = async () => {
		let retrievedData: CurrencyResponse[];
		if (firstButtonSign === ButtonSignType.PLUS) {
			retrievedData = await fetch("/tecajn/v1?valuta=" + firstCurrency)
				.then(response => response.json());
		} else {
			retrievedData = await fetch("/tecajn/v1?valuta=" + firstCurrency + "&valuta=" + secondCurrency)
				.then(response => response.json());
		}

		setCurrencies(retrievedData);
		setDisabledDropdown(true);
		setShowAddDropdownButton(false);
		setResetCurrenciesVisibility(true);
	}

	const handleDisplay = () => {
		display === DisplayType.HIDDEN ? setDisplay(DisplayType.FLEX) : setDisplay(DisplayType.HIDDEN);
	}

	const handleChangedValueForFirstCurrency = (event: any) => {
		setFirstCurrency(event.target.value);
	}

	const handleChangedValueForSecondCurrency = (event: any) => {
		setSecondCurrency(event.target.value);
	}

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
			setSecondCurrency(CurrencyType.AUD);
			setShowDropdown(false);
		}
	}

	return (
		<Container>
			<div className="flex justify-center p-5 mb-5">
				<p className="text-[20px] text-black"> Tečajna lista na datum:
					<span className="underline"> { getCurrentDate() } </span>
				</p>
			</div>

			<div className="flex justify-center p-2">
				<Button
					text="$"
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
					onClick={ () => handleDisplay() }
				/>
			</div>

			{
				resetCurrenciesVisibility ?
					(
						<div className="flex justify-center p-2">
							<Button
								text="Reset"
								className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
								onClick={ () => fetchAllCurrencies() }
							/>
						</div>
					)
					:
					null
			}

			<div className={ `${ display } justify-center text-center pt-2` }>
				<div className="w-1/2 border-2 rounded-md border-black p-5">
					<div>
						<div className="flex flex-row justify-center">
							<div>
								<Dropdown
									selectedValue={ firstCurrency }
									currencies={ currencies }
									disabled={ disabledDropdown }
									onChanged={ (event: any) => handleChangedValueForFirstCurrency(event) }
								/>
							</div>
							<div>
								{
									showAddDropdownButton ?
										(
											<Button
												text={ firstButtonSign }
												className={ `bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full ml-2 mr-2 ${ firstButtonVisibility }` }
												onClick={ () => handleNewDropdown() }
											/>
										)
										:
										null
								}
							</div>
						</div>

						<div className="flex flex-row justify-center mt-2">
							<div>
								{
									showDropdown ?
										(
											<Dropdown
												selectedValue={ secondCurrency }
												currencies={ currencies }
												disabled={ disabledDropdown }
												onChanged={ (event: any) => handleChangedValueForSecondCurrency(event) }
											/>
										)
										:
										null
								}
							</div>
							<div>
								{
									showAddDropdownButton ?
										(
											<Button
												text={ secondButtonSign }
												className={ ` bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full ml-2 mr-2 ${ secondButtonVisibility }` }
												onClick={ () => handleNewDropdown() }
											/>
										)
										:
										null
								}
							</div>
						</div>

						<div className="mt-2">
							<Button
								text="Dohvati"
								className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-1 px-3 rounded-full ml-2"
								onClick={ () => handleDataForSelectedCurrency() }
							/>
						</div>
					</div>
				</div>
			</div>

			{
				currencies?.map(((value: CurrencyResponse, index: number) => {
					return (
						<Card
							key={ index }
							exchangeRateNumber={ value[ CurrencyValueType.EXCHANGE_RATE_NUMBER ] }
							dateOfApplication={ value[ CurrencyValueType.DATE_OF_APPLICATION ] }
							country={ value[ CurrencyValueType.COUNTRY ] }
							unit={ value[ CurrencyValueType.UNIT ] }
							purchaseForForeignExchange={ value[ CurrencyValueType.PURCHASE_FOR_FOREIGN_EXCHANGE ] }
							mediumForForeignExchange={ value[ CurrencyValueType.MEDIUM_FOR_FOREIGN_EXCHANGE ] }
							foreignExchangeSales={ value[ CurrencyValueType.FOREIGN_EXCHANGE_SALES ] }
							currency={ value[ CurrencyValueType.CURRENCY ] }
							currencyCode={ value[ CurrencyValueType.CURRENCY_CODE ] }
						/>
					)
				}))
			}
		</Container>
	);
}