export enum AppRoute {
    Onboarding = 'onboarding',
    Home = 'home',
    Profile = 'profile',
    Attestation = 'attestation',
    AngryMogisan = 'angry_mogisan',
}

interface AppParamList {
    [AppRoute.Onboarding]: undefined;
    [AppRoute.Home]: undefined;
    [AppRoute.Profile]: undefined;
    [AppRoute.Attestation]: undefined;
    [AppRoute.AngryMogisan]: undefined;
}

/* eslint-disable @typescript-eslint/no-namespace, @typescript-eslint/no-empty-interface */
declare global {
    namespace ReactNavigation {
        interface RootParamList extends AppParamList {}
    }
}
/* eslint-enable @typescript-eslint/no-namespace, @typescript-eslint/no-empty-interface */
