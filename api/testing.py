# import urllib.parse


# url = "https://www.youtube.com/watch?v=L9qf7tn0NVw&list=RDA67RYFTImTQ&index=2"

# encoded_url = urllib.parse.quote(url,safe="")

# test = "https%3A//www.youtube.com/watch%3Fv%3DL9qf7tn0NVw%26list%3DRDA67RYFTImTQ%26index%3D2"
# test2 = "https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DL9qf7tn0NVw%26list%3DRDA67RYFTImTQ%26index%3D2"
# print(encoded_url)

import urllib.parse
import requests



url = 'https://www.youtube.com/watch?v=L9qf7tn0NVw&list=RDA67RYFTImTQ&index=2'
encoded_url = urllib.parse.quote(url,safe="")  # Retain certain characters like :, /, ?, =, &
print(encoded_url)  # "https%3A%2F%2Fexample.com%2Fsearch%3Fquery%3Dhello%20world"



response = requests.get(f"http://127.0.0.1:8000/api/audio/?url={encoded_url}")


print(response.json())