import os
import glob
from PIL import Image, ImageFilter, ImageEnhance

src_dir = r"C:\Users\Dell\.gemini\antigravity\brain\c7557331-6a6c-4053-ad9b-db14391ef378"
dest_dir = r"c:\Users\Dell\Desktop\New folder (5)\public\images\characters"
os.makedirs(dest_dir, exist_ok=True)

patterns = {
    "scene1_village": "scene1_village.png",
    "scene2_kakashi": "scene2_kakashi.png",
    "scene3_kushina": "scene3_kushina.png",
    "scene4_kim": "scene4_kim.png",
    "scene5_ceremony": "scene5_ceremony.png",
}

for prefix, dest_filename in patterns.items():
    matches = glob.glob(os.path.join(src_dir, f"{prefix}*.jpg"))
    if matches:
        latest = max(matches, key=os.path.getmtime)
        im = Image.open(latest)
        dest_path = os.path.join(dest_dir, dest_filename)
        im.save(dest_path, "PNG", optimize=True)
        print(f"Saved {prefix} -> {dest_filename}")
    else:
        print(f"Missing {prefix}")

# Create Scene 6 (Emotional close-up) by zooming into ceremony with warm romantic bloom
scene5_path = os.path.join(dest_dir, "scene5_ceremony.png")
if os.path.exists(scene5_path):
    im5 = Image.open(scene5_path)
    w, h = im5.size
    # Center crop 70% to create emotional close-up
    cw, ch = int(w * 0.75), int(h * 0.75)
    cx, cy = (w - cw) // 2, int(h * 0.1)
    close_up = im5.crop((cx, cy, cx + cw, cy + ch)).resize((w, h), Image.Resampling.LANCZOS)
    
    # Enhance warmth and color saturation for emotional impact
    enhancer = ImageEnhance.Color(close_up)
    warm = enhancer.enhance(1.15)
    
    dest_path6 = os.path.join(dest_dir, "scene6_emotional.png")
    warm.save(dest_path6, "PNG", optimize=True)
    print("Created scene6_emotional.png from ceremony emotional focus!")
