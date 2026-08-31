import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { Container } from "../components/layout/Container";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useToast } from "../context/ToastContext";

export const Contact = () => {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      addToast("Please fill in all required fields", "error");
      return;
    }
    addToast("Message sent successfully! We'll reply within 24 hours.", "success");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="py-8 sm:py-12 bg-brand-surface/30 min-h-screen">
      <Container>
        <div className="max-w-2xl mb-8 sm:mb-12 px-1 sm:px-0 min-w-0">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-on-surface mb-1.5 sm:mb-2 break-words">Get in Touch</h1>
          <p className="text-[11px] sm:text-xs text-gray-500 break-words">
            Have questions about a product or order? Our support team is here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8 min-w-0">
          <div className="space-y-3 sm:space-y-4 order-2 lg:order-1 min-w-0">
            <Card className="p-3.5 sm:p-5 flex items-start gap-3 sm:gap-4 min-w-0 h-full">
              <div className="p-2 sm:p-2.5 rounded-lg bg-brand-primary/10 text-brand-primary shrink-0">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase break-words">Email Us</p>
                <p className="text-[11px] sm:text-xs font-extrabold text-brand-on-surface mt-0.5 break-words">support@shopmodern.com</p>
              </div>
            </Card>

            <Card className="p-3.5 sm:p-5 flex items-start gap-3 sm:gap-4 min-w-0 h-full">
              <div className="p-2 sm:p-2.5 rounded-lg bg-brand-primary/10 text-brand-primary shrink-0">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase break-words">Call Support</p>
                <p className="text-[11px] sm:text-xs font-extrabold text-brand-on-surface mt-0.5 break-words">+1 (800) 555-0199</p>
              </div>
            </Card>

            <Card className="p-3.5 sm:p-5 flex items-start gap-3 sm:gap-4 min-w-0 h-full">
              <div className="p-2 sm:p-2.5 rounded-lg bg-brand-primary/10 text-brand-primary shrink-0">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase break-words">Working Hours</p>
                <p className="text-[11px] sm:text-xs font-bold text-gray-700 mt-0.5 break-words">Mon - Fri: 9:00 AM - 6:00 PM EST</p>
              </div>
            </Card>
          </div>

          <Card className="lg:col-span-2 p-4 sm:p-6 order-1 lg:order-2 min-w-0">
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 min-w-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="min-w-0">
                  <label className="block text-[11px] sm:text-xs font-bold text-gray-600 mb-1 break-words">Name *</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your Name"
                    className="text-xs"
                  />
                </div>
                <div className="min-w-0">
                  <label className="block text-[11px] sm:text-xs font-bold text-gray-600 mb-1 break-words">Email *</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="text-xs"
                  />
                </div>
              </div>

              <div className="min-w-0">
                <label className="block text-[11px] sm:text-xs font-bold text-gray-600 mb-1 break-words">Subject</label>
                <Input
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Order Inquiry / General Question"
                  className="text-xs"
                />
              </div>

              <div className="min-w-0">
                <label className="block text-[11px] sm:text-xs font-bold text-gray-600 mb-1 break-words">Message *</label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we assist you today?"
                  className="w-full min-h-[140px] text-[11px] sm:text-xs p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-primary resize-y"
                />
              </div>

              <Button type="submit" size="sm" className="w-full sm:w-auto flex items-center justify-center gap-2 min-h-[48px]">
                <Send className="w-4 h-4" /> Send Message
              </Button>
            </form>
          </Card>
        </div>
      </Container>
    </div>
  );
};