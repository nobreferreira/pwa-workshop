const fs = require('fs');
const replace = require('replace-in-file');

const args = process.argv.slice(2);
const group = args[0];

const contents = fs.readFileSync('firebase-configs.json');
const jsonContent = JSON.parse(contents);

const fbConfig = jsonContent[group];

fs.writeFile('./src/config/firebaseConfig.json', JSON.stringify(fbConfig.firebaseConf, null, 2), err => {
    if (err) throw err;
});

const options = {
    files: [
        './.firebaserc',
        './src/actions/photosActions.js',
        './src/registerServiceWorker.js',
        './functions/index.js'
    ],
    from: /pwa-blip-ws-00/g,
    to: fbConfig.projectName
};

try {
    const changes = replace.sync(options);
    console.log('Modified files:', changes.join(', '));
} catch (error) {
    console.error('Error occurred:', error);
}

const options2 = {
    files: ['./public/manifest.json'],
    from: /senderIdBlip/g,
    to: fbConfig.fcmId
};

try {
    const changes = replace.sync(options2);
    console.log('Modified files:', changes.join(', '));
} catch (error) {
    console.error('Error occurred:', error);
}

const options3 = {
    files: ['./functions/index.js'],
    from: /gcmServerKey/g,
    to: fbConfig.fcmServerKey
};

try {
    const changes = replace.sync(options3);
    console.log('Modified files:', changes.join(', '));
} catch (error) {
    console.error('Error occurred:', error);
}
