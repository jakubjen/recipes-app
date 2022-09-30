import DataState from '@models/data-store.enum';
import { mockRecipes } from '@models/recipe.mock.mode';
import Recipe from '@models/recipe.model';
import { MainState } from '@store/app/app.reducer';
import RecipesActions from './recipes.actions';
import { recipesReducer, RecipesState } from './recipes.reducer';

type MockStorType = {
	ids: string[];
	entities: { [key: string]: Recipe };
	dataState: DataState.BeforeLoad;
	processingData: boolean;
};
describe('Recipe reducer', () => {
	const { recipeOne, recipeTwo, recipeTree } = mockRecipes;
	let initialState: MockStorType;
	beforeEach(() => {
		initialState = {
			ids: [recipeOne.id, recipeTwo.id],
			entities: {},
			dataState: DataState.BeforeLoad,
			processingData: false,
		};
		initialState.entities[recipeOne.id] = recipeOne;
		initialState.entities[recipeTwo.id] = recipeTwo;
	});

	it('should set processingData to true on addRecipe', () => {
		const action = RecipesActions.addRecipe({
			recipe: recipeTree,
			image: new File(['data'], 'fileName.jpg'),
		});
		const result = recipesReducer(initialState, action);
		expect(result).not.toBe(initialState);
		expect(result).toEqual({ ...initialState, processingData: true });
	});

	it('should set processingData to false on addRecipeSuccess', () => {
		const action = RecipesActions.addRecipeSuccess();

		initialState.processingData = true;
		let result = recipesReducer(initialState, action);
		expect(result).not.toBe(initialState);
		expect(result).toEqual({ ...initialState, processingData: false });

		initialState.processingData = false;
		result = recipesReducer(initialState, action);
		expect(result).not.toBe(initialState);
		expect(result).toEqual({ ...initialState, processingData: false });
	});

	it('should set processingData to false on addRecipeFailed', () => {
		const action = RecipesActions.addRecipeFailed({ text: 'text' });

		initialState.processingData = true;
		let result = recipesReducer(initialState, action);
		expect(result).not.toBe(initialState);
		expect(result).toEqual({ ...initialState, processingData: false });

		initialState.processingData = false;
		result = recipesReducer(initialState, action);
		expect(result).not.toBe(initialState);
		expect(result).toEqual({ ...initialState, processingData: false });
	});

	it('should set processingData to Loading on loadRecipesStart', () => {
		const action = RecipesActions.loadRecipesStart();

		let result = recipesReducer(initialState, action);
		expect(result).not.toBe(initialState);
		expect(result).toEqual({ ...initialState, dataState: DataState.Loading });
	});

	it('should set processingData to Loaded on loadRecipesSuccess', () => {
		const action = RecipesActions.loadRecipesSuccess();

		let result = recipesReducer(initialState, action);
		expect(result).not.toBe(initialState);
		expect(result).toEqual({ ...initialState, dataState: DataState.Loaded });
	});

	it('should set processingData to Error on loadRecipesFailed', () => {
		const action = RecipesActions.loadRecipesFailed();

		let result = recipesReducer(initialState, action);
		expect(result).not.toBe(initialState);
		expect(result).toEqual({ ...initialState, dataState: DataState.Error });
	});

	it('should add recipe to store on firestoreAddRecipe', () => {
		const action = RecipesActions.firestoreAddRecipe({
			recipe: recipeTree,
		});

		let result = recipesReducer(initialState, action);
		let expectedState = initialState;
		expectedState.ids.push(recipeTree.id);
		expectedState.entities[recipeTree.id] = recipeTree;
		expect(result).not.toBe(initialState);
		expect(result).toEqual(expectedState);
	});

	it('should modify recipe in store on firestoreModifyRecipe', () => {
		const action = RecipesActions.firestoreModifyRecipe({
			recipe: { ...recipeOne, title: 'Title' },
		});

		let result = recipesReducer(initialState, action);
		let expectedState = initialState;
		expectedState.entities[recipeOne.id].title = 'Title';
		expect(result).not.toBe(initialState);
		expect(result).toEqual(expectedState);
	});

	it('should remove recipe from store on firestoreRemoveRecipe', () => {
		const action = RecipesActions.firestoreRemoveRecipe({
			id: recipeOne.id,
		});

		let result = recipesReducer(initialState, action);
		let expectedState = initialState;
		delete expectedState.entities[recipeOne.id];
		expectedState.ids = expectedState.ids.filter(id => id !== recipeOne.id);
		expect(result).not.toBe(initialState);
		expect(result).toEqual(expectedState);
	});

	it('should set processingDato to true on firestoreRemoveRecipe', () => {
		const action = RecipesActions.updateRecipe({
			recipe: recipeOne,
		});

		let result = recipesReducer(initialState, action);
		expect(result).not.toBe(initialState);
		expect(result).toEqual({ ...initialState, processingData: true });
	});

	it('should set processingDato to false on updateRecipeSuccess', () => {
		const action = RecipesActions.updateRecipeSuccess();

		let result = recipesReducer(initialState, action);
		expect(result).not.toBe(initialState);
		expect(result).toEqual({ ...initialState, processingData: false });
	});
});
