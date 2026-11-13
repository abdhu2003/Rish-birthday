import os
import sys
import math
import random
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import imageio
import imageio_ffmpeg
import subprocess
import wave

WIDTH = 1280
HEIGHT = 720
FPS = 24
SCENE_DURATION = 3.0 # seconds per scene
NUM_SCENES = 9
TOTAL_DURATION = SCENE_DURATION * NUM_SCENES # 27.0 seconds
TOTAL_FRAMES = int(TOTAL_DURATION * FPS) # 648 frames

def get_font(size, bold=True):
    font_paths = [
        "C:\\Windows\\Fonts\\georgiab.ttf" if bold else "C:\\Windows\\Fonts\\georgia.ttf",
        "C:\\Windows\\Fonts\\arialbd.ttf" if bold else "C:\\Windows\\Fonts\\arial.ttf",
        "C:\\Windows\\Fonts\\segoeui.ttf",
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
                dist = math.sqrt(dx * dx + dy * dy)
                if dist <= glow_radius:
                    draw.text((x + dx, y + dy), text, font=font, fill=glow_color)
    draw.text((x, y), text, font=font, fill=fill_color)

def draw_centered_text_with_glow(draw, y_pos, text, font, fill_color, glow_color, glow_radius=3):
    bbox = draw.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    x_pos = (WIDTH - tw) // 2
    draw_text_with_glow(draw, (x_pos, y_pos), text, font, fill_color, glow_color, glow_radius)

def create_fireworks_particles():
    random.seed(101)
    fireworks = []
    # 5 bursts during scene 8 (seconds 21 to 24)
    burst_times = [21.2, 21.8, 22.4, 23.0, 23.5]
    colors = [
        (255, 100, 180), # Pink
        (255, 215, 0),   # Gold
        (100, 220, 255), # Cyan / Lightning
        (255, 60, 60),   # Crimson
        (200, 120, 255), # Lavender
    ]
    for i, t in enumerate(burst_times):
        cx = random.uniform(WIDTH * 0.2, WIDTH * 0.8)
        cy = random.uniform(HEIGHT * 0.15, HEIGHT * 0.45)
        color = colors[i % len(colors)]
        sparks = []
        for _ in range(45):
            angle = random.uniform(0, 2 * math.pi)
            speed = random.uniform(40, 140)
            size = random.uniform(2, 4.5)
            sparks.append({"vx": math.cos(angle) * speed, "vy": math.sin(angle) * speed, "size": size})
        fireworks.append({"burst_time": t, "cx": cx, "cy": cy, "color": color, "sparks": sparks})
    return fireworks

def draw_firework_bursts(draw, t, fireworks):
    for fw in fireworks:
        dt = t - fw["burst_time"]
        if 0 <= dt <= 1.5: # 1.5s lifespan
            progress = dt / 1.5
            alpha = int(255 * (1.0 - progress)**1.5)
            r, g, b = fw["color"]
            cx, cy = fw["cx"], fw["cy"]
            for spark in fw["sparks"]:
                px = cx + spark["vx"] * dt
                py = cy + spark["vy"] * dt + 0.5 * 30 * (dt ** 2) # subtle gravity
                sz = max(1, int(spark["size"] * (1.0 - progress * 0.5)))
                if 0 <= px < WIDTH and 0 <= py < HEIGHT:
                    draw.ellipse([(px - sz, py - sz), (px + sz, py + sz)], fill=(r, g, b, alpha))

def create_petals(count=60):
    random.seed(999)
    petals = []
    for _ in range(count):
        petals.append({
            "x": random.uniform(0, WIDTH),
            "y": random.uniform(-100, HEIGHT + 50),
            "size": random.uniform(7, 18),
            "speedY": random.uniform(2.0, 4.5),
            "speedX": random.uniform(1.2, 3.0),
            "rot": random.uniform(0, 360),
            "rotSpeed": random.uniform(-4, 4),
            "layer": random.choice(["fore", "mid", "back"]), # Depth layers
            "wobblePhase": random.uniform(0, 2 * math.pi)
        })
    return petals

def draw_petals(draw, petals, frame_idx):
    for p in petals:
        p["y"] += p["speedY"]
        p["x"] += p["speedX"] + math.sin(frame_idx * 0.06 + p["wobblePhase"]) * 1.5
        p["rot"] += p["rotSpeed"]
        if p["y"] > HEIGHT + 30:
            p["y"] = -20
            p["x"] = random.uniform(0, WIDTH)
        if p["x"] > WIDTH + 30:
            p["x"] = -20
            
        px, py = int(p["x"]), int(p["y"])
        sz = int(p["size"])
        
        # Color based on layer depth
        if p["layer"] == "fore":
            color = (255, 182, 193, 220)
            outline = (255, 105, 180, 240)
            sz = int(sz * 1.3)
        elif p["layer"] == "mid":
            color = (255, 192, 203, 190)
            outline = (255, 130, 190, 210)
        else:
            color = (255, 210, 220, 140)
            outline = (255, 160, 200, 150)
            sz = max(4, int(sz * 0.7))
            
        draw.ellipse([(px - sz, py - sz // 2), (px + sz, py + sz // 2)], fill=color, outline=outline)

def draw_starburst_glint(draw, cx, cy, radius, color):
    r, g, b = color
    # Horizontal & vertical flares
    draw.line([(cx - radius, cy), (cx + radius, cy)], fill=(r, g, b, 230), width=2)
    draw.line([(cx, cy - radius), (cx, cy + radius)], fill=(r, g, b, 230), width=2)
    diag = int(radius * 0.6)
    draw.line([(cx - diag, cy - diag), (cx + diag, cy + diag)], fill=(r, g, b, 170), width=1)
    draw.line([(cx - diag, cy + diag), (cx + diag, cy - diag)], fill=(r, g, b, 170), width=1)
    draw.ellipse([(cx - 3, cy - 3), (cx + 3, cy + 3)], fill=(255, 255, 255, 255))

def create_wedding_soundtrack_27s(output_wav="scripts/wedding_soundtrack_27s.wav", duration=27.0, sample_rate=44100):
    total_samples = int(duration * sample_rate)
    audio = np.zeros(total_samples, dtype=np.float32)

    # Emotional Japanese Koto & Shakuhachi melody across the 9 scenes (3s each)
    # Pentatonic: D4, E4, F4, G4, A4, B4, C5, D5, E5, F5, G5, A5
    notes = [
        # Scene 1: Venue Sunset (0-3s)
        (0.0, 293.66, 2.5), (0.75, 392.00, 2.2), (1.5, 440.00, 2.5), (2.25, 523.25, 2.5),
        # Scene 2: Kakashi Entry (3-6s)
        (3.0, 392.00, 2.5), (3.75, 440.00, 2.2), (4.5, 523.25, 2.5), (5.25, 587.33, 2.5),
        # Scene 3: Kushina Entry (6-9s)
        (6.0, 349.23, 2.8), (6.75, 440.00, 2.5), (7.5, 523.25, 2.5), (8.25, 659.25, 2.8),
        # Scene 4: Standing Together (9-12s)
        (9.0, 440.00, 2.5), (9.75, 523.25, 2.5), (10.5, 587.33, 2.5), (11.25, 698.46, 2.8),
        # Scene 5: Wedding Vows (12-15s)
        (12.0, 523.25, 3.0), (12.75, 587.33, 2.5), (13.5, 659.25, 2.8), (14.25, 783.99, 3.0),
        # Scene 6: Rings Close-Up (15-18s)
        (15.0, 587.33, 2.8), (15.75, 659.25, 2.5), (16.5, 783.99, 2.8), (17.25, 880.00, 3.0),
        # Scene 7: Ring Exchange (18-21s)
        (18.0, 659.25, 3.0), (18.75, 783.99, 2.8), (19.5, 880.00, 3.0), (20.25, 1046.50, 3.5),
        # Scene 8: Fireworks Celebration (21-24s)
        (21.0, 523.25, 3.0), (21.75, 659.25, 3.0), (22.5, 783.99, 3.2), (23.25, 880.00, 3.5),
        # Scene 9: Newlywed Finale (24-27s)
        (24.0, 440.00, 3.5), (24.75, 587.33, 3.5), (25.5, 783.99, 3.8), (26.0, 880.00, 4.0)
    ]

    time_axis = np.linspace(0, duration, total_samples, endpoint=False)

    for start_t, freq, note_dur in notes:
        start_idx = int(start_t * sample_rate)
        note_samples = int(note_dur * sample_rate)
        if start_idx >= total_samples:
            continue
        end_idx = min(start_idx + note_samples, total_samples)
        t_note = np.linspace(0, note_dur, end_idx - start_idx, endpoint=False)

        # Shakuhachi Flute / Warm Koto acoustic character
        envelope = np.exp(-t_note * 1.5) * np.sin(np.minimum(t_note * 20.0, math.pi / 2.0))
        fundamental = np.sin(2 * np.pi * freq * t_note)
        h2 = 0.38 * np.sin(2 * np.pi * (freq * 2.0) * t_note)
        h3 = 0.20 * np.sin(2 * np.pi * (freq * 3.0) * t_note)
        h4 = 0.10 * np.sin(2 * np.pi * (freq * 4.0) * t_note)
        # Crystal harmonic shimmer
        chime = 0.14 * np.sin(2 * np.pi * (freq * 2.76) * t_note) * np.exp(-t_note * 2.5)

        tone = (fundamental + h2 + h3 + h4 + chime) * envelope
        audio[start_idx:end_idx] += tone * 0.42

    # Add fireworks sound bursts at 21.2, 21.8, 22.4, 23.0, 23.5
    firework_times = [21.2, 21.8, 22.4, 23.0, 23.5]
    for ft in firework_times:
        s_idx = int(ft * sample_rate)
        f_dur = 0.9
        f_samples = int(f_dur * sample_rate)
        if s_idx + f_samples <= total_samples:
            tf = np.linspace(0, f_dur, f_samples, endpoint=False)
            # Low frequency thud + white noise crackle
            boom = np.sin(2 * np.pi * 55 * tf) * np.exp(-tf * 7.0) * 0.35
            noise = (np.random.rand(f_samples) * 2 - 1) * np.exp(-tf * 4.0) * 0.12
            audio[s_idx:s_idx + f_samples] += (boom + noise).astype(np.float32)

    # Master envelope
    fade_in = np.minimum(time_axis / 0.8, 1.0)
    fade_out = np.minimum((duration - time_axis) / 1.5, 1.0)
    audio = audio * fade_in * fade_out

    # Normalize
    max_val = np.max(np.abs(audio))
    if max_val > 0:
        audio = audio / max_val * 0.88

    pcm = (audio * 32767).astype(np.int16)
    os.makedirs(os.path.dirname(output_wav), exist_ok=True)
    with wave.open(output_wav, "w") as wf:
        wf.setnchannels(2)
        wf.setsampwidth(2)
        wf.setframerate(sample_rate)
        stereo_pcm = np.column_stack((pcm, pcm)).flatten()
        wf.writeframes(stereo_pcm.tobytes())

    print("Created 27-second wedding soundtrack:", output_wav)

def assemble_cinematic_wedding_video(scene_image_paths, output_mp4):
    print("Assembling 9-scene cinematic wedding video...")
    
    # Preload and scale images to 1280x720 base
    images = []
    for p in scene_image_paths:
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
            print(f"Warning: Missing scene image {p}, creating fallback.")
            fallback = Image.new("RGB", (WIDTH, HEIGHT), (25, 10, 25))
            images.append(fallback)

    # Temporary raw video without audio
    temp_raw = "scripts/temp_wedding_raw.mp4"
    writer = imageio.get_writer(
        temp_raw,
        fps=FPS,
        codec="libx264",
        pixelformat="yuv420p",
        macro_block_size=None,
        ffmpeg_params=["-preset", "fast", "-crf", "21"]
    )

    petals = create_petals(70)
    fireworks = create_fireworks_particles()
    
    title_font_large = get_font(52, bold=True)
    title_font_medium = get_font(34, bold=True)
    subtitle_font = get_font(23, bold=False)

    for frame_idx in range(TOTAL_FRAMES):
        t = frame_idx / FPS
        scene_idx = int(t / SCENE_DURATION)
        scene_idx = min(scene_idx, NUM_SCENES - 1)
        scene_t = (t % SCENE_DURATION) / SCENE_DURATION # 0.0 to 1.0 within scene

        base_img = images[scene_idx].copy()

        # Dynamic multi-directional camera motion per scene
        if scene_idx == 0:
            # Scene 1: Crane down & slow zoom
            zoom = 1.0 + scene_t * 0.08
            zw, zh = int(WIDTH * zoom), int(HEIGHT * zoom)
            zoomed = base_img.resize((zw, zh), Image.Resampling.BILINEAR)
            cx, cy = (zw - WIDTH) // 2, int((zh - HEIGHT) * scene_t * 0.7)
            frame = zoomed.crop((cx, cy, cx + WIDTH, cy + HEIGHT))
        elif scene_idx == 1:
            # Scene 2: Kakashi entry tracking pan (left to right)
            zoom = 1.06
            zw, zh = int(WIDTH * zoom), int(HEIGHT * zoom)
            zoomed = base_img.resize((zw, zh), Image.Resampling.BILINEAR)
            cx = int((zw - WIDTH) * (0.8 - scene_t * 0.6))
            cy = (zh - HEIGHT) // 2
            frame = zoomed.crop((cx, cy, cx + WIDTH, cy + HEIGHT))
        elif scene_idx == 2:
            # Scene 3: Kushina entry tracking pan (right to left with dress wave)
            zoom = 1.06
            zw, zh = int(WIDTH * zoom), int(HEIGHT * zoom)
            zoomed = base_img.resize((zw, zh), Image.Resampling.BILINEAR)
            cx = int((zw - WIDTH) * (0.2 + scene_t * 0.6))
            cy = (zh - HEIGHT) // 2
            frame = zoomed.crop((cx, cy, cx + WIDTH, cy + HEIGHT))
        elif scene_idx == 3:
            # Scene 4: Standing together slow push in
            zoom = 1.0 + scene_t * 0.07
            zw, zh = int(WIDTH * zoom), int(HEIGHT * zoom)
            zoomed = base_img.resize((zw, zh), Image.Resampling.BILINEAR)
            cx, cy = (zw - WIDTH) // 2, (zh - HEIGHT) // 2
            frame = zoomed.crop((cx, cy, cx + WIDTH, cy + HEIGHT))
        elif scene_idx == 4:
            # Scene 5: Vows rack focus & intimate push
            zoom = 1.02 + scene_t * 0.08
            zw, zh = int(WIDTH * zoom), int(HEIGHT * zoom)
            zoomed = base_img.resize((zw, zh), Image.Resampling.BILINEAR)
            cx, cy = (zw - WIDTH) // 2, (zh - HEIGHT) // 2
            frame = zoomed.crop((cx, cy, cx + WIDTH, cy + HEIGHT))
        elif scene_idx == 5:
            # Scene 6: Rings macro slow diagonal pan
            zoom = 1.08 + scene_t * 0.05
            zw, zh = int(WIDTH * zoom), int(HEIGHT * zoom)
            zoomed = base_img.resize((zw, zh), Image.Resampling.BILINEAR)
            cx = int((zw - WIDTH) * (0.3 + scene_t * 0.4))
            cy = int((zh - HEIGHT) * (0.3 + scene_t * 0.4))
            frame = zoomed.crop((cx, cy, cx + WIDTH, cy + HEIGHT))
        elif scene_idx == 6:
            # Scene 7: Ring exchange slow push
            zoom = 1.03 + scene_t * 0.07
            zw, zh = int(WIDTH * zoom), int(HEIGHT * zoom)
            zoomed = base_img.resize((zw, zh), Image.Resampling.BILINEAR)
            cx, cy = (zw - WIDTH) // 2, (zh - HEIGHT) // 2
            frame = zoomed.crop((cx, cy, cx + WIDTH, cy + HEIGHT))
        elif scene_idx == 7:
            # Scene 8: Fireworks celebration wide pull out
            zoom = 1.08 - scene_t * 0.06
            zw, zh = int(WIDTH * zoom), int(HEIGHT * zoom)
            zoomed = base_img.resize((zw, zh), Image.Resampling.BILINEAR)
            cx, cy = (zw - WIDTH) // 2, (zh - HEIGHT) // 2
            frame = zoomed.crop((cx, cy, cx + WIDTH, cy + HEIGHT))
        else:
            # Scene 9: Couple finale slow cinematic pull
            zoom = 1.05 - scene_t * 0.04
            zw, zh = int(WIDTH * zoom), int(HEIGHT * zoom)
            zoomed = base_img.resize((zw, zh), Image.Resampling.BILINEAR)
            cx, cy = (zw - WIDTH) // 2, (zh - HEIGHT) // 2
            frame = zoomed.crop((cx, cy, cx + WIDTH, cy + HEIGHT))

        # Optical cross-fade between scenes (0.4s transition)
        fade_start = 0.867 # (3.0s - 0.4s) / 3.0s
        if scene_t > fade_start and scene_idx < NUM_SCENES - 1:
            fade_alpha = (scene_t - fade_start) / (1.0 - fade_start)
            next_img = images[scene_idx + 1].copy()
            frame = Image.blend(frame, next_img, fade_alpha)

        draw = ImageDraw.Draw(frame, "RGBA")

        # 1. Floating sakura petals simulation
        draw_petals(draw, petals, frame_idx)

        # 2. Scene 6 (Rings) & Scene 7 (Ring Exchange) Starburst Glints
        if scene_idx == 5:
            # Specular shine glint on rings
            glint_x = WIDTH // 2 - 40 + int(math.sin(scene_t * math.pi) * 60)
            glint_y = HEIGHT // 2 - 20
            draw_starburst_glint(draw, glint_x, glint_y, radius=18, color=(255, 235, 170))
        elif scene_idx == 6:
            # Ring placed on finger magical chakra sparkle
            chakra_r = int(25 + math.sin(scene_t * math.pi * 2) * 8)
            draw.ellipse(
                [(WIDTH//2 - chakra_r, HEIGHT//2 - chakra_r), (WIDTH//2 + chakra_r, HEIGHT//2 + chakra_r)],
                fill=(255, 215, 0, 45),
                outline=(255, 240, 180, 160)
            )
            draw_starburst_glint(draw, WIDTH//2, HEIGHT//2, radius=24, color=(255, 255, 220))

        # 3. Scene 8: Animated Fireworks Bursts
        if scene_idx == 7:
            draw_firework_bursts(draw, t, fireworks)

        # 4. Cinematic Captions & Final Text
        if scene_idx == 0:
            draw_centered_text_with_glow(draw, HEIGHT - 100, "HIDDEN LEAF VILLAGE • WEDDING GROUNDS 🍃", subtitle_font, (255, 240, 205), (180, 70, 0), 2)
        elif scene_idx == 1:
            draw_centered_text_with_glow(draw, HEIGHT - 105, "Kakashi Hatake ⚡", title_font_medium, (255, 255, 255), (0, 140, 255), 3)
            draw_centered_text_with_glow(draw, HEIGHT - 65, "The Silver-Haired Shinobi Groom", subtitle_font, (220, 240, 255), (0, 70, 180), 2)
        elif scene_idx == 2:
            draw_centered_text_with_glow(draw, HEIGHT - 105, "Kushina Uzumaki ❤️", title_font_medium, (255, 245, 250), (220, 20, 60), 3)
            draw_centered_text_with_glow(draw, HEIGHT - 65, "The Radiant Shinobi Bride", subtitle_font, (255, 210, 220), (160, 0, 40), 2)
        elif scene_idx == 3:
            draw_centered_text_with_glow(draw, HEIGHT - 100, "The Sacred Shinobi Wedding Altar ⛩️", title_font_medium, (255, 245, 200), (255, 120, 0), 3)
            draw_centered_text_with_glow(draw, HEIGHT - 60, "Standing Together Under the Will of Fire", subtitle_font, (255, 230, 200), (180, 60, 0), 2)
        elif scene_idx == 4:
            draw_centered_text_with_glow(draw, HEIGHT - 100, "The Sacred Wedding Vows 💍", title_font_medium, (255, 255, 255), (255, 20, 147), 3)
            draw_centered_text_with_glow(draw, HEIGHT - 60, "A Promise Bound by Love & Loyalty", subtitle_font, (255, 220, 235), (180, 20, 80), 2)
        elif scene_idx == 5:
            draw_centered_text_with_glow(draw, HEIGHT - 100, "The Eternal Shinobi Rings 💍✨", title_font_medium, (255, 245, 190), (230, 150, 0), 3)
            draw_centered_text_with_glow(draw, HEIGHT - 60, "Engraved with the Leaf Crest", subtitle_font, (255, 235, 210), (160, 80, 0), 2)
        elif scene_idx == 6:
            draw_centered_text_with_glow(draw, HEIGHT - 100, "Exchanging the Sacred Rings 💍❤️", title_font_medium, (255, 255, 255), (255, 60, 140), 3)
            draw_centered_text_with_glow(draw, HEIGHT - 60, "Two Hearts Sealed as One", subtitle_font, (255, 230, 240), (180, 20, 80), 2)
        elif scene_idx == 7:
            draw_centered_text_with_glow(draw, HEIGHT - 100, "Grand Konoha Wedding Celebration! 🎆🌸", title_font_medium, (255, 240, 200), (255, 100, 0), 3)
            draw_centered_text_with_glow(draw, HEIGHT - 60, "Lanterns & Fireworks Across the Leaf Village", subtitle_font, (255, 230, 210), (180, 50, 0), 2)
        elif scene_idx == 8:
            # Final Scene: EXACT User Required Text: "A Beautiful Shinobi Wedding 💍🌸"
            banner_w = 760
            draw.rectangle(
                [(WIDTH//2 - banner_w//2, HEIGHT//2 - 80), (WIDTH//2 + banner_w//2, HEIGHT//2 + 80)],
                fill=(12, 3, 16, 215),
                outline=(255, 105, 180, 200),
                width=2
            )
            # Gold corner brackets
            cw = 14
            for (bx, by) in [(WIDTH//2 - banner_w//2, HEIGHT//2 - 80), (WIDTH//2 + banner_w//2 - cw, HEIGHT//2 - 80),
                            (WIDTH//2 - banner_w//2, HEIGHT//2 + 80 - cw), (WIDTH//2 + banner_w//2 - cw, HEIGHT//2 + 80 - cw)]:
                draw.rectangle([(bx, by), (bx + cw, by + cw)], fill=(255, 215, 0, 240))

            draw_centered_text_with_glow(draw, HEIGHT//2 - 55, "A Beautiful Shinobi Wedding 💍🌸", title_font_large, (255, 235, 150), (255, 100, 0), 4)
            draw_centered_text_with_glow(draw, HEIGHT//2 + 18, "Kakashi Hatake & Kushina Uzumaki", subtitle_font, (255, 245, 250), (220, 20, 80), 2)

        writer.append_data(np.array(frame))

        if frame_idx % 72 == 0:
            print(f"Rendered {frame_idx}/{TOTAL_FRAMES} frames ({int(frame_idx/TOTAL_FRAMES*100)}%)...")

    writer.close()
    print("Video visual rendering complete!")

    # Merge with audio and faststart
    wav_path = "scripts/wedding_soundtrack_27s.wav"
    create_wedding_soundtrack_27s(wav_path, duration=TOTAL_DURATION)

    ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
    cmd = [
        ffmpeg, "-y",
        "-i", temp_raw,
        "-i", wav_path,
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        "-profile:v", "main",
        "-preset", "fast",
        "-crf", "20",
        "-c:a", "aac",
        "-b:a", "192k",
        "-movflags", "+faststart",
        "-shortest",
        output_mp4
    ]
    print("Running ffmpeg final mux:", " ".join(cmd))
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode != 0:
        print("FFmpeg error:", res.stderr)
        return False
        
    if os.path.exists(temp_raw):
        try:
            os.remove(temp_raw)
        except:
            pass

    print(f"Final 9-scene video successfully created at: {output_mp4}")
    return True

if __name__ == "__main__":
    test_scenes = [f"public/images/characters/wedding_s{i}.png" for i in range(1, 10)]
    assemble_cinematic_wedding_video(test_scenes, "public/videos/naruto-wedding-surprise.mp4")

