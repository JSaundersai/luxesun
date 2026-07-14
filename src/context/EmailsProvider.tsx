"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { EmailType, renderEmail } from "@/lib/email-templates";

export interface EmailRecord {
  id: string;
  type: EmailType;
  to: string;
  subject: string;
  previewText: string;
  html: string;
  date: string;
}

const KEY = "luxe_emails_v1";

interface EmailsContextValue {
  emails: EmailRecord[];
  ready: boolean;
  /** Render a template and store it in the sent log. Returns the record. */
  logEmail: (type: EmailType, to: string, data: Record<string, unknown>) => EmailRecord;
  clearEmails: () => void;
}

const EmailsContext = createContext<EmailsContextValue | null>(null);

export function EmailsProvider({ children }: { children: ReactNode }) {
  const [emails, setEmails] = useState<EmailRecord[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setEmails(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(KEY, JSON.stringify(emails));
  }, [emails, ready]);

  const logEmail = useCallback(
    (type: EmailType, to: string, data: Record<string, unknown>) => {
      const rendered = renderEmail(type, data);
      const record: EmailRecord = {
        id: `em-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        type,
        to,
        subject: rendered.subject,
        previewText: rendered.previewText,
        html: rendered.html,
        date: new Date().toISOString(),
      };
      setEmails((prev) => [record, ...prev]);
      return record;
    },
    []
  );

  const clearEmails = () => setEmails([]);

  return (
    <EmailsContext.Provider value={{ emails, ready, logEmail, clearEmails }}>
      {children}
    </EmailsContext.Provider>
  );
}

export function useEmails() {
  const ctx = useContext(EmailsContext);
  if (!ctx) throw new Error("useEmails must be used within EmailsProvider");
  return ctx;
}
