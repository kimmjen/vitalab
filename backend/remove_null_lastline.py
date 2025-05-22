import os

data_dir = './data'
for filename in os.listdir(data_dir):
    if filename.endswith('.csv') and filename[:-4].isdigit():
        path = os.path.join(data_dir, filename)
        with open(path, 'rb') as f:
            lines = f.readlines()
        if lines and all(b == 0x00 for b in lines[-1].strip()):
            # 마지막 줄이 널 문자로만 이루어져 있으면 삭제
            with open(path, 'wb') as f:
                f.writelines(lines[:-1])
            print(f"{filename}: 마지막 널 문자 줄 삭제됨")
        else:
            print(f"{filename}: 마지막 줄 정상")