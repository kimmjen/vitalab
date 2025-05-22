#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
VitalDB CSV 파일의 마지막 줄에 있는 널 문자(0x00)를 제거하는 스크립트
"""

import os
import sys

def clean_csv_files(directory='./data'):
    """
    지정된 디렉토리 내 모든 csv 파일의 마지막 줄이 널 문자로만 구성되어 있으면 해당 줄 제거
    
    Args:
        directory (str): CSV 파일이 있는 디렉토리 경로
    """
    if not os.path.exists(directory):
        print(f"Error: Directory '{directory}' not found.")
        return

    # 디렉토리 내 모든 CSV 파일 처리
    csv_files = [f for f in os.listdir(directory) if f.endswith('.csv')]
    total_files = len(csv_files)
    cleaned_files = 0
    
    print(f"총 {total_files}개의 CSV 파일을 검사합니다...")
    
    for idx, filename in enumerate(csv_files, 1):
        path = os.path.join(directory, filename)
        
        try:
            # 파일 크기 확인 (빈 파일 건너뛰기)
            if os.path.getsize(path) == 0:
                print(f"[{idx}/{total_files}] {filename}: 파일이 비어 있습니다. 건너뜁니다.")
                continue
                
            with open(path, 'rb') as f:
                # 파일의 모든 라인 읽기
                lines = f.readlines()
                
                # 파일에 라인이 있고 마지막 라인이 널 문자로만 구성되어 있는지 확인
                if lines and all(b == 0x00 for b in lines[-1].strip()):
                    # 마지막 라인 제거하고 파일 다시 쓰기
                    with open(path, 'wb') as out_f:
                        out_f.writelines(lines[:-1])
                    cleaned_files += 1
                    print(f"[{idx}/{total_files}] {filename}: 마지막 널 문자 줄 제거됨")
                else:
                    print(f"[{idx}/{total_files}] {filename}: 마지막 줄 정상")
        
        except Exception as e:
            print(f"[{idx}/{total_files}] {filename} 처리 중 오류 발생: {str(e)}")
    
    print(f"\n작업 완료: 총 {total_files}개 파일 중 {cleaned_files}개 파일에서 널 문자 줄이 제거되었습니다.")

if __name__ == "__main__":
    # 명령줄 인수로 디렉토리 경로를 받을 수 있음
    if len(sys.argv) > 1:
        clean_csv_files(sys.argv[1])
    else:
        clean_csv_files() 