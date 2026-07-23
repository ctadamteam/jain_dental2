import json

def extract_texts(node, texts):
    if node.get("type") == "TEXT":
        texts.append(node.get("characters", ""))
    if "children" in node:
        for child in node["children"]:
            extract_texts(child, texts)

with open("figma_implant_node.json", "r", encoding="utf-8") as f:
    data = json.load(f)

texts = []
for node_id, node_data in data.get("nodes", {}).items():
    extract_texts(node_data.get("document", {}), texts)

with open("figma_implant_texts.txt", "w", encoding="utf-8") as f:
    for text in texts:
        f.write(text.strip() + "\n")
