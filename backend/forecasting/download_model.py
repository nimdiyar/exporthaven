import os
import requests

GCS_BASE_URL = "https://storage.googleapis.com/exporthaven_models/"

def download_model_if_needed(country):
    filename = f"fitted_sarima_models/model_{country}.pkl"

    # 👇 print to confirm what it's trying
    print(f"📦 Checking for: {filename}")
    
    if os.path.exists(filename):
        print(f"✅ Already exists: {filename}")
        return filename

    url = f"{GCS_BASE_URL}models_{country}.pkl"
    print(f"🌐 Downloading from: {url}")

    response = requests.get(url)
    if response.status_code != 200:
        raise FileNotFoundError(f"❌ Could not download model from {url}, status: {response.status_code}")

    os.makedirs("fitted_sarima_models", exist_ok=True)
    with open(filename, "wb") as f:
        f.write(response.content)

    print(f"✅ Downloaded to: {filename}")
    return filename
