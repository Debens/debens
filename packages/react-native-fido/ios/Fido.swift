import Foundation
import AuthenticationServices

@available(iOS 15.0, *)
@objc(Fido)
class Fido: NSObject, ASAuthorizationControllerDelegate, ASAuthorizationControllerPresentationContextProviding {
    
    var domain: String = "identity.dev.debens.app"
    var name: String = "debens"
    
    var resolve: RCTPromiseResolveBlock?
    var reject: RCTPromiseRejectBlock?
    
    func presentationAnchor(for controller: ASAuthorizationController) -> ASPresentationAnchor {
        return UIApplication.shared.keyWindow!
    }
    
    @objc static func requiresMainQueueSetup() -> Bool {
        return false
    }
    
    @objc
    func configure(_ config: [String: String]) {
        if let domain = config["domain"] {
            self.domain = domain
        }
        if let name = config["name"] {
            self.name = name
        }
    }
    
    @objc(attestation:withResolver:withRejecter:)
    func attestation(_ config: [String: Any], resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void {
        self.resolve = resolve;
        self.reject = reject;
        
        if let publicKey = config["publicKey"] as? [String: Any],
            let challenge = publicKey["challenge"] as? String, let user = publicKey["user"] as? [String: String], let id = user["id"] {
            
            let publicKeyCredentialProvider = ASAuthorizationPlatformPublicKeyCredentialProvider(relyingPartyIdentifier: self.domain)
            if let data = challenge.toBase64(), let userID = id.toBase64() {
                let assertionRequest = publicKeyCredentialProvider.createCredentialRegistrationRequest(challenge: data, name: self.name, userID: userID)
                
                if let authenticator = publicKey["authenticatorSelection"] as? [String: Any], let userVerification = authenticator["userVerification"] as? String {
                    assertionRequest.userVerificationPreference = ASAuthorizationPublicKeyCredentialUserVerificationPreference.init(rawValue: userVerification)
                }

                let authController = ASAuthorizationController(authorizationRequests: [ assertionRequest ] )
                authController.delegate = self
                authController.presentationContextProvider = self
                authController.performRequests()
            }
        }
    }
    
    @objc(assertion:withResolver:withRejecter:)
    func assertion(_ config: [String: Any], resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void {
        self.resolve = resolve;
        self.reject = reject;
        
        if let publicKey = config["publicKey"] as? [String: Any], let challenge = publicKey["challenge"] as? String{
            let publicKeyCredentialProvider = ASAuthorizationPlatformPublicKeyCredentialProvider(relyingPartyIdentifier: self.domain)
            if let data = challenge.toBase64() {
                let assertionRequest = publicKeyCredentialProvider.createCredentialAssertionRequest(challenge: data)
                
                if let authenticator = publicKey["authenticatorSelection"] as? [String: Any], let userVerification = authenticator["userVerification"] as? String {
                    assertionRequest.userVerificationPreference = ASAuthorizationPublicKeyCredentialUserVerificationPreference.init(rawValue: userVerification)
                }

                let authController = ASAuthorizationController(authorizationRequests: [ assertionRequest ] )
                authController.delegate = self
                authController.presentationContextProvider = self
                authController.performRequests()
            }
        }
    }
    
    func authorizationController(controller: ASAuthorizationController, didCompleteWithError error: Error) {
        reject!("error", error.localizedDescription, error);
    }
    
    func authorizationController(controller: ASAuthorizationController, didCompleteWithAuthorization authorization: ASAuthorization) {
        switch authorization.credential {
        case let registration as ASAuthorizationPlatformPublicKeyCredentialRegistration:
            complete(params: registration)
        case let assertion as ASAuthorizationPlatformPublicKeyCredentialAssertion:
            verify(params: assertion)
        default:
            reject!("error", "Received unknown authorization type", NSError())
        }
    }
    
    func complete(params: ASAuthorizationPlatformPublicKeyCredentialRegistration) {
        resolve!([
            "id": params.credentialID.toBase64Url(),
            "rawId": params.credentialID.toBase64Url(),
            "type": "public-key",
            "response": [
                "attestationObject": params.rawAttestationObject!.toBase64Url(),
                "clientDataJson": params.rawClientDataJSON.toBase64Url()
            ]
        ]);
    }
    
    func verify(params: ASAuthorizationPlatformPublicKeyCredentialAssertion) {
        resolve!([
            "id": params.credentialID.toBase64Url(),
            "rawId": params.credentialID.toBase64Url(),
            "type": "public-key",
            "response": [
                "authenticatorData": params.rawAuthenticatorData.toBase64Url(),
                "clientDataJson": params.rawClientDataJSON.toBase64Url(),
                "signature": params.signature.toBase64Url(),
                "userHandle": params.userID.toBase64Url()
            ]
        ])
    }
}

extension String {
    func toBase64() -> Data? {
        var base64 = self
            .replacingOccurrences(of: "-", with: "+")
            .replacingOccurrences(of: "_", with: "/")
        
        if base64.count % 4 != 0 {
            base64.append(String(repeating: "=", count: 4 - base64.count % 4))
        }
        
        return Data(base64Encoded: base64)
    }
}

extension Data {
    func toBase64Url() -> String {
        return self.base64EncodedString()
            .replacingOccurrences(of: "+", with: "-")
            .replacingOccurrences(of: "/", with: "_")
            .replacingOccurrences(of: "=", with: "")
    }
}
