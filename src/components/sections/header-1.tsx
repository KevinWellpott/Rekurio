"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion, MotionConfig } from "motion/react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

/** Scroll-Position der Seite (window) – für Sticky-Header-Animationen. */
export function useScrollY() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY || document.documentElement.scrollTop)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return scrollY
}

export function StickyHeader() {
  const scrollY = useScrollY()
  const stickyNavRef = useRef<HTMLElement>(null)
  const { theme } = useTheme()
  const [active, setActive] = useState(false)

  const navLinks = useMemo(
    () => [
      { id: 1, label: "ROI", link: "/#roi" },
      { id: 2, label: "Features", link: "/#features" },
      { id: 3, label: "Preise", link: "/pricing" },
      { id: 4, label: "Affiliate", link: "/partner" },
    ],
    []
  )

  return (
    <header ref={stickyNavRef} className="sticky top-0 z-50 py-7">
      <nav className="relative mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 md:grid md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-center">
        <Link
          href="/"
          className="relative block h-12 w-auto shrink-0 justify-self-start md:h-14"
          aria-label="Rekurio – zur Startseite"
        >
          <img
            className="h-full w-auto max-h-14 object-contain object-left"
            src="/logo.svg"
            alt=""
            width={180}
            height={48}
          />
        </Link>

        <div className="z-[60] hidden min-w-0 justify-self-center md:flex md:justify-center">
          <motion.div
            initial={{ x: 0 }}
            animate={{
              boxShadow:
                scrollY >= 120
                  ? "inset 0 1px 0 rgba(255,255,255,0.70), inset 0 2px 10px rgba(209,254,73,0.07), inset 1px 0 0 rgba(255,255,255,0.16), inset 0 -1px 0 rgba(0,0,0,0.22), 0 8px 32px rgba(0,0,0,0.20), 0 2px 8px rgba(0,0,0,0.12), 0 0 0 0.5px rgba(209,254,73,0.14)"
                  : "none",
            }}
            transition={{
              ease: "linear",
              duration: 0.05,
              delay: 0.05,
            }}
            className="flex h-12 w-auto items-center justify-center overflow-hidden rounded-full px-6 py-2.5 transition-all md:p-1.5 md:py-2"
            style={{
              background: scrollY >= 120
                ? "linear-gradient(158deg, rgba(209,254,73,0.04) 0%, rgba(255,255,255,0.015) 50%, rgba(255,255,255,0.025) 100%)"
                : "transparent",
              backdropFilter: scrollY >= 120 ? "blur(44px) saturate(250%) brightness(1.02)" : "none",
              WebkitBackdropFilter: scrollY >= 120 ? "blur(44px) saturate(250%) brightness(1.02)" : "none",
              border: scrollY >= 120 ? "1px solid rgba(255,255,255,0.16)" : "1px solid transparent",
            }}
          >
            <nav className="relative h-full items-center justify-between gap-x-3.5 md:flex">
              <ul className="flex h-full flex-col justify-center gap-6 md:flex-row md:justify-start md:gap-0 lg:gap-1">
                {navLinks.map((navItem) => (
                  <li
                    key={navItem.id}
                    className="flex items-center justify-center px-[0.75rem] py-[0.375rem]"
                  >
                    <a href={navItem.link}>{navItem.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: scrollY >= 120 ? "auto" : 0,
              }}
              transition={{
                ease: "linear",
                duration: 0.25,
                delay: 0.05,
              }}
              className="!hidden overflow-hidden rounded-full md:!block"
            >
              <AnimatePresence>
                {scrollY >= 120 && (
                  <motion.ul
                    initial={{ x: "125%" }}
                    animate={{ x: "0" }}
                    exit={{
                      x: "125%",
                      transition: { ease: "linear", duration: 1 },
                    }}
                    transition={{ ease: "linear", duration: 0.3 }}
                    className="shrink-0 whitespace-nowrap"
                  >
                    <li>
                      <Button asChild size="sm">
                        <a href={process.env.NEXT_PUBLIC_CALENDLY_URL || "#"} target="_blank" rel="noopener noreferrer">
                          Democall buchen
                        </a>
                      </Button>
                    </li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>

        <div className="z-[999] hidden items-center justify-end justify-self-end gap-2 md:flex">
          <Button asChild variant="outline" size="sm" className="border-white/20 bg-transparent">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/signup">Signup</Link>
          </Button>
        </div>
        <MotionConfig transition={{ duration: 0.3, ease: "easeInOut" }}>
          <motion.button
            onClick={() => setActive((prev) => !prev)}
            animate={active ? "open" : "close"}
            className="relative ml-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-md md:hidden"
          >
            <motion.span
              style={{ left: "50%", top: "35%", x: "-50%", y: "-50%" }}
              className="absolute h-0.5 w-5 bg-black dark:bg-white"
              variants={{
                open: {
                  rotate: ["0deg", "0deg", "45deg"],
                  top: ["35%", "50%", "50%"],
                },
                close: {
                  rotate: ["45deg", "0deg", "0deg"],
                  top: ["50%", "50%", "35%"],
                },
              }}
              transition={{ duration: 0.3 }}
            ></motion.span>
            <motion.span
              style={{ left: "50%", top: "50%", x: "-50%", y: "-50%" }}
              className="absolute h-0.5 w-5 bg-black dark:bg-white"
              variants={{
                open: {
                  opacity: 0,
                },
                close: {
                  opacity: 1,
                },
              }}
            ></motion.span>
            <motion.span
              style={{ left: "50%", bottom: "30%", x: "-50%", y: "-50%" }}
              className="absolute h-0.5 w-5 bg-black dark:bg-white"
              variants={{
                open: {
                  rotate: ["0deg", "0deg", "-45deg"],
                  top: ["65%", "50%", "50%"],
                },
                close: {
                  rotate: ["-45deg", "0deg", "0deg"],
                  top: ["50%", "50%", "65%"],
                },
              }}
              transition={{ duration: 0.3 }}
            ></motion.span>
          </motion.button>
        </MotionConfig>
      </nav>
    </header>
  )
}

/** Nur die Navigation – kein eigenes `<main>`; die Seite (`page.tsx`) liefert `<main>` + Inhalt (z. B. Hero). */
export function Header() {
  return <StickyHeader />
}
