#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(Fido, NSObject)

RCT_EXTERN_METHOD(configure:(nonnull NSDictionary *)config)

RCT_EXTERN_METHOD(attestation:(nonnull NSDictionary *)config
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(assertion:(nonnull NSDictionary *)config
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

@end
