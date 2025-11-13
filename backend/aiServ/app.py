from flask import Flask, request, jsonify
from google import genai
from google.genai import types
import json
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

# Initialize Gemini client
API_KEY = os.getenv("GEMINI_API_KEY")
if not API_KEY:
    raise ValueError("❌ Missing GEMINI_API_KEY in environment!")

# Initialize Gemini client
#genai.configure(api_key=API_KEY)

client = genai.Client(api_key=API_KEY)

@app.route('/')
def home():
    return "🚀 Flask app is running successfully on Hugging Face!"

# Helper function to generate questions
def generate_questions(topic, difficulty, question_type, num):
    """Generate questions of a given type using Gemini API"""
    
    qa_object_schema = types.Schema(
        type=types.Type.OBJECT,
        properties={
            "type": types.Schema(
                type=types.Type.STRING,
                enum=["subjective", "objective"],
                description="Question type: 'subjective' or 'objective'"
            ),
            "question": types.Schema(
                type=types.Type.STRING,
                description=f"A {difficulty}-level question on {topic}"
            ),
            "options": types.Schema(
                type=types.Type.ARRAY,
                description="4 options if 'objective', [] if 'subjective'",
                items=types.Schema(type=types.Type.STRING)
            ),
            "answer": types.Schema(
                type=types.Type.STRING,
                description="For 'objective': correct option. For 'subjective': detailed answer."
            )
        },
        required=["type", "question", "options", "answer"]
    )

    final_schema = types.Schema(
        type=types.Type.ARRAY,
        items=qa_object_schema,
        max_items=num,
        description=f"Exactly {num} {question_type} questions."
    )

    prompt = f"""
    You are an expert educational content generator specializing in astrophysics.

    Generate {num} unique {question_type.upper()} questions based on:
    - Topic: {topic}
    - Difficulty: {difficulty}

    Rules:
    1. For 'objective': provide 4 options, and the 'answer' must match the correct option.
    2. For 'subjective': 'options' must be [] and 'answer' must be a detailed explanation.

    Output only a JSON array matching the schema.
    """

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            response_schema=final_schema,
            temperature=0.7
        )
    )

    return json.loads(response.text)

@app.route('/generate-questions', methods=['POST'])
def generate_questions_api():
    try:
        data = request.get_json()

        topic = data.get("topic", "Astrophysics")
        difficulty = data.get("difficulty", "Intermediate")
        num_questions = int(data.get("num_questions", 5))
        question_type = data.get("question_type", "mix").lower()

        # Handle mix mode
        if question_type == "mix":
            half = num_questions // 2
            subjective_qs = generate_questions(topic, difficulty, "subjective", half)
            objective_qs = generate_questions(topic, difficulty, "objective", num_questions - half)
            questions = subjective_qs + objective_qs
        else:
            questions = generate_questions(topic, difficulty, question_type, num_questions)

        return jsonify({
            "status": "success",
            "topic": topic,
            "difficulty": difficulty,
            "question_type": question_type,
            "total_questions": len(questions),
            "questions": questions
        })

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500


def get_cosine_similarity(answer1, answer2):
    # Create a TF-IDF vectorizer
    vectorizer = TfidfVectorizer()

    # Fit and transform the answers
    tfidf_matrix = vectorizer.fit_transform([answer1, answer2])

    # Compute cosine similarity (2x2 matrix)
    similarity_matrix = cosine_similarity(tfidf_matrix)

    # Return similarity score between answer1 and answer2
    similarity_score = float(similarity_matrix[0][1])
    return similarity_score

@app.route('/similarity', methods=['POST'])
def calculate_similarity():
    try:
        data = request.get_json()
        answer1 = data.get('answer1', '')
        answer2 = data.get('answer2', '')

        if not answer1 or not answer2:
            return jsonify({'error': 'Both answers are required'}), 400

        similarity = get_cosine_similarity(answer1, answer2)
        return jsonify({'cosine_similarity': similarity})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=7860)

