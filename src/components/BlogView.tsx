/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { BookOpen, Star, HelpCircle, ArrowRight, User, Calendar, MessageSquare } from "lucide-react";
import { Page } from "../types";

export interface BlogPostData {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  author: string;
  imageBg: string;
}

export const MOCK_BLOG_POSTS: BlogPostData[] = [
  {
    id: "post-1",
    category: "ODOR SCIENCE",
    title: "Molecular Odor Science: Why Sweat-Soaked Formal Polyester Refuses to Wash Clean",
    excerpt: "You buy a premium corporate dress shirt, but after three humid commutes on the Ameerpet Metro line, it holds a cheesy smell even after laundry. We look into hydrophobic synthetic fiber physics and how to erase embedded volatile odor compounds from thread spaces.",
    readTime: "5 min read",
    date: "May 28, 2026",
    author: "Dr. Srikar Reddy, Lab Lead",
    imageBg: "bg-radial from-emerald-900 to-emerald-950"
  },
  {
    id: "post-2",
    category: "LAUNDRY PHYSICS",
    title: "Why Clean Laundry Smells Musty Right After Washing (The Mildew Trap)",
    excerpt: "Ever loaded a fresh batch of cotton shirts from the drying rack, only to detect a sour damp odor? Discover how slow-drying, residual humidity, and trapped organic bacterial slimes build the classic monsoon mildew trap—and how molecular caging breaks it instantly.",
    readTime: "4 min read",
    date: "Jun 02, 2026",
    author: "Dr. Srikar Reddy, Lab Lead",
    imageBg: "bg-radial from-slate-900 to-slate-950"
  },
  {
    id: "post-3",
    category: "GYM FRESHNESS",
    title: "Gym Bag Scent Anchors: Keeping Fitness Apparel Safe and Odor-Free in Transit",
    excerpt: "Riding through Hyderabad traffic soot means grease, grime, and high-volume metabolic gym sweat baking into heavy synthetic training fabrics. Here is how to keep damp gym apparel fresh inside your work backpack or commuter transit cabinet.",
    readTime: "6 min read",
    date: "May 15, 2026",
    author: "Vishal Nair, Style Lead",
    imageBg: "bg-radial from-neutral-800 to-neutral-950"
  },
  {
    id: "post-4",
    category: "CONFIDENCE",
    title: "The Psychological Cost of Underarm Stress: How Odor Erases Corporate Influence",
    excerpt: "Your brain is hardwired to fear colleagues noticing bad body odor. Understand how ambient scent triggers subconscious trust metrics in corporate client presentations and executive performance interviews.",
    readTime: "3 min read",
    date: "Apr 28, 2026",
    author: "Dr. Ananya Rao, Clinical Consultant",
    imageBg: "bg-radial from-zinc-800 to-zinc-950"
  }
];

interface BlogViewProps {
  onSelectPost: (post: BlogPostData) => void;
  currentPage: Page;
}

export default function BlogView({ onSelectPost }: BlogViewProps) {
  const [visibleCount, setVisibleCount] = useState<number>(3); // "Load More" pagination state
  
  const featuredPost = MOCK_BLOG_POSTS[0];
  const gridPosts = MOCK_BLOG_POSTS.slice(1);

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 2, MOCK_BLOG_POSTS.length));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 font-sans">
      
      {/* Blog Index Header */}
      <div className="text-left border-b border-border-custom pb-6 mb-10 sm:mb-14">
        <span className="font-mono text-xs uppercase font-extrabold text-brand-custom tracking-widest pl-1">
          Smelloff Commute Journal
        </span>
        <h1 className="text-4xl sm:text-7xl font-display font-black text-ink-custom tracking-tighter uppercase leading-[0.9] mt-3">
          MAN MAG: Grooming & Science
        </h1>
        <p className="mt-4 text-base sm:text-lg text-ink-2-custom max-w-xl">
          No-nonsense lifestyle tactics, commute hacks, and deep fabric science. Straightforward advice for the active Indian professional.
        </p>
      </div>

      {/* Featured Post (Hero layout) */}
      <div 
        onClick={() => onSelectPost(featuredPost)}
        className="bg-gray-950 text-white rounded-3xl overflow-hidden border border-gray-800 p-6 sm:p-10 flex flex-col md:flex-row justify-between items-stretch gap-8 mb-12 shadow-xl hover:border-brand-custom transition-all cursor-pointer group select-none text-left"
      >
        <div className="md:w-1/2 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="inline-block font-mono text-[10px] tracking-widest font-black text-brand-custom uppercase bg-zinc-900 px-3 py-1.5 rounded-md border border-gray-800">
              ⚡ FEATURING JOURNAL
            </span>
            <h2 className="font-display font-black text-2.5xl sm:text-4.5xl leading-none text-white group-hover:text-brand-custom transition-colors uppercase tracking-tight">
              {featuredPost.title}
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans font-medium">
              {featuredPost.excerpt}
            </p>
          </div>

          <div className="flex gap-4 items-center text-[11px] font-mono font-bold text-gray-500 uppercase tracking-widest border-t border-zinc-900 pt-4">
            <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-brand-custom" /> {featuredPost.author}</span>
            <span>•</span>
            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {featuredPost.date}</span>
          </div>
        </div>

        {/* Abstract design vector space */}
        <div className={`md:w-1/2 ${featuredPost.imageBg} rounded-2xl p-6 border border-gray-800 flex flex-col justify-between min-h-[220px]`}>
          <div className="flex justify-between items-start">
            <BookOpen className="w-8 h-8 text-lime-400" />
            <span className="bg-lime-500 text-slate-950 font-mono text-[9px] uppercase font-black px-2 py-0.5 rounded shadow">
              {featuredPost.readTime}
            </span>
          </div>
          
          <div className="text-left border-l-2 border-lime-500 pl-4 py-1.5 mt-8">
            <span className="block font-mono text-[8px] uppercase tracking-widest text-lime-400 font-bold">Category Field</span>
            <span className="block text-white font-sans font-extrabold text-sm uppercase mt-0.5">{featuredPost.category}</span>
          </div>
        </div>
      </div>

      {/* Grid List Articles */}
      <div className="space-y-6 text-left">
        <span className="block font-mono text-xs uppercase font-extrabold text-ink-3-custom tracking-widest pl-1 mb-6">
          More Commute & Grooming Manuals
        </span>

        {/* Dynamic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_BLOG_POSTS.slice(1, visibleCount).map((post) => (
            <div 
              key={post.id}
              onClick={() => onSelectPost(post)}
              className="bg-white p-5 rounded-2xl border border-border-custom hover:border-brand-custom transition-all shadow-sm cursor-pointer flex flex-col justify-between select-none"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-surface-custom p-2.5 rounded-lg border border-border-custom">
                  <span className="font-mono text-[9px] font-extrabold text-brand-custom uppercase tracking-wider">{post.category}</span>
                  <span className="font-mono text-[9px] font-semibold text-ink-3-custom uppercase">{post.readTime}</span>
                </div>

                <div className="space-y-1.5 text-left">
                  <h4 className="font-display font-black text-xl text-ink-custom uppercase tracking-tight group-hover:text-brand-custom transition-colors leading-tight">
                    {post.title}
                  </h4>
                  <p className="text-xs text-ink-2-custom leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="border-t border-border-custom pt-4 mt-6 flex justify-between items-center text-[10px] font-mono font-bold text-ink-3-custom uppercase tracking-wider">
                <span>By {post.author.split(",")[0]}</span>
                <span>{post.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination "Load More" */}
        {visibleCount < MOCK_BLOG_POSTS.length && (
          <div className="text-center pt-8">
            <button
              onClick={handleLoadMore}
              className="px-6 py-3.5 border border-border-custom bg-surface-custom hover:bg-white text-ink-custom font-sans font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer transition-all"
            >
              Load More Grooming Manuals
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
