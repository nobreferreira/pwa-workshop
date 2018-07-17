function getUploadBody(endpointValue, authValue, p256dhValue) {
    return {
        fields: {
            keys: {
                mapValue: {
                    fields: {
                        p256dh: {
                            stringValue: p256dhValue
                        },
                        auth: {
                            stringValue: authValue
                        }
                    }
                }
            },
            endpoint: {
                stringValue: endpointValue
            }
        }
    };
}

const tokensUrl =
    'https://firestore.googleapis.com/v1beta1/projects/pwa-blip-ws-XX/databases/(default)/documents/tokens/';
// TODO  - change the above URL to use your firebase config

export default function register() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js');

        // navigator.serviceWorker.ready (start from this line)

        // TODO - subscribe to push service
        // https://developer.mozilla.org/en-US/docs/Web/API/PushManager/subscribe

        // TODO save subscription firebase
        // https://developer.mozilla.org/en-US/docs/Web/API/PushSubscription
        // Tips:
        // - use toJSON()
        // - concat the tokensUrl and part of the subscription endpoint to have a
        //   unique ID for the subscription tocken
        // - Use method PATCH in order to create or update if the token already exists
        // - use the function getUploadBody to get the PATCH BODY
    }
}
