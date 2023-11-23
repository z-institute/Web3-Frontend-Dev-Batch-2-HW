# import requests

# API_URL = "https://api-inference.huggingface.co/models/stablediffusionapi/anything-v5"
# headers = {"Authorization": "Bearer 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"}

# def query(payload):
# 	response = requests.post(API_URL, headers=headers, json=payload)
# 	return response.content
# image_bytes = query({
# 	"inputs": "Astronaut riding a horse",
# })


# # You can access the image with PIL.Image for example
# import io
# from PIL import Image
# image = Image.open(io.BytesIO(image_bytes))

import requests  
import json  
  
url =  "https://stablediffusionapi.com/api/v3/dreambooth"  
  
payload = json.dumps({  
"key":  "YyuGZxsMYcgZSxZ7iTz6g5KXpiy1iYaAPv8RNPdsDPfDaMxrKHjoXnqMMrE9",  
"model_id":  "anything-v5",  
"prompt":  "actual 8K portrait photo of gareth person, portrait, happy colors, bright eyes, clear eyes, warm smile, smooth soft skin, big dreamy eyes, beautiful intricate colored hair, symmetrical, anime wide eyes, soft lighting, detailed face, by makoto shinkai, stanley artgerm lau, wlop, rossdraws, concept art, digital painting, looking into camera",  
"negative_prompt":  "painting, extra fingers, mutated hands, poorly drawn hands, poorly drawn face, deformed, ugly, blurry, bad anatomy, bad proportions, extra limbs, cloned face, skinny, glitchy, double torso, extra arms, extra hands, mangled fingers, missing lips, ugly face, distorted face, extra legs, anime",  
"width":  "512",  
"height":  "512",  
"samples":  "1",  
"num_inference_steps":  "30",  
"safety_checker":  "no",  
"enhance_prompt":  "yes",  
"seed":  None,  
"guidance_scale":  7.5,  
"multi_lingual":  "no",  
"panorama":  "no",  
"self_attention":  "no",  
"upscale":  "no",  
"embeddings":  "embeddings_model_id",  
"lora":  "lora_model_id",  
"webhook":  None,  
"track_id":  None  
})  
  
headers =  {  
'Content-Type':  'application/json'  
}  
  
response = requests.request("POST", url, headers=headers, data=payload)  
  
print(response.text)
