import os
import glob
from PIL import Image

BRAIN_DIR = r"C:\Users\Dell\.gemini\antigravity\brain\c7557331-6a6c-4053-ad9b-db14391ef378"
TARGET_DIR = r"C:\Users\Dell\Desktop\New folder (5)\public\images\characters"

SCENE_PATTERNS = [
    ("wedding_s1_venue*", "wedding_s1.png"),
    ("wedding_s2_kakashi_entry*", "wedding_s2.png"),
    ("wedding_s3_kushina_entry*", "wedding_s3.png"),
    ("wedding_s4_together_altar*", "wedding_s4.png"),
    ("wedding_s5_vows*", "wedding_s5.png"),
    ("wedding_s6_rings_closeup*", "wedding_s6.png"),
    ("wedding_s7_ring_exchange*", "wedding_s7.png"),
    ("wedding_s8_celebration_fireworks*", "wedding_s8.png"),
    ("wedding_s9_couple_finale*", "wedding_s9.png"),
]

def sync_scenes():
    os.makedirs(TARGET_DIR, exist_ok=True)
    synced = []
    missing = []
    for pattern, out_name in SCENE_PATTERNS:
        matches = glob.glob(os.path.join(BRAIN_DIR, pattern))
        if matches:
            latest = max(matches, key=os.path.getmtime)
            out_path = os.path.join(TARGET_DIR, out_name)
            im = Image.open(latest).convert("RGB")
            im.save(out_path, "PNG")
            synced.append((out_name, os.path.basename(latest)))
        else:
            missing.append(pattern)

    print(f"Synced {len(synced)}/{len(SCENE_PATTERNS)} scenes.")
    for s, src in synced:
        print(f"  [OK] {s} <- {src}")
    if missing:
        print(f"Pending/Missing scenes: {missing}")
    return len(synced) == len(SCENE_PATTERNS)

if __name__ == "__main__":
    sync_scenes()

