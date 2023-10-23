import csv
import json

# Define the CSV file and JSON file names
csv_file = r'F:\ElasticSearch\Sinhala_Metaphor_Search_App\data\corpus1.csv'
json_file = 'F:\ElasticSearch\Sinhala_Metaphor_Search_App\data\data.json'

# Initialize an empty list to store the data
data = []

# Read the CSV file and convert it to a list of dictionaries
with open(csv_file, 'r', encoding='utf-8') as csv_file:
    content = csv_file.read().strip('\ufeff')  # Remove \ufeff character
    csv_reader = csv.DictReader(content.splitlines())  # Split the content into lines
    for row in csv_reader:
        data.append(row)

# Write the data as JSON to a file
with open(json_file, 'w', encoding='utf-8') as json_file:
    json.dump(data, json_file, ensure_ascii=False, indent=4)

print(f'CSV file "{csv_file}" has been converted to JSON file "{json_file}".')
