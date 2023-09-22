import xgboost as xgb
import pickle
from flask import Flask, request, jsonify
import numpy as np
# from LADKAFeature import
from FeatureExt import FeatureExtraction
from flask_cors import CORS

app = Flask(__name__)

CORS(app)
# Load the machine learning model
# with open('Phishing-ML-Testing\XGBoostClassifier.pickle.dat', 'rb') as model_file:
#     model = pickle.load(model_file)

loaded_model = pickle.load(
    open(r'XgClassifierModel.pk1', 'rb'))


# Load the model using the new version of XGBoost
# model = xgb.Booster(model_file='Phishing-ML-Testing\MyClassifier.model')


# print(model)


@app.route('/process', methods=['POST'])
def process():
    try:
        # Get the input data from the POST request
        data = request.json

        if 'url' not in data:
            return jsonify({'error': 'Missing "url" key in JSON request'})

        # Extract the URL from the JSON data
        url = data['url']

        # Instantiate the FeatureExtraction class with the extracted URL
        feature_extractor = FeatureExtraction(
            url)
        features = feature_extractor.extract_all_features()

        # features = [[1,1,1,1,1,1,-1,1,-1,1,1,1,1,1,-1,1,-1,-1,0,1,1,1,1,1,-1,1,-1,-1,1,-1]]
        # print("Yes")
        print(features)
        # dmatrix = xgb.DMatrix(np.array([features]))

        # Make predictions using the loaded model
        # prediction = model.predict(dmatrix)
        # Make predictions using the loaded model
        # prediction = model.predict(np.array([features]))
        loaded_model_prediction = loaded_model.predict([features])
        # print(loaded_model_prediction)
        if (loaded_model_prediction == 1):
            print("LEGITIMATE")
        else:
            print("PHISHING")
        # print("Woww")
        # Convert the prediction to a list and return as JSON
        print(jsonify({'prediction': loaded_model_prediction.tolist()}))
        return jsonify({'prediction': loaded_model_prediction.tolist()})
    except Exception as e:
        return jsonify({'error': str(e)})


if __name__ == '__main__':
    app.run(debug=True)
