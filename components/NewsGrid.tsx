"use client";

import React from "react";
import ArticleCard, { Article } from "./ArticleCard";

const sampleArticles: Article[] = [
  {
    id: "1",
    title: "Kohima Smart City Grid Deploys Solar-Powered IoT Sensors for Traffic & Air Quality",
    excerpt: "The Kohima Smart City Development Ltd has completed installing 120 IoT nodes across key junctions to optimize urban transit and lower emissions.",
    aiSummary: "Kohima city launches solar IoT sensor network to manage urban traffic and track air metrics in real time with AI analytics.",
    category: "NORTHEAST",
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
    readTime: "3 min read",
    timeAgo: "1h ago",
    source: "Nagaland Express Bureau",
    verified: true,
  },
  {
    id: "2",
    title: "Guwahati Startup Incubator Unveils AI Voice Assistant for Rural Farmers in Assamese",
    excerpt: "A local agri-tech startup has created an offline-capable voice AI tool that advises tea and paddy farmers on weather shifts and pest control.",
    aiSummary: "Assam startup releases offline Assamese voice AI assistant providing crop advice and real-time market prices to local farmers.",
    category: "AI & INNOVATION",
    imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    readTime: "4 min read",
    timeAgo: "2h ago",
    source: "Tech Northeast Dispatch",
    verified: true,
  },
  {
    id: "3",
    title: "Brahmaputra Organic Tea Export Reaches Record High \$32M in H1 2026",
    excerpt: "Direct trade corridors to Japan and Western Europe have boosted small tea growers across Dibrugarh and Tinsukia districts.",
    aiSummary: "Organic tea exports from Assam surge to \$32 million driven by direct international trade links and premium quality certification.",
    category: "BUSINESS",
    imageUrl: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
    readTime: "3 min read",
    timeAgo: "3h ago",
    source: "Commerce & Trade Watch",
    verified: true,
  },
  {
    id: "4",
    title: "Fact Check: Viral Video Claiming Bridge Collapse in Dimapur is From 2019 Typhoon Overseas",
    excerpt: "Our AI FactGuard system matched video keyframes to a 2019 incident in Taiwan. Local PWD authorities confirm Dimapur bridges remain structurally sound.",
    aiSummary: "Viral social media clip of a bridge collapse was misattributed to Dimapur; verified as 7-year-old overseas video archive.",
    category: "FACT CHECKS",
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80",
    readTime: "2 min read",
    timeAgo: "4h ago",
    source: "Ki-Khobor FactGuard Engine",
    verified: true,
  },
  {
    id: "5",
    title: "Shillong Hydroelectric Dam Modernization Adds 120MW Clean Energy Capacity",
    excerpt: "Upgraded turbine technology and smart water release monitoring will provide uninterrupted electricity to over 450,000 households.",
    aiSummary: "Meghalaya modernizes hydroelectric dam facilities, boosting regional grid output by 120MW with zero extra emissions.",
    category: "CLIMATE & ENERGY",
    imageUrl: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80",
    readTime: "4 min read",
    timeAgo: "5h ago",
    source: "Green Energy Review",
    verified: true,
  },
  {
    id: "6",
    title: "Imphal Entrepreneur Hub Wins National Youth Innovation Excellence Award",
    excerpt: "Three Manipur tech founders were recognized for their bamboo-fiber battery casing technology currently being trialed by EV manufacturers.",
    aiSummary: "Manipur innovators win national award for sustainable bamboo-composite battery enclosures for electric vehicles.",
    category: "STARTUPS",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    readTime: "3 min read",
    timeAgo: "6h ago",
    source: "Northeast Startup Herald",
    verified: true,
  },
];

interface NewsGridProps {
  activeCategory: string;
}

export default function NewsGrid({ activeCategory }: NewsGridProps) {
  const filteredArticles = sampleArticles.filter((article) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "northeast" && article.category === "NORTHEAST") return true;
    if (activeCategory === "tech" && article.category === "AI & INNOVATION") return true;
    if (activeCategory === "business" && article.category === "BUSINESS") return true;
    if (activeCategory === "factcheck" && article.category === "FACT CHECKS") return true;
    if (activeCategory === "environment" && article.category === "CLIMATE & ENERGY") return true;
    if (activeCategory === "startups" && article.category === "STARTUPS") return true;
    return true;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {filteredArticles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}
