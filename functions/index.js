const functions = require('firebase-functions');
const admin = require('firebase-admin');
const webpush = require('web-push');

options = {
    gcmAPIKey: '', // TODO - ADD gcmKey, also add gcm_sender_id in the manifest file
    TTL: 60
};
admin.initializeApp();

exports.sendImageNotification = functions.firestore.document('/photos/{photoUid}').onWrite((snap, context) => {
    // get the image info from the snapshot
    const newImagedata = snap.after.data();

    // get all the tokens from the database
    const tokens = admin
        .firestore()
        .collection(`/tokens`)
        .get()
        .then(querySnapshot => {
            const tokens = [];
            querySnapshot.forEach(doc => {
                tokens.push(doc.data());
            });
            return tokens;
        })
        .catch(error => {
            console.log('Error getting tokens: ', error);
        });

    return Promise.all([newImagedata, tokens])
        .then(values => {
            const [newImagedata, tokens] = values;

            // TODO - Create notification payload and send to all clients using the tokens and webPush
            //
            // https://developers.google.com/web/fundamentals/push-notifications/display-a-notification
            // https://github.com/web-push-libs/web-push
            //
            //

            return;
        })
        .catch(error => {
            console.log('Error: ', error);
        });
});
