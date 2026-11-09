import os
import sys
import math
import random
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import imageio

WIDTH = 1280
HEIGHT = 720
FPS = 24
SCENE_DURATION = 3.0 # seconds
TOTAL_DURATION = 24.0 # 8 scenes * 3s = 24 seconds
TOTAL_FRAMES = int(TOTAL_DURATION * FPS)

def get_font(size):
    font_paths = [
        "C:\\Windows\\Fonts\\georgiab.ttf",
        "C:\\Windows\\Fonts\\georgia.ttf",
        "C:\\Windows\\Fonts\\arialbd.ttf",
        "C:\\Windows\\Fonts\\arial.ttf",
    ]
    for p in font_paths:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except:
                pass
    return ImageFont.load_default()

def draw_text_with_glow(draw, pos, text, font, fill_color, glow_color, glow_radius=3):
    x, y = pos
    for dx in range(-glow_radius, glow_radius + 1):
        for dy in range(-glow_radius, glow_radius + 1):
            if dx != 0 or dy != 0:
                draw.text((x + dx, y + dy), text, font=font, fill=glow_color)
    draw.text((x, y), text, font=font, fill=fill_color)

def generate_video(scene_paths, output_path):
    print("Generating anime wedding video with imageio...")
    
    # Preload and resize scene images to 1280x720 base
    images = []
    for p in scene_paths:
        if os.path.exists(p):
            im = Image.open(p).convert("RGB")
            w, h = im.size
            target_ratio = WIDTH / HEIGHT
            current_ratio = w / h
            if current_ratio > target_ratio:
                new_w = int(h * target_ratio)
                left = (w - new_w) // 2
                im = im.crop((left, 0, left + new_w, h))
            else:
                new_h = int(w / target_ratio)
                top = (h - new_h) // 2
                im = im.crop((0, top, w, top + new_h))
            im = im.resize((WIDTH, HEIGHT), Image.Resampling.LANCZOS)
            images.append(im)
        else:
            fallback = Image.new("RGB", (WIDTH, HEIGHT), (20, 5, 25))
            d = ImageDraw.Draw(fallback)
            d.rectangle([(0, 0), (WIDTH, HEIGHT)], fill=(25, 8, 30))
            images.append(fallback)
            
    # Setup imageio video writer
    writer = imageio.get_writer(
        output_path,
        fps=FPS,
        codec="libx264",
        pixelformat="yuv420p",
        macro_block_size=None,
        ffmpeg_params=["-preset", "fast", "-crf", "23"]
    )
    
    title_font_large = get_font(52)
    title_font_medium = get_font(34)
    subtitle_font = get_font(24)
    
    # Sakura petal particles simulation
    random.seed(42)
    petals = []
    for _ in range(35):
        petals.append({
            "x": random.uniform(0, WIDTH),
            "y": random.uniform(-100, HEIGHT),
            "size": random.uniform(8, 16),
            "speedY": random.uniform(2.0, 4.0),
            "speedX": random.uniform(1.0, 2.5),
            "angle": random.uniform(0, 360),
            "rotSpeed": random.uniform(-3, 3)
        })
        
    for frame_idx in range(TOTAL_FRAMES):
        t = frame_idx / FPS
        scene_idx = int(t / SCENE_DURATION)
        scene_idx = min(scene_idx, len(images) - 1)
        scene_t = (t % SCENE_DURATION) / SCENE_DURATION
        
        base_img = images[scene_idx].copy()
        
        # Ken Burns smooth zoom
        zoom = 1.0 + scene_t * 0.08
        zw, zh = int(WIDTH * zoom), int(HEIGHT * zoom)
        zoomed = base_img.resize((zw, zh), Image.Resampling.BILINEAR)
        cx, cy = (zw - WIDTH) // 2, (zh - HEIGHT) // 2
        frame = zoomed.crop((cx, cy, cx + WIDTH, cy + HEIGHT))
        
        # Smooth crossfade between scenes (0.5s transition)
        if scene_t > 0.833 and scene_idx < len(images) - 1:
            fade_alpha = (scene_t - 0.833) / 0.167
            next_img = images[scene_idx + 1].copy()
            frame = Image.blend(frame, next_img, fade_alpha)
            
        draw = ImageDraw.Draw(frame, "RGBA")
        
        # Draw floating sakura petals
        for p in petals:
            p["y"] += p["speedY"]
            p["x"] += p["speedX"] + math.sin(frame_idx * 0.05) * 1.2
            p["angle"] += p["rotSpeed"]
            if p["y"] > HEIGHT + 20:
                p["y"] = -20
                p["x"] = random.uniform(0, WIDTH)
            if p["x"] > WIDTH + 20:
                p["x"] = -20
                
            px, py = int(p["x"]), int(p["y"])
            rad = int(p["size"])
            draw.ellipse(
                [(px - rad, py - rad // 2), (px + rad, py + rad // 2)],
                fill=(255, 182, 193, 200),
                outline=(255, 105, 180, 220)
            )
            
        # Draw Scene Specific Text Overlays
        def draw_centered_text(y_pos, text, font, fill_color, glow_color, radius=3):
            bbox = draw.textbbox((0, 0), text, font=font)
            tw = bbox[2] - bbox[0]
            x_pos = (WIDTH - tw) // 2
            draw_text_with_glow(draw, (x_pos, y_pos), text, font, fill_color, glow_color, radius)

        if scene_idx == 0:
            badge = "HIDDEN LEAF VILLAGE • SUNSET CEREMONY 🍃"
            draw_centered_text(HEIGHT - 100, badge, subtitle_font, (255, 240, 200), (180, 70, 0), 2)
        elif scene_idx == 1:
            draw_centered_text(HEIGHT - 100, "Kakashi Hatake ⚡", title_font_medium, (255, 255, 255), (0, 150, 255), 3)
            draw_centered_text(HEIGHT - 60, "The Silver-Haired Shinobi Groom", subtitle_font, (220, 240, 255), (0, 80, 180), 2)
        elif scene_idx == 2:
            draw_centered_text(HEIGHT - 100, "Kushina Uzumaki ❤️", title_font_medium, (255, 240, 245), (220, 20, 60), 3)
            draw_centered_text(HEIGHT - 60, "The Radiant Crimson Shinobi Bride", subtitle_font, (255, 210, 220), (150, 0, 40), 2)
        elif scene_idx == 3:
            draw_centered_text(HEIGHT - 90, "The Shinobi Wedding Stage ⛩️", title_font_medium, (255, 245, 200), (255, 120, 0), 3)
            draw_centered_text(HEIGHT - 50, "Beneath the Sacred Hokage Stone Faces", subtitle_font, (255, 230, 200), (180, 60, 0), 2)
        elif scene_idx == 4:
            draw_centered_text(HEIGHT - 90, "The Sacred Shinobi Vows 💍", title_font_medium, (255, 255, 255), (255, 20, 147), 3)
            draw_centered_text(HEIGHT - 50, "An Eternal Will of Fire Bond", subtitle_font, (255, 210, 230), (180, 20, 80), 2)
        elif scene_idx == 5:
            draw_centered_text(HEIGHT - 90, "Golden Sunset & Cherry Blossoms 🌸", title_font_medium, (255, 250, 220), (255, 140, 0), 3)
            draw_centered_text(HEIGHT - 50, "Love and Friendship Forever in Konoha", subtitle_font, (255, 230, 210), (180, 60, 0), 2)
        elif scene_idx == 6:
            quote_text = "“A beautiful bond deserves a beautiful beginning. 💍🌸”"
            draw.rectangle([(140, HEIGHT//2 - 70), (WIDTH - 140, HEIGHT//2 + 70)], fill=(10, 2, 15, 210), outline=(255, 105, 180, 180), width=2)
            draw_centered_text(HEIGHT//2 - 25, quote_text, title_font_medium, (255, 240, 245), (255, 60, 150), 3)
        elif scene_idx == 7:
            draw.rectangle([(140, HEIGHT//2 - 90), (WIDTH - 140, HEIGHT//2 + 90)], fill=(15, 4, 18, 220), outline=(255, 180, 0, 200), width=2)
            draw_centered_text(HEIGHT//2 - 60, "Happy Birthday, Rishdha! 🍥❤️✨", title_font_large, (255, 220, 120), (255, 100, 0), 4)
            draw_centered_text(HEIGHT//2 + 20, "May all your dreams become reality!", subtitle_font, (255, 240, 245), (220, 20, 60), 2)
            
        writer.append_data(np.array(frame))
        
        if frame_idx % 72 == 0:
            print(f"Rendered {frame_idx}/{TOTAL_FRAMES} frames ({int(frame_idx/TOTAL_FRAMES*100)}%)...")
            
    writer.close()
    print("Video encoding complete! Saved to:", output_path)

if __name__ == "__main__":
    scenes = [
        "c:/Users/Dell/Desktop/New folder (5)/public/images/characters/scene1_village.png",
        "c:/Users/Dell/Desktop/New folder (5)/public/images/characters/scene2_kakashi.png",
        "c:/Users/Dell/Desktop/New folder (5)/public/images/characters/scene3_kushina.png",
        "c:/Users/Dell/Desktop/New folder (5)/public/images/characters/scene5_ceremony.png",
        "c:/Users/Dell/Desktop/New folder (5)/public/images/characters/scene6_emotional.png",
        "c:/Users/Dell/Desktop/New folder (5)/public/images/characters/scene1_village.png",
        "c:/Users/Dell/Desktop/New folder (5)/public/images/characters/scene5_ceremony.png",
        "c:/Users/Dell/Desktop/New folder (5)/public/images/characters/scene6_emotional.png",
    ]
    output_dir = "c:/Users/Dell/Desktop/New folder (5)/public/videos"
    os.makedirs(output_dir, exist_ok=True)
    out_file = os.path.join(output_dir, "naruto-wedding-surprise.mp4")
    generate_video(scenes, out_file)
