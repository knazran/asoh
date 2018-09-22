from flask import Flask, render_template, jsonify, request, send_file, abort
from werkzeug.wrappers import Request, Response
import json
from flask_cors import CORS, cross_origin
import datetime

app = Flask(__name__)
CORS(app)

@app.route("/")
def main():
    return "Welcome! This is Asoh's service server for MAMPU Open Data Hackathon"

@app.route('/api/v1.0/getTickers', methods=['GET'])
def getCoinTickers():
	coinmarketcap = Market()
	tickers = coinmarketcap.ticker(start=0, limit=10, convert='USD')
	return jsonify({'tickers': tickers}), 200

@app.route('/api/v1.0/getStats', methods=['GET'])
def getCoinStats():
	coinmarketcap = Market()
	stats = coinmarketcap.stats(convert='USD')
	return jsonify({'stats': stats})

# @app.route('/api/v1.0/getTimeSeries', methods=['GET'])
# def getCoinTimeSeries():
#   start_of_2016 = datetime.date(2016, 1, 1).isoformat()
#   ohlcv_historical = coin_api.ohlcv_historical_data('BITSTAMP_SPOT_BTC_USD', {'period_id': '1MTH', 'time_start': start_of_2016})
#   json.dump(ohlcv_historical, open('historical-btc-usd', 'w'))
#   return jsonify({'ohlcv_historical': ohlcv_historical})

if __name__ == "__main__":
	# app.config['TEMPLATES_AUTO_RELOAD']=True
	# app.run('0.0.0.0', debug=True,use_reloader=True)
	app.run(debug=True,use_reloader=True)
	# app.run()
	# app.run('0.0.0.0')
		