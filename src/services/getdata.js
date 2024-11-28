const { Firestore } = require('@google-cloud/firestore');

async function getHistories() {
    const db = new Firestore();

    const snapshot = await db.collection('predictions').get();

    const histories = [];

    snapshot.forEach(doc => {
        const docData = doc.data();

        const history = {
            "result": docData.result,
            "createdAt": docData.createdAt,
            "suggestion": docData.suggestion,
            "id": doc.id
        };

        histories.push(history);
    });

    return histories;
}

module.exports = getHistories;