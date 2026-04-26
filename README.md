# 🌿 Plant Disease Detection System

An AI-powered web application that detects plant diseases from leaf images using Machine Learning.
This project helps farmers and agriculture enthusiasts identify plant diseases quickly and take necessary actions.

---

## 🚀 Features

* 📸 Upload plant leaf images
* 🤖 AI-based disease prediction
* ⚡ Fast and accurate results
* 🌐 Full-stack web application (React + Python backend)
* 🧠 Machine Learning model integration

---

## 🛠️ Tech Stack

### Frontend

* React.js
* HTML, CSS, JavaScript

### Backend

* Python
* Flask

### Machine Learning

* TensorFlow / Keras (for model prediction)

---

## 📂 Project Structure

```
Plant-disease-detection/
│
├── backend/
│   ├── main.py
│   ├── model/
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 🔹 1. Clone the Repository

```bash
git clone https://github.com/pritamghosh827/Plant-disease-detection.git
cd Plant-disease-detection
```

---

### 🔹 2. Backend Setup

```bash
cd backend
pip install -r requirements.txt
python main.py
```

👉 Backend will run on:

```
http://localhost:5000
```

---

### 🔹 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

👉 Frontend will run on:

```
http://localhost:3000
```

---

## 🔗 API Endpoint

### 📌 Predict Disease

**POST** `/predict`

#### Request:

* Upload image file

#### Response:

```json
{
  "prediction": "Tomato Leaf Blight"
}
```

---

## 🌍 Deployment

### Frontend:

* Deploy using Vercel

### Backend:

* Deploy using:

  * Render
  * Railway

⚠️ Note: Make sure to update API URL in frontend after deployment.

---

## ⚠️ Common Issues

* ❌ API not working on deployed site
  👉 Replace `localhost` with live backend URL

* ❌ Model file not loading
  👉 Ensure correct file path in backend

* ❌ CORS error
  👉 Enable CORS in Flask

---

## 📌 Future Improvements

* 📱 Mobile-friendly UI
* 🌾 More crop disease datasets
* 📊 Confidence score display
* 🧾 Treatment suggestions for diseases

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork this repo and submit a pull request.

---

## 📜 License

This project is open-source and available under the MIT License.

---

## 👨‍💻 Author

**Pritam Ghosh**

GitHub: https://github.com/pritamghosh827

---

## ⭐ Support

If you like this project, please give it a ⭐ on GitHub!
