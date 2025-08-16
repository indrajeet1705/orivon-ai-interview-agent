from flask  import Flask, request, jsonify
import os
from pyresparser import ResumeParser
from flask_cors import CORS

from flask_pymongo import PyMongo

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb+srv://indrajeet:orivonproject@ai-interview-agent.7mntq7o.mongodb.net/agentDB?retryWrites=true&w=majority&appName=ai-interview-agent"
mongo = PyMongo(app)
CORS(app)
upload_folder = 'upload'
os.makedirs(upload_folder, exist_ok=True)
app.config['UPLOAD_FOLDER'] = upload_folder

@app.route('/job-post',methods=["POST","GET","PATCH"])
def createPost():
    
    if request.method=="POST":
        jd=request.get_json()

        mongo.db.posts.insert_one(jd)
        return jsonify({"success":True,"message":"Job Posted Successfully"})
    elif request.method=="GET":
        all_job_post=list(mongo.db.posts.find({}))
        for post in all_job_post:
            post['_id']=str(post['_id'])

        return jsonify(all_job_post)
    elif request.method=="PATCH":
        resume=request.files.get('resume')
        if resume.filename=='':
            return jsonify({"success":False,"messgae":"Choose File"})
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], resume.filename)
        resume.save(filepath)
        data=ResumeParser(filepath).get_extracted_data()
        
        
    else:
        return jsonify({"error":"Internal Server Error"})


@app.route('/submit', methods=["POST"])
def submit():
    jd=request.form.to_dict()
    if 'resume' not in request.files:
        return jsonify({"error": "Please select a resume"})
    
    resume = request.files.get('resume')
    
    if resume.filename == '':
        return jsonify({"error": "Filename is empty. Please select a resume"})
    

    filepath = os.path.join(app.config['UPLOAD_FOLDER'], resume.filename)
    resume.save(filepath)
    
    data=ResumeParser(filepath).get_extracted_data()
    data['JD']=jd
    return data
    


if __name__ == '__main__':
    app.run(debug=True)
