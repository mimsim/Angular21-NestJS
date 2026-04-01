import { InjectionToken } from "@angular/core";

export interface ILogoutAction {
    perform(): void;
}
export const LOGOUT_ACTIONS = new InjectionToken<ILogoutAction[]>('logout.actions')