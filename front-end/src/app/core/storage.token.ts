import { InjectionToken } from "@angular/core";

export const BROWSER_TOKEN = new InjectionToken<Storage>('browser.storage', {
    providedIn: 'root',
    factory: () => sessionStorage
})