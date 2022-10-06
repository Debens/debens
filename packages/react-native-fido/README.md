# `@debens/react-native-fido`

> TODO: description

## Usage

```
const testingLibrary = require('@debens/react-native-fido');

// TODO: DEMONSTRATE API
```

## Debugging

To expose service-identity running on localhost. You cannot use localhost to extract the AASA, it needs to be under SSL.

```sh
ngrok http <SERVICE_IDENTITY_PORT>
```

```
    # entitilements
	<key>com.apple.developer.associated-domains</key>
	<array>
		<string>webcredentials:<NGROK_HOST>?mode=developer</string>
	</array>
```

Update the project domain: https://console.hanko.io/organization/e4e10ac8-111a-41be-a12a-aecfb747b051/relyingParty/e616cd28-7dd1-40b9-8d29-33241dfce139/webauthn

TODO: create sandbox project.

To break down webauthn responses, they contain base63 encoded CBOR data:

https://debugger.simplewebauthn.dev/

https://debugger.simplewebauthn.dev/?attestation=ewogICJpZCI6ICJkeG5LWDl4eWNLamRQX1U4T1g4NTlIbzJfRWMiLAogICJ0eXBlIjogInB1YmxpYy1rZXkiLAogICJyYXdJZCI6ICJkeG5LWDl4eWNLamRQX1U4T1g4NTlIbzJfRWMiLAogICJyZXNwb25zZSI6IHsKICAgICJjbGllbnREYXRhSlNPTiI6ICJleUowZVhCbElqb2lkMlZpWVhWMGFHNHVZM0psWVhSbElpd2lZMmhoYkd4bGJtZGxJam9pVDIwMVNHa3hZVmxmU0RoSVFUQTRSbTQxYlRsdWRUWk9lRVpYYWtkeVVtRlFhMk5CVVVWQ1VIWlZheUlzSW05eWFXZHBiaUk2SW1oMGRIQnpPaTh2TkdabU55MDRPUzAwTkMwME1TMHlPQzVsZFM1dVozSnZheTVwYnlKOSIsCiAgICAiYXR0ZXN0YXRpb25PYmplY3QiOiAibzJObWJYUmtibTl1WldkaGRIUlRkRzEwb0doaGRYUm9SR0YwWVZpWVZxU1pjRVVBT0VJcnRlcDQxYWxVV3JBdXY2ZE1HRFgwWF9CQmloWV9CbzlGQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUZIY1p5bF9jY25DbzNUXzFQRGxfT2ZSNk52eEhwUUVDQXlZZ0FTRllJQ2g4bnZGU0dvQmtPOWZFWEg4TkdINlMtZWkxZzF5a05OcTNGNm9SQWkyT0lsZ2dkMXZQNFM2by0tUmdQVEJ2VmY4OENqN0puMjk2VkhlWU1PbHFZRVhqd1NRIgogIH0KfQ

### Diagnostics

```sh
xcrun simctl diagnose
```

```
xcrun simctl logverbose <UDID> enable
```

`<UDID>/SharedWebCredentialsState.txt`
