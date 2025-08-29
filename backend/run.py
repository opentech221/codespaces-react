# backend/run.py - Point d'entrée principal pour Flask CLI
import os
import sys

# Ajouter le répertoire courant au PYTHONPATH pour permettre l'importation
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# Importer l'application depuis __init__.py
from __init__ import app

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
