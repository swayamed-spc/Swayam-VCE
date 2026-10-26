path = r'Swayam-VCE/frontend/src/data/events.js'
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

# Replace any stray replacement chars
text = text.replace('Indias', "India's").replace('Swayam  ED', "Swayam – ED")

# Fix line with India's startup ecosystem in single quoted string
text = text.replace("bridge academia and India's startup ecosystem.", "bridge academia and India\\'s startup ecosystem.")
text = text.replace("with T-Hub's extensive", "with T-Hub\\'s extensive")
text = text.replace("the cell's annual activities.", "the cell\\'s annual activities.")

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)

print("Fixed quotes and characters.")
