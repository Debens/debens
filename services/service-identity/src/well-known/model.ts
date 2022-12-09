export interface AppleSiteAssociation {
    applinks: {
        apps: string[];
        details: {
            appID: string;
            paths: string[];
        }[];
    };
    webcredentials: {
        apps: string[];
    };
}

type AssetWebTarget = {
    namespace: 'web';
    site: string;
};

type AssetAppTarget = {
    namespace: 'android_app';
    package_name: string;
    sha256_cert_fingerprints: string[];
};

type AssetTarget = AssetWebTarget | AssetAppTarget;

type AssetLink = {
    relation: string[];
    target: AssetTarget;
};

export type AssetLinks = AssetLink[];
