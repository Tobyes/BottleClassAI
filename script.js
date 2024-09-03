async function loadModel() {
    console.log("Loading The Model....");
    try {
        globalThis.TensorFlowModel = await tf.loadGraphModel("./model.json");
        console.log("Model loaded successfully");
    } catch (error) {
        console.error("Error loading model:", error);
    }
}

window.onload = loadModel;

function handleDrop(event) {
    event.preventDefault();
    loadImage(event);
}

async function loadImage(event) {
    const image = document.getElementById('image-loaded');
    const processButton = document.getElementById('process-button');

    const file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const img = new Image();
        img.src = e.target.result;
        img.onload = function () {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = 224;
            canvas.height = 224;
            ctx.drawImage(img, 0, 0, 224, 224);
            image.src = canvas.toDataURL();
            image.style.display = 'block';
            processButton.style.display = 'block';
        };
    };

    reader.readAsDataURL(file);
}

async function processImage() {
    const image = document.getElementById('image-loaded');
    const predictionTableContainer = document.getElementById('prediction-table-container');
    const processButton = document.getElementById('process-button');
    const inferenceTimeContainer = document.getElementById('inference-time-container');
    const inferenceTimeElement = document.getElementById('inference-time');
    
    // Change the button text and give the browser a moment to update the UI
    processButton.innerText = "Please Wait ...";
    await new Promise(resolve => setTimeout(resolve, 50)); // Small delay to allow UI update
    
    try {
        const startTime = performance.now();  

        const output = tf.browser.fromPixels(image);
        const tensor = output.expandDims(0);
        const tfnormalized = tensor.div(255.0);

        const predictions = globalThis.TensorFlowModel.predict(tfnormalized);
        const predictionArray = Array.from(predictions.dataSync());

        const endTime = performance.now();  
        const inferenceTime = (endTime - startTime).toFixed(2);  
        inferenceTimeElement.innerText = `${inferenceTime} ms`;
        inferenceTimeContainer.style.display = 'block';

        const classLabels = ["Beer Bottle", "Plastic Bottle", "Soda Bottle", "Water Bottle", "Wine Bottle"];
        const sortedPredictions = classLabels.map((label, index) => ({
            label: label,
            probability: predictionArray[index] * 100
        })).sort((a, b) => b.probability - a.probability);

        const tableBody = document.querySelector('#prediction-table tbody');
        tableBody.innerHTML = "";
        sortedPredictions.forEach(prediction => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${prediction.label}</td><td>${prediction.probability.toFixed(2)}%</td>`;
            tableBody.appendChild(row);
        });

        predictionTableContainer.style.display = 'block';
        predictionTableContainer.scrollIntoView({ behavior: 'smooth' });
        processButton.innerText = "Process Image";
    } catch (error) {
        console.error("Error processing image:", error);
        processButton.innerText = "Error";
    }
}

