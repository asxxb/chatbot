from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.shortcuts import render
from django.utils import timezone
import json

def index(request):
    return render(request, 'chatbot/index.html')

@csrf_exempt
@require_POST
def get_chat_messages(request):
    if request.method == 'POST':
        # Get user message
        user_message = json.loads(request.body).get('message', '')

        # Process user message and generate a response (replace this with your chatbot logic)
        chatbot_response = f"Chatbot says: Hello, you said '{user_message}'"

        # Simulate a delay for processing (replace with actual processing time)
        import time
        time.sleep(1)

        # Store chat history (you might want to use a database for this in a real application)
        chat_history.append({'sender': 'User', 'message': user_message, 'timestamp': timezone.now()})
        chat_history.append({'sender': 'Chatbot', 'message': chatbot_response, 'timestamp': timezone.now()})

        # Return the updated chat history in JSON format
        return JsonResponse(chat_history, safe=False)

# Initial chat history (replace this with your actual chat history loading mechanism)
chat_history = [
    {'sender': 'Chatbot', 'message': 'Welcome to the Chatbot!', 'timestamp': timezone.now()}
]
