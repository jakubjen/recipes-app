export interface Snackbar {
	id: number;
	type: SnackbarType;
	text: string;
}

export enum SnackbarType {
	Info = 'info',
	Success = 'success',
	Error = 'error',
}
