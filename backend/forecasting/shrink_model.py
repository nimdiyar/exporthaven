import joblib
from collections import defaultdict

# 1) Load the big file
with open("../fitted_sarima_models.pkl", "rb") as f:
    fitted_models = joblib.load(f)

country_dicts = defaultdict(dict)
for (country, product), model in fitted_models.items():
    country_dicts[country][product] = model

for country, subdict in country_dicts.items():
    joblib.dump(subdict, f"models_{country}.pkl", compress=9)
print("Done")
