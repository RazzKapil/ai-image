from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

# Load the pre-trained DialoGPT model and tokenizer
model_name = "microsoft/DialoGPT-small"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

# Move model to GPU if available
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = model.to(device)

# User input
user_input = "Hello, AI!"

# Tokenize the input and generate a response
input_ids = tokenizer.encode(user_input, return_tensors="pt").to(device)
response_ids = model.generate(
    input_ids,
    max_length=50,
    pad_token_id=tokenizer.eos_token_id,
    temperature=0.7,
    top_k=50,
    top_p=0.95
)

# Decode and print the response
response = tokenizer.decode(response_ids[:, input_ids.shape[-1]:][0], skip_special_tokens=True)
print(f"AI: {response}")