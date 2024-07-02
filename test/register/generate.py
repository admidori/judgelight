import csv
import random
import string

GENERATE_NUM_USERS = 50

def generate_random_string(length):
    letters = string.ascii_letters + string.digits
    return ''.join(random.choice(letters) for _ in range(length))

def generate_test_data(num_users):
    data = []
    cnt = 1
    for _ in range(num_users):
        username = str(cnt)
        password = str(cnt)
        data.append([username, password])
    return data

def write_csv_file(file_path, data):
    with open(file_path, 'w', newline='') as file:
        writer = csv.writer(file)
        writer.writerows(data)

test_data = generate_test_data(50)

# Write the data to a CSV file
file_path = './test.csv'
write_csv_file(file_path, test_data)
