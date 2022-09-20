type Value = {
	amount: string;
	unit: string;
};

export const convertUnit = ({ amount: amountArg, unit }: Value): Value => {
	let amount = Number(amountArg);
	if (unit === 'grams') {
		if (amount > 1000) {
			amount = amount / 1000;
			unit = 'kilograms';
		}
	}
	if (unit === 'milliliters') {
		if (amount > 1000) {
			amount = amount / 1000;
			unit = 'liters';
		}
	}
	return { amount: amount.toString(), unit };
};
