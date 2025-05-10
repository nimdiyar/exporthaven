import pandas as pd
import numpy as np
from statsmodels.tsa.statespace.sarimax import SARIMAX
import joblib

# Suppose df_sarima is your cleaned dataset with columns: [Date, Country, Name, Value]
# 1. Convert 'Date' to datetime and sort
df_sarima = pd.read_csv("Interpolated_Dataset_yyyy_mm_dd.csv")
df_sarima['Date'] = pd.to_datetime(df_sarima['Date'])
df_sarima = df_sarima.sort_values(by='Date')

# 2. Create dictionary for train/test splits
training_test_splits = {}
train_ratio = 0.8

# Group by (Country, Product)
for (country, product), subset in df_sarima.groupby(['Country', 'Name']):
    # Sort by Date to ensure chronological order
    subset = subset.sort_values(by='Date')
     # If not enough data, skip
    if len(subset) < 24:
        continue  # Skip if insufficient data

    split_index = int(len(subset) * train_ratio)
    train_data = subset.iloc[:split_index].copy()
    test_data  = subset.iloc[split_index:].copy()

    training_test_splits[(country, product)] = {
        'train': train_data,
        'test': test_data
    }

import warnings
warnings.filterwarnings("ignore")  # Optional: suppress convergence warnings

from statsmodels.tsa.statespace.sarimax import SARIMAX

# Dictionary to store fitted SARIMA models
fitted_models = {}

# Define your default or chosen SARIMA parameters
p, d, q = 1, 1, 1
P, D, Q, m = 1, 1, 1, 12  # monthly data with yearly seasonality

for (country, product), data_splits in training_test_splits.items():
    train_data = data_splits['train'].copy()
    
    # Ensure train_data is indexed by Date
    train_data = train_data.set_index('Date').sort_index()

    # Fit SARIMA model
    try:
        model = SARIMAX(
            train_data['Value'],
            order=(p, d, q),
            seasonal_order=(P, D, Q, m),
            enforce_stationarity=False,
            enforce_invertibility=False
        )
        sarima_result = model.fit(disp=False)
        
        # Store the fitted model
        fitted_models[(country, product)] = sarima_result

    except Exception as e:
        print(f"Failed to fit SARIMA for {country}, {product}: {e}")
        continue

print(f"Successfully fitted {len(fitted_models)} SARIMA models!")

evaluation_results = {}

for (country, product), sarima_result in fitted_models.items():
    test_data = training_test_splits[(country, product)]['test'].copy()
    test_data = test_data.set_index('Date').sort_index()

    steps = len(test_data)
    if steps == 0:
        continue  # No test data

    try:
        forecast_obj = sarima_result.get_forecast(steps=steps)
        predictions = pd.Series(forecast_obj.predicted_mean.values, index=test_data.index)

        actuals = test_data['Value']

        # Calculate error metrics
        mape = np.mean(np.abs((actuals - predictions) / actuals)) * 100
        rmse = np.sqrt(np.mean((actuals - predictions) ** 2))

        evaluation_results[(country, product)] = {
            'MAPE': round(mape, 2),
            'RMSE': round(rmse, 2)
        }
    except Exception as e:
        print(f"Failed to forecast for {country}, {product}: {e}")
        continue

for k, v in list(evaluation_results.items())[:5]:
    print(k, v)


for (country, product), model in fitted_models.items():
    model.data.endog = None
    model.data.exog = None
    # etc.

joblib.dump(fitted_models, "fitted_sarima_models.pkl", compress=3)
print("all models are done")
