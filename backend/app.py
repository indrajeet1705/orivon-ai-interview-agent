from flask  import Flask, request, jsonify
import os
import uuid
from dotenv import load_dotenv
from pyresparser import ResumeParser
from flask_cors import CORS
from bson import ObjectId
from flask_pymongo import PyMongo
from pymongo import ReturnDocument
import json
load_dotenv()

app = Flask(__name__)
CORS(app,resources={r'/*':{'origins':'*'}})

app.config["MONGO_URI"] = os.getenv('MONGO_URI')
mongo = PyMongo(app)

upload_folder = 'upload'
os.makedirs(upload_folder, exist_ok=True)
app.config['UPLOAD_FOLDER'] = upload_folder


json_resumes=os.path.join(os.getcwd(),'json_resumes')
os.makedirs(json_resumes,exist_ok=True)
app.config['json_resumes']=json_resumes
count=0
@app.route('/job-post',methods=["POST","GET","PATCH","DELETE"])
def createPost():
    
    if request.method=="POST":
        jd=request.get_json()
        jd['applications']=[]
        mongo.db.posts.insert_one(jd)
        return jsonify({"success":True,"message":"Job Posted Successfully"})
    elif request.method=="GET":
        all_job_post=list(mongo.db.posts.find({}))
        for post in all_job_post:
            post['_id']=str(post['_id'])

        return jsonify(all_job_post)
    elif request.method=="PATCH":
        resume=request.files.get('resume')
        post_id=request.args.get('post_id')
        if resume.filename=='':
            return jsonify({"success":False,"messgae":"Choose File"})
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], resume.filename)
        resume.save(filepath)
        data=ResumeParser(filepath).get_extracted_data()
        
        
        unique_json_filename= f"candidtae_{data['name']}.json"
        json_file_path= os.path.join(app.config['json_resumes'],unique_json_filename)

        with open ( json_file_path,"w",encoding='utf-8') as f :
            json.dump(data,f,indent=4)
            

        result= mongo.db.posts.find_one_and_update(
        {"_id": ObjectId(post_id)},
        {"$push": {"applications":data }},
        return_document=ReturnDocument.AFTER
        )
        if result:
            result['_id'] = str(result['_id'])
            return jsonify({"success": True, "message": "Resume added", "updated_post": result})
        else:
            return jsonify({"success": False, "message": "Post not found"})

    elif request.method=="DELETE":
        job_id=request.args.get('post_id')
        if job_id=='':
            return jsonify({"success":False,"messgae":"Plese select post"}),400
        try:
            result=mongo.db.posts.find_one_and_delete({"_id":ObjectId(job_id)})
            if result :
                return jsonify({"success":True,"message":"Post Deleted"})
            else:
                return jsonify({"success":False,"message":"Something went wrong"}),400
        except Exception as e :
            return jsonify({"success":False,"massage":e})

        
        
    else:
        return jsonify({"error":"Internal Server Error"})



    


if __name__ == '__main__':
    app.run(debug=True)
