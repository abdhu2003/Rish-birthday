import os
import math
import struct
import wave
import numpy as np
import subprocess
import imageio_ffmpeg

def create_wedding_soundtrack(output_wav="scripts/wedding_audio.wav", duration=24.0, sample_rate=44100):
    total_samples = int(duration * sample_rate)
    audio = np.zeros(total_samples, dtype=np.float32)

    # Japanese pentatonic scale (Insen / Hirajoshi flavor)
    # D4, E4, F4, A4, B4, C5, D5, E5, F5, A5
    notes = [
        # Measure 1: Sunset entrance (0-3s)
        (0.0, 293.66, 2.5), (0.75, 440.00, 2.2), (1.5, 523.25, 2.0), (2.25, 587.33, 2.5),
        # Measure 2: Kakashi appears (3-6s)
        (3.0, 392.00, 2.5), (3.75, 440.00, 2.0), (4.5, 523.25, 2.2), (5.25, 659.25, 2.5),
        # Measure 3: Kushina appears (6-9s)
        (6.0, 349.23, 2.5), (6.75, 440.00, 2.0), (7.5, 523.25, 2.2), (8.25, 698.46, 2.8),
        # Measure 4: Kim honored guest (9-12s)
        (9.0, 440.00, 2.5), (9.75, 523.25, 2.0), (10.5, 587.33, 2.2), (11.25, 659.25, 2.5),
        # Measure 5: Wedding stage ceremony (12-15s)
        (12.0, 523.25, 2.8), (12.75, 587.33, 2.0), (13.5, 659.25, 2.2), (14.25, 783.99, 2.8),
        # Measure 6: Emotional bond (15-18s)
        (15.0, 440.00, 3.0), (15.75, 523.25, 2.5), (16.5, 659.25, 2.5), (17.25, 880.00, 3.0),
        # Measure 7: Quote (18-21s)
        (18.0, 587.33, 3.0), (19.0, 523.25, 2.5), (20.0, 440.00, 3.0),
        # Measure 8: Birthday finale blessing (21-24s)
        (21.0, 293.66, 3.5), (21.5, 440.00, 3.2), (22.0, 587.33, 3.5), (22.5, 880.00, 3.8)
    ]

    time_axis = np.linspace(0, duration, total_samples, endpoint=False)

    for start_t, freq, note_dur in notes:
        start_idx = int(start_t * sample_rate)
        note_samples = int(note_dur * sample_rate)
        if start_idx >= total_samples:
            continue
        end_idx = min(start_idx + note_samples, total_samples)
        t_note = np.linspace(0, note_dur, end_idx - start_idx, endpoint=False)

        # Flute / Koto tone: Fundamental + harmonics + soft bell chime
        envelope = np.exp(-t_note * 1.8) * np.sin(np.minimum(t_note * 25.0, math.pi / 2.0))
        fundamental = np.sin(2 * np.pi * freq * t_note)
        h2 = 0.35 * np.sin(2 * np.pi * (freq * 2.0) * t_note)
        h3 = 0.18 * np.sin(2 * np.pi * (freq * 3.0) * t_note)
        h4 = 0.08 * np.sin(2 * np.pi * (freq * 4.0) * t_note)
        chime = 0.12 * np.sin(2 * np.pi * (freq * 2.76) * t_note) * np.exp(-t_note * 3.0)

        tone = (fundamental + h2 + h3 + h4 + chime) * envelope
        audio[start_idx:end_idx] += tone * 0.45

    # Master gentle fade in and fade out
    fade_in = np.minimum(time_axis / 0.8, 1.0)
    fade_out = np.minimum((duration - time_axis) / 1.5, 1.0)
    audio = audio * fade_in * fade_out

    # Normalize audio
    max_val = np.max(np.abs(audio))
    if max_val > 0:
        audio = audio / max_val * 0.85

    # Convert to 16-bit PCM WAV
    pcm = (audio * 32767).astype(np.int16)
    os.makedirs(os.path.dirname(output_wav), exist_ok=True)
    with wave.open(output_wav, "w") as wf:
        wf.setnchannels(2) # Stereo
        wf.setsampwidth(2) # 16-bit
        wf.setframerate(sample_rate)
        # Interleave stereo
        stereo_pcm = np.column_stack((pcm, pcm)).flatten()
        wf.writeframes(stereo_pcm.tobytes())

    print("Created wedding soundtrack WAV:", output_wav)

def remux_video_with_audio_and_faststart():
    ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
    wav_path = "scripts/wedding_audio.wav"
    raw_video = "public/videos/naruto-wedding-surprise.mp4"
    temp_output = "public/videos/naruto-wedding-surprise-faststart.mp4"

    create_wedding_soundtrack(wav_path, duration=24.0)

    cmd = [
        ffmpeg, "-y",
        "-i", raw_video,
        "-i", wav_path,
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        "-profile:v", "main",
        "-preset", "fast",
        "-crf", "22",
        "-c:a", "aac",
        "-b:a", "192k",
        "-movflags", "+faststart",
        "-shortest",
        temp_output
    ]
    print("Running ffmpeg remux:", " ".join(cmd))
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode != 0:
        print("FFmpeg error:", res.stderr)
        return False
    print("Remux successful!")

    # Replace original with the faststart + audio version
    if os.path.exists(temp_output) and os.path.getsize(temp_output) > 100000:
        if os.path.exists(raw_video):
            os.remove(raw_video)
        os.rename(temp_output, raw_video)
        print("Updated public/videos/naruto-wedding-surprise.mp4 with faststart & audio!")
        return True
    return False

if __name__ == "__main__":
    remux_video_with_audio_and_faststart()

