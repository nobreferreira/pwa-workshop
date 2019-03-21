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
    'https://firestore.googleapis.com/v1beta1/projects/pwa-blip-ws-00/databases/(default)/documents/tokens/';
// TODO  - change the above URL to use your firebase config

export default function register() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js');

        navigator.serviceWorker.ready
            .then(serviceWorkerRegistration =>
                // userVisibleOnly: A boolean indicating that the returned push subscription
                // will only be used for messages whose effect is made visible to the user.
                serviceWorkerRegistration.pushManager.subscribe({ userVisibleOnly: true })
            )
            .then(
                pushSubscription => {
                    const subscription = pushSubscription.toJSON();
                    const url = tokensUrl.concat(subscription.endpoint.slice(-20));
                    fetch(url, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(
                            getUploadBody(subscription.endpoint, subscription.keys.auth, subscription.keys.p256dh)
                        )
                    }).catch(error => console.error('Subscribing to notifications failure', error));
                },
                error =>
                    console.log(
                        `User rejected notifications permission or there is a problem with secure origins: ${error}`
                    )
            )
            .catch(error => console.log('Error: ', error));
    }
}
