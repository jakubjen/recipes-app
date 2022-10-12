const en = require('./assets/i18n/en.json');
const pl = require('./assets/i18n/pl.json');

const compereTranslations = (langOne: any, langTwo: any, nesting: string[]) => {
	Object.keys(langOne).forEach(key => {
		if (!langTwo[key]) {
			console.log(
				nesting.length == 1
					? `${nesting}.${key}`
					: `${nesting.join('.')}.${key}`
			);
		} else if (typeof langOne[key] === 'object') {
			const nestedLangOne = { ...langOne[key] };
			const nestedLangTwo = { ...langTwo[key] };
			const newNesting = [...nesting, key];
			compereTranslations(nestedLangOne, nestedLangTwo, newNesting);
		}
	});
};
console.log('----------------------------------------------------------------');
console.log('Missing translation in pl.json');
console.log('----------------------------------------------------------------');

compereTranslations(en, pl, []);

console.log();
console.log('----------------------------------------------------------------');
console.log('Missing translation in en.json');
console.log('----------------------------------------------------------------');
compereTranslations(pl, en, []);
