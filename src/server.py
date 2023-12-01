from flask import Flask, request, jsonify
from flask_cors import CORS 
import json


app = Flask(__name__)
CORS(app)


@app.route('/addJson', methods=['POST'])
def add_task():
  data = request.get_json()
  print(data)
  return jsonify({"success": True, "message": "Json added successfully"})
    
    

if __name__ == '__main__':
    app.run()
