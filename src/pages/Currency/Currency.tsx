import React, { useState } from "react";

import Card from "../../components/Card";
import Container from "../../components/Container";

import { getCurrentDate } from "../../utils/DateUtil";

import { CurrencyResponse } from "../../api/types";

export default function Currency() {
	const [ currentDate, setCurrentDate ] = useState<string>("");
	const [ currencies, setCurrencies ] = useState<CurrencyResponse[]>([]);

	React.useEffect(() => {
<<<<<<< HEAD
=======
		// TODO: Move to api folder
>>>>>>> f10f43807cc94e940b9f9bb8a0abbb58e3281ede
		fetch("/tecajn/v1")
			.then(response => response.json())
			.then(result => setCurrencies(result));

		setCurrentDate(getCurrentDate);
	}, []);

	return (
		<Container>
			<div className="flex justify-center p-10 mb-5">
				<p className="text-[20px] text-black"> Tečajna lista na datum:
					<span className="underline"> { currentDate } </span>
				</p>
			</div>

			{
				currencies.map(((value: CurrencyResponse, index: number) => {
					return (
						<Card
							key={ index }
							exchangeRateNumber={ value[ "Broj tečajnice" ] }
							dateOfApplication={ value[ "Datum primjene" ] }
							country={ value[ "Država" ] }
							unit={ value[ "Jedinica" ] }
							purchaseForForeignExchange={ value[ "Kupovni za devize" ] }
							mediumForForeignExchange={ value[ "Srednji za devize" ] }
							foreignExchangeSales={ value[ "Prodajni za devize" ] }
							currency={ value[ "Valuta" ] }
							currencyCode={ value[ "Šifra valute" ] }
						/>
					)
				}))
			}
		</Container>
	);
}