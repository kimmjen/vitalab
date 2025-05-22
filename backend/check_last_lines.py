#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
CSV 파일 마지막 몇 줄의 바이트 값을 검사하는 스크립트
"""

import os
import sys

def check_last_lines(directory='./data', num_lines=3, sample_files=5):
    """
    지정된 디렉토리 내 CSV 파일의 마지막 몇 줄을 바이트 코드로 출력
    
    Args:
        directory (str): CSV 파일이 있는 디렉토리 경로
        num_lines (int): 검사할 마지막 줄 수
        sample_files (int): 샘플링할 파일 수
    """
    if not os.path.exists(directory):
        print(f"Error: Directory '{directory}' not found.")
        return

    # 디렉토리 내 모든 CSV 파일 목록
    csv_files = [f for f in os.listdir(directory) if f.endswith('.csv')]
    
    # 지정된 수의 파일만 샘플링
    if sample_files > 0 and sample_files < len(csv_files):
        import random
        csv_files = random.sample(csv_files, sample_files)
    
    print(f"{len(csv_files)}개 파일의 마지막 {num_lines}줄을 검사합니다...\n")
    
    for filename in csv_files:
        path = os.path.join(directory, filename)
        
        try:
            with open(path, 'rb') as f:
                # 파일의 모든 라인 읽기
                lines = f.readlines()
                
                if len(lines) == 0:
                    print(f"{filename}: 파일이 비어 있습니다.")
                    continue
                
                # 마지막 num_lines 줄 추출
                last_lines = lines[-num_lines:] if len(lines) >= num_lines else lines
                
                print(f"\n===== {filename} 마지막 {len(last_lines)}줄 =====")
                for i, line in enumerate(last_lines, 1):
                    # 바이트로 출력 (첫 50바이트만)
                    bytes_str = ', '.join([f'0x{b:02x}' for b in line[:50]])
                    if len(line) > 50:
                        bytes_str += f', ... (총 {len(line)}바이트)'
                    
                    # 텍스트로 변환 가능하면 출력 (첫 100자만)
                    try:
                        text = line.decode('utf-8')
                        if len(text) > 100:
                            text = text[:100] + '...'
                        text_display = f"텍스트: {repr(text)}"
                    except UnicodeDecodeError:
                        text_display = "텍스트: 디코딩 불가"
                    
                    print(f"줄 {i}: {bytes_str}")
                    print(f"     {text_display}")
        
        except Exception as e:
            print(f"{filename} 처리 중 오류 발생: {str(e)}")
    
    print("\n검사 완료")

if __name__ == "__main__":
    # 명령줄 인수 처리
    import argparse
    parser = argparse.ArgumentParser(description='CSV 파일 마지막 줄 검사')
    parser.add_argument('-d', '--directory', default='./data', help='CSV 파일이 있는 디렉토리 경로')
    parser.add_argument('-l', '--lines', type=int, default=3, help='검사할 마지막 줄 수')
    parser.add_argument('-s', '--samples', type=int, default=5, help='샘플링할 파일 수')
    
    args = parser.parse_args()
    check_last_lines(args.directory, args.lines, args.samples) 