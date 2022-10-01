export enum AppRoute {
    Landing = 'landing',
    Game = 'game',
    Settings = 'settings',
}

interface AppParamList {
    [AppRoute.Landing]: undefined;
    [AppRoute.Game]: undefined;
    [AppRoute.Settings]: undefined;
}

/* eslint-disable @typescript-eslint/no-namespace, @typescript-eslint/no-empty-interface */
declare global {
    namespace ReactNavigation {
        interface RootParamList extends AppParamList {}
    }
}
/* eslint-enable @typescript-eslint/no-namespace, @typescript-eslint/no-empty-interface */
