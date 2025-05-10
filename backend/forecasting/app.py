from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import joblib
import pandas as pd
import numpy as np
from statsmodels.tsa.statespace.sarimax import SARIMAX
from download_model import download_model_if_needed
import pickle

app = Flask(__name__)
# Allow CORS for requests from the frontend running on http://localhost:3000
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

MONTHS_MAP = {
    "january": 1, "february": 2, "march": 3, "april": 4,
    "may": 5, "june": 6, "july": 7, "august": 8,
    "september": 9, "october": 10, "november": 11, "december": 12
}

def get_last_training_date(sarima_result):
    """Return the final date used in the model's index, if available."""
    try:
        index = sarima_result.model.data.row_labels
        last_date = index[-1]
        return pd.to_datetime(last_date)
    except:
        return None

@app.route("/api/predict", methods=["GET"])
def predict():
    """
    Example usage:
      /api/predict?month=Jan&country=Australia

    Loads 'models_Australia.pkl', forecasts based on the month offset,
    and returns the top 4 products by predicted value.
    """
    month_str = request.args.get("month")
    country_str = request.args.get("country")

    # Validate inputs
    if not month_str or not country_str:
        return jsonify({"error": "Missing 'month' or 'country'"}), 400

    # Convert month string to integer offset
    month_lower = month_str.lower()
    if month_lower not in MONTHS_MAP:
        return jsonify({"error": f"Invalid month: {month_str}"}), 400
    months_ahead = MONTHS_MAP[month_lower]
    # Clamping to [1, 12] is redundant since MONTHS_MAP ensures this, but kept for safety
    months_ahead = max(1, min(12, months_ahead))

    # Normalize country name for file lookup
    model_path = download_model_if_needed(country_str)

    if not os.path.exists(model_path):
        return jsonify({"error": f"No model file found for country={country_str}"}), 404

    # Load the country's model dictionary
    try:
        country_dict = joblib.load(model_path)
        print(country_dict)
    except Exception as e:
        return jsonify({"error": f"Failed to load model file for {country_str}: {e}"}), 500

    # Forecast for each product
    predictions = {}
    for product, sarima_result in country_dict.items():
        last_date = get_last_training_date(sarima_result)
        if not last_date:
            continue
        try:
            forecast_obj = sarima_result.get_forecast(steps=months_ahead)
            predicted_value = forecast_obj.predicted_mean.iloc[-1]
            predictions[product] = float(predicted_value)
        except Exception as e:
            print(f"Forecast failed for {country_str}-{product}: {e}")

    if not predictions:
        return jsonify({"error": f"No predictions for {country_str} month={month_str}"}), 404

    # Sort and return top 4 products
    sorted_preds = sorted(predictions.items(), key=lambda x: x[1], reverse=True)
    top_4 = dict(sorted_preds[:4])

    return jsonify(top_4)

if __name__ == "__main__":
    app.run(debug=True, port=5001)