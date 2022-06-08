export enum AppRoute {
    Onboarding = 'onboarding',
    Home = 'home',
}

export enum HomeRoute {
    Calendar = 'calendar',
}

interface AppParamList {
    [AppRoute.Onboarding]: undefined;
    [AppRoute.Home]: undefined;
}

interface HomeParamList {
    [HomeRoute.Calendar]: undefined;
}

/* eslint-disable @typescript-eslint/no-namespace, @typescript-eslint/no-empty-interface */
declare global {
    namespace ReactNavigation {
        interface RootParamList extends AppParamList, HomeParamList {}
    }
}
/* eslint-enable @typescript-eslint/no-namespace, @typescript-eslint/no-empty-interface */
