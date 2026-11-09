export interface MemoryPhoto {
  id: string;
  title: string;
  caption: string;
  date?: string;
  location?: string;
  image: string;
  aspect?: "tall" | "wide" | "square";
}

export interface BirthdayConfig {
  friendName: string;
  friendNickname: string;
  senderName: string;
  birthdayDate: string;
  loadingScreen: {
    message: string;
    submessage: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    ctaButton: string;
  };
  letter: {
    heading: string;
    tagline: string;
    envelopeTitle: string;
    paragraphs: string[];
    signOff: string;
    signature: string;
  };
  memories: {
    heading: string;
    subheading: string;
    photos: MemoryPhoto[];
    instructionNote: string;
  };
  heartExperience: {
    heading: string;
    subheading: string;
    instruction: string;
    messages: string[];
  };
  cake: {
    heading: string;
    instruction: string;
    wishBlownText: string;
    subWishText: string;
  };
  giftBox: {
    heading: string;
    instruction: string;
    revealedTitle: string;
    revealedMessage: string;
    perks: {
      icon: string;
      title: string;
      description: string;
    }[];
  };
  finalScreen: {
    heading: string;
    message1: string;
    message2: string;
    replayButton: string;
  };
  music: {
    trackTitle: string;
    audioSrc: string; // Place your custom MP3 in /public/audio/birthday-song.mp3 or leave as default
    useProceduralLullabyFallback: boolean; // Plays soothing piano-chime melody if audio file is not provided
  };
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
}

export const birthdayConfig: BirthdayConfig = {
  // Replace these placeholders with your actual names!
  friendName: "Rishdha", // Friend's actual name
  friendNickname: "My Beautiful Bestie",
  senderName: "[YOUR_NAME]", // Replace with your name
  birthdayDate: "Your Special Day ✨",

  loadingScreen: {
    message: "Creating a little magic for someone special...",
    submessage: "Preparing your birthday wonderland ✨💖",
  },

  hero: {
    badge: "✨ Special Birthday Celebration ✨",
    title: "Happy Birthday, My Beautiful Bestie! 🎂💗",
    subtitle: "To the girl who makes ordinary moments feel extraordinary...",
    ctaButton: "✨ Open Your Birthday Surprise ✨",
  },

  letter: {
    heading: "A Little Message Just For You 💌",
    tagline: "Written straight from the heart, with so much love and appreciation",
    envelopeTitle: "Tap to unseal this special letter 🌸",
    paragraphs: [
      "Happy Birthday to one of the most special people in my life! 💖",
      "I just want you to know how lucky I am to have you as my best friend. Your smile, your kindness, your beautiful heart, and the happiness you bring into my life mean more than words can explain.",
      "I hope your birthday is filled with endless happiness, beautiful memories, laughter, love, and all the wonderful things your heart wishes for.",
      "Never forget how special, beautiful, and amazing you are. No matter where life takes us, I hope our friendship continues to grow stronger and creates a million unforgettable memories.",
    ],
    signOff: "You deserve all the happiness in the universe.\n\nHappy Birthday, Bestie! 🎂🦋💗",
    signature: "Forever your best friend,",
  },

  memories: {
    heading: "Little Moments, Beautiful Memories 📸",
    subheading: "Every memory with you is a precious chapter in the story of our friendship ✨",
    instructionNote: "Tap any photo to view full memory",
    photos: [
      {
        id: "1",
        title: "Golden Hour Smiles",
        caption: "Those spontaneous laughs that make everything feel light and magical.",
        date: "Unforgettable Days",
        location: "Our Favorite Spot",
        image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
        aspect: "wide",
      },
      {
        id: "2",
        title: "Sunset Chasing & Pure Joy",
        caption: "Talking for hours about life, dreams, and everything in between.",
        date: "Sweet Adventures",
        location: "Under The Pink Sky",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=80",
        aspect: "tall",
      },
      {
        id: "3",
        title: "Coffee, Boba & Endless Talks",
        caption: "There is never a dull moment when we are together.",
        date: "Weekend Rituals",
        location: "Cozy Café",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80",
        aspect: "square",
      },
      {
        id: "4",
        title: "Unstoppable Laughter",
        caption: "The kind of laughter where our stomachs hurt and tears roll down our cheeks.",
        date: "Pure Happiness",
        location: "Anywhere Together",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1000&q=80",
        aspect: "tall",
      },
      {
        id: "5",
        title: "Sparkles & Celebrations",
        caption: "Celebrating another milestone of your brilliant, shining journey.",
        date: "Cherished Moments",
        location: "Memories Lane",
        image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1000&q=80",
        aspect: "wide",
      },
      {
        id: "6",
        title: "Forever & Always",
        caption: "No matter how much time passes, our bond only grows warmer and deeper.",
        date: "To A Lifetime",
        location: "In My Heart",
        image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=80",
        aspect: "square",
      },
    ],
  },

  heartExperience: {
    heading: "Do You Know How Special You Are? 💖",
    subheading: "Tap the glowing heart to reveal reasons why you mean so much ✨",
    instruction: "Tap the heart to feel the love",
    messages: [
      "You make life brighter. ✨",
      "You deserve endless happiness. 🌸",
      "Your smile is pure magic. 🦋",
      "You're one of the most precious people in my life. 💗",
      "Never stop being your beautiful self. 🌷",
      "Your kindness touches everyone around you. 💫",
      "You make every hard day so much easier. 🌈",
      "Thank you for being the most genuine friend ever! 💖",
      "The universe is so lucky to have your light in it. ✨",
      "I am forever grateful to have you by my side. 💝",
    ],
  },

  cake: {
    heading: "Make a Wish, Birthday Girl! 🎂✨",
    instruction: "Close your eyes, make the sweetest wish in your heart, then tap to blow out the candles 🕯️💨",
    wishBlownText: "May every beautiful dream in your heart come true! 💖",
    subWishText: "The universe heard your wish — may this year bring endless magic, health, and love! 🌟",
  },

  giftBox: {
    heading: "A Secret Surprise Box 🎁",
    instruction: "Tap the gift box to untie the ribbon and see what's inside ✨",
    revealedTitle: "The Greatest Gift 💝",
    revealedMessage: "Your greatest gift is the beautiful person you are. Never forget that. 💝",
    perks: [
      {
        icon: "Sparkles",
        title: "Lifetime VIP Bestie Pass",
        description: "Always valid: 24/7 emergency calls, venting sessions, and unconditional hype support.",
      },
      {
        icon: "Coffee",
        title: "Coffee & Sweet Treat Date",
        description: "Redeemable anytime: Your favorite coffee, dessert, or boba on me!",
      },
      {
        icon: "HeartHandshake",
        title: "A Lifetime of Loyalty",
        description: "A guarantee that no matter where life leads us, I will always be cheering for you.",
      },
    ],
  },

  finalScreen: {
    heading: "Happy Birthday Once Again, My Bestie! 💖🎂",
    message1: "Thank you for being a beautiful part of my life.",
    message2: "Keep smiling, keep shining, and always be the amazing girl you are. 🦋✨",
    replayButton: "Replay Your Magic ✨",
  },

  music: {
    trackTitle: "Romantic Acoustic Birthday Melody",
    audioSrc: "/audio/birthday-ambient.mp3",
    useProceduralLullabyFallback: true,
  },

  theme: {
    primaryColor: "#FF69B4",
    secondaryColor: "#9370DB",
    accentColor: "#FFD700",
  },
};

