export interface Snackbar {
	id: string;
	variant: SnackbarVariant;
	text: string;
}

export enum SnackbarVariant {
	Info = 'info',
	Success = 'success',
	Error = 'error',
}
