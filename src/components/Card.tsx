import React from "react";

type CardProps = {
	exchangeRateNumber: string;
	dateOfApplication: string;
	country: string;
	unit: number;
	purchaseForForeignExchange: string;
	mediumForForeignExchange: string;
	foreignExchangeSales: string;
	currency: string;
	currencyCode: string;
}

export default function Card({ ...props }: CardProps) {
	return (
		<div className="flex justify-center">
			<div className="block w-full p-5 m-1 rounded-lg shadow-lg bg-white max-w-md mb-2">
				<p className="text-xl mb-2 font-bold">
					{ `${ props.country } (${ props.currency })` }
				</p>
				<div>
					<div>
						{ `Kupovni za devize: ${ props.purchaseForForeignExchange }` }
					</div>
					<div>
						{ `Srednji za devize: ${ props.mediumForForeignExchange }` }
					</div>
					<div>
						{ `Prodajni za devize: ${ props.foreignExchangeSales }` }
					</div>
				</div>
			</div>
		</div>
	);
}