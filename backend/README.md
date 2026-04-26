# Backend — Plant Disease App

Quick notes to run the backend server locally for development.

Requirements
- Python 3.8+
- Install dependencies (prefer a virtualenv)

Install
```bash
python -m venv .venv
.venv\\Scripts\\activate    # Windows
pip install -r requirements.txt
```

Run
```bash
# from repository root
python backend\\main.py
# or use uvicorn directly
uvicorn backend.main:app --reload --host 127.0.0.1 --port 8000
```

Health
- Visit `http://127.0.0.1:8000/health` to confirm server and model status.

Notes
- The model file `cnn_rnn_hybrid_model.pth` should be located in `backend/`.
- If model loading fails, check logs for details.