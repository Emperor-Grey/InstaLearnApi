// firebaseConfig.js
const admin = require('firebase-admin');
const serviceAccount = "something"
    // require('./path/to/serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://your-firebase-project.firebaseio.com',
});

const db = admin.firestore();
const auth = admin.auth();

module.exports = {db, auth};
