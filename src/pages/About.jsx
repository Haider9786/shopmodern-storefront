import React from "react";
import { ShieldCheck, Truck, RefreshCw, Users, Award, Sparkles } from "lucide-react";
import { Container } from "../components/layout/Container";
import { Card } from "../components/ui/Card";

const STATS = [
  { label: "Active Customers", value: "50k+" },
  { label: "Products Delivered", value: "120k+" },
  { label: "Customer Rating", value: "4.9 / 5" },
  { label: "Global Partners", value: "25+" },
];

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Uncompromised Quality",
    description: "Every item in our collection undergoes rigorous durability and performance testing.",
  },
  {
    icon: Truck,
    title: "Fast Global Shipping",
    description: "Express dispatch and tracked delivery directly to your workspace, worldwide.",
  },
  {
    icon: RefreshCw,
    title: "Hassle-Free Returns",
    description: "Enjoy 30-day money-back guarantee with zero complicated paperwork.",
  },
  {
    icon: Sparkles,
    title: "Minimalist Design",
    description: "Thoughtfully crafted aesthetics designed to elevate modern workspace productivity.",
  },
];

export const About = () => {
  return (
    <div className="py-8 sm:py-12 bg-brand-surface/30 min-h-screen">
      <Container>
        <div className="max-w-2xl mb-8 sm:mb-12 px-1 sm:px-0 min-w-0">
          <Badge text="About ShopModern" />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-on-surface mt-2 sm:mt-3 mb-2 sm:mb-4 tracking-tight break-words">
            Elevating everyday setups through intentional design.
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed break-words">
            Founded with a vision to streamline modern environments, ShopModern curates premium desktop peripherals, audio gear, and ergonomic furniture tailored for focused creators and professionals.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mb-10 sm:mb-16">
          {STATS.map((stat, i) => (
            <Card key={i} className="p-3 sm:p-6 text-center border-gray-100 min-w-0 h-full">
              <p className="text-xl sm:text-2xl md:text-3xl font-extrabold text-brand-primary break-words">{stat.value}</p>
              <p className="text-[10px] sm:text-xs font-bold text-gray-500 mt-0.5 sm:mt-1 break-words">{stat.label}</p>
            </Card>
          ))}
        </div>

        <div className="mb-10 sm:mb-16 min-w-0">
          <h2 className="text-lg sm:text-2xl font-bold text-brand-on-surface mb-3 sm:mb-6 break-words">Why Shop With Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 min-w-0">
            {VALUES.map((val, i) => {
              const Icon = val.icon;
              return (
                <Card key={i} className="p-3.5 sm:p-6 border-gray-100 flex flex-col justify-between min-w-0 h-full">
                  <div className="min-w-0">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-2.5 sm:mb-4 shrink-0">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <h3 className="text-sm sm:text-base font-extrabold text-brand-on-surface mb-1 sm:mb-2 break-words">{val.title}</h3>
                    <p className="text-[11px] sm:text-xs text-gray-500 leading-relaxed break-words">{val.description}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  );
};

const Badge = ({ text }) => (
  <span className="inline-block px-3 py-1 text-[11px] font-extrabold tracking-wider text-brand-primary bg-brand-primary/10 rounded-full uppercase">
    {text}
  </span>
);