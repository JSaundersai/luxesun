"use client";

import { useState } from "react";
import Image from "next/image";
import AdminShell from "@/components/admin/AdminShell";
import { useSocial, SocialPlatform } from "@/context/SocialProvider";
import { useProducts } from "@/context/ProductsProvider";

const inputCls =
  "w-full border border-border-warm bg-white px-3 py-2 font-sans text-[0.9rem] focus:outline-none focus:border-near-black transition-colors";
const labelCls =
  "block font-sans text-[0.68rem] font-medium tracking-[0.1em] uppercase text-stone-gray mb-1.5";

export default function AdminSocialPage() {
  const { posts, addPost, deletePost } = useSocial();
  const { products } = useProducts();

  const [platform, setPlatform] = useState<SocialPlatform>("instagram");
  const [productId, setProductId] = useState<string>(products[0]?.id ?? "");
  const [caption, setCaption] = useState("Certified UPF 50+ and made to move. ☀️ Meet the range built for your sun sport.");
  const [hashtags, setHashtags] = useState("#luxesun #upf50 #sunprotection #beachvolleyball #activewear");
  const [status, setStatus] = useState<"draft" | "scheduled">("draft");
  const [scheduledFor, setScheduledFor] = useState("");

  const product = products.find((p) => p.id === productId);
  const image = product?.image ?? "/placeholders/products/ace-crop-front.jpg";

  const save = () => {
    addPost({ platform, productId: productId || undefined, image, caption, hashtags, status, scheduledFor: scheduledFor || undefined });
  };

  return (
    <AdminShell>
      <div className="mb-8">
        <h1 className="font-serif text-[2.2rem] font-medium text-near-black">Social Studio</h1>
        <p className="font-sans text-[0.85rem] text-stone-gray">
          Mock up Instagram &amp; Facebook posts, preview them, and save drafts to schedule.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Composer */}
        <div className="border border-border-warm bg-white p-6 h-fit">
          <div className="grid grid-cols-2 gap-3 mb-4">
            {(["instagram", "facebook"] as SocialPlatform[]).map((p) => (
              <button
                key={p}
                onClick={() => setPlatform(p)}
                className={`py-2.5 font-sans text-[0.78rem] tracking-[0.08em] uppercase border transition-colors ${
                  platform === p ? "bg-near-black text-ivory border-near-black" : "border-border-warm text-near-black hover:border-near-black"
                }`}
              >
                {p === "instagram" ? "Instagram" : "Facebook"}
              </button>
            ))}
          </div>

          <div className="mb-4">
            <label className={labelCls}>Product image</label>
            <select value={productId} onChange={(e) => setProductId(e.target.value)} className={inputCls}>
              {products.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className={labelCls}>Caption</label>
            <textarea value={caption} onChange={(e) => setCaption(e.target.value)} rows={4} className={inputCls} />
          </div>

          <div className="mb-4">
            <label className={labelCls}>Hashtags</label>
            <textarea value={hashtags} onChange={(e) => setHashtags(e.target.value)} rows={2} className={inputCls} />
          </div>

          <div className="grid grid-cols-2 gap-3 mb-5">
            <div>
              <label className={labelCls}>Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value as "draft" | "scheduled")} className={inputCls}>
                <option value="draft">Draft</option>
                <option value="scheduled">Scheduled</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Schedule for</label>
              <input type="date" value={scheduledFor} onChange={(e) => setScheduledFor(e.target.value)} className={inputCls} />
            </div>
          </div>

          <button onClick={save} className="btn-primary w-full">Save Post</button>
        </div>

        {/* Live preview */}
        <div>
          <div className="font-sans text-[0.7rem] tracking-[0.12em] uppercase text-stone-gray mb-3">Preview</div>
          {platform === "instagram" ? (
            <div className="max-w-[380px] mx-auto border border-border-cream bg-white">
              <div className="flex items-center gap-3 px-4 py-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-terracotta to-warm-sand flex items-center justify-center text-ivory font-serif text-[0.7rem]">LS</div>
                <span className="font-sans text-[0.82rem] font-medium text-near-black">luxesun</span>
                <span className="ml-auto text-stone-gray">···</span>
              </div>
              <div className="relative aspect-square bg-warm-sand">
                <Image src={image} alt="post" fill sizes="380px" className="object-cover" />
              </div>
              <div className="px-4 py-3">
                <div className="flex gap-4 mb-2 text-near-black text-lg">♡ ◎ ➤</div>
                <p className="font-sans text-[0.82rem] text-near-black leading-snug">
                  <span className="font-medium">luxesun</span> {caption}
                </p>
                <p className="font-sans text-[0.8rem] text-[#385898] mt-1 leading-snug">{hashtags}</p>
              </div>
            </div>
          ) : (
            <div className="max-w-[420px] mx-auto border border-border-cream bg-white">
              <div className="flex items-center gap-3 px-4 py-3">
                <div className="w-10 h-10 rounded-full bg-near-black flex items-center justify-center text-ivory font-serif text-[0.75rem]">LS</div>
                <div>
                  <div className="font-sans text-[0.85rem] font-medium text-near-black">Luxe Sun</div>
                  <div className="font-sans text-[0.7rem] text-stone-gray">Sponsored · 🌐</div>
                </div>
              </div>
              <p className="px-4 pb-3 font-sans text-[0.85rem] text-near-black leading-snug">
                {caption} <span className="text-[#385898]">{hashtags}</span>
              </p>
              <div className="relative aspect-[1.91/1] bg-warm-sand">
                <Image src={image} alt="post" fill sizes="420px" className="object-cover" />
              </div>
              <div className="flex justify-around px-4 py-2 border-t border-border-cream font-sans text-[0.78rem] text-stone-gray">
                <span>👍 Like</span><span>💬 Comment</span><span>↪ Share</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Saved posts */}
      {posts.length > 0 && (
        <div className="mt-12">
          <h2 className="font-sans text-[0.8rem] font-medium tracking-[0.12em] uppercase text-near-black mb-5">
            Saved Posts ({posts.length})
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {posts.map((p) => (
              <div key={p.id} className="border border-border-cream bg-white">
                <div className="relative aspect-square bg-warm-sand">
                  <Image src={p.image} alt="post" fill sizes="200px" className="object-cover" />
                  <span className="absolute top-2 left-2 font-sans text-[0.6rem] tracking-[0.08em] uppercase bg-near-black/80 text-ivory px-2 py-0.5">
                    {p.platform}
                  </span>
                </div>
                <div className="p-3">
                  <p className="font-sans text-[0.75rem] text-near-black line-clamp-2 leading-snug">{p.caption}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-sans text-[0.62rem] tracking-[0.08em] uppercase text-stone-gray">
                      {p.status}{p.scheduledFor ? ` · ${new Date(p.scheduledFor).toLocaleDateString("en-AU", { day: "numeric", month: "short" })}` : ""}
                    </span>
                    <button onClick={() => deletePost(p.id)} className="font-sans text-[0.68rem] uppercase text-stone-gray hover:text-terracotta">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </AdminShell>
  );
}
