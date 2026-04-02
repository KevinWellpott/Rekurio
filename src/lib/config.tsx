import { Icons } from "@/components/icons";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";

export const BLUR_FADE_DELAY = 0.15;

export const siteConfig = {
  name: "Rekurio",
  description:
    "Mehr Revenue aus Klaviyo – ohne Agentur. Rekurio ist der Klaviyo-Assistent für DTC-Brands: Dashboard, Flows, KI-Copywriting und Next-Best-Actions. 14 Tage kostenlos.",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  keywords: [
    "Klaviyo optimieren",
    "Klaviyo Assistent",
    "Klaviyo Dashboard",
    "Klaviyo Flows",
    "Email Marketing DTC",
    "DTC Email Marketing Tool",
    "Klaviyo Agentur Alternative",
    "Retention Marketing Software",
    "Klaviyo Win-Back Flow",
    "Email Automation DTC Brand",
    "Rekurio",
  ],
  links: {
    email: "hello@rekurio.com",
    twitter: "#",
    instagram: "#",
    youtube: "#",
  },
  header: [
    {
      trigger: "Features",
      content: {
        main: {
          icon: <Icons.logo className="h-6 w-6" />,
          title: "Klaviyo-Optimierung",
          description: "Dashboard, Flows und Next-Best-Actions für DTC-Brands.",
          href: "/#features",
        },
        items: [
          {
            href: "/#how-it-works",
            title: "Performance-Dashboard",
            description: "KPIs, Trends und Deliverability in einem Überblick.",
          },
          {
            href: "/#features",
            title: "Flow-Templates",
            description: "Welcome, Cart, Win-Back und mehr – schnell ausrollen.",
          },
          {
            href: "/#how-it-works",
            title: "Next-Best-Actions",
            description: "Priorisierte To-dos, die sich auf Umsatz auswirken.",
          },
        ],
      },
    },
    {
      href: "/pricing",
      label: "Preise",
    },
    {
      href: "/blog",
      label: "Blog",
    },
    {
      href: "/demo",
      label: "Demo",
    },
  ],
  faqs: [
    {
      question: "Was ist Rekurio?",
      answer: (
        <span>
          Rekurio ist ein Assistent für Klaviyo: Er bündelt Dashboard, Flows und
          Empfehlungen, damit DTC-Brands Email-Automation messbar verbessern –
          ohne Agentur-Overhead.
        </span>
      ),
    },
    {
      question: "Wie starte ich?",
      answer: (
        <span>
          Trage dich in die Waitlist ein, verbinde Klaviyo per OAuth und
          aktiviere die nächsten empfohlenen Maßnahmen – ohne API-Keys manuell zu
          pflegen.
        </span>
      ),
    },
    {
      question: "Brauche ich Entwickler?",
      answer: (
        <span>
          Nein. Rekurio ist für Marketing- und E-Commerce-Teams gedacht, die
          Klaviyo stärker nutzen wollen – mit klaren Schritten statt Custom-Code.
        </span>
      ),
    },
    {
      question: "Ist mein Klaviyo-Konto sicher verbunden?",
      answer: (
        <span>
          Die Anbindung erfolgt über OAuth. Du behältst die Kontrolle über
          Berechtigungen und kannst die Verbindung jederzeit in Klaviyo
          verwalten.
        </span>
      ),
    },
    {
      question: "Welchen Support gibt es?",
      answer: (
        <span>
          Dokumentation, Best Practices für Flows und – je nach Plan –
          persönlicher Support für die wichtigsten Setups.
        </span>
      ),
    },
  ],
  footer: [
    {
      title: "Produkt",
      links: [
        { href: "/#features", text: "Features", icon: null },
        { href: "/pricing", text: "Preise", icon: null },
        { href: "/roi", text: "ROI-Rechner", icon: null },
        { href: "/demo", text: "Demo buchen", icon: null },
      ],
    },
    {
      title: "Unternehmen",
      links: [
        { href: "/about", text: "Über uns", icon: null },
        { href: "/partner", text: "Partner werden", icon: null },
        { href: "/blog", text: "Blog", icon: null },
        { href: "mailto:hello@rekurio.com", text: "Kontakt", icon: null },
      ],
    },
    {
      title: "Rechtliches",
      links: [
        { href: "/impressum", text: "Impressum", icon: null },
        { href: "/datenschutz", text: "Datenschutz", icon: null },
        { href: "/agb", text: "AGB", icon: null },
      ],
    },
    {
      title: "Social",
      links: [
        {
          href: "#",
          text: "Twitter",
          icon: <FaTwitter />,
        },
        {
          href: "#",
          text: "Instagram",
          icon: <RiInstagramFill />,
        },
        {
          href: "#",
          text: "Youtube",
          icon: <FaYoutube />,
        },
      ],
    },
  ],
};

export type SiteConfig = typeof siteConfig;
