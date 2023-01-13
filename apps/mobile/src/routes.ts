export enum AppRoute {
    Onboarding = 'onboarding',
    Home = 'home',
}

interface AppParamList {
    [AppRoute.Onboarding]: undefined;
    [AppRoute.Home]: undefined;
}

/* eslint-disable @typescript-eslint/no-namespace, @typescript-eslint/no-empty-interface */
declare global {
    namespace ReactNavigation {
        interface RootParamList extends AppParamList {}
    }
}
/* eslint-enable @typescript-eslint/no-namespace, @typescript-eslint/no-empty-interface */
