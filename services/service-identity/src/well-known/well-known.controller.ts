import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AppleSiteAssociation, AssetLinks } from './model';

@ApiTags('.well-known')
@Controller('.well-known')
export class WellKnownController {
    @Get('/apple-app-site-association')
    SiteAssociation(): AppleSiteAssociation {
        return {
            applinks: {
                apps: process.env.KNOWN_APPLINKS_APPS
                    ? process.env.KNOWN_APPLINKS_APPS.replace(/^\s+|\s+$/gm, '').split(',')
                    : [],
                details: [],
            },
            webcredentials: {
                apps: process.env.KNOWN_WEBCREDENTIALS_APPS
                    ? process.env.KNOWN_WEBCREDENTIALS_APPS.replace(/^\s+|\s+$/gm, '').split(',')
                    : [],
            },
        };
    }

    @Get('/assetlinks.json')
    AssetLinks(): AssetLinks {
        return [
            {
                relation: [
                    'delegate_permission/common.handle_all_urls',
                    'delegate_permission/common.get_login_creds',
                ],
                target: {
                    namespace: 'android_app',
                    sha256_cert_fingerprints: [
                        'FA:C6:17:45:DC:09:03:78:6F:B9:ED:E6:2A:96:2B:39:9F:73:48:F0:BB:6F:89:9B:83:32:66:75:91:03:3B:9C',
                    ],
                    package_name: 'app.debens',
                },
            },
        ];
    }
}
