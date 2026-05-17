#!/usr/bin/env python3
"""
视频压缩脚本 - 将视频压缩到指定大小以下
"""

import subprocess
import os
import sys

def get_file_size_mb(filepath):
    """获取文件大小（MB）"""
    return os.path.getsize(filepath) / (1024 * 1024)

def get_video_duration(filepath):
    """获取视频时长（秒）"""
    cmd = [
        'ffprobe', '-v', 'error', '-show_entries', 'format=duration',
        '-of', 'default=noprint_wrappers=1:nokey=1', filepath
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    return float(result.stdout.strip())

def compress_video(input_file, max_size_mb=90):
    """
    压缩视频到指定大小以下
    max_size_mb: 目标最大大小（MB），默认90MB（留10MB余量）
    """
    if not os.path.exists(input_file):
        print(f"❌ 文件不存在: {input_file}")
        return
    
    file_size = get_file_size_mb(input_file)
    print(f"\n{'='*60}")
    print(f"📹 处理文件: {input_file}")
    print(f"📊 当前大小: {file_size:.2f} MB")
    
    if file_size < max_size_mb:
        print(f"✅ 文件已小于 {max_size_mb}MB，无需压缩")
        return
    
    duration = get_video_duration(input_file)
    print(f"⏱️  视频时长: {duration:.2f} 秒")
    
    # 计算目标比特率（bits per second）
    # 文件大小(bits) = 比特率(bps) × 时长(s)
    # 留10%余量给音频
    target_size_bits = max_size_mb * 0.9 * 8 * 1024 * 1024  # 90%给视频
    video_bitrate = int(target_size_bits / duration)
    
    print(f"🎯 目标大小: {max_size_mb} MB")
    print(f"📈 计算比特率: {video_bitrate // 1000} kbps")
    
    # 生成输出文件名
    name, ext = os.path.splitext(input_file)
    output_file = f"{name}_compressed.mp4"
    
    # 使用 ffmpeg 压缩
    cmd = [
        'ffmpeg', '-i', input_file,
        '-b:v', f'{video_bitrate}',
        '-maxrate', f'{int(video_bitrate * 1.2)}',
        '-bufsize', f'{video_bitrate * 2}',
        '-c:v', 'libx264',
        '-preset', 'medium',
        '-profile:v', 'high',
        '-c:a', 'aac',
        '-b:a', '128k',
        '-movflags', '+faststart',
        '-y',  # 覆盖输出文件
        output_file
    ]
    
    print(f"🚀 开始压缩...")
    result = subprocess.run(cmd, capture_output=True, text=True)
    
    if result.returncode == 0:
        new_size = get_file_size_mb(output_file)
        print(f"✅ 压缩成功！")
        print(f"📊 新大小: {new_size:.2f} MB")
        print(f"💾 节省: {file_size - new_size:.2f} MB ({(1 - new_size/file_size) * 100:.1f}%)")
        print(f"📁 输出文件: {output_file}")
        
        # 如果还是太大，递归压缩
        if new_size > max_size_mb:
            print(f"⚠️  文件仍然大于 {max_size_mb}MB，继续压缩...")
            os.remove(output_file)  # 删除不满意的输出
            compress_video(input_file, max_size_mb * 0.8)  # 降低目标大小
    else:
        print(f"❌ 压缩失败: {result.stderr}")

def main():
    """主函数"""
    videos_dir = "public/videos"
    
    if not os.path.exists(videos_dir):
        print(f"❌ 目录不存在: {videos_dir}")
        sys.exit(1)
    
    print("🎬 视频压缩工具")
    print(f"📂 扫描目录: {videos_dir}")
    
    # 需要压缩的大文件
    large_files = []
    for filename in os.listdir(videos_dir):
        if filename.endswith(('.mp4', '.mov', '.avi', '.mkv')):
            filepath = os.path.join(videos_dir, filename)
            size = get_file_size_mb(filepath)
            if size > 50:  # 大于50MB的文件
                large_files.append(filepath)
    
    if not large_files:
        print("✅ 没有需要压缩的大文件")
        return
    
    print(f"\n发现 {len(large_files)} 个大文件需要压缩:")
    for f in large_files:
        print(f"  - {os.path.basename(f)} ({get_file_size_mb(f):.2f} MB)")
    
    for filepath in large_files:
        compress_video(filepath, max_size_mb=90)  # 目标90MB，留10MB余量

if __name__ == "__main__":
    main()
