#!/usr/bin/env python3
# backend/test_auth.py - Script de test des endpoints d'authentification

import requests
import json

BASE_URL = "http://localhost:5000"

def test_api():
    print("=== Test de l'API Authentification ===\n")
    
    # 1. Test endpoint racine
    print("1. Test endpoint racine...")
    try:
        response = requests.get(f"{BASE_URL}/")
        print(f"   Status: {response.status_code}")
        print(f"   Response: {response.json()}")
    except Exception as e:
        print(f"   Erreur: {e}")
    
    # 2. Test inscription
    print("\n2. Test inscription...")
    user_data = {
        "nom": "Dupont",
        "prenom": "Jean",
        "email": "jean.dupont@test.com",
        "password": "motdepasse123",
        "role": "user",
        "telephone": "+33123456789"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/auth/register", json=user_data)
        print(f"   Status: {response.status_code}")
        print(f"   Response: {response.json()}")
    except Exception as e:
        print(f"   Erreur: {e}")
    
    # 3. Test connexion
    print("\n3. Test connexion...")
    login_data = {
        "email": "jean.dupont@test.com",
        "password": "motdepasse123"
    }
    
    token = None
    try:
        response = requests.post(f"{BASE_URL}/auth/login", json=login_data)
        print(f"   Status: {response.status_code}")
        result = response.json()
        print(f"   Response: {result}")
        if 'token' in result:
            token = result['token']
            print(f"   Token obtenu: {token[:50]}...")
    except Exception as e:
        print(f"   Erreur: {e}")
    
    # 4. Test profil avec token
    if token:
        print("\n4. Test récupération profil...")
        headers = {"Authorization": f"Bearer {token}"}
        try:
            response = requests.get(f"{BASE_URL}/auth/profile", headers=headers)
            print(f"   Status: {response.status_code}")
            print(f"   Response: {response.json()}")
        except Exception as e:
            print(f"   Erreur: {e}")
    
    # 5. Test endpoint protégé (liste utilisateurs)
    if token:
        print("\n5. Test endpoint protégé (liste utilisateurs)...")
        headers = {"Authorization": f"Bearer {token}"}
        try:
            response = requests.get(f"{BASE_URL}/users", headers=headers)
            print(f"   Status: {response.status_code}")
            print(f"   Response: {response.json()}")
        except Exception as e:
            print(f"   Erreur: {e}")

if __name__ == "__main__":
    test_api()
