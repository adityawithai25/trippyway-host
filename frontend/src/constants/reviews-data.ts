export interface Review {
  id: string;
  userName: string;
  userInitials: string;
  rating: number;
  date: string;
  reviewText: string;
  verified?: boolean;
  images?: string[];
  media?: {
    url: string;
    type: 'image' | 'video';
  };
}

export const TRIP_REVIEWS: Record<string, Review[]> = {
  "3d2n-dec22-couples": [
    {
      id: "1",
      userName: "Priya & Raj Malhotra",
      userInitials: "PR",
      rating: 5,
      date: "2 weeks ago",
      reviewText:
        "Absolutely magical Manali experience! The candlelight dinner by the riverside was the highlight - with snowflakes gently falling and traditional pahadi music playing. Our room had a stunning view of the snow-capped peaks. The bonfire evening under the stars made it even more romantic. Special thanks to the team for arranging a surprise cake for our anniversary! The Old Manali cafes and Hadimba temple visit were perfect. Worth every penny! 🏔️❤️",
      verified: true,
      media: {
        url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80",
        type: "image"
      }
    },
    {
      id: "2",
      userName: "Ananya & Karan Sharma",
      userInitials: "AS",
      rating: 5,
      date: "3 weeks ago",
      reviewText:
        "Best romantic getaway ever! Started with Solang Valley snow activities - paragliding with mountain views was breathtaking. The cottage stay was cozy with a fireplace and mountain views. Loved the private couples' spa session and the local Himachali food. Mall Road evening walks holding hands in the cold were dreamy. The staff went above and beyond to make our trip special. Already planning to return next winter!",
      verified: true,
      media: {
        url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
        type: "image"
      }
    },
    {
      id: "3",
      userName: "Vikram & Neha Mehta",
      userInitials: "VM",
      rating: 5,
      date: "1 month ago",
      reviewText: "Perfect 3-day escape! The itinerary was well-paced - mix of adventure and relaxation. Vashisht hot springs were therapeutic after a day of snow activities. Our guide was knowledgeable about local culture and hidden spots. The riverside restaurant for dinner was romantic with live music. Accommodation exceeded expectations. Small group size made it intimate. Manali's beauty in December is unmatched!",
      verified: true,
      media: {
        url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&q=80",
        type: "image"
      }
    },
    {
      id: "4",
      userName: "Sneha & Aditya Reddy",
      userInitials: "SR",
      rating: 5,
      date: "1 month ago",
      reviewText: "Dream romantic trip! The private bonfire under the starlit sky with hot chocolate was magical. Loved the surprise rose petal decoration in our room. Rohtang Pass visit was adventurous - snow activities were so much fun! The couple photography session captured beautiful memories. Local market shopping and trying street food together was enjoyable. Every moment felt like a Bollywood movie scene! 🌟",
      verified: true,
      media: {
        url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&q=80",
        type: "image"
      }
    },
    {
      id: "5",
      userName: "Arjun & Kavita Kumar",
      userInitials: "AK",
      rating: 5,
      date: "2 months ago",
      reviewText: "Exceeded all expectations! From pickup to drop, everything was seamless. The couple activities were thoughtfully planned - morning nature walk, riverside picnic, evening bonfire. Accommodation was warm and comfortable despite the December cold. Food was delicious with both local and comfort options. Staff was attentive without being intrusive. The gift hamper with local products was a sweet touch. Manali in winter is truly paradise for couples!",
      verified: true,
      media: {
        url: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=600&q=80",
        type: "image"
      }
    },
    {
      id: "6",
      userName: "Ravi & Kavya Nair",
      userInitials: "RK",
      rating: 5,
      date: "2 months ago",
      reviewText: "Value for money and so much more! The cozy wooden cottage with heater and mountain views was perfect for December. Enjoyed apple orchards visit, local monastery tours, and coffee shop hopping in Old Manali. The romantic setup for dinner was unexpected and beautiful. Transportation was comfortable. Met another lovely couple on the trip. Will definitely recommend TrippyWay for romantic getaways!",
      verified: true,
      media: {
        url: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600&q=80",
        type: "image"
      }
    },
  ],
  "3d2n-dec23-girls": [
    {
      id: "1",
      userName: "Meera Patel",
      userInitials: "MP",
      rating: 5,
      date: "1 week ago",
      reviewText: "Safe, empowering, and SO MUCH FUN! 🎄 As a solo traveler, I was nervous but TrippyWay's all-female group made it perfect. We celebrated Christmas Eve with secret Santa, caroling by the bonfire, and hot chocolate under the stars in Manali! The female trip leader was amazing - ensured everyone's comfort and safety. Mall Road shopping, cafe hopping in Old Manali, and snow selfies were the best! Made 6 new besties. This is what girl power looks like! 💪✨",
      verified: true,
      media: {
        url: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=600&q=80",
        type: "image"
      }
    },
    {
      id: "2",
      userName: "Divya Singh",
      userInitials: "DS",
      rating: 5,
      date: "2 weeks ago",
      reviewText: "BEST DECISION EVER! 🌟 Joined solo and left with 8 new sisters! Christmas morning we exchanged gifts and had a special brunch. The group energy was infectious - singing Bollywood songs during the drive, having deep 3am conversations, and cheering each other during snow activities. Safe accommodations, female guides, and no awkwardness. Solang Valley paragliding gave me life! Our WhatsApp group is still super active. Already planning our next girls trip!",
      verified: true,
      media: {
        url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80",
        type: "image"
      }
    },
    {
      id: "3",
      userName: "Riya Gupta",
      userInitials: "RG",
      rating: 5,
      date: "3 weeks ago",
      reviewText: "Perfectly organized girls getaway! 🏔️ Safety was top priority - separate transport, female staff, verified accommodations with good locks and security. Christmas decorations everywhere made it festive! Loved the group activities - karaoke night, photoshoot sessions, and talent show by the bonfire. The freedom to be ourselves without any judgment was liberating. Food was great with veg and non-veg options. Budget-friendly without compromising quality!",
      verified: true,
      media: {
        url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80",
        type: "image"
      }
    },
    {
      id: "4",
      userName: "Pooja Verma",
      userInitials: "PV",
      rating: 5,
      date: "1 month ago",
      reviewText: "Dream Christmas trip! 🎅 The team understood what girls need - clean bathrooms, safe spaces, time to get ready (haha!), and understanding when we wanted to shop everywhere! Visited Hadimba Temple, shopped for Himachali shawls, tried every cafe in Old Manali. Evening bonfire sessions with guitar music and sharing life stories were therapeutic. The female trip leader was like an older sister. Felt safe, had fun, made memories!",
      verified: true,
      media: {
        url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80",
        type: "image"
      }
    },
    {
      id: "5",
      userName: "Neha Joshi",
      userInitials: "NJ",
      rating: 5,
      date: "1 month ago",
      reviewText: "Empowering and so much fun! 💃 Breaking stereotypes - girls can travel alone and have amazing adventures! We did river rafting, trekking, snow activities, and conquered our fears together. The group supported each other - from sharing chargers to lending jackets in the cold. Christmas special dinner was beautiful with live music. Accommodation was clean and comfortable. Worth every rupee! This trip boosted my confidence to travel more!",
      verified: true,
      media: {
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&q=80",
        type: "image"
      }
    },
    {
      id: "6",
      userName: "Shreya Iyer",
      userInitials: "SI",
      rating: 5,
      date: "2 months ago",
      reviewText: "PERFECT GIRLS GANG TRIP! 🎉 From the moment we met, it felt like a reunion! We explored Manali's beauty, tried adventure activities, did Instagram-worthy photoshoots, had late-night gossip sessions, and created memories for lifetime. Christmas Eve was magical with decorations, cake cutting, and dancing. Safety was never a concern. Food was delicious. Already booked the NYE trip with same group! TrippyWay understands what girls want! 🌸",
      verified: true,
      media: {
        url: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=600&q=80",
        type: "image"
      }
    },
  ],
  "4d3n-dec28-girls": [
    {
      id: "1",
      userName: "Aditi Rao",
      userInitials: "AR",
      rating: 5,
      date: "1 week ago",
      reviewText: "EPIC NYE WITH MY GIRLS! 🎆 Started in Manali exploring snowy landscapes, then moved to hippie paradise Kasol! NYE party was LIT with DJ, dancing, countdown under the stars! 🌟 The Parvati Valley trek was challenging but rewarding. Israeli cafes in Kasol were so cool - tried shakshuka and apple cinnamon cake! Bonfire nights, making resin jewelry, and live music made it unforgettable. Rang in 2025 with 10 amazing women. Best NYE ever! All-female group felt safe and empowering! 💪✨",
      verified: true,
      media: {
        url: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=600&q=80",
        type: "image"
      }
    },
    {
      id: "2",
      userName: "Isha Malhotra",
      userInitials: "IM",
      rating: 5,
      date: "2 weeks ago",
      reviewText: "BEST START TO 2025! 🎊 Kasol vibes were MAGICAL - peaceful riverside, mountain views, hippie culture! We did riverside meditation, visited Manikaran hot springs (so therapeutic!), explored Tosh village, and danced our hearts out on NYE! The girls gang energy was incredible - deep conversations, loud laughter, and zero judgments. Accommodations were cozy with heaters. Food was amazing - Himachali, Israeli, and Indian options. Already missing the mountains and my travel sisters! 🏔️💕",
      verified: true,
      media: {
        url: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=600&q=80",
        type: "image"
      }
    },
    {
      id: "3",
      userName: "Tanvi Shah",
      userInitials: "TS",
      rating: 5,
      date: "3 weeks ago",
      reviewText: "Dream NYE getaway! 🌈 Perfect mix of adventure and relaxation. Manali snow activities were thrilling - snowboarding, skiing, and sledding! Kasol was peaceful - cafe hopping, riverside walks, and stargazing. The itinerary was flexible letting us explore at our own pace. NYE celebration included special dinner, DJ night, and midnight champagne toast by the river! Met incredible women from different cities. Female guides were knowledgeable and fun. 10/10 experience!",
      verified: true,
      media: {
        url: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=600&q=80",
        type: "image"
      }
    },
    {
      id: "4",
      userName: "Aishwarya Nair",
      userInitials: "AN",
      rating: 5,
      date: "1 month ago",
      reviewText: "UNFORGETTABLE! 🎉 This girls gang is now my second family! We laughed till our stomachs hurt, sang Bollywood songs at 3am, shared secrets, and created bucket list memories! Kasol's laid-back vibe was perfect for NYE. Visited Chalal village, tried German bakeries, shopped for tibetan jewelry. The midnight countdown by the Parvati river with sparklers was MAGICAL! Safe, fun, and empowering. Thank you TrippyWay for an incredible experience! 🌟",
      verified: true,
      media: {
        url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80",
        type: "image"
      }
    },
    {
      id: "5",
      userName: "Ritika Kapoor",
      userInitials: "RK",
      rating: 5,
      date: "1 month ago",
      reviewText: "AMAZINGLY ORGANIZED! 📸 From transportation to accommodation, everything was perfect! Manali to Kasol scenic drive was breathtaking. Activities were well-balanced - adventure in Manali, relaxation in Kasol. NYE party was epic with live band, bonfire, and dancing! Made friendships for lifetime. Loved the freedom to explore, shop, and just be ourselves. Female-only group meant no awkwardness. Best investment for welcoming 2025! Will definitely travel with TrippyWay again! 💃",
      verified: true,
      media: {
        url: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=600&q=80",
        type: "image"
      }
    },
    {
      id: "6",
      userName: "Sanya Desai",
      userInitials: "SD",
      rating: 5,
      date: "2 months ago",
      reviewText: "PERFECT NYE CELEBRATION! 🎊 The 4-day itinerary covered best of both Manali and Kasol. Started with snow adventures, ended with peaceful hippie vibes! NYE night was spectacular - decorated venue, live music, countdown with fireworks view from mountains! The food throughout was delicious - tried local thukpa, momos, and Israeli cuisine. Clean accommodations, safe environment, and amazing group dynamics. Welcomed 2025 in the most beautiful way possible! ✨🏔️",
      verified: true,
      media: {
        url: "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=600&q=80",
        type: "image"
      }
    },
  ],
  "3d2n-dec25-mixed": [
    {
      id: "1",
      userName: "Rohit Agarwal",
      userInitials: "RA",
      rating: 5,
      date: "1 week ago",
      reviewText: "Perfect post-Christmas trip! 🎄 Joined solo and made 12 new friends! The mixed group vibe was amazing - people from Mumbai, Delhi, Bangalore all vibing together. We explored Manali's winter wonderland, played in snow at Solang Valley, and had late-night bonfire sessions sharing travel stories. Budget-friendly yet quality service. The group activities like team snow fights and group photoshoots made it special. Already planning the next trip with my new travel buddies!",
      verified: true,
      media: {
        url: "https://images.unsplash.com/photo-1502945015378-0e284ca1a5be?w=600&q=80",
        type: "image"
      }
    },
    {
      id: "2",
      userName: "Sakshi Menon",
      userInitials: "SM",
      rating: 5,
      date: "2 weeks ago",
      reviewText: "MADE FRIENDS FOR LIFE! 🌟 The group dynamics were incredible - 15 strangers became family in 3 days! Christmas spirit was everywhere. We did secret Santa, carol singing, and Christmas special dinner. Manali's beauty with snow-covered mountains was breathtaking. The mix of boys and girls made it fun without any awkwardness. Trip leader ensured everyone was comfortable. Activities included Mall Road shopping, Hadimba Temple visit, and adventure sports. Best decision to join! 🏔️",
      verified: true,
      media: {
        url: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&q=80",
        type: "image"
      }
    },
    {
      id: "3",
      userName: "Karan Thakur",
      userInitials: "KT",
      rating: 5,
      date: "3 weeks ago",
      reviewText: "GREAT VALUE FOR MONEY! Activities were perfectly planned - morning trek to Club House, afternoon snow activities, evening bonfire with music. The group was diverse and friendly. Accommodation was clean and comfortable. Food was delicious with both veg and non-veg options. Visited Old Manali cafes, tried local pahadi food. The coordinators were helpful and fun. Made memories and friends. Highly recommend for solo travelers looking to join a group! 👍",
      verified: true,
      media: {
        url: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=600&q=80",
        type: "image"
      }
    },
    {
      id: "4",
      userName: "Nisha Rao",
      userInitials: "NR",
      rating: 5,
      date: "1 month ago",
      reviewText: "Perfect festive trip! 🎊 The post-Christmas vibes in Manali were magical. Our mixed group had great energy - playing antakshari during drives, having meaningful conversations by the bonfire, and cheering for each other during activities. Visited Vashisht hot springs, Solang Valley, and explored local markets. Accommodation had beautiful mountain views. The freedom to explore with new friends made it special. Budget-friendly and well-organized. Best way to end 2024!",
      verified: true,
      media: {
        url: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=600&q=80",
        type: "image"
      }
    },
    {
      id: "5",
      userName: "Aman Khanna",
      userInitials: "AK",
      rating: 5,
      date: "1 month ago",
      reviewText: "LOVED the mixed group experience! Met people from different backgrounds, shared experiences, and bonded over mountain adventures. The trip was well-paced with time for both group activities and personal exploration. Snow activities were thrilling, cafe hopping was relaxing. Our WhatsApp group is still active with daily conversations. Trip organizers were professional and friendly. Value for money is unbeatable. Already looking at the next TrippyWay trip!",
      verified: true,
    },
    {
      id: "6",
      userName: "Preeti Chawla",
      userInitials: "PC",
      rating: 5,
      date: "2 months ago",
      reviewText: "Best budget-friendly trip! 💯 Met amazing people who became travel buddies for future! The mixed group energy was fantastic - no cliques, everyone included. Manali's winter beauty exceeded expectations. Activities included river rafting, paragliding, and local sightseeing. Food was tasty with variety. Accommodations were clean and cozy. Trip leaders were like friends, not just organizers. Made incredible memories without burning a hole in the pocket. Highly recommend! 🏔️✨",
      verified: true,
    },
  ],
  "4d3n-dec26-couples": [
    {
      id: "1",
      userName: "Rahul & Shruti Kapoor",
      userInitials: "RS",
      rating: 5,
      date: "1 week ago",
      reviewText: "MAGICAL NYE IN PARADISE! 🌟 Started in snowy Manali with couple activities, then to peaceful Kasol for NYE! The transition from adventure to relaxation was perfect. Kasol riverside resort was stunning - woke up to Parvati river sounds! NYE celebration was intimate - candlelight dinner by the river, midnight champagne under stars, and fireworks view from mountains! Explored Manikaran hot springs together, visited Tosh village, and had romantic cafe dates. Best way to welcome 2025 with my love! ❤️🏔️",
      verified: true,
      media: {
        url: "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=600&q=80",
        type: "image"
      }
    },
    {
      id: "2",
      userName: "Aditya & Meera Gupta",
      userInitials: "AM",
      rating: 5,
      date: "2 weeks ago",
      reviewText: "BEST NYE EVER! 🎊 The romantic setup exceeded expectations! Manali snow activities were thrilling - did couple paragliding with breathtaking views! Kasol's hippie vibes were so romantic - riverside walks, cute cafes, and peaceful atmosphere. NYE night had live music, special couples dinner with rose petals, and midnight kiss under the stars! The small couples-only group made it intimate. Accommodation was cozy and private. Started 2025 in the most beautiful way! 💕",
      verified: true,
      media: {
        url: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=600&q=80",
        type: "image"
      }
    },
    {
      id: "3",
      userName: "Varun & Anjali Mehta",
      userInitials: "VA",
      rating: 5,
      date: "3 weeks ago",
      reviewText:
        "UNFORGETTABLE ROMANTIC EXPERIENCE! 🌹 Everything was perfectly arranged - from private transfers to couple activities. Manali's snow-covered landscapes were like a fairytale! Enjoyed couple spa, romantic dinners, and bonfire nights. Kasol offered peaceful riverside moments and cafe hopping. NYE celebration was special with themed decorations, couple games, and countdown by the river. The photographers captured beautiful moments. Met other lovely couples. Worth every penny for starting the year with your soulmate!",
      verified: true,
      media: {
        url: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=600&q=80",
        type: "image"
      }
    },
    {
      id: "4",
      userName: "Siddharth & Kavya Sharma",
      userInitials: "SK",
      rating: 5,
      date: "1 month ago",
      reviewText: "BEAUTIFUL ROMANTIC GETAWAY! 🏔️ The combination of adventure in Manali and tranquility in Kasol was perfect! Loved the couple treks, riverside picnics, and cozy nights by the fireplace. The locations were stunning - snow peaks, green valleys, flowing river. NYE dinner was elegantly arranged with mountain views. Small group of 6 couples made it intimate and friendly. Accommodation had privacy and comfort. Made memories we'll cherish forever!",
      verified: true,
      media: {
        url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
        type: "image"
      }
    },
    {
      id: "5",
      userName: "Nikhil & Riya Patel",
      userInitials: "NR",
      rating: 5,
      date: "1 month ago",
      reviewText: "PERFECT COUPLES TRIP! 💑 Made amazing memories together! The itinerary balanced adventure and romance beautifully. Manali activities were exciting, Kasol was peaceful and romantic. Loved the couple photography session - got stunning pictures! NYE celebration was magical with music, dancing, and midnight countdown. Food throughout was delicious. Staff was respectful of privacy while being helpful. Met wonderful couples who became friends. Best investment for a romantic start to 2025!",
      verified: true,
      media: {
        url: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=600&q=80",
        type: "image"
      }
    },
    {
      id: "6",
      userName: "Karan & Pooja Desai",
      userInitials: "KP",
      rating: 5,
      date: "2 months ago",
      reviewText: "ROMANTIC AND ADVENTUROUS! ✨ Best NYE celebration ever! The 4-day journey from snowy Manali to serene Kasol was perfectly planned. Morning adventures, evening romance, and NYE night celebration were all spectacular! Visited beautiful spots, tried amazing food, and created countless romantic moments. The couples-only group maintained the romantic atmosphere. Accommodation, food, and activities all exceeded expectations. This trip made our relationship even stronger! Highly recommend for couples! 🎉❤️",
      verified: true,
    },
  ],
  "4d3n-dec27-mixed": [
    {
      id: "1",
      userName: "Vishal Mehta",
      userInitials: "VM",
      rating: 5,
      date: "1 week ago",
      reviewText: "EPIC PARTY VIBES! 🎉 Pre-NYE trip was INSANE! Manali snow activities by day, party by night! Kasol hippie vibes were perfect for chill sessions. The group of 20 had amazing energy - everyone was there to have FUN! Live DJ nights, bonfire parties, riverside BBQ, and dance sessions. Explored cafes, tried adventure sports, and partied hard. Met people who became close friends. This is THE trip for party lovers! Best way to warm up before NYE! 🔥🏔️",
      verified: true,
    },
    {
      id: "2",
      userName: "Anjali Desai",
      userInitials: "AD",
      rating: 5,
      date: "2 weeks ago",
      reviewText: "HIGH-ENERGY TRIP! 💃 Perfect for party lovers like me! From morning adventures to late-night parties, every moment was LIT! Manali snow fun was thrilling, Kasol parties were memorable. The group was diverse and fun - everyone vibed together. Music, dancing, games, and adventures - had it all! Food was great with special party snacks. Accommodation was clean and comfortable. Made friends from across India. Best pre-NYE celebration! Highly recommend for party animals! 🎊",
      verified: true,
    },
    {
      id: "3",
      userName: "Rohan Kapoor",
      userInitials: "RK",
      rating: 5,
      date: "3 weeks ago",
      reviewText: "BEST PRE-NYE PARTY! 🎸 The vibes were INCREDIBLE! Started with snow adventures in Manali, ended with riverside parties in Kasol! DJ nights were amazing - played all the right tracks! Group was full of energy - dancing, singing, playing games. Visited Tosh, Manikaran, and partied at best cafes. The bonfire nights with live music and jamming sessions were highlights. Made lifelong friends. Perfect balance of adventure, chill, and party! This trip set the mood for NYE! 🌟",
      verified: true,
    },
    {
      id: "4",
      userName: "Shreya Iyer",
      userInitials: "SI",
      rating: 5,
      date: "1 month ago",
      reviewText: "FUN AND ENERGETIC! 🎊 The group dynamics were fantastic! Everyone came to party and make memories! Daytime activities included rafting, trekking, and sightseeing. Nights were for parties - DJ music, dancing, bonfire sessions. Kasol cafes and Israeli food were amazing! Met incredible people, shared countless laughs. The coordinators knew how to keep the energy high! Perfect mix of adventure and party. Best way to celebrate before NYE! Will definitely do this again!",
      verified: true,
    },
    {
      id: "5",
      userName: "Aryan Singh",
      userInitials: "AS",
      rating: 5,
      date: "1 month ago",
      reviewText: "AMAZING PARTY ATMOSPHERE! 🎵 Made lifelong friends while partying in the mountains! The pre-NYE vibes were unmatched. Manali to Kasol journey was scenic and fun. Activities were adventurous, parties were lit! Group of 18 people became one big family. Late-night conversations, early morning treks, and all-night parties! Food was tasty, accommodation had great party spaces. This trip was the perfect warm-up for New Year celebrations! Highly recommend for the young and energetic! 🔥",
      verified: true,
    },
    {
      id: "6",
      userName: "Isha Malhotra",
      userInitials: "IM",
      rating: 5,
      date: "2 months ago",
      reviewText: "GREAT ORGANIZATION! 💯 Fantastic group dynamics! From the moment we met, the energy was high! Every day was packed with fun - snow activities, cafe hopping, riverside parties, and bonfire nights. The party setups were professional with good music and vibes. Met amazing people who I'm still in touch with. Food, accommodation, transportation - all top-notch! Best pre-NYE trip for those who love to party and make friends! TrippyWay nailed it! 🎉🏔️",
      verified: true,
    },
  ],
  "3d2n-dec24-boys": [
    {
      id: "1",
      userName: "Aman Gupta",
      userInitials: "AG",
      rating: 5,
      date: "1 week ago",
      reviewText: "PERFECT BOYS TRIP! 💪 Christmas adventure with the boys was EPIC! Manali's snowy mountains were perfect for our adventure gang. Did river rafting, snow activities, and conquered Solang Valley! Brotherhood vibes were strong - helping each other during treks, sharing stories by bonfire, and singing Dil Chahta Hai songs! The boys gang energy was unmatched. Late-night card games, early morning treks, and loud laughter throughout. Made bros for life! Best Christmas ever! 🏔️🔥",
      verified: true,
    },
    {
      id: "2",
      userName: "Rohit Sharma",
      userInitials: "RS",
      rating: 5,
      date: "2 weeks ago",
      reviewText: "THRILLING ADVENTURE! ⛷️ Christmas with 14 boys in Manali was insane! Activities were adrenaline-pumping - snowboarding, paragliding, and river crossing! The group bonded instantly - shared rooms, shared adventures, shared memories! Bonfire nights with guitars and old Hindi songs gave Bollywood vibes. Food was filling and tasty. The no-nonsense approach was perfect for boys. Budget-friendly without compromising on fun. This is what brotherhood looks like!",
      verified: true,
    },
    {
      id: "3",
      userName: "Karan Patel",
      userInitials: "KP",
      rating: 5,
      date: "3 weeks ago",
      reviewText: "BEST BOYS GANG TRIP! 🎊 Made memories that will last forever! From snow fights to late-night talks, every moment was special. The group was chill - no drama, just fun! Manali adventures included trekking, snow activities, and exploring local spots. Christmas Eve bonfire with the boys was legendary - shared stories, roasted marshmallows, and made pacts! Accommodation was basic but comfortable. The boys-only environment meant complete freedom! Worth every rupee!",
      verified: true,
    },
    {
      id: "4",
      userName: "Vikram Reddy",
      userInitials: "VR",
      rating: 5,
      date: "1 month ago",
      reviewText: "ADVENTURE-PACKED WEEKEND! 🏂 Great value for money! Did everything - rafting, trekking, skiing, and exploring! The boys group was diverse but vibed perfectly. Helped each other during challenges, celebrated together during wins. Christmas celebration with Secret Santa and cake cutting was fun. Manali's winter beauty added to the experience. No frills, just pure adventure and brotherhood. The coordinators were cool and understanding. Best boys trip on a budget!",
      verified: true,
    },
    {
      id: "5",
      userName: "Arjun Nair",
      userInitials: "AN",
      rating: 5,
      date: "1 month ago",
      reviewText: "EPIC CHRISTMAS CELEBRATION! 🎄 Brotherhood was STRONG throughout! From strangers to brothers in 3 days! The adventure activities brought us together. Manali's snow-covered landscapes were perfect for our crazy gang. Night sessions by bonfire included everything - jokes, confessions, advice, and plans for future trips! Food was good, accommodation was comfortable. The freedom to be ourselves without judgments was refreshing. Made 12 brothers for life! 💪",
      verified: true,
    },
    {
      id: "6",
      userName: "Siddharth Iyer",
      userInitials: "SI",
      rating: 5,
      date: "2 months ago",
      reviewText: "PERFECT ADVENTURE TRIP! 🚀 Highly recommend for boys looking for adventure and brotherhood! Did paragliding over snowy valleys - most thrilling experience! The group was energetic and supportive. Explored Manali's adventure spots, tried local food, and had countless adventures. Christmas party with the boys was memorable. Accommodation fit our budget perfectly. The trip leaders were like friends. Made connections that will last beyond this trip. This is what boys trips should be! 🏔️",
      verified: true,
    },
  ],
  "4d3n-dec29-boys": [
    {
      id: "1",
      userName: "Rahul Mehta",
      userInitials: "RM",
      rating: 5,
      date: "1 week ago",
      reviewText: "EPIC NYE ADVENTURE! 🎊 Best way to start 2025 with the boys! Manali snow activities were insane - snowmobiling, skiing, and snow fights! Kasol was perfect for chill vibes before the big night. NYE party was WILD - DJ, bonfire, dancing, and countdown under Himalayan stars! 🏔️ The boys gang of 16 was legendary - we laughed, adventured, and celebrated together. Made brothers for life! Rang in 2025 doing backflips in snow! Best start to the year! 🔥💪",
      verified: true,
    },
    {
      id: "2",
      userName: "Aditya Khanna",
      userInitials: "AK",
      rating: 5,
      date: "2 weeks ago",
      reviewText:
        "GREAT BROTHERHOOD VIBES! 🤝 Adventure and celebration perfectly combined! Days filled with trekking, rafting, and snow activities. Nights filled with bonfire, music, and brotherhood talks. Kasol's hippie culture was refreshing. NYE celebration was epic - special dinner, DJ night, and mountain fireworks! The boys group supported each other - from carrying bags during treks to sharing adventures. Made memories and brothers that will last forever! Started 2025 with the right energy! ✨",
      verified: true,
    },
    {
      id: "3",
      userName: "Varun Agarwal",
      userInitials: "VA",
      rating: 5,
      date: "3 weeks ago",
      reviewText: "UNFORGETTABLE EXPERIENCE! 🎉 Kasol adventure was AMAZING! The Parvati valley trek tested our limits but made us closer. Explored Manikaran, Tosh, and Chalal village. Tried Israeli food and local pahadi dishes. NYE night was legendary - riverside party with bonfire, music, and brotherhood! The boys gang energy was unmatched. From morning adventures to late-night conversations, every moment bonded us. Started 2025 with 15 new brothers! Best boys trip ever!",
      verified: true,
    },
    {
      id: "4",
      userName: "Karan Thakur",
      userInitials: "KT",
      rating: 5,
      date: "1 month ago",
      reviewText: "PERFECT BOYS TRIP! 💯 Made memories for a lifetime! The 4-day journey from Manali to Kasol for NYE was perfectly planned. Adventure activities were thrilling, NYE party was wild! The boys group had amazing chemistry - cricket matches in snow, antakshari sessions, and deep talks. Food was great, accommodation was comfortable. Welcomed 2025 with the best gang! This trip proved that the best celebrations happen in the mountains with the right people! 🏔️",
      verified: true,
    },
    {
      id: "5",
      userName: "Nikhil Joshi",
      userInitials: "NJ",
      rating: 5,
      date: "1 month ago",
      reviewText: "BEST NYE ADVENTURE! 🚀 The group was FANTASTIC! Met strangers, became brothers! Manali adventures got our adrenaline pumping. Kasol gave us peace and party vibes. NYE celebration was spectacular - bonfire party, DJ music, midnight countdown with mountain views, and brotherhood toast! Explored cafes, tried adventures, made memories. The trip coordinators were cool and helpful. Budget-friendly with no compromise on fun! This is how boys should welcome the New Year! 🎊💪",
      verified: true,
    },
    {
      id: "6",
      userName: "Siddharth Rao",
      userInitials: "SR",
      rating: 5,
      date: "2 months ago",
      reviewText: "EPIC START TO THE YEAR! 🌟 Adventure and fun perfectly combined! Snow activities in Manali were thrilling - tried snowboarding for the first time! Kasol's riverside cafes and chill vibes were perfect for the boys to bond. NYE party was insane - dancing, singing, and celebrating brotherhood! The boys group was diverse but vibed perfectly. Made 14 brothers and countless memories. Rang in 2025 in the Himalayas - doesn't get better than this! Highly recommend! 🏔️🔥",
      verified: true,
    },
  ],
  "4d3n-dec30-mixed": [
    {
      id: "1",
      userName: "Priya Menon",
      userInitials: "PM",
      rating: 5,
      date: "1 week ago",
      reviewText: "LAST MINUTE MAGIC! ✨ Booked 2 days before NYE and it was the BEST decision! Joined solo, had no plans, and ended up having the most amazing NYE in Himalayas! 🏔️ The mixed group of 18 was incredible - instant connections! Manali snow adventures, Kasol peaceful vibes, and NYE party under stars! Met people who became friends for life. The last-minute chaos turned into the best memories! Rang in 2025 with new friends and mountain views! Totally worth it! 🎊",
      verified: true,
    },
    {
      id: "2",
      userName: "Rohan Chawla",
      userInitials: "RC",
      rating: 5,
      date: "2 weeks ago",
      reviewText:
        "AMAZING LAST-MINUTE ADVENTURE! 🚀 Had zero NYE plans, randomly found this trip, and WOW! Perfect way to celebrate! The group welcomed late joiners warmly. Manali to Kasol journey was scenic and fun. Activities included snow sports, cafe hopping, and riverside treks. NYE celebration was epic - DJ, bonfire, dancing, and countdown with 20 new friends! The spontaneity made it even more special. Best impulsive decision ever! Started 2025 on the highest note! 🎉🏔️",
      verified: true,
    },
    {
      id: "3",
      userName: "Ananya Verma",
      userInitials: "AV",
      rating: 5,
      date: "3 weeks ago",
      reviewText: "GREAT VALUE FOR MONEY! 💯 Booked last minute at great rates! The mixed group was friendly and fun - no awkwardness despite being strangers. Manali adventures were thrilling, Kasol was peaceful. NYE night had everything - music, dancing, food, and fireworks! Made friends from Mumbai, Bangalore, Delhi - diverse group bonded over mountains! Accommodation was comfortable, food was tasty. Best spontaneous NYE trip! The coordinators handled last-minute chaos perfectly! 🌟",
      verified: true,
    },
    {
      id: "4",
      userName: "Vishal Nair",
      userInitials: "VN",
      rating: 5,
      date: "1 month ago",
      reviewText: "PERFECT NYE CELEBRATION! 🎊 Joined last minute solo and had the time of my life! The group energy was amazing - everyone came with open minds and left with full hearts! Did snow activities, explored mountain villages, and celebrated NYE by the Parvati river! The mixed group dynamics were perfect - boys and girls vibed together naturally. Made memories, made friends, made 2025 special! Budget-friendly last-minute option that felt premium! 🏔️✨",
      verified: true,
    },
    {
      id: "5",
      userName: "Isha Kapoor",
      userInitials: "IK",
      rating: 5,
      date: "1 month ago",
      reviewText: "GREAT LAST-MINUTE OPTION! 🌟 Well-organized despite being spontaneous! Booked 3 days before departure and the team accommodated perfectly. The trip covered best of Manali and Kasol in 4 days. NYE party was well-planned with decorations, music, and special dinner. Group of 16 bonded instantly - helped each other, laughed together, celebrated together! Started 2025 in the mountains with awesome people! No regrets about this spontaneous decision! 💃🏔️",
      verified: true,
    },
    {
      id: "6",
      userName: "Aryan Desai",
      userInitials: "AD",
      rating: 5,
      date: "2 months ago",
      reviewText: "BEST WAY TO RING IN NEW YEAR! 🎉 Highly recommend for last-minute planners! Joined with no expectations and got SO MUCH MORE! The mixed group was diverse and amazing. Activities balanced adventure and relaxation perfectly. Kasol NYE party was intimate and fun - riverside bonfire, live music, and genuine celebrations! Made 15 new friends and countless memories. The last-minute booking didn't compromise quality at all! Welcome 2025 in the Himalayas - worth every penny! 🏔️🔥",
      verified: true,
    },
  ],
  "4d3n-feb20-kashmir-romantic": [
    {
      id: "1",
      userName: "Arjun & Priya Malhotra",
      userInitials: "AP",
      rating: 5,
      date: "1 week ago",
      reviewText: "PARADISE ON EARTH! 🌹 Kashmir truly lives up to its name! Started with shikara ride on Dal Lake at sunset - most romantic moment ever! The houseboat stay was magical with mountain views from our room. Gulmarg snow activities were thrilling - did gondola ride to Apharwat Peak, breathtaking views! Visited Mughal gardens - Shalimar Bagh was stunning with fountains and flowers. Tried Kashmiri wazwan - gustaba and rista were delicious! Every moment felt like a dream. Best romantic getaway! ❤️🏔️",
      verified: true,
      media: {
        url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
        type: "image"
      }
    },
    {
      id: "2",
      userName: "Rahul & Meera Kapoor",
      userInitials: "RM",
      rating: 5,
      date: "2 weeks ago",
      reviewText: "HEAVEN FOR COUPLES! ✨ Dal Lake houseboat experience was UNIQUE - woke up to mountains reflected in water! Shikara rides morning and evening were peaceful and romantic. Gulmarg was winter wonderland - snow everywhere, did skiing together! The snow-covered pine forests looked magical. Visited Nishat Bagh during golden hour - perfect for romantic photos! Tried kahwa and enjoyed Kashmiri hospitality. Small couples group made it intimate. Kashmir exceeded all expectations! 💑",
      verified: true,
      media: {
        url: "https://images.unsplash.com/photo-1542042161784-26ab9e041e89?w=600&q=80",
        type: "image"
      }
    },
    {
      id: "3",
      userName: "Vikram & Anjali Sharma",
      userInitials: "VS",
      rating: 5,
      date: "3 weeks ago",
      reviewText: "UNFORGETTABLE ROMANTIC ESCAPE! 🏔️ Kashmir's beauty is unreal - mountains, lakes, gardens, everything! The houseboat stay on Dal Lake was our dream come true. Evening shikara ride with candles and music was SO romantic! Gulmarg cable car to snowy peaks gave us couple photos for lifetime. Visited Pari Mahal and Shankaracharya Temple - spiritual and scenic. Tried local cuisine - rogan josh and modur pulao were amazing! Small couples-only group maintained romantic vibe. Worth every penny!",
      verified: true,
      media: {
        url: "https://images.unsplash.com/photo-1505672678657-cc7037095e60?w=600&q=80",
        type: "image"
      }
    },
    {
      id: "4",
      userName: "Siddharth & Kavya Reddy",
      userInitials: "SK",
      rating: 5,
      date: "1 month ago",
      reviewText: "MOST ROMANTIC TRIP EVER! 💕 Kashmir in February is magical - snow-capped peaks, frozen lakes, and cozy weather perfect for couples! Dal Lake houseboats are unique - traditional Kashmiri architecture with modern comfort. Shikara rides were peaceful and romantic. Gulmarg gondola ride was spectacular - views from top were breathtaking! Mughal gardens even in winter were beautiful. Kashmiri handicraft shopping was fun. Food was rich and delicious. Made memories we'll cherish forever! 🌟",
      verified: true,
      media: {
        url: "https://images.unsplash.com/photo-1571655792158-2cbb4c775068?w=600&q=80",
        type: "image"
      }
    },
    {
      id: "5",
      userName: "Nikhil & Riya Patel",
      userInitials: "NR",
      rating: 5,
      date: "1 month ago",
      reviewText: "DREAM DESTINATION! 🎊 Kashmir is THE place for romantic getaways! Houseboat stay was unique experience - traditional Kashmiri hospitality, beautiful interiors, and stunning lake views. Shikara rides at different times gave different experiences - sunrise was peaceful, sunset was romantic! Gulmarg snow activities were fun - skiing, snow biking, and snowman building! Visited apple orchards and saffron fields. Tried authentic Kashmiri food - every dish was flavorful! Small group, big memories!",
      verified: true,
      media: {
        url: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=600&q=80",
        type: "image"
      }
    },
    {
      id: "6",
      userName: "Karan & Pooja Desai",
      userInitials: "KP",
      rating: 5,
      date: "2 months ago",
      reviewText: "PARADISE FOUND! 🌺 Kashmir's natural beauty + romantic experiences = perfect couples trip! Dal Lake houseboats are must-experience - so unique and romantic! Shikara rides through floating gardens and markets were interesting. Gulmarg skiing was thrilling with professional instructors. Visited Mughal gardens - Nishat and Shalimar Bagh were stunning! Tried Kashmiri pulao, meat dishes, and kahwa - food was rich and delicious! This trip brought us even closer! Highly recommend for couples! ❤️🏔️",
      verified: true,
      media: {
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&q=80",
        type: "image"
      }
    },
  ],
};

// Default reviews fallback if trip ID not found
export const DEFAULT_REVIEWS: Review[] = [
  {
    id: "1",
    userName: "Priya Sharma",
    userInitials: "PS",
    rating: 5,
    date: "2 weeks ago",
    reviewText: "Amazing experience! Well-organized and fun.",
    verified: true,
    media: {
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
      type: "image"
    }
  },
  {
    id: "2",
    userName: "Rahul Mehta",
    userInitials: "RM",
    rating: 4,
    date: "3 weeks ago",
    reviewText: "Great trip! Worth every penny.",
    verified: true,
    media: {
      url: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=600&q=80",
      type: "image"
    }
  },
  {
    id: "3",
    userName: "Ananya Patel",
    userInitials: "AP",
    rating: 5,
    date: "1 month ago",
    reviewText: "Perfect weekend getaway! Highly recommend.",
    verified: true,
    media: {
      url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80",
      type: "image"
    }
  },
  {
    id: "4",
    userName: "Vikram Singh",
    userInitials: "VS",
    rating: 4,
    date: "1 month ago",
    reviewText: "Great value for money. Had a wonderful time!",
    verified: true,
    media: {
      url: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=600&q=80",
      type: "image"
    }
  },
  {
    id: "5",
    userName: "Sneha Reddy",
    userInitials: "SR",
    rating: 5,
    date: "2 months ago",
    reviewText: "Best trip ever! Made amazing memories.",
    verified: true,
    media: {
      url: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=600&q=80",
      type: "image"
    }
  },
  {
    id: "6",
    userName: "Arjun Kumar",
    userInitials: "AK",
    rating: 4,
    date: "2 months ago",
    reviewText: "Well-organized and fun. Great experience!",
    verified: true,
    media: {
      url: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=600&q=80",
      type: "image"
    }
  },
];
