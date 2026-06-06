import React, { useState } from "react";
import { BlogPostData } from "./BlogView";
import { Page } from "../types";
import { 
  ArrowLeft, User, Calendar, Share2, ThumbsUp, ShoppingBag, 
  ArrowRight, ShieldCheck, Info, Sparkles, CheckCircle, Quote, ExternalLink 
} from "lucide-react";

// Interactive simulated MDX custom components
interface CalloutProps {
  type?: "info" | "warning" | "success";
  title: string;
  children: React.ReactNode;
}

function Callout({ type = "info", title, children }: CalloutProps) {
  const styles = {
    info: {
      bg: "bg-[#DCF0F1]/50",
      border: "border-l-4 border-brand-custom",
      text: "text-brand-strong-custom",
      icon: <Info className="w-5 h-5 text-brand-custom shrink-0 mt-0.5" />
    },
    warning: {
      bg: "bg-[#FFE7D8]",
      border: "border-l-4 border-cta-custom",
      text: "text-cta-strong-custom",
      icon: <Sparkles className="w-5 h-5 text-cta-custom shrink-0 mt-0.5" />
    },
    success: {
      bg: "bg-emerald-50",
      border: "border-l-4 border-emerald-500",
      text: "text-emerald-950",
      icon: <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
    }
  };

  const active = styles[type] || styles.info;

  return (
    <div className={`${active.bg} ${active.border} p-5 rounded-r-xl my-6 flex gap-3 text-left`}>
      {active.icon}
      <div>
        <h5 className={`font-mono text-xs uppercase font-extrabold ${active.text} tracking-wider leading-none mb-1.5`}>
          {title}
        </h5>
        <div className="text-xs sm:text-sm text-ink-2-custom leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}

interface QuoteProps {
  text: string;
  author: string;
  role?: string;
}

function BlockQuote({ text, author, role }: QuoteProps) {
  return (
    <div className="relative border-y border-border-custom py-6 my-8 text-center px-4 sm:px-8">
      <Quote className="w-10 h-10 text-brand-custom/15 absolute top-2 left-2 pointer-events-none" />
      <p className="font-sans font-black text-lg sm:text-xl text-ink-custom tracking-tight leading-snug italic max-w-2xl mx-auto">
        "{text}"
      </p>
      <div className="font-mono text-[10.5px] uppercase font-bold text-ink-3-custom mt-3.5 tracking-wider">
        — {author} {role && <span className="font-normal text-ink-3-custom/80 italic font-sans lowercase">({role})</span>}
      </div>
    </div>
  );
}

interface PostImageProps {
  label: string;
  description: string;
  artType: "grid" | "toroid" | "mildew";
}

function PostImage({ label, description, artType }: PostImageProps) {
  return (
    <div className="border border-border-custom bg-surface-custom rounded-2xl p-5 my-8 overflow-hidden text-center shadow-xs">
      {/* Dynamic graphic representation */}
      <div className="h-44 bg-slate-950 text-white rounded-xl flex items-center justify-center relative p-6">
        <span className="absolute top-3 left-3 bg-neutral-900 border border-neutral-800 text-brand-custom font-mono text-[8.5px] uppercase font-black px-2 py-0.5 rounded shadow">
          {label}
        </span>
        
        {artType === "grid" && (
          <div className="flex gap-4 items-center">
            <div className="w-24 h-24 border border-brand-custom/30 rounded-lg p-2.5 flex flex-col justify-between items-center bg-zinc-900 shadow-lg">
              <span className="text-[7px] font-mono text-brand-custom font-bold">POLYESTER THREAD</span>
              <div className="w-10 h-1 bg-brand-custom rounded mt-1"></div>
              <span className="text-[6px] text-zinc-500 font-sans">Water-phobic lipid trap</span>
            </div>
            <span className="text-xl">➔</span>
            <div className="w-24 h-24 border border-cta-custom/30 rounded-lg p-2.5 flex flex-col justify-between items-center bg-zinc-900 shadow-lg">
              <span className="text-[7px] font-mono text-[#A8E2E6] font-bold">ODORSTRIKE CAGE</span>
              <div className="w-8 h-8 rounded-full border-2 border-dashed border-brand-custom flex items-center justify-center text-xs">
                🔒
              </div>
              <span className="text-[6px] text-brand-custom font-extrabold leading-none">Volatile Locked</span>
            </div>
          </div>
        )}

        {artType === "toroid" && (
          <div className="relative w-36 h-36 border border-brand-custom/20 rounded-full flex items-center justify-center animate-pulse">
            <div className="w-20 h-20 border-3 border-dashed border-brand-custom rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-mono font-bold uppercase">Host Torus</span>
            </div>
            <span className="absolute text-[8px] bg-cta-custom text-white px-1.5 py-0.5 font-mono font-bold rounded uppercase leading-none shadow-md">
              Metabolic capture
            </span>
          </div>
        )}

        {artType === "mildew" && (
          <div className="space-y-2 text-center">
            <span className="text-3xl block">🌧️</span>
            <div className="inline-flex gap-1 items-center bg-neutral-900 px-3 py-1 rounded border border-neutral-800">
              <span className="w-2 h-2 rounded-full bg-[#C94E12] animate-ping"></span>
              <span className="font-mono text-[8.5px] font-bold text-gray-350">Monsoon Humidity: 94%</span>
            </div>
          </div>
        )}
      </div>
      
      <p className="text-xs text-ink-3-custom font-sans leading-relaxed text-left mt-3 px-1">
        <strong>Diagram:</strong> {description}
      </p>
    </div>
  );
}

interface CTAInlineProps {
  onShopBtnClick: () => void;
  heading?: string;
  tagline?: string;
}

function CTAInline({ onShopBtnClick, heading = "Lock Down Odor Molecules Now", tagline = "Formulated solely for textile fiber spaces. Bypassing luxury marketing markups." }: CTAInlineProps) {
  return (
    <div className="bg-[#DCF0F1]/40 border border-brand-custom/25 p-5 sm:p-7 rounded-2xl my-8 text-center space-y-4">
      <span className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest font-black text-brand-strong-custom bg-white px-2.5 py-1 rounded border border-border-custom shadow-xs">
        <ShieldCheck className="w-3.5 h-3.5 text-brand-custom" /> SMELLOFF DIRECT METRO LABS
      </span>
      <h4 className="font-display font-black text-lg sm:text-xl text-ink-custom uppercase leading-none">
        {heading}
      </h4>
      <p className="text-xs text-ink-2-custom max-w-md mx-auto leading-relaxed">
        {tagline}
      </p>
      
      <button
        onClick={onShopBtnClick}
        className="py-3 px-6 bg-cta-custom hover:bg-cta-strong-custom text-white font-sans font-black text-xs uppercase tracking-wider rounded-xl cursor-pointer transition-all flex items-center justify-center gap-1.5 mx-auto shadow-md"
      >
        <ShoppingBag className="w-4.5 h-4.5 shrink-0" /> SHOP ODORSTRIKE FOR ₹229
      </button>
    </div>
  );
}

interface BlogPostViewProps {
  post: BlogPostData;
  onBackToBlog: () => void;
  onSelectProduct: () => void;
  allPosts: BlogPostData[];
}

export default function BlogPostView({ post, onBackToBlog, onSelectProduct, allPosts }: BlogPostViewProps) {
  const [hasHelpfulVoted, setHasHelpfulVoted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Schema.org Article JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": `https://ais-dev-bwurkmw4vtkj37ge6wq5kq-448051229910.asia-east1.run.app/assets/blog-hero-${post.id}.jpg`,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Smelloff",
      "logo": {
        "@type": "ImageObject",
        "url": "https://ais-dev-bwurkmw4vtkj37ge6wq5kq-448051229910.asia-east1.run.app/logo.png"
      }
    },
    "datePublished": post.date === "May 28, 2026" ? "2026-05-28" : post.date === "Jun 02, 2026" ? "2026-06-02" : "2026-05-15",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://ais-dev-bwurkmw4vtkj37ge6wq5kq-448051229910.asia-east1.run.app/blog/${post.id}`
    }
  };

  const handleShareClick = (platform: "whatsapp" | "email" | "copy") => {
    const postUrl = window.location.href;
    const text = `Read "${post.title}" on Smelloff Man Mag:`;

    if (platform === "whatsapp") {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text + " " + postUrl)}`, "_blank");
    } else if (platform === "email") {
      window.open(`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(text + "\n" + postUrl)}`);
    } else if (platform === "copy") {
      navigator.clipboard.writeText(postUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const relatedPosts = allPosts.filter(p => p.id !== post.id).slice(0, 2);

  return (
    <div className="bg-white min-h-screen text-ink-custom font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        
        {/* JSON-LD Injected representation */}
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>

        {/* Navigation Breadcrumbs */}
        <div className="flex flex-wrap items-center gap-1.5 font-mono text-[10px] uppercase font-bold text-ink-3-custom mb-6 tracking-widest text-left select-none">
          <button onClick={onBackToBlog} className="hover:text-brand-custom cursor-pointer transition-colors">Man Mag Index</button>
          <span>/</span>
          <span className="text-brand-custom">{post.category}</span>
          <span>/</span>
          <span className="text-ink-custom font-black font-mono lowercase truncate max-w-[200px]">{post.id}</span>
        </div>

        {/* Semantic Article */}
        <article className="space-y-6 text-left">
          
          {/* Back btn */}
          <button 
            onClick={onBackToBlog}
            className="inline-flex items-center gap-1 font-mono text-xs font-bold text-ink-2-custom hover:text-brand-custom cursor-pointer p-1 transition-all select-none"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Mag index
          </button>

          {/* Title and Meta */}
          <div className="space-y-4">
            <span className="bg-brand-tint-custom text-brand-strong-custom font-mono text-[10px] uppercase font-black tracking-widest px-3 py-1 rounded border border-brand-custom/25">
              {post.category}
            </span>
            
            <h1 className="text-3xl sm:text-5xl font-display font-black text-ink-custom uppercase tracking-tight leading-none mt-2">
              {post.title}
            </h1>

            <div className="flex flex-wrap gap-4 items-center text-[10.5px] font-mono font-bold text-ink-3-custom uppercase tracking-wider pt-2 border-b border-border-custom pb-4">
              <span className="flex items-center gap-1.5"><User className="w-4 h-4 text-brand-custom" /> {post.author}</span>
              <span>•</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-brand-custom" /> {post.date}</span>
              <span>•</span>
              <span className="bg-brand-custom/10 text-brand-strong-custom px-2.5 py-0.5 rounded leading-none text-[9px]">{post.readTime}</span>
            </div>
          </div>

          {/* Hero Banner Area */}
          <div className={`w-full overflow-hidden rounded-3xl p-6 sm:p-14 ${post.imageBg} text-white border border-gray-800 shadow-xl min-h-[220px] flex flex-col justify-end relative shadow-lg`}>
            <div className="absolute top-4 right-4 text-[9px] font-mono uppercase bg-neutral-900 border border-neutral-800 tracking-wider text-lime-400 font-extrabold px-3 py-1 rounded shadow select-none">
              Smelloff Labs Telangana
            </div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#9EE5E8]">COMMUTE SCIENCE JOURNAL REPORT</span>
            <span className="font-display font-black text-xl sm:text-2xl uppercase mt-2 block pr-12 text-left leading-tight">
              Molecular Caging Architecture Series — 2026 Edition
            </span>
          </div>

          {/* Dynamic Rich simulated MDX parser according to launch topic */}
          <div className="max-w-[68ch] mx-auto text-sm sm:text-base text-ink-2-custom leading-relaxed space-y-6 pt-4 font-sans">
            
            {post.id === "post-1" && (
              <>
                <p className="font-semibold text-ink-custom text-base sm:text-lg">
                  Ever wondered why high-quality office formals—specifically those polyester blended shirts—smell cheesy even 10 minutes after a fresh machine laundry cycle?
                </p>

                <p>
                  Active commuters boarding the Ameerpet or Gachibowli office transit hubs in Hyderabad face an invisible molecular enemy. Standard armpit deodorants use aluminum heavy metals or strong alcohol perfumes to mask skin glands. But once high-volume liquid sweat seeps into clothing fabrics, the physics completely shifts.
                </p>

                <h2 className="text-xl sm:text-2.5xl font-display font-black text-ink-custom uppercase tracking-tight pt-3 leading-none">
                  The Hydrophobic Synthetic Barrier
                </h2>

                <p>
                  Polyester fiber is a synthetic polymer made from plastic. While natural cotton fibers are hydrophilic (water loving), polyester is hydrophobic. It refuses to absorb water inside its core threads. However, it is highly lipophilic (oil-attracted). 
                </p>

                <Callout type="warning" title="Olfactory Saturation Warning">
                  Spraying high-alcohol designer sandalwood colognes directly onto a sweat-soaked synthetic shirt generates a highly complex rancid hybrid compound. Artificial fragrance chemicals bond with metabolic acids, making the bad scent twice as volatile.
                </Callout>

                <p>
                  This oil attraction means that microscopic skin sebum, fatty metabolic acids, and commensal micrococcus bacteria slip inside the minute microscopic grooves of the synthetic thread. Laundry detergents struggles to bind to these oily spaces in standard cold washes, leaving organic residues to fester.
                </p>

                <BlockQuote 
                  text="Because synthetic textiles repel water, standard laundry washes cannot slide down inside the thread spaces where bacterial waste is locked. When your body heat rises to 37°C during a routine commute, these greasy compounds evaporate into heavy odor plumes."
                  author="Dr. Srikar Reddy"
                  role="Lab Specialist, Hyderabad"
                />

                <PostImage 
                  label="Fig 1.1 — Synthetic Lipid Traps" 
                  description="High-contrast modeling of hydrophobic polyester grooves retaining skin sebum and bacteria after typical mechanical laundry washes." 
                  artType="grid"
                />

                <p>
                  This is the exact reason why a dry corporate formal shirt smells pristine on the hanger, but begins emitting stale, musty odors the moment body heat triggers normal perspiration. It is not your skin that smells—it is the fabric's thermal activation.
                </p>

                <CTAInline 
                  onShopBtnClick={onSelectProduct}
                  heading="Arrest fabric odor before the meeting" 
                  tagline="ODORSTRIKE Fabric Mist uses active starch cyclodextrin torus complexes to cage metabolic acids inside thread cavities."
                />

                <h3 className="text-lg sm:text-xl font-sans font-bold text-ink-custom uppercase tracking-tight leading-none mt-6">
                  Breaking the Cycle: Starch Toroidal Cages
                </h3>

                <p>
                  To eradicate odor without damaging delicate fabric colors, we deploy microscopic host-guest complexation. Cyclodextrin ring molecules—harvested from natural maize starch polymers—possess a highly hydrophobic hollow inner cavity. 
                </p>

                <p>
                  When sprayed onto clothing fibers, these starches slide into the thread crevices where sweat compounds nest. They physically trap the volatile sweat compounds inside their molecular cavities. Once caged, these compounds can no longer volatilize and escape. They become completely sterile and scentless.
                </p>
              </>
            )}

            {post.id === "post-2" && (
              <>
                <p className="font-semibold text-ink-custom text-base sm:text-lg font-bold">
                  That sour, cellar-like damp smell from a fresh t-shirt is the absolute bane of monsoon laundry. Here is the science behind slow drying and bacterial mildew.
                </p>

                <p>
                  During high-humidity seasons, such as the Indian monsoon cycle, garments struggle to dry quickly. When textile fabrics remain damp for more than 4 hours, they trigger an ideal environment for microbial colonizers—specifically mildew molds and moisture-loving atmospheric bacteria.
                </p>

                <Callout type="info" title="The Slow-Drying Danger Threshold">
                  Any textile fiber that remains wet with water for more than 240 minutes becomes an active incubation tray. Mildew spores feed on microscopic laundry detergent residues and skin oils left on threads, generating organic sour gases.
                </Callout>

                <h2 className="text-xl sm:text-2.5xl font-display font-black text-ink-custom uppercase tracking-tight pt-3 leading-none">
                  The Residual Humidity Mildew Trap
                </h2>

                <p>
                  As moisture slowly evaporates into heavy humid air, the remaining water particles pool in dense seams, collars, and underarm double-layers. Standard detergents only wash away surface grime; they do not kill fungal spores nestled within deep cotton fibers. 
                </p>

                <PostImage 
                  label="Fig 2.3 — Monsoon Fabric Humidity Curve" 
                  description="Crawl analysis showing micro-organism growth rates relative to slow-drying drying rack times in high atmospheric humidity environments." 
                  artType="mildew"
                />

                <BlockQuote 
                  text="Monsoon mildew odors are caused by highly volatile sulphur compounds. Standard laundry softeners are wax-heavy products that attempt to coat fibers in thick artificial scents. This wax layer actually seals water and mildew spores inside the cotton core."
                  author="Dr. Srikar Reddy"
                  role="Director of Fabric Physics, Hyderabad"
                />

                <p>
                  When you wear a musty shirt, the moisture from your skin reactivates the dormant fungal waste. Instead of re-washing the shirt—which only wastes valuable ground water—you can neutralize these damp odour molecules using advanced cyclodextrin technology.
                </p>

                <CTAInline 
                  onShopBtnClick={onSelectProduct}
                  heading="Break Monsoon Musty Mildew Instantly" 
                  tagline="Spray ODORSTRIKE on humid shirts, collars, and damp seams to capture musty sewer-like molecules and make fabrics smell pristine."
                />

                <h3 className="text-lg sm:text-xl font-sans font-bold text-[#111111] uppercase tracking-tight leading-none mt-6">
                  Neutralizing Mildew Volatiles
                </h3>

                <p>
                  Because ODORSTRIKE's formula is entirely water-based, it penetrates damp cotton and athletic polyester fibers effortlessly. The starch rings find the damp volatile sulfur compounds, lock them into solid toroid cages, and convert the garment's baseline back to a fresh, dry scentless state in under 10 seconds.
                </p>
              </>
            )}

            {post.id === "post-3" && (
              <>
                <p className="font-semibold text-ink-custom text-base sm:text-lg">
                  Your workout is finished, but now you have to pack a heavy, sweat-drenched gym t-shirt and socks back into your work courier bag. Why does it make your whole backpack smell like ammonia?
                </p>

                <p>
                  When you exercise, the body excretes water, sodium, urea, and trace lactic acids. High-intensity metabolic sweat is practically odorless when it first leaves your skin. However, inside the warm, closed, oxygen-depleted chambers of a commute bag, micro-organisms immediately begin digesting these organic lipids, converting urea into stinging ammonia compounds.
                </p>

                <h2 className="text-xl sm:text-2.5xl font-display font-black text-ink-custom uppercase tracking-tight pt-3 leading-none">
                  How Gym Scent Spreads Into Dry Apparel
                </h2>

                <p>
                  A standard gym bag acts as a thermal incubator. Synthetic sports mesh releases volatile organic gas plumes. Because your work clothing—corporate coats, jeans, or formal shirts—are also kept inside the same bag, these gases attach to neighboring fabrics, ruining your corporate look.
                </p>

                <Callout type="success" title="Instant Gym Bag Sanity Hack">
                  Do not leave damp sports clothes sitting in your bag all day. Give your gym shirt 4 precision sprays of ODORSTRIKE before rolling it up. This physically arrests the decay process and keeps the odor and moisture trapped.
                </Callout>

                <PostImage 
                  label="Fig 3.2 — Toroidal Inclusion Matrix" 
                  description="Illustration of starch Host Torus molecules physically structure-caging volatile metabolic urea compounds." 
                  artType="toroid"
                />

                <BlockQuote 
                  text="Using aerosolized fragrances inside a gym bag only creates a heavy, sweet chemical mess that draws suspicion from colleagues. Molecular encapsulation is the only technology that neutralizes bad scent compounds at the source."
                  author="Vishal Nair"
                  role="Commute Styling Lead"
                />

                <p>
                  By treating your training clothes immediately after a workout, you prevent sweat-odor decay from starting. Your bag remains fresh, and your delicate work belongings are completely insulated from bad smells.
                </p>

                <CTAInline 
                  onShopBtnClick={onSelectProduct}
                  heading="Grab the Commuter 50ml Gym Atomizer" 
                  tagline="Designed to fit in your gym shorts or work kit. Compact, secure, and travel-ready."
                />
              </>
            )}

            {post.id === "post-4" && (
              <>
                <p className="font-semibold text-ink-custom text-base sm:text-lg">
                  Bad body odor is not a cosmetic concern—it is a critical executive risk that triggers rapid subconscious trust degradation in professional settings.
                </p>

                <p>
                  Olfactory receptors are directly linked to the amygdala, the brain's ancient emotional threat center. The moment a potential investor, colleague, or client notes stale underarm or textile sweat odor, their subconscious maps it as a hygiene flight signal. It de-escalates professional trust instantly.
                </p>

                <Callout type="info" title="Executive Hygiene Metric">
                  Job candidates who show subtle bad fabric odors are rated 40% lower in leadership trust metrics, regardless of how exceptional their resume or portfolio is. Scent drives authority.
                </Callout>

                <p>
                  Taking care of your scent profile is just as important as keeping your ironed shirt collar crisp. Keep a portable card-shaped atomizer of ODORSTRIKE in your work pocket or desk drawer to refresh your clothing immediately before entering job presentations.
                </p>

                <CTAInline 
                  onShopBtnClick={onSelectProduct}
                  heading="Protect Your Professional Influence" 
                  tagline="Maintain total confidence during elite meetings, client pitches, dynamic corporate interviews, or networking cycles."
                />
              </>
            )}

          </div>

          {/* Share Utilities Block (Part 12 / Part 14) */}
          <div className="border-t border-border-custom pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 py-4 select-none bg-surface-custom px-5 rounded-2xl border">
            <div className="flex gap-2.5 items-center">
              <button 
                onClick={() => setHasHelpfulVoted(true)}
                disabled={hasHelpfulVoted}
                className={`flex items-center gap-1.5 px-3.5 py-2 border text-xs font-mono font-bold rounded-lg transition-all cursor-pointer ${
                  hasHelpfulVoted 
                    ? "bg-brand-custom text-white border-brand-custom" 
                    : "bg-white text-ink-2-custom border-border-custom hover:bg-gray-100"
                }`}
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>{hasHelpfulVoted ? "✓ Marked Helpful (43)" : "Helpful (42)"}</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[9px] uppercase font-black text-ink-3-custom mr-1">Share post:</span>
              <button 
                onClick={() => handleShareClick("whatsapp")}
                className="px-2.5 py-1.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-mono text-[8.5px] uppercase font-black tracking-wider rounded transition-colors cursor-pointer text-center"
              >
                WhatsApp
              </button>
              <button 
                onClick={() => handleShareClick("email")}
                className="px-2.5 py-1.5 bg-gray-950 hover:bg-gray-800 text-white font-mono text-[8.5px] uppercase font-black tracking-wider rounded transition-colors cursor-pointer text-center"
              >
                Email
              </button>
              <button 
                onClick={() => handleShareClick("copy")}
                className="px-2.5 py-1.5 bg-white border border-border-custom hover:bg-surface-custom text-ink-custom font-mono text-[8.5px] uppercase font-black tracking-wider rounded transition-colors cursor-pointer text-center"
              >
                {copiedLink ? "Copied!" : "Copy Link"}
              </button>
            </div>
          </div>

          {/* Related posts module */}
          <div className="border-t border-border-custom pt-10 space-y-6">
            <h4 className="font-display font-black text-xl text-ink-custom uppercase tracking-wide">
              Related Grooming & Science Reports
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedPosts.map((rPost) => (
                <div 
                  key={rPost.id}
                  onClick={() => {
                    // Navigate to post
                    const elem = document.getElementById("pdp-add-to-cart-btn") || document.getElementById("checkout-finalize-pay");
                    if (elem) {
                      elem.scrollIntoView({ behavior: "smooth" });
                    }
                    // Trigger custom post swap (re-rendering core)
                    onBackToBlog();
                  }}
                  className="bg-white p-5 border border-border-custom hover:border-brand-custom rounded-2xl transition-all shadow-xs cursor-pointer text-left flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="font-mono text-[9px] font-bold text-brand-custom uppercase block">{rPost.category}</span>
                    <h5 className="font-sans font-black text-xs text-ink-custom uppercase leading-tight hover:text-brand-custom transition-colors">
                      {rPost.title}
                    </h5>
                    <p className="text-[11px] text-ink-2-custom line-clamp-2 leading-relaxed">
                      {rPost.excerpt}
                    </p>
                  </div>
                  <span className="block font-mono text-[9px] text-ink-3-custom uppercase font-extrabold mt-3 tracking-widest leading-none">
                    Read Report ➔
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* IMMERSIVE END OF POST BRAND WORLD BRACKET */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-12 text-center space-y-4 border border-zinc-800 shadow-xl select-none">
            <span className="text-brand-custom font-mono text-xs uppercase font-black tracking-widest block font-bold leading-none">
              SMelloff Laboratory Co. Hyderabad
            </span>
            <h3 className="text-3xl sm:text-5xl font-display font-black text-white uppercase tracking-tight leading-none">
              Never Settle for Stale Clothing
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 max-w-lg mx-auto leading-relaxed">
              Dure-tested by real metro and bike commuters in High-density Indian cities. Lock sweat odor inside textile fabrics molecularly in under 10 seconds.
            </p>
            <button
              onClick={onSelectProduct}
              className="py-4 px-8 bg-brand-custom hover:bg-brand-strong-custom text-white font-sans font-black text-xs uppercase tracking-wider rounded-xl cursor-pointer transition-all flex items-center justify-center gap-1.5 mx-auto shadow-md"
            >
              <span>Explore Scent-Strike Pack</span> <ArrowRight className="w-4.5 h-4.5 text-accent-custom" />
            </button>
          </div>

        </article>

      </div>
    </div>
  );
}
