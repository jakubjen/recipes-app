import { PendingChangesGuard } from './pending-changes.guard';

const guard = new PendingChangesGuard();

describe('PasswordConfirmValidator', () => {
	beforeEach(() => {
		window.confirm = jasmine.createSpy('confirm');
	});

	it('should create the guard', () => {
		expect(guard).toBeTruthy();
	});

	it('should call confirm when component canDeactivate function return false', () => {
		guard.canDeactivate({ canDeactivate: () => false });
		expect(window.confirm).toHaveBeenCalled();
	});

	it("shouldn't call confirm when component canDeactivate function return true", () => {
		guard.canDeactivate({ canDeactivate: () => true });
		expect(window.confirm).not.toHaveBeenCalled();
	});

	it('should return true when component canDeactivate return true ', () => {
		const result = guard.canDeactivate({ canDeactivate: () => true });
		expect(result).toBeTrue();
	});

	it('should return true when user confirm ', () => {
		(<jasmine.Spy>window.confirm).and.returnValue(true);
		const result = guard.canDeactivate({ canDeactivate: () => false });
		expect(result).toBeTrue();
	});

	it('should return false when user not confirm ', () => {
		(<jasmine.Spy>window.confirm).and.returnValue(false);
		const result = guard.canDeactivate({ canDeactivate: () => false });
		expect(result).toBeFalse();
	});
});
