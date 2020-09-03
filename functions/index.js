const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// auth trigger (new user signup)
exports.newUserSignUp = functions.auth.user().onCreate(user => {
  // for background triggers you must return a value/promise
  return admin
    .firestore()
    .collection("users")
    .doc(user.uid)
    .set({
      email: user.email,
      name: (user.displayName ? user.displayName : 'ccweb user'),
      photoUrl: (user.photoUrl ? user.photoUrl : null),
      topics_count: 0
    });
});

// auth trigger (user deleted)
exports.userDeleted = functions.auth.user().onDelete(user => {
  const doc = admin
    .firestore()
    .collection("users")
    .doc(user.uid);
  return doc.delete();
});
