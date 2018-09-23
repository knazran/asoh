from flask import Flask, render_template, jsonify, request, send_file, abort
#from werkzeug.wrappers import Request, Response
import json
from flask_cors import CORS, cross_origin
#import datetime
from firebase import firebase
import numpy as np
import re
import string

# Initialize Firebase credentials
fb = firebase.FirebaseApplication('https://asoh-mampu.firebaseio.com/', None)
authentication = firebase.FirebaseAuthentication('THIS_IS_MY_SECRET', 'gohjinnshyan@gmail.com')

app = Flask(__name__)
CORS(app)

@app.route("/")
def main():
    return "Welcome! This is ASUH APP"

@app.route('/getclinic', methods=['GET'])
def getClinics():
    state = request.args.get('state', type = str)
    lon1 = request.args.get('long', type = float)
    lat1 = request.args.get('lat',type = float)
    #state = 'WP KUALA LUMPUR'
    #lon1 = 100
    #lat1 = 60
    #pull data
    clinic_data = fb.get('/clinics','clinics_info')
    clinic_data_json = json.loads(clinic_data)
    result_list = [(i,clinic_data_json[i]['LONGITUD'],clinic_data_json[i]['LATITUD'])
    for i in clinic_data_json if clinic_data_json[i]['NEGERI'] == state]
    #calculate haversine distance
    def haversine(lon1, lat1, lon2, lat2):
        """
        Calculate the great circle distance between two points 
        on the earth (specified in decimal degrees)
        """
        # convert decimal degrees to radians 
        #lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])
        lon1 = np.radians(lon1)
        lat1 = np.radians(lat1)
        lon2 = np.radians(lon2)
        lat2 = np.radians(lat2)

        # haversine formula 
        dlon = lon2 - lon1 
        dlat = lat2 - lat1 
        a = np.sin(dlat/2)**2 + np.cos(lat1) * np.cos(lat2) * np.sin(dlon/2)**2
        c = 2 * np.arcsin(np.sqrt(a)) 
        r = 6371 # Radius of earth in kilometers. Use 3956 for miles
        return [(no, i*r) for no,i in enumerate(c)]
    #get top 5
    top5_index = sorted(haversine(lon1,lat1,[i[1] for i in result_list],[i[2] for i in result_list]),key = lambda x:x[1])[:5]
    top5_clinic = list(zip(*[i for i in result_list if result_list.index(i) in list(zip(*top5_index))[0]]))[0]
    result_json = {i:clinic_data_json[i] for i in clinic_data_json if i in top5_clinic}
    result_list = []
    for no,i in enumerate(result_json):
        temp_json = result_json[i]
        temp_json.update({'NAMA_KLINIK':i,'JARAK':round(top5_index[no][1],0)})
        result_list.append(temp_json)
    return jsonify({'result': result_list}), 200

@app.route('/getnutrients', methods=['GET'])
def getNutrients():
    age = request.args.get('age', type = int)
    gender = request.args.get('gender', type = str)
    target = request.args.get('target', type = str)
    khasiat_data = fb.get('/foods','nutrition_info')
    user = 'ali'
    khasiat_data_json = json.loads(khasiat_data)
    khasiat_dict = {i:j for i,j in khasiat_data_json[str(age) + '-' + gender].items() if i not in ['JANTINA','UMUR']}
    result_json = {}
    for i in zip(list(khasiat_dict.keys()),['PURATA_KALORI_KCAL','PURATA_PROTEIN_GRAM',
                                       'PURATA_BUAH_BUAHAN_GRAM','PURATA_SAYUR_SAYURAN_GRAM',
                                       'PURATA_BIJIRIN_GRAM','PURATA_TENUSU_GRAM'],[1,28.3495,150,190,28.3495,245]):
        result_json[i[1]] = round(khasiat_dict[i[0]]*i[2],2)
    result_json.update({i:j for i,j in khasiat_data_json[str(age) + '-' + gender].items() if i in ['JANTINA','UMUR']})
    fb.put('/children',target,result_json)
    result_json.update({'ID':target})
    return jsonify({'result':result_json}),200

@app.route('/updatenutrients', methods=['GET'])
def updateNutrients():
    target = request.args.get('target', type = str)
    food = request.args.get('food', type = str)
    gram = request.args.get('gram', type = float)
    food_info = fb.get('/foods',food)
    customer_data = fb.get('/children',target)
    balance_dict = {}
    list_fruit_vege_milk_cereal_food = ['Vegetables and vegetable products',
                                 'Fruits and fruit products','Milk and milk products','Cereals and cereal products']
    list_fruit_vege_milk_cereal_cus = ['PURATA_SAYUR_SAYURAN_GRAM',
                                 'PURATA_BUAH_BUAHAN_GRAM','PURATA_TENUSU_GRAM','PURATA_BIJIRIN_GRAM']
    if food_info['Category'] in list_fruit_vege_milk_cereal_food:
        index = list_fruit_vege_milk_cereal_food.index(food_info['Category'])
        balance_dict[list_fruit_vege_milk_cereal_cus[index]] = customer_data[list_fruit_vege_milk_cereal_cus[index]] - \
                                                                gram
        for element in zip(['PURATA_PROTEIN_GRAM','PURATA_KALORI_KCAL'],['Protein','Energy']):
            if re.search('{}-([\d.]+)'.format(element[1]),food_info['Nutrients_Comp']):
                balance_dict[element[0]] = customer_data[element[0]] -  \
                    float(re.search('{}-([\d.]+)'.format(element[1]),food_info['Nutrients_Comp']).group(1))*(gram/100)    
        for rest in [i for i in list_fruit_vege_milk_cereal_food if i!=food_info['Category']]:
            index = list_fruit_vege_milk_cereal_food.index(rest)
            balance_dict[list_fruit_vege_milk_cereal_cus[index]] = customer_data[list_fruit_vege_milk_cereal_cus[index]]
    else:
        for i in customer_data:
            if i not in ['JANTINA','UMUR']:
                for element in zip(['PURATA_PROTEIN','PURATA_KALORI_GRAM'],['Protein','Energy']):
                    balance_dict[element[0]] = customer_data[element[0]]
                    if re.search('{}-([\d.]+)'.format(element[1]),food_info['Nutrients_Comp']):
                        balance_dict[element[0]] = customer_data[element[0]] -  \
                                float(re.search('{}-([\d.]+)'.format(element[1]),food_info['Nutrients_Comp']).group(1))*(gram/100)
                for element in list_fruit_vege_milk_cereal_cus:
                    balance_dict[element] = customer_data[element]
    #make sure no negative
    for i in balance_dict:
        if type(balance_dict[i])!=str and balance_dict[i]<0:
            balance_dict[i] = 0
    balance_dict.update({i:customer_data[i] for i,j in customer_data.items() if i in ['JANTINA','UMUR']})
    balance_dict.update({'ID':target})
    fb.put('/children',target,balance_dict)
    return jsonify({'result':balance_dict}),200

if __name__ == "__main__":
    # app.config['TEMPLATES_AUTO_RELOAD']=True
    # app.run('0.0.0.0', debug=True,use_reloader=True)
    #app.run(debug=True,use_reloader=True)
    app.run()
    # app.run('0.0.0.0')