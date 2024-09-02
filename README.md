# botai

This project hosts a web application for classifying bottles into various categories such as Beer, Plastic, Wine, Water, and Soda. The model is based on MobileNetV3 and has been trained on a synthetic bottle image dataset found on Kaggle.

## Dataset
The dataset used for training can be found here: [Bottle Synthetic Images Dataset on Kaggle](https://www.kaggle.com/datasets/vencerlanz09/bottle-synthetic-images-dataset).

## Model Architecture
The model is based on MobileNetV3, a lightweight convolutional neural network designed for mobile devices. The model was trained using PyTorch and later exported to the ONNX format. However, before converting the model to TensorFlow.js (TFJS), the activation functions HardSwish and HardSigmoid were manually adjusted due to exportation errors.

### Model Workflow:
1. **Training:** The model was trained in PyTorch using the Kaggle dataset.
2. **ONNX Export:** The trained model was exported to the ONNX format.
3. **Manual Adjustments:** Activation functions HardSwish and HardSigmoid were modified manually to handle errors during export.
4. **TFJS Conversion:** The model was then converted to TensorFlow.js (TFJS) for deployment on the web.

## Web Application
The web application allows users to upload an image of a bottle and receive predictions for the type of bottle. The interface is clean and minimalist, using basic CSS for styling and JavaScript for handling interactivity.

### Features:
- **Image Upload:** Users can upload images of bottles.
- **Prediction Display:** The model provides predictions for five bottle categories: Beer, Plastic, Wine, Water, and Soda.
- **Responsive Design:** The site is designed to be mobile-friendly and features a modern, clean layout.

## Installation
To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/tobyes/botai.git
   cd botai
