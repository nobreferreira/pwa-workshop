const functions = require('firebase-functions');
const admin = require('firebase-admin');
const webpush = require('web-push');

options = {
    gcmAPIKey: 'AIzaSyAqp27jLTPekMxTjOi5lGX-kXGrQa7duKM',
    TTL: 60
};
admin.initializeApp();

exports.sendImageNotification = functions.firestore.document('/photos/{photoUid}').onWrite((snap, context) => {
    const newImagedata = snap.after.data();
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
            const badge =
                'https://firebasestorage.googleapis.com/v0/b/pwa-blip-ws-00.appspot.com/o/' +
                'icons%2Fblip-icon-192.png?alt=media&token=abc33849-53f9-4199-853f-e603face7368';

            const payload = JSON.stringify({
                title: 'Check this new photo',
                body: `Check out this new photo ${newImagedata.photoDesc} from ${newImagedata.author}!`,
                image: newImagedata.photo,
                badge,
                icon: badge
            });
            tokens.forEach(token => {
                webpush.sendNotification(token, payload, options);
            });
            return;
        })
        .catch(error => {
            console.log('Error: ', error);
        });
});
