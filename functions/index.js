const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// firestore trigger for tracking activity
exports.addNewTopic = functions.firestore.document('/topics')
  .onCreate((snap, context) => {
    console.log(snap.data());
    // const activities = admin.firestore().collection('activities');
    // const collection = context.params.collection;
});
