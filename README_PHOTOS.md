# 📸 How to Add Your Own Photos & Personalize This Birthday Surprise

It's super easy to customize this website with your own photos and messages!

---

## 1. Where to Put Your Photos
Save your favorite photos inside the folder:
```
public/photos/
```
For example:
- `public/photos/bestie-1.jpg`
- `public/photos/bestie-2.jpg`
- `public/photos/bestie-3.jpg`
- `public/photos/bestie-4.jpg`
- `public/photos/bestie-5.jpg`
- `public/photos/bestie-6.jpg`

*(Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`)*

---

## 2. Connect Your Photos in `src/birthdayConfig.ts`
Open [`src/birthdayConfig.ts`](file:///src/birthdayConfig.ts) and locate `memories.photos`. Simply update the `image` path:

```typescript
{
  id: "1",
  title: "Trip to the Beach",
  caption: "The day we couldn't stop laughing at the sunset waves!",
  date: "Summer 2024",
  location: "Sunset Point",
  image: "/photos/bestie-1.jpg", // 👈 Points directly to your photo!
},
```

You can add as many photos as you want!

---

## 3. Personalize Names & Messages
Open [`src/birthdayConfig.ts`](file:///src/birthdayConfig.ts) to easily change:
- **`friendName`**: Her real name (e.g., `"Sarah"`)
- **`senderName`**: Your name (e.g., `"Alex"`)
- **`letter.paragraphs`**: Any personalized inside jokes or heartfelt memories
- **`heartExperience.messages`**: Sweet things you love about her
- **`cake.heading`** and **`giftBox.perks`**: Custom friendship coupons & gifts!

---

## 4. Custom Background Music (Optional)
If you have a favorite MP3 song (like an acoustic birthday melody or her favorite song):
1. Put the audio file in `public/audio/birthday-song.mp3`
2. Update in `src/birthdayConfig.ts`:
   ```typescript
   music: {
     trackTitle: "Her Favorite Song",
     audioSrc: "/audio/birthday-song.mp3",
     useProceduralLullabyFallback: true, // Will seamlessly play a magical acoustic chime synth if MP3 is absent!
   }
   ```

Enjoy making this the most unforgettable birthday surprise ever! 💖✨🎂

