from flask  import Flask, request, jsonify
import os
from pyresparser import ResumeParser
app = Flask(__name__)

upload_folder = 'upload'
os.makedirs(upload_folder, exist_ok=True)
app.config['UPLOAD_FOLDER'] = upload_folder

@app.route('/submit', methods=["POST"])
def submit():
    if 'resume' not in request.files:
        return jsonify({"error": "Please select a resume"})
    
    resume = request.files['resume']
    
    if resume.filename == '':
        return jsonify({"error": "Filename is empty. Please select a resume"})
    

    filepath = os.path.join(app.config['UPLOAD_FOLDER'], resume.filename)
    resume.save(filepath)
    
    data=ResumeParser(filepath).get_extracted_data()
    return jsonify({"messsage":"successfuuly parsed","data":data})
    


if __name__ == '__main__':
    app.run(debug=True)
