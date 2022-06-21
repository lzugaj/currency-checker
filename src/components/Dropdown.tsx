import React from "react";
import { CurrencyResponse } from "../api/types";

type DropdownProps = {
	selectedValue: string;
	currencies: CurrencyResponse[];
	disabled: boolean;
	onChanged: (event: any) => void;
}

export default function Dropdown({ selectedValue, currencies, disabled, onChanged }: DropdownProps) {
	return (
		<>
			<select
				value={ selectedValue }
				disabled={ disabled }
				onChange={ onChanged }
				className="w-32 p-1 rounded-md"
			>
				{
					currencies.map((currency: CurrencyResponse, index: number) => {
						return (
							<option key={ index } value={ currency[ "Valuta" ] }>
								{ currency[ "Valuta" ] }
							</option>
						);
					})
				}
			</select>
		</>
	);
}