import { ConvertUnitPipe } from './convert-unit.pipe';

describe('ConvertUnitPipe', () => {
	const pipe = new ConvertUnitPipe();
	it('create an instance', () => {
		expect(pipe).toBeTruthy();
	});

	it('should convert gram to kilograms', () => {
		let data = pipe.transform({ amount: '1433', unit: 'grams' });
		expect(data).toEqual('1.43 kilograms');

		data = pipe.transform({ amount: '3000', unit: 'grams' });
		expect(data).toEqual('3 kilograms');
	});

	it('should convert gram to milliliters', () => {
		let data = pipe.transform({ amount: '4127838', unit: 'milliliters' });
		expect(data).toEqual('4127.84 liters');

		data = pipe.transform({ amount: '4000', unit: 'milliliters' });
		expect(data).toEqual('4 liters');
	});
});
