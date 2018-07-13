import firebase from 'firebase';
import { FETCH_PHOTOS, UPLOAD_PHOTO, DELETE_PHOTO } from './index';

const BASE_URL = 'https://firestore.googleapis.com/v1beta1/';
const PROJECT_URL = 'projects/pwa-blip-ws-00/databases/(default)/documents/photos/';

const getPhotosData = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(BASE_URL + PROJECT_URL);

            const isSuccessfulResponse = response.status === 200;
            if (isSuccessfulResponse) {
                const data = await response.json();
                console.log(data.documents);
                return resolve({ data: data.documents });
            }

            const data = await response.json();
            return reject(new Error(data));
        } catch (e) {
            return reject();
        }
    });

const getUploadBody = (author, photoDesc, photo) => ({
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
});

const uploadPhoto = ({ author, photoDesc, photo }) =>
    new Promise(async (resolve, reject) => {
        const firebaseStorage = firebase.storage();
        const firebaseRef = firebaseStorage.ref();
        const imageStorageRef = firebaseRef.child(photo.name);

        imageStorageRef.put(photo).then(async snapshot => {
            const imageUrl = await snapshot.ref.getDownloadURL();
            const response = await fetch(BASE_URL + PROJECT_URL, {
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

const deletePhoto = photoId =>
    new Promise(async (resolve, reject) => {
        const response = await fetch(BASE_URL + photoId, {
            method: 'DELETE'
        });

        const isSuccessfulResponse = response.status === 200;
        if (isSuccessfulResponse) {
            return resolve();
        }
        return reject();
    });

export const fetchPhotos = () => ({
    type: FETCH_PHOTOS,
    payload: () => getPhotosData()
});

export const submitPhoto = data => ({
    type: UPLOAD_PHOTO,
    payload: () => uploadPhoto(data)
});

export const removePhoto = photoId => ({
    type: DELETE_PHOTO,
    payload: () => deletePhoto(photoId)
});
