const  { Forestore, Firestore } = require('@google-cloud/firestore');

async function storeData(id, data) {
    const db = new Firestore();

    const predictionsCollection = db.collection('predictions');
    return predictionsCollection.doc(id).set(data);
}

module.exports = storeData;