from flask import Flask, request, jsonify
from flask_cors import CORS
import pexpect
import subprocess
import os
import json
import re

app = Flask(__name__)
CORS(app) 

current_file_path = os.path.abspath(__file__)
current_dir_path = os.path.dirname(current_file_path)

def remove_existing_container(container_name):
    # print(f"Checking for existing container named '{container_name}'...")
    try:
        subprocess.run(f"docker stop {container_name}", check=True, shell=True)
        subprocess.run(f"docker rm {container_name}", check=True, shell=True)
        # print(f"Removed existing container named '{container_name}'.")
    except subprocess.CalledProcessError:
        # print(f"No existing container named '{container_name}' to remove.")
        pass

def simulation(config, output_file):
    local_directory = current_dir_path
    container_directory = "/data"
    container_name = "multi2sim_container"
    remove_existing_container(container_name)
    command = f"docker run -it --name {container_name} -v {local_directory}:{container_directory} multi2sim/multi2sim bash"
    child = pexpect.spawn(command, encoding='utf-8', timeout=30)
    child.expect(r'root@.*#')
    command = f"m2s --x86-sim detailed --x86-config /data/x86-config --mem-config /data/{config} /data/no_blocking"
    child.sendline(command)
    child.expect(r'root@.*#')
    output = child.before
    
    with open(f"{output_file}.txt", 'w') as file:
        file.write(output)

    child.sendline('exit')
    child.sendline('docker stop {}'.format(container_name))
    child.sendline('docker rm {}'.format(container_name))
    child.close()


def update_config(file_path, new_values):
    try:
        with open(file_path, 'r') as file:
            lines = file.readlines()
    except FileNotFoundError:
        print("The specified file was not found.")
        return
    
    updated_lines = []
    for line in lines:
        for key, value in new_values.items():
            if line.strip().startswith(key):
                line = f"{key} = {value}\n"
                break
        updated_lines.append(line)

    with open(file_path, 'w') as file:
        file.writelines(updated_lines)

def capitalize_keys(data):
    return {key.capitalize(): value for key, value in data.items()}

import re

def read_simulation_result(path):
    result_dict = {"general":{}, "x86":{}}
    current_prefix = None

    with open(path, 'r') as file:
        for line in file:
            if 'General' in line:
                # current_prefix = 'General'
                tmp_key = "general"
            elif 'x86' in line:
                # current_prefix = 'x86'
                tmp_key = 'x86'

            if '=' in line:
                key, value = line.strip().split('=')
                key = key.strip().strip('[]')

                value = re.sub(r'\[.*?\]', '', value).strip()

                if value.replace('.', '', 1).isdigit():
                    value = float(value)

                # if current_prefix:
                    # key = f"{current_prefix}_{key}"
                result_dict[tmp_key][key] =  value


    return result_dict


@app.route('/api/simulate', methods=['POST'])
def cache_config():
    if request.method == 'POST':
        data = request.get_json()
        print("Received cache configuration for L1 and L2:")

        l1_config = capitalize_keys(data['L1'])
        l2_config = capitalize_keys(data['L2'])

        file_path_1 = current_dir_path + '/mem-config-1'
        update_config(file_path_1, l1_config)
        simulation("mem-config-1", "output-1")
        res_1 = read_simulation_result("output-1.txt")
        print(res_1)

        file_path_2 = current_dir_path + '/mem-config-2'
        update_config(file_path_2, l2_config)
        simulation("mem-config-2", "output-2")
        res_2 = read_simulation_result("output-2.txt")
        print(res_2)


        return jsonify({'status': 'success', 'message': 'Cache configuration received', 'result1':res_1, 'result2':res_2}), 200

if __name__ == '__main__':
    app.run(debug=True)


