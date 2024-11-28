const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');

async function predictCancer(model, image) {
    try{
        const tensor = tf.node
          .decodeJpeg(image)
          .resizeNearestNeighbor([224, 224])
          .expandDims()
          .toFloat()

        const prediction = model.predict(tensor);
        const score = await prediction.data();

        console.log("Prediction Score: ", score[0]); // Debug output

        const classes = ['Non-cancer', 'Cancer'];

        const classResult = score[0] > 0.5 ? 1 : 0;
        const label = classes[classResult];

        console.log("Label: ", label); // Debug output

        let suggestion;

        if (label === 'Cancer'){
            suggestion = 'Segera periksa ke dokter!';
        }
        else{
            suggestion = 'Penyakit kanker tidak terdeteksi.';
        }

        return { label, suggestion }
    }
    catch (error){
        throw new InputError('Terjadi kesalahan dalam melakukan prediksi');
    }
}

module.exports = predictCancer;