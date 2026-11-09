export interface ShinobiCharacter {
  id: string;
  name: string;
  title: string;
  clan: string;
  chakraColor: string; // Tailwind/hex glow
  avatarUrl: string;
  fullImageUrl: string;
  quote: string;
  birthdayWish: string;
  themeColor: string;
  badge: string;
}

export interface BirthdayConfig {
  friendName: string;
  yourName: string;
  friendNickname: string;
  birthdayDate: string;
  theme: string;
  favoriteCharacters: string[];
  weddingCharacters: string[];
  birthdayMessage: string;

  loadingScreen: {
    prepText: string;
    missionText: string;
    subText: string;
  };

  hero: {
    villageBadge: string;
    heading: string;
    subheading: string;
    ctaButton: string;
  };

  characters: ShinobiCharacter[];

  letter: {
    heading: string;
    scrollTitle: string;
    scrollSubtitle: string;
    paragraphs: string[];
    signOff: string;
    signature: string;
  };

  weddingScene: {
    heading: string;
    subheading: string;
    quote: string;
    bridegroomName: string;
    brideName: string;
    honoredGuest: string;
    vows: string;
    blessing: string;
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
    scrollSecret: string;
    shinobiCoupons: {
      title: string;
      desc: string;
      badge: string;
      icon: string;
    }[];
  };

  finale: {
    heading: string;
    message1: string;
    message2: string;
    closingQuote: string;
    restartButton: string;
  };

  music: {
    trackTitle: string;
    audioSrc: string; // /music/birthday-theme.mp3
    useProceduralLullabyFallback: boolean;
  };
}

export const birthdayConfig: BirthdayConfig = {
  // Personalization details
  friendName: "Rishdha", // Best friend's name
  yourName: "[YOUR_NAME]", // Replace with your name
  friendNickname: "My Beautiful Shinobi",
  birthdayDate: "Your Legendary Day ✨🍥",
  theme: "naruto-shippuden",
  favoriteCharacters: ["Naruto", "Kakashi", "Kushina", "Hinata", "Sakura"],
  weddingCharacters: ["Kushina", "Kakashi", "Rishdha"],
  birthdayMessage:
    "Even in a world full of shinobi, someone as special as you is truly one of a kind. Believe it! 🍥🧡🌸",

  loadingScreen: {
    prepText: "Preparing a Special Shinobi Birthday Mission... 🍥",
    missionText: "Mission: Make My Bestie's Birthday Unforgettable! ❤️",
    subText: "Gathering Nine-Tails Chakra & Hidden Leaf Stardust...",
  },

  hero: {
    villageBadge: "Konohagakure Special Birthday Decree 🍃",
    heading: "Happy Birthday, My Beautiful Shinobi! 🍥❤️",
    subheading:
      "Even in a world full of shinobi, someone as special as you is truly one of a kind.",
    ctaButton: "ENTER THE SHINOBI WORLD ✨",
  },

  characters: [
    {
      id: "naruto",
      name: "Naruto Uzumaki",
      title: "The Seventh Hokage & Hero of the Hidden Leaf",
      clan: "Uzumaki Clan",
      chakraColor: "#FF8C00", // Bright Orange
      themeColor: "from-amber-500 to-orange-600",
      avatarUrl: "/images/characters/naruto.png",
      fullImageUrl: "/images/characters/naruto.png",
      quote: "I never go back on my word, that's my ninja way!",
      birthdayWish: "Believe it! You deserve the happiest birthday ever! 🍥",
      badge: "Will of Fire 🔥",
    },
    {
      id: "kakashi",
      name: "Kakashi Hatake",
      title: "The Sixth Hokage & Copy Ninja",
      clan: "Hatake Clan",
      chakraColor: "#00BFFF", // Lightning Blue
      themeColor: "from-blue-500 to-cyan-600",
      avatarUrl: "/images/characters/kakashi.png",
      fullImageUrl: "/images/characters/kakashi.png",
      quote: "In the ninja world, those who break rules are scum. But those who abandon friends are worse.",
      birthdayWish:
        "Even a ninja like me knows that today is a very special day. Happy Birthday! ⚡",
      badge: "Lightning Blade ⚡",
    },
    {
      id: "kushina",
      name: "Kushina Uzumaki",
      title: "The Red-Hot Habanero & Loving Mother",
      clan: "Uzumaki Clan",
      chakraColor: "#FF1493", // Fiery Crimson Pink
      themeColor: "from-rose-500 to-red-600",
      avatarUrl: "/images/characters/kushina.png",
      fullImageUrl: "/images/characters/kushina.png",
      quote: "Don't leave food on your plate, eat lots, and find a friend who truly loves you!",
      birthdayWish: "Keep smiling, my precious girl! Your happiness is everything! ❤️",
      badge: "Adamantine Chains ⛓️",
    },
    {
      id: "hinata",
      name: "Hinata Hyuga",
      title: "The Byakugan Princess",
      clan: "Hyuga Clan",
      chakraColor: "#9370DB", // Gentle Lavender Purple
      themeColor: "from-purple-400 to-indigo-600",
      avatarUrl: "/images/characters/hinata.png",
      fullImageUrl: "/images/characters/hinata.png",
      quote: "Because you smiled at me, I was able to keep standing...",
      birthdayWish: "You have a beautiful heart, and you deserve endless happiness. 🌸",
      badge: "Twin Lion Fists 🦁",
    },
    {
      id: "sakura",
      name: "Sakura Haruno",
      title: "Legendary Medical Shinobi",
      clan: "Haruno Clan",
      chakraColor: "#FF69B4", // Sakura Blossom Pink
      themeColor: "from-pink-400 to-rose-500",
      avatarUrl: "/images/characters/sakura.png",
      fullImageUrl: "/images/characters/sakura.png",
      quote: "A shinobi never gives up on those who matter most!",
      birthdayWish: "Never doubt your inner strength and beauty. Happy Birthday, Shinobi sister! 🌸💪",
      badge: "Strength of a Hundred 💎",
    },
    {
      id: "itachi",
      name: "Itachi Uchiha",
      title: "Hero in the Shadows & Sharingan Master",
      clan: "Uchiha Clan",
      chakraColor: "#DC143C", // Crimson Red
      themeColor: "from-red-600 to-zinc-900",
      avatarUrl: "/images/characters/itachi.png",
      fullImageUrl: "/images/characters/itachi.png",
      quote: "It is not that being Hokage makes everyone acknowledge you; it is that being acknowledged by everyone makes you Hokage.",
      birthdayWish: "You are stronger and more precious than you realize. Have a peaceful, joyful birthday. 🕊️",
      badge: "Mangekyo Sharingan 👁️",
    },
    {
      id: "minato",
      name: "Minato Namikaze",
      title: "The Yellow Flash & Fourth Hokage",
      clan: "Namikaze Clan",
      chakraColor: "#FFD700", // Yellow Flash Gold
      themeColor: "from-yellow-400 to-amber-600",
      avatarUrl: "/images/characters/minato.png",
      fullImageUrl: "/images/characters/minato.png",
      quote: "I want everyone in the village to acknowledge me and become a great Hokage!",
      birthdayWish: "May your future flash with brilliant happiness and endless pride! ⚡",
      badge: "Flying Thunder God ⚡",
    },
  ],

  letter: {
    heading: "From One Shinobi Heart to Another 💌",
    scrollTitle: "Konohagakure Sacred Friendship Scroll",
    scrollSubtitle: "Sealed with the Will of Fire and Eternal Appreciation",
    paragraphs: [
      "Happy Birthday to my beautiful best friend! ❤️",
      "If life were a shinobi journey, I would be grateful to have someone as special as you on that journey.",
      "Just like the strongest bonds in Naruto, I hope our friendship stays beautiful, strong, and unforgettable.",
      "You deserve every happiness, every beautiful dream, and every wonderful moment that life has to offer.",
      "May your life be filled with laughter, love, success, happiness, and endless beautiful memories.",
      "Keep smiling, keep shining, and always believe in yourself.",
      "You are truly one of a kind.",
    ],
    signOff: "Happy Birthday, My Favorite Shinobi! 🍥🧡🌸",
    signature: "Forever your best friend & teammate,",
  },

  weddingScene: {
    heading: "A Fairytale Under the Sakura Blossoms 💍🌸",
    subheading: "A special anime fantasy celebration featuring Kushina, Kakashi & Rishdha",
    quote: "Even in the shinobi world, beautiful bonds deserve their own fairytale. 💍🌸",
    bridegroomName: "Kakashi Hatake",
    brideName: "Kushina Uzumaki",
    honoredGuest: "Rishdha [Our Shining Bestie]",
    vows: "Beneath the sacred Great Stone Faces of the Hokage and cascading pink blossoms, friendship and love illuminate the entire Leaf Village.",
    blessing: "May the bond we share remain unbreakable through every season of life! 🕊️✨",
  },

  cake: {
    heading: "Make Your Birthday Wish, My Favorite Shinobi! 🎂",
    instruction: "Channel your chakra, close your eyes, make a wish, and blow out the candles 🕯️🍥💨",
    wishBlownText: "May all your dreams become reality. Believe it! 🍥✨",
    subWishText: "Your wish has been registered with the Great Sage — may endless joy follow your ninja way! 🌟",
  },

  giftBox: {
    heading: "Secret Shinobi Surprise Box 🎁",
    instruction: "Tap the seal to release the chakra ribbon and unlock what's inside ✨",
    revealedTitle: "The Sacred Scroll of Friendship 📜💖",
    revealedMessage: "Your friendship is one of the most precious gifts in my life. ❤️",
    scrollSecret: "No matter how high the mountains or how dangerous the missions, I've got your back forever!",
    shinobiCoupons: [
      {
        title: "Ichiraku Ramen Feast On Me 🍜",
        desc: "Redeemable anytime: Your favorite ramen bowls with extra naruto fishcakes and dessert!",
        badge: "Infinite Bowls",
        icon: "Utensils",
      },
      {
        title: "24/7 Shinobi Emergency Backup 🛡️",
        desc: "Whenever life gets tough, one summon sign will bring instant comfort, advice, and listening.",
        badge: "Always Active",
        icon: "Shield",
      },
      {
        title: "Unconditional Sakura Hugs 🌸",
        desc: "A lifetime supply of warm hugs, cheerful laughter, and endless hype for all your goals.",
        badge: "Eternal Bond",
        icon: "Heart",
      },
    ],
  },

  finale: {
    heading: "Happy Birthday, My Favorite Shinobi! 🍥🎂❤️",
    message1:
      "May your journey be filled with happiness, beautiful memories, endless success, and people who truly care about you.",
    message2:
      "No matter how difficult life becomes, always believe in yourself.\n\nKeep smiling. Keep shining. Keep being the amazing person you are.\n\nBelieve it! 🧡🌸",
    closingQuote: "A bond forged in the heart is stronger than any ninjutsu.",
    restartButton: "RESTART YOUR BIRTHDAY ADVENTURE ✨",
  },

  music: {
    trackTitle: "Naruto Shippuden - Wind & Loneliness / Birthday Theme",
    audioSrc: "/music/birthday-theme.mp3",
    useProceduralLullabyFallback: true,
  },
};

