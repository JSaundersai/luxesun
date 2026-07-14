"use client";

import { useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { useEmails } from "@/context/EmailsProvider";
import {
  emailTemplates,
  emailTypeList,
  renderEmail,
  EmailType,
} from "@/lib/email-templates";

type Tab = "sent" | "templates";

interface Preview {
  subject: string;
  to?: string;
  label: string;
  html: string;
  date?: string;
}

function printHtml(html: string) {
  const w = window.open("", "_blank", "width=680,height=800");
  if (!w) return;
  w.document.write(html);
  w.document.close();
  w.focus();
  setTimeout(() => w.print(), 300);
}

export default function AdminEmailsPage() {
  const { emails, clearEmails } = useEmails();
  const [tab, setTab] = useState<Tab>("sent");
  const [preview, setPreview] = useState<Preview | null>(null);

  const openSent = (id: string) => {
    const e = emails.find((x) => x.id === id);
    if (!e) return;
    setPreview({
      subject: e.subject,
      to: e.to,
      label: emailTemplates[e.type].label,
      html: e.html,
      date: e.date,
    });
  };

  const openTemplate = (type: EmailType) => {
    const def = emailTemplates[type];
    const rendered = renderEmail(type, def.sample);
    setPreview({ subject: rendered.subject, label: def.label, html: rendered.html });
  };

  return (
    <AdminShell>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="font-serif text-[2.2rem] font-medium text-near-black">Emails</h1>
          <p className="font-sans text-[0.85rem] text-stone-gray">
            Every transactional email — view the ones we&apos;ve sent, or preview and print any template.
          </p>
        </div>
        {tab === "sent" && emails.length > 0 && (
          <button
            onClick={() => { if (confirm("Clear the sent-email log?")) { clearEmails(); setPreview(null); } }}
            className="btn-secondary"
          >
            Clear Log
          </button>
        )}
      </div>

      <div className="flex gap-6 border-b border-border-cream mb-6">
        {(["sent", "templates"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => { setTab(t); setPreview(null); }}
            className={`pb-3 font-sans text-[0.78rem] tracking-[0.1em] uppercase border-b-2 -mb-px transition-colors ${
              tab === t ? "text-near-black border-terracotta" : "text-stone-gray border-transparent hover:text-near-black"
            }`}
          >
            {t === "sent" ? `Sent (${emails.length})` : `Templates (${emailTypeList.length})`}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* List */}
        <div className="border border-border-cream bg-white divide-y divide-border-cream max-h-[620px] overflow-y-auto">
          {tab === "sent" ? (
            emails.length === 0 ? (
              <div className="p-10 text-center font-sans text-[0.9rem] text-stone-gray">
                No emails sent yet. Place an order or update an order&apos;s status to generate some.
              </div>
            ) : (
              emails.map((e) => (
                <button
                  key={e.id}
                  onClick={() => openSent(e.id)}
                  className={`w-full text-left px-5 py-4 hover:bg-parchment/60 transition-colors ${preview?.subject === e.subject && preview?.date === e.date ? "bg-parchment/60" : ""}`}
                >
                  <div className="flex justify-between items-baseline gap-3">
                    <span className="font-sans text-[0.7rem] tracking-[0.08em] uppercase text-terracotta">{emailTemplates[e.type].label}</span>
                    <span className="font-sans text-[0.7rem] text-stone-gray whitespace-nowrap">
                      {new Date(e.date).toLocaleDateString("en-AU", { day: "numeric", month: "short" })}
                    </span>
                  </div>
                  <div className="font-sans text-[0.86rem] text-near-black mt-1">{e.subject}</div>
                  <div className="font-sans text-[0.75rem] text-stone-gray">to {e.to}</div>
                </button>
              ))
            )
          ) : (
            emailTypeList.map((type) => (
              <button
                key={type}
                onClick={() => openTemplate(type)}
                className={`w-full text-left px-5 py-4 hover:bg-parchment/60 transition-colors ${preview?.label === emailTemplates[type].label ? "bg-parchment/60" : ""}`}
              >
                <div className="font-sans text-[0.86rem] text-near-black">{emailTemplates[type].label}</div>
                <div className="font-sans text-[0.75rem] text-stone-gray">{emailTemplates[type].description}</div>
              </button>
            ))
          )}
        </div>

        {/* Preview */}
        <div className="border border-border-cream bg-white flex flex-col min-h-[400px]">
          {preview ? (
            <>
              <div className="px-5 py-4 border-b border-border-cream flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="font-sans text-[0.7rem] tracking-[0.08em] uppercase text-terracotta">{preview.label}</div>
                  <div className="font-sans text-[0.9rem] text-near-black mt-1 truncate">{preview.subject}</div>
                  {preview.to && <div className="font-sans text-[0.75rem] text-stone-gray">to {preview.to}</div>}
                </div>
                <button onClick={() => printHtml(preview.html)} className="btn-secondary shrink-0 !py-2 !px-4 text-[0.72rem]">
                  Print
                </button>
              </div>
              <iframe
                title="Email preview"
                srcDoc={preview.html}
                className="w-full flex-1 min-h-[460px] bg-white"
              />
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center p-10 text-center font-sans text-[0.9rem] text-stone-gray">
              Select an email to preview it here.
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  );
}
