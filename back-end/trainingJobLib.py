import pickle
from flask import Flask, request, jsonify
import numpy as np
# from URLFeatureExtraction import featureExtraction
import joblib
import xgboost as xgb

# Load the model using the new version of XGBoost

# Extract features from the URL
# features = featureExtraction("https://www.youtube.com/watch?v=I1refTZp-pg")
# features = [[1,1,1,1,1,1,-1,1,-1,1,1,1,1,1,-1,1,-1,-1,0,1,1,1,1,1,-1,1,-1,-1,1,-1]]
features = [[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -
             1, -1, -1, -1, -1, -1, 0, 1, 1, 1, 1, 1, -1, 1, -1, -1, 1, -1]]

# model = xgb.Booster(model_file='MyClassifier.model')
# Convert the features to a DMatrix object
# dmatrix = xgb.DMatrix(np.array([features]))
# loaded_model_prediction = model.predict(dmatrix)

# loaded_model = pickle.load(open('XgClassifierModel.pk1' , 'rb'))
# loaded_model_prediction = loaded_model.predict(features)


filename = "XgClassifier.joblib"
loaded_model = joblib.load(filename)
loaded_model_prediction = loaded_model.predict(features)
# Make predictions using the loaded model
print(loaded_model_prediction)
