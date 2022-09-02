import { createSelector } from '@ngrx/store';
import { AppState } from '@store/store';
import { UserState } from './auth.reducer';

const selectFeature = (state: AppState) => state.user;

const selectUser = createSelector(
	selectFeature,
	(state: UserState) => state.user
);

const selectIsLogin = createSelector(
	selectFeature,
	(state: UserState) => state.isLogin
);

export const userSelectors = { selectUser, selectIsLogin };
