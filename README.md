# 🚀 Auto_CNN

This project implements a deep learning pipeline for classifying environmental sounds from the ESC-50 dataset. It features a custom convolutional neural network (**AutoCNN**) built with PyTorch, using residual blocks for improved learning. The solution includes data augmentation, training on GPU using **Modal**, and a scalable inference API.

## 🔧 Tech Stack

**ML/Backend:**

- PyTorch
- Torchaudio
- Modal (GPU-accelerated training & inference)
- FastAPI (for serving inference endpoints)

**Client (optional visualization layer):**

- Next.js
- Tailwind CSS
- TypeScript
- Shadcn UI

## 🎯 Key Features

✅ Custom CNN architecture with residual connections  
✅ ESC-50 dataset ingestion and preprocessing  
✅ Data augmentation with Mixup and spectrogram masking  
✅ Fully managed training on GPU using Modal  
✅ Inference API with real-time audio classification  
✅ Intermediate feature map visualization for debugging and interpretability  
✅ Example endpoint for testing predictions from WAV files

## 📦 Environment Variables (`.env`)

```env
# Modal API Key
NEXT_PUBLIC_MODAL_API=
```

## 📁 Dataset

This project uses the **ESC-50 dataset**, which contains 50 environmental sound categories. The training pipeline automatically downloads and prepares the dataset during Modal app initialization.

## ⚙️ Installation

```bash
# Clone the repo
git clone https://github.com/JoelDeonDsouza/Auto_CNN.git
cd auto-cnn

# Install dependencies
pip install -r requirements.txt
```

## 🚀 Training on Modal

You can launch a training job on Modal with GPU acceleration.

```bash
modal run train.py
```

The trained model will be saved in a Modal-managed volume.

## 🔍 Inference

Deploy the inference API:

```bash
modal deploy main.py
```

Test an inference request locally:

```bash
modal run main.py
```

## 🔊 Example Audio Test

Put your WAV files in the `audio-tests/` directory. An example (`chirpingBirds.wav`) is included for testing.

## 🛠️ Key Components

- `AutoCNN`: Custom CNN model with residual blocks
- `ESC50Dataset`: PyTorch Dataset class for ESC-50
- `train.py`: Training loop with augmentation, optimizer, and TensorBoard logging
- `inference.py`: FastAPI-powered inference endpoint
- `modal`: Manages GPU workloads and deploys endpoints

## 🔬 Model Architecture

The AutoCNN model follows a ResNet-inspired structure with four convolutional stages, followed by global pooling and a linear classifier.
