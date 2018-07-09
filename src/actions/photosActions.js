import firebase from 'firebase';
import { FETCH_PHOTOS, UPLOAD_PHOTO } from './index';

const url = 'https://firestore.googleapis.com/v1beta1/projects/pwa-blip-ws-00/databases/(default)/documents/photos/';

function getPhotosData() {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(url);

            const isSuccessfulResponse = response.status === 200;
            if (isSuccessfulResponse) {
                const data = await response.json();
                return resolve({ data: data.documents });
            }

            const data = await response.json();
            return reject(new Error(data));
        } catch (e) {
            return reject();
        }
    });
}

function getUploadBody(author, photoDesc, photo) {
    return {
        fields: {
            author: {
                stringValue: author
            },
            photoDesc: {
                stringValue: photoDesc
            },
            photo: {
                stringValue: photo
            }
        }
    };
}

function uploadPhoto({ author, photoDesc, photo }) {
    return new Promise(async (resolve, reject) => {
        const firebaseStorage = firebase.storage();
        const firebaseRef = firebaseStorage.ref();
        const imageStorageRef = firebaseRef.child(photo.name);

        imageStorageRef.put(photo).then(async snapshot => {
            const imageUrl = await snapshot.ref.getDownloadURL();
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(getUploadBody(author, photoDesc, imageUrl))
            });

            const isSuccessfulResponse = response.status === 200;
            if (isSuccessfulResponse) {
                return resolve();
            }
            return reject();
        });
    });
}

export const fetchPhotos = () => ({
    type: FETCH_PHOTOS,
    payload: () => getPhotosData()
});

export const submitPhoto = data => ({
    type: UPLOAD_PHOTO,
    payload: () => uploadPhoto(data)
});
