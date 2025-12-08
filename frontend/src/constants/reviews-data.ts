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
      userName: "Priya & Raj",
      userInitials: "PR",
      rating: 5,
      date: "2 weeks ago",
      reviewText:
        "Perfect romantic getaway! The candlelight dinner was magical.",
      verified: true,
      media: {
        url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80",
        type: "image"
      }
    },
    {
      id: "2",
      userName: "Ananya Sharma",
      userInitials: "AS",
      rating: 5,
      date: "3 weeks ago",
      reviewText:
        "Amazing experience! Great for couples looking for quality time.",
      verified: true,
      media: {
        url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
        type: "image"
      }
    },
    {
      id: "3",
      userName: "Vikram Mehta",
      userInitials: "VM",
      rating: 4,
      date: "1 month ago",
      reviewText: "Beautiful location and well-organized. Highly recommend!",
      verified: true,
      media: {
        url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&q=80",
        type: "image"
      }
    },
    {
      id: "4",
      userName: "Sneha Reddy",
      userInitials: "SR",
      rating: 5,
      date: "1 month ago",
      reviewText: "Best weekend trip! The private bonfire was the highlight.",
      verified: true,
      media: {
        url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&q=80",
        type: "image"
      }
    },
    {
      id: "5",
      userName: "Arjun Kumar",
      userInitials: "AK",
      rating: 5,
      date: "2 months ago",
      reviewText: "Romantic and peaceful. Everything was perfect!",
      verified: true,
      media: {
        url: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=600&q=80",
        type: "image"
      }
    },
    {
      id: "6",
      userName: "Kavya Nair",
      userInitials: "KN",
      rating: 4,
      date: "2 months ago",
      reviewText: "Great value for money. The accommodation was cozy.",
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
      reviewText: "Safe and fun! Perfect girls trip for Christmas celebration.",
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
      reviewText: "Amazing group! Made so many new friends. Highly recommend!",
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
      rating: 4,
      date: "3 weeks ago",
      reviewText: "Great organization and safe environment. Had a blast!",
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
      reviewText: "Best Christmas trip ever! The team was super supportive.",
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
      rating: 4,
      date: "1 month ago",
      reviewText: "Fun and empowering experience. Worth every penny!",
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
      reviewText: "Perfect girls gang trip! Already planning the next one.",
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
      reviewText: "Epic NYE celebration! Ringing in the new year was magical.",
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
      reviewText: "Best way to start 2025! The Kasol vibes were amazing.",
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
      rating: 4,
      date: "3 weeks ago",
      reviewText: "Great itinerary and beautiful locations. Loved it!",
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
      reviewText: "Unforgettable experience! The group was fantastic.",
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
      rating: 4,
      date: "1 month ago",
      reviewText: "Well-organized trip. Made amazing memories with friends.",
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
      reviewText: "Perfect NYE getaway! The celebrations were top-notch.",
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
      rating: 4,
      date: "1 week ago",
      reviewText: "Great way to meet new people! Fun and budget-friendly.",
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
      reviewText: "Amazing group dynamics! Made friends for life.",
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
      rating: 4,
      date: "3 weeks ago",
      reviewText: "Good value for money. The activities were well-planned.",
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
      reviewText: "Perfect post-Christmas trip! Great vibes throughout.",
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
      rating: 4,
      date: "1 month ago",
      reviewText: "Enjoyed the mixed group experience. Highly recommend!",
      verified: true,
    },
    {
      id: "6",
      userName: "Preeti Chawla",
      userInitials: "PC",
      rating: 5,
      date: "2 months ago",
      reviewText: "Best budget trip! Met amazing people and had great fun.",
      verified: true,
    },
  ],
  "4d3n-dec26-couples": [
    {
      id: "1",
      userName: "Rahul & Shruti",
      userInitials: "RS",
      rating: 5,
      date: "1 week ago",
      reviewText: "Perfect romantic NYE! The Kasol experience was magical.",
      verified: true,
      media: {
        url: "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=600&q=80",
        type: "image"
      }
    },
    {
      id: "2",
      userName: "Aditya & Meera",
      userInitials: "AM",
      rating: 5,
      date: "2 weeks ago",
      reviewText: "Best way to start the new year together. Highly romantic!",
      verified: true,
      media: {
        url: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=600&q=80",
        type: "image"
      }
    },
    {
      id: "3",
      userName: "Varun & Anjali",
      userInitials: "VA",
      rating: 5,
      date: "3 weeks ago",
      reviewText:
        "Unforgettable experience! Everything was perfectly arranged.",
      verified: true,
      media: {
        url: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=600&q=80",
        type: "image"
      }
    },
    {
      id: "4",
      userName: "Siddharth & Kavya",
      userInitials: "SK",
      rating: 4,
      date: "1 month ago",
      reviewText: "Great romantic getaway. The locations were beautiful.",
      verified: true,
      media: {
        url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
        type: "image"
      }
    },
    {
      id: "5",
      userName: "Nikhil & Riya",
      userInitials: "NR",
      rating: 5,
      date: "1 month ago",
      reviewText: "Perfect couples trip! Made amazing memories together.",
      verified: true,
      media: {
        url: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=600&q=80",
        type: "image"
      }
    },
    {
      id: "6",
      userName: "Karan & Pooja",
      userInitials: "KP",
      rating: 5,
      date: "2 months ago",
      reviewText: "Romantic and adventurous. Best NYE celebration ever!",
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
      reviewText: "Epic party vibes! Great energy and amazing group.",
      verified: true,
    },
    {
      id: "2",
      userName: "Anjali Desai",
      userInitials: "AD",
      rating: 4,
      date: "2 weeks ago",
      reviewText: "High-energy trip! Perfect for party lovers.",
      verified: true,
    },
    {
      id: "3",
      userName: "Rohan Kapoor",
      userInitials: "RK",
      rating: 5,
      date: "3 weeks ago",
      reviewText: "Best pre-NYE party! The vibes were incredible.",
      verified: true,
    },
    {
      id: "4",
      userName: "Shreya Iyer",
      userInitials: "SI",
      rating: 4,
      date: "1 month ago",
      reviewText: "Fun and energetic group. Great way to celebrate!",
      verified: true,
    },
    {
      id: "5",
      userName: "Aryan Singh",
      userInitials: "AS",
      rating: 5,
      date: "1 month ago",
      reviewText: "Amazing party atmosphere! Made lifelong friends.",
      verified: true,
    },
    {
      id: "6",
      userName: "Isha Malhotra",
      userInitials: "IM",
      rating: 4,
      date: "2 months ago",
      reviewText: "Great organization and fantastic group dynamics.",
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
      reviewText: "Perfect boys trip! Adventure and brotherhood vibes.",
      verified: true,
    },
    {
      id: "2",
      userName: "Rohit Sharma",
      userInitials: "RS",
      rating: 4,
      date: "2 weeks ago",
      reviewText: "Great Christmas adventure! The activities were thrilling.",
      verified: true,
    },
    {
      id: "3",
      userName: "Karan Patel",
      userInitials: "KP",
      rating: 5,
      date: "3 weeks ago",
      reviewText: "Best boys gang trip! Made amazing memories.",
      verified: true,
    },
    {
      id: "4",
      userName: "Vikram Reddy",
      userInitials: "VR",
      rating: 4,
      date: "1 month ago",
      reviewText: "Adventure-packed weekend! Great value for money.",
      verified: true,
    },
    {
      id: "5",
      userName: "Arjun Nair",
      userInitials: "AN",
      rating: 5,
      date: "1 month ago",
      reviewText: "Epic Christmas celebration! The brotherhood was strong.",
      verified: true,
    },
    {
      id: "6",
      userName: "Siddharth Iyer",
      userInitials: "SI",
      rating: 4,
      date: "2 months ago",
      reviewText: "Perfect adventure trip! Highly recommend for boys.",
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
      reviewText: "Epic NYE adventure! Best way to start 2025 with the boys.",
      verified: true,
    },
    {
      id: "2",
      userName: "Aditya Khanna",
      userInitials: "AK",
      rating: 4,
      date: "2 weeks ago",
      reviewText:
        "Great brotherhood vibes! Adventure and celebration combined.",
      verified: true,
    },
    {
      id: "3",
      userName: "Varun Agarwal",
      userInitials: "VA",
      rating: 5,
      date: "3 weeks ago",
      reviewText: "Unforgettable experience! The Kasol adventure was amazing.",
      verified: true,
    },
    {
      id: "4",
      userName: "Karan Thakur",
      userInitials: "KT",
      rating: 4,
      date: "1 month ago",
      reviewText: "Perfect boys trip! Made memories for a lifetime.",
      verified: true,
    },
    {
      id: "5",
      userName: "Nikhil Joshi",
      userInitials: "NJ",
      rating: 5,
      date: "1 month ago",
      reviewText: "Best NYE adventure! The group was fantastic.",
      verified: true,
    },
    {
      id: "6",
      userName: "Siddharth Rao",
      userInitials: "SR",
      rating: 4,
      date: "2 months ago",
      reviewText: "Epic start to the year! Adventure and fun combined.",
      verified: true,
    },
  ],
  "4d3n-dec30-mixed": [
    {
      id: "1",
      userName: "Priya Menon",
      userInitials: "PM",
      rating: 4,
      date: "1 week ago",
      reviewText: "Last minute booking but totally worth it! Great NYE trip.",
      verified: true,
    },
    {
      id: "2",
      userName: "Rohan Chawla",
      userInitials: "RC",
      rating: 5,
      date: "2 weeks ago",
      reviewText:
        "Amazing last-minute adventure! Perfect way to celebrate NYE.",
      verified: true,
    },
    {
      id: "3",
      userName: "Ananya Verma",
      userInitials: "AV",
      rating: 4,
      date: "3 weeks ago",
      reviewText: "Great value for money! The group was friendly and fun.",
      verified: true,
    },
    {
      id: "4",
      userName: "Vishal Nair",
      userInitials: "VN",
      rating: 5,
      date: "1 month ago",
      reviewText: "Perfect NYE celebration! Made amazing memories.",
      verified: true,
    },
    {
      id: "5",
      userName: "Isha Kapoor",
      userInitials: "IK",
      rating: 4,
      date: "1 month ago",
      reviewText: "Great last-minute option! Well-organized and fun.",
      verified: true,
    },
    {
      id: "6",
      userName: "Aryan Desai",
      userInitials: "AD",
      rating: 5,
      date: "2 months ago",
      reviewText: "Best way to ring in the new year! Highly recommend.",
      verified: true,
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
