import { Icons } from "@/components/icons";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";

export const BLUR_FADE_DELAY = 0.15;

export const siteConfig = {
  name: "Rekurio",
  description:
    "Der smarte Klaviyo-Assistent für DTC-Brands: Dashboard, Flows und Next-Best-Actions.",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  keywords: ["Klaviyo", "DTC", "Email Marketing", "Marketing Automation", "Rekurio"],
  links: {
    email: "hello@rekurio.com",
    twitter: "https://twitter.com/magicuidesign",
    discord: "https://discord.gg/87p2vpsat5",
    github: "https://github.com/magicuidesign/magicui",
    instagram: "https://instagram.com/magicuidesign/",
  },
  header: [
    {
      trigger: "Features",
      content: {
        main: {
          icon: <Icons.logo className="h-6 w-6" />,
          title: "Klaviyo-Optimierung",
          description: "Dashboard, Flows und Next-Best-Actions für DTC-Brands.",
          href: "#",
        },
        items: [
          {
            href: "#",
            title: "Performance-Dashboard",
            description: "KPIs, Trends und Deliverability in einem Überblick.",
          },
          {
            href: "#",
            title: "Flow-Templates",
            description: "Welcome, Cart, Win-Back und mehr – schnell ausrollen.",
          },
          {
            href: "#",
            title: "Next-Best-Actions",
            description: "Priorisierte To-dos, die sich auf Umsatz auswirken.",
          },
        ],
      },
    },
    {
      trigger: "Solutions",
      content: {
        items: [
          {
            title: "For Small Businesses",
            href: "#",
            description: "Tailored automation solutions for growing companies.",
          },
          {
            title: "Enterprise",
            href: "#",
            description: "Scalable AI automation for large organizations.",
          },
          {
            title: "Developers",
            href: "#",
            description: "API access and integration tools for developers.",
          },
          {
            title: "Healthcare",
            href: "#",
            description: "Specialized automation for healthcare workflows.",
          },
          {
            title: "Finance",
            href: "#",
            description: "AI-driven process automation for financial services.",
          },
          {
            title: "Education",
            href: "#",
            description:
              "Streamline administrative tasks in educational institutions.",
          },
        ],
      },
    },
    {
      href: "/blog",
      label: "Blog",
    },
  ],
  pricing: [
    {
      name: "BASIC",
      href: "#",
      price: "$19",
      period: "month",
      yearlyPrice: "$16",
      features: [
        "1 User",
        "5GB Storage",
        "Basic Support",
        "Limited API Access",
        "Standard Analytics",
      ],
      description: "Perfect for individuals and small projects",
      buttonText: "Subscribe",
      isPopular: false,
    },
    {
      name: "PRO",
      href: "#",
      price: "$49",
      period: "month",
      yearlyPrice: "$40",
      features: [
        "5 Users",
        "50GB Storage",
        "Priority Support",
        "Full API Access",
        "Advanced Analytics",
      ],
      description: "Ideal for growing businesses and teams",
      buttonText: "Subscribe",
      isPopular: true,
    },
    {
      name: "ENTERPRISE",
      href: "#",
      price: "$99",
      period: "month",
      yearlyPrice: "$82",
      features: [
        "Unlimited Users",
        "500GB Storage",
        "24/7 Premium Support",
        "Custom Integrations",
        "AI-Powered Insights",
      ],
      description: "For large-scale operations and high-volume users",
      buttonText: "Subscribe",
      isPopular: false,
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
      title: "Product",
      links: [
        { href: "#", text: "Features", icon: null },
        { href: "#", text: "Pricing", icon: null },
        { href: "#", text: "Documentation", icon: null },
        { href: "#", text: "API", icon: null },
      ],
    },
    {
      title: "Company",
      links: [
        { href: "#", text: "About Us", icon: null },
        { href: "#", text: "Careers", icon: null },
        { href: "#", text: "Blog", icon: null },
        { href: "#", text: "Press", icon: null },
        { href: "#", text: "Partners", icon: null },
      ],
    },
    {
      title: "Resources",
      links: [
        { href: "#", text: "Community", icon: null },
        { href: "#", text: "Contact", icon: null },
        { href: "#", text: "Support", icon: null },
        { href: "#", text: "Status", icon: null },
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
