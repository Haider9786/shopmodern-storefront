import React, { useState } from "react";
import { Container } from "../components/layout/Container";
import { Link } from "react-router-dom";
import { ThumbsUp, ThumbsDown, CheckCircle2 } from "lucide-react";

const SECTIONS = [
  { id: "overview", title: "1. Overview & Scope" },
  { id: "collection", title: "2. Information We Collect" },
  { id: "usage", title: "3. How We Use Data" },
  { id: "sharing", title: "4. Third-Party Sharing" },
  { id: "security", title: "5. Security & Retention" },
  { id: "contact", title: "6. Contact Us" },
];

export const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [feedback, setFeedback] = useState(null);

  const scrollTo = (id) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="bg-white min-h-screen border-b border-gray-100 min-w-0">
      <div className="bg-gray-900 text-white py-8 sm:py-12 border-b border-gray-800">
        <Container>
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 px-1 sm:px-0 min-w-0">
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-[11px] sm:text-xs font-mono text-gray-400 mb-1.5 sm:mb-2 flex-wrap">
                <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                <span>/</span>
                <span className="text-brand-primary font-semibold">Privacy Policy</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight break-words">Privacy Policy</h1>
              <p className="text-[11px] sm:text-xs text-gray-400 mt-0.5 sm:mt-1 break-words">Last revised on August 24, 2026</p>
            </div>
            <div className="flex items-center gap-2 text-[11px] sm:text-xs text-gray-300 bg-gray-800/80 border border-gray-700 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg shrink-0 self-start md:self-auto">
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
              <span className="break-words">GDPR & CCPA Compliant</span>
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-12 py-8 sm:py-12 min-w-0">
          
          <aside className="md:col-span-4 lg:col-span-3 hidden md:block min-w-0">
            <div className="sticky top-24 space-y-1 pr-2 sm:pr-4 border-r border-gray-100">
              <p className="text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-2 sm:mb-3 px-1 sm:px-2">
                Table of Contents
              </p>
              {SECTIONS.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => scrollTo(sec.id)}
                  className={`w-full text-left text-[11px] sm:text-xs px-2 sm:px-3 py-1.5 sm:py-2 rounded-md transition-all font-medium min-h-[36px] break-words ${
                    activeSection === sec.id
                      ? "bg-brand-primary/10 text-brand-primary font-bold"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {sec.title}
                </button>
              ))}
            </div>
          </aside>

          <main className="md:col-span-8 lg:col-span-9 space-y-6 sm:space-y-10 text-xs sm:text-sm text-gray-600 leading-relaxed min-w-0 px-0 sm:px-0.5">
            <section id="overview" className="scroll-mt-28 sm:scroll-mt-28 space-y-2 sm:space-y-3 border-b border-gray-100 pb-5 sm:pb-8 min-w-0">
              <h2 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight break-words">1. Overview & Scope</h2>
              <p className="break-words">
                At ShopModern, we respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, disclosure, and protect your information when you visit our online store or make a purchase.
              </p>
            </section>

            <section id="collection" className="scroll-mt-28 sm:scroll-mt-28 space-y-2 sm:space-y-3 border-b border-gray-100 pb-5 sm:pb-8 min-w-0">
              <h2 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight break-words">2. Information We Collect</h2>
              <p className="break-words">We collect information necessary to provide you with seamless workspace products and services:</p>
              <div className="bg-gray-50 rounded-xl p-3 sm:p-4 border border-gray-100 space-y-2 text-[11px] sm:text-xs min-w-0">
                <div className="font-semibold text-gray-900 break-words">Personal Data</div>
                <p className="text-gray-500 break-words">Name, shipping address, billing address, email address, and telephone number provided during checkout.</p>
                <div className="font-semibold text-gray-900 pt-2 break-words">Technical Data</div>
                <p className="text-gray-500 break-words">IP address, browser type, device information, and interaction logs captured automatically via cookies.</p>
              </div>
            </section>

            <section id="usage" className="scroll-mt-28 sm:scroll-mt-28 space-y-2 sm:space-y-3 border-b border-gray-100 pb-5 sm:pb-8 min-w-0">
              <h2 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight break-words">3. How We Use Data</h2>
              <p className="break-words">Your data is processed strictly for legitimate operational purposes:</p>
              <ul className="list-disc pl-4 sm:pl-5 space-y-1 sm:space-y-1.5 text-gray-600 text-[11px] sm:text-xs">
                <li className="break-words">To process, pack, and fulfill your desk hardware orders.</li>
                <li className="break-words">To send transaction confirmations, invoice receipts, and tracking updates.</li>
                <li className="break-words">To prevent fraudulent behavior and verify account security.</li>
              </ul>
            </section>

            <section id="sharing" className="scroll-mt-28 sm:scroll-mt-28 space-y-2 sm:space-y-3 border-b border-gray-100 pb-5 sm:pb-8 min-w-0">
              <h2 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight break-words">4. Third-Party Sharing</h2>
              <p className="break-words">
                We do not monetize or sell user information. Data is disclosed only to verified service infrastructure providers:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-[11px] sm:text-xs pt-1 min-w-0">
                <div className="p-2.5 sm:p-3 border border-gray-200/80 rounded-lg min-w-0">
                  <span className="font-bold text-gray-900 block mb-0.5 break-words">Payment Processors</span>
                  Encrypted payment tokens are sent directly to Stripe/PayPal.
                </div>
                <div className="p-2.5 sm:p-3 border border-gray-200/80 rounded-lg min-w-0">
                  <span className="font-bold text-gray-900 block mb-0.5 break-words">Logistics Partners</span>
                  Shipping address data shared with DHL/FedEx for order dispatch.
                </div>
              </div>
            </section>

            <section id="security" className="scroll-mt-28 sm:scroll-mt-28 space-y-2 sm:space-y-3 border-b border-gray-100 pb-5 sm:pb-8 min-w-0">
              <h2 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight break-words">5. Security & Retention</h2>
              <p className="break-words">
                We utilize AES-256 encryption at rest and TLS 1.3 in transit. Financial information never touches our application servers. Data is retained only as long as necessary to comply with financial tax regulations.
              </p>
            </section>

            <section id="contact" className="scroll-mt-28 sm:scroll-mt-28 space-y-2 sm:space-y-3 min-w-0">
              <h2 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight break-words">6. Contact Us</h2>
              <p className="break-words">
                If you have questions regarding your personal data rights, contact our Data Protection Officer at:
              </p>
              <div className="font-mono text-[11px] sm:text-xs bg-gray-50 border border-gray-200/60 p-2.5 sm:p-3 rounded-lg text-gray-700 w-fit break-words overflow-x-auto">
                privacy@shopmodern.com
              </div>
            </section>

            <div className="mt-8 sm:mt-12 pt-4 sm:pt-6 border-t border-gray-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 min-w-0">
              <span className="text-[11px] sm:text-xs font-semibold text-gray-500 break-words">Was this page helpful?</span>
              {feedback ? (
                <span className="text-[11px] sm:text-xs text-emerald-600 font-medium break-words">Thank you for your feedback!</span>
              ) : (
                <div className="flex gap-2 shrink-0">
                  <button 
                    onClick={() => setFeedback("yes")}
                    className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 text-[11px] sm:text-xs flex items-center gap-1.5 transition-colors min-h-[36px] min-w-[64px] justify-center"
                  >
                    <ThumbsUp className="w-3.5 h-3.5 shrink-0" /> Yes
                  </button>
                  <button 
                    onClick={() => setFeedback("no")}
                    className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 text-[11px] sm:text-xs flex items-center gap-1.5 transition-colors min-h-[36px] min-w-[64px] justify-center"
                  >
                    <ThumbsDown className="w-3.5 h-3.5 shrink-0" /> No
                  </button>
                </div>
              )}
            </div>
          </main>
        </div>
      </Container>
    </div>
  );
};