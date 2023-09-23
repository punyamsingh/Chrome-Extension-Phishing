# Phishing Detection Chrome Extension

## Project Overview

This project aims to develop a Chrome extension that leverages AI/ML to detect phishing domains that imitate the look and feel of genuine domains. The extension extracts URLs, sends them to a Flask server, which further utilizes a Python feature extraction module and an ML model to predict if a website is legitimate or phishing.

pptlink: https://docs.google.com/presentation/d/1uqInSDOHwI_AVtu630Lfhqt-IUrCB_YhHqJslKlUMBM/edit?usp=sharing

## Workflow

1. **Chrome Extension**: The extension extracts URLs from the browser.

2. **Sends URL to Flask Server**: Extracted URLs are sent to a Flask server for processing.

3. **Flask Server**: The Flask server forwards the URL to the Python Feature Extraction module.

4. **Python Feature Extraction**: This module extracts relevant features from the webpage content.

5. **Sends Extracted Features to ML Model**: Extracted features are sent to the ML model for prediction.

6. **ML Model**: The ML model analyzes the features and returns a prediction.

7. **Prediction Results**:
   - If the prediction is 1, the website is considered legitimate.
   - If the prediction is 0, the website is identified as phishing.

## Model Details

- Model Used: XGBoost
- Accuracy Achieved: 97.0%
- Number of Features: 30
- Future Plan: The future plan is to enhance the model by adding Reinforcement Learning from Human Feedback (RLHF) to improve its phishing detection capabilities further.

## Dependencies

- Chrome Browser: The extension relies on the Chrome web browser as its primary platform.
- Python and Libraries: The server-side component is built using Python with dependencies such as Flask for the server, scikit-learn for machine learning, and BeautifulSoup for web scraping.

## Getting Started

1. Clone this repository.
2. Install the required Python dependencies.
3. Load the Chrome extension.
4. Run the Flask server.
5. Start browsing, and the extension will analyze URLs in real-time.

## Usage

- Click the extension icon to initiate URL analysis.
- The extension will provide real-time feedback on the legitimacy of websites.
