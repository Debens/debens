package com.reactnativefido

import android.app.Activity
import android.content.Intent

import android.util.Base64;

import com.facebook.react.bridge.*
import com.google.android.gms.fido.Fido
import com.google.android.gms.fido.fido2.api.common.*
import com.google.android.gms.fido.fido2.api.common.AuthenticatorSelectionCriteria as AuthenticatorSelectionCriteria1


class FidoModule(var reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private var mPromise: Promise? = null;
    private var domain: String = "api.debens.app";
    private var name: String = "Training App";

    private val mActivityEventListener: ActivityEventListener = object : BaseActivityEventListener() {
        override fun onActivityResult(activity: Activity?, requestCode: Int, resultCode: Int, intent: Intent) {
            mPromise?.let {
                when (resultCode) {
                    Activity.RESULT_OK -> {
                        when (requestCode) {
                            REGISTER_REQUEST_CODE ->  complete(intent)
                            SIGN_REQUEST_CODE ->  verify(intent)
                        }
                    }
                    Activity.RESULT_CANCELED -> it.reject("FIDO", "Intent Cancelled")
                    else -> it.reject("FIDO", "Intent Failed")
                }
            }
        }
    }

    init {
        reactContext.addActivityEventListener(mActivityEventListener);
    }

    override fun getName(): String {
        return "Fido"
    }

    @ReactMethod
    fun attestation(config: ReadableMap, promise: Promise) {
        mPromise = promise;

        config.getMap("publicKey").let { publicKey ->
            val authenticator = publicKey?.getMap("authenticatorSelection")
            val authenticatorSelection = AuthenticatorSelectionCriteria1.Builder()
                        .setAttachment(Attachment.fromString(authenticator?.getString("authenticatorAttachment")))
//                       FIXME: add feature flag, not supported .setRequireResidentKey(authenticator?.getBoolean("requireResidentKey"))

            val options = PublicKeyCredentialCreationOptions.Builder()
                    .setRp(PublicKeyCredentialRpEntity(domain, name, null))
                    .setUser(PublicKeyCredentialUserEntity(publicKey?.getMap("user")?.getString("id")?.toBase64(), name, "", name))
                    .setAuthenticatorSelection(authenticatorSelection.build())
                    .setChallenge(publicKey?.getString("challenge")?.toBase64())
                    .setParameters(CREDENTIAL_CREATION_PARAMETERS)
                    .build()

            val fido2ApiClient = Fido.getFido2ApiClient(reactContext)
            val fido2PendingIntentTask = fido2ApiClient.getRegisterPendingIntent(options);

            fido2PendingIntentTask.addOnFailureListener { error ->
                mPromise?.reject("FIDO", "Failed to create register Intent", error)
            }

            fido2PendingIntentTask.addOnSuccessListener { fido2PendingIntent ->
                fido2PendingIntent?.let { intent ->
                    reactContext.currentActivity?.let { activity ->
                        activity.startIntentSenderForResult(intent.intentSender, REGISTER_REQUEST_CODE, null, 0, 0, 0)
                    }
                }
            }
        }
    }

    @ReactMethod
    fun assertion(config: ReadableMap, promise: Promise) {
        mPromise = promise

        config.getMap("publicKey").let { publicKey ->
            val options = PublicKeyCredentialRequestOptions.Builder()
                    .setRpId(domain)
                    .setChallenge(publicKey?.getString("challenge")?.toBase64())
                    .setAllowList(
                            /**
                             * FIXME: List requires valid credentials, these need to come from the BE.
                             *
                             * This means we require a user id to fetch them all.
                             *
                             * e.g. "AVzcoBLs1thQb584d-U-GPA71s75VdZ-2Q-DyhO9E8kS5Symkgz5hv3qxtzZ38b4WvVEmHtv-WaOFS_fPsKXh5U".toBase64(),
                             */
                            publicKey?.getArray("allowList")?.toArrayList()?.filterIsInstance<String>()
                                ?.map { PublicKeyCredentialDescriptor(PublicKeyCredentialType.PUBLIC_KEY.toString(), it.toBase64(), null) }
                    )
                    .build()

            val fido2ApiClient = Fido.getFido2ApiClient(reactContext)
            val fido2PendingIntentTask = fido2ApiClient.getSignPendingIntent(options);

            fido2PendingIntentTask.addOnFailureListener { error ->
                mPromise?.reject("FIDO", "Failed to create sign Intent", error)
            }

            fido2PendingIntentTask.addOnSuccessListener { fido2PendingIntent ->
                fido2PendingIntent?.let { intent ->
                    reactContext.currentActivity?.let { activity ->
                        activity.startIntentSenderForResult(intent.intentSender, SIGN_REQUEST_CODE, null, 0, 0, 0)
                    }
                }
            }
        }
    }

    private fun complete(intent: Intent) {
        mPromise?.let {
            val fido2Response = intent.getByteArrayExtra(Fido.FIDO2_KEY_CREDENTIAL_EXTRA)
            val publicKeyCredential = PublicKeyCredential.deserializeFromBytes(fido2Response)
            when (val signedData = publicKeyCredential.response) {
                is AuthenticatorAttestationResponse -> {
                    var result = Arguments.createMap()
                    result.putString("id", publicKeyCredential.id.toBase64URL())
                    result.putString("type", publicKeyCredential.type)
                    result.putString("rawId", publicKeyCredential.rawId.toBase64().toBase64URL())

                    val response = Arguments.createMap()
                    response.putString("clientDataJSON", signedData.clientDataJSON.toBase64().toBase64URL())
                    response.putString("attestationObject", signedData.attestationObject.toBase64().toBase64URL())
                    result.putMap("response", response)

                    it.resolve(result)
                }
                is AuthenticatorErrorResponse -> it.reject("FIDO", signedData.errorMessage)
            }
        }
    }

    private fun verify(intent: Intent) {
        mPromise?.let {
            val fido2Response = intent.getByteArrayExtra(Fido.FIDO2_KEY_CREDENTIAL_EXTRA)
            val publicKeyCredential = PublicKeyCredential.deserializeFromBytes(fido2Response)
            when (val signedData = publicKeyCredential.response) {
                is AuthenticatorAssertionResponse -> {
                    var result = Arguments.createMap()
                    result.putString("id", publicKeyCredential.id.toBase64URL())
                    result.putString("type", publicKeyCredential.type)
                    result.putString("rawId", publicKeyCredential.rawId.toBase64().toBase64URL())

                    val response = Arguments.createMap()
                    response.putString("clientDataJSON", signedData.clientDataJSON.toBase64().toBase64URL())
                    response.putString("authenticatorData", signedData.authenticatorData.toBase64().toBase64URL())
                    response.putString("signature", signedData.signature.toBase64().toBase64URL())
                    response.putString("userHandle", signedData.userHandle.toBase64().toBase64URL())
                    result.putMap("response", response)

                    it.resolve(result)
                }
                is AuthenticatorErrorResponse -> it.reject("FIDO", signedData.errorMessage)
            }
        }
    }

    private fun ByteArray.toBase64(): String {
        return Base64.encodeToString(this, Base64.NO_WRAP)
    }

    private fun String.toBase64URL(): String {
        return this.replace("+", "-")
                .replace("/", "_")
                .replace("=", "")
    }

    private fun String.toBase64(): ByteArray {
        var base64 = this
                .replace("-", "+")
                .replace("_",  "/")

        if (base64.length % 4 != 0) {
            base64.plus("=".repeat( 4 - base64.length % 4))
        }

        return Base64.decode(base64.toByteArray(), Base64.NO_WRAP)
    }

    companion object {
        const val REGISTER_REQUEST_CODE = 0
        const val SIGN_REQUEST_CODE = 1

        val CREDENTIAL_CREATION_PARAMETERS = listOf(
                PublicKeyCredentialParameters(
                        PublicKeyCredentialType.PUBLIC_KEY.toString(),
                        EC2Algorithm.ES256.algoValue
                )
        )
    }
}
