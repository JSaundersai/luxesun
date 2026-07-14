export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  body: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "why-upf-50-matters",
    title: "Why UPF 50+ Actually Matters",
    category: "Health & Fitness",
    excerpt:
      "Sunscreen washes off. Your clothes don't. Here's why UPF 50+ fabric is the most reliable sun protection you can wear outdoors.",
    date: "March 12, 2026",
    readTime: "4 min read",
    image: "/placeholders/feature-lifestyle.jpg",
    body: [
      "Every summer we're told to reapply sunscreen every two hours. In reality, almost nobody does — and that's where sun-protective clothing earns its place in your kit.",
      "A UPF 50+ rating means the fabric blocks at least 98% of UV radiation. Unlike sunscreen, it doesn't sweat off, rub off, or need reapplying. It's protection you put on once and forget about.",
      "Our fabrics are independently tested to hold their UPF rating through repeated washing and stretching, so the piece you buy protects you the same on day one as it does a season later.",
    ],
  },
  {
    slug: "building-your-outdoor-rotation",
    title: "Building Your Outdoor Rotation",
    category: "The Lifestyle",
    excerpt:
      "From beach volleyball to sunset runs — how to build a versatile wardrobe that moves from studio to street.",
    date: "February 28, 2026",
    readTime: "5 min read",
    image: "/placeholders/cat-athletic.jpg",
    body: [
      "A great activewear rotation isn't about owning the most pieces — it's about owning the right ones that layer, breathe, and go anywhere.",
      "Start with two crops, a long-sleeve for cooler mornings, and a UV hoodie for the harshest sun. Everything else is styling.",
      "The goal is a uniform you don't have to think about: pull it on, step outside, and stay protected all day long.",
    ],
  },
  {
    slug: "meet-our-ambassadors",
    title: "Meet the Women Behind the Movement",
    category: "Community",
    excerpt:
      "Our ambassadors are athletes, coaches, and creators who live outdoors. Here's what drives them.",
    date: "February 10, 2026",
    readTime: "6 min read",
    image: "/placeholders/cat-studio.jpg",
    body: [
      "The Luxe Sun community is built by the people who wear it hardest — on the court, on the trail, and in the water.",
      "This month we sat down with three of our ambassadors to talk training, sun safety, and why protection should never mean compromise.",
      "Want to join them? Applications for our Ambassador Program are open year-round.",
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
