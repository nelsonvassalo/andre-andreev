"use client";

import { usePathname } from "next/navigation";
import { motion as m } from "motion/react";
import { useEffect, useRef } from "react";
import { useStore } from "@/state/store";
import Link from "next/link";

const Header = () => {
  const { show, setShow, headerScrolled, setHeaderScrolled } = useStore();
  const header = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    let timer;

    console.log({ pathname });

    // Disable UI on project pages
    if (pathname.includes("projects")) {
      setShow(false);

      window.addEventListener("mousemove", () => {
        clearTimeout(timer);
        setShow(true);
        timer = setTimeout(() => {
          setShow(false);
        }, 2500);
      });
    }

    if (pathname.includes("info" || "projects")) {
      setHeaderScrolled(true);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [pathname]);

  return (
    <m.header animate={{ opacity: show ? 1 : 0 }} ref={header}>
      <nav
        className="fixed top-0 w-full text-white uppercase font-[100] tracking-[0.05em] text-[0.9375em] z-20"
        style={{ viewTransitionName: "nav-top", viewTransitionClass: "null" }}
      >
        <ul className="flex justify-between w-full p-4">
          <li className="w-1/3">
            <Link
              href="/#projects"
              className={`transition-all duration-700 ease-[cubic-bezier(0.25, 0.1, 0.25, 1)] hover:tracking-[0.12em] hover:font-[500] ${
                pathname === "/" ? " active" : ""
              }`}
            >
              Projects
            </Link>
          </li>
          {headerScrolled || show}
          <m.li
            className=" text-center"
            initial={{ y: "-150%", opacity: 0 }}
            animate={{
              y:
                headerScrolled || (pathname.includes("/project/") && show)
                  ? 0
                  : "-150%",
              opacity:
                headerScrolled || (pathname.includes("/project/") && show)
                  ? 1
                  : 0,
            }}
          >
            <Link
              href="/"
              className="skip transition-all duration-700 ease-[cubic-bezier(0.25, 0.1, 0.25, 1)] tracking-[0.12em]  transition-all duration-300 ease-[cubic-bezier(0.25, 0.1, 0.25, 1)] hover:font-[500] hover:tracking-[0.2em]"
              onClick={(e) => {
                if (pathname === "/") {
                  e.preventDefault();

                  window.scroll(0, 0, { behavior: "smooth" });
                }
              }}
            >
              Andre Андреев
            </Link>
          </m.li>
          <li className="w-1/3 text-right">
            <Link
              href="/info"
              className={`duration-700 ease-[cubic-bezier(0.25, 0.1, 0.25, 1)] transition-all hover:tracking-[0.12em] hover:font-[500]${
                pathname === "/info" ? " active" : ""
              }`}
            >
              Info
            </Link>
          </li>
        </ul>
      </nav>

      <nav
        className="fixed bottom-0 w-full text-white uppercase font-[100] tracking-[0.05em] text-[0.9375em] z-20 pointer-events-none"
        style={{
          viewTransitionName: "nav-bottom",
          viewTransitionClass: "null",
        }}
      >
        <ul className="flex justify-between w-full p-4">
          <li className="w-1/3">
            <Link
              href="/#projects"
              className={`duration-700 ease-[cubic-bezier(0.25, 0.1, 0.25, 1)] pointer-events-auto transition-all hover:tracking-[0.12em] hover:font-[500]${
                pathname === "/" ? " active" : ""
              }`}
            >
              Проекти
            </Link>
          </li>

          <li className="w-1/3 text-right">
            <Link
              href="info"
              className={`duration-700 ease-[cubic-bezier(0.25, 0.1, 0.25, 1)] pointer-events-auto transition-all hover:tracking-[0.12em] hover:font-[500]${
                pathname === "/info" ? " active" : ""
              }`}
            >
              Инфо
            </Link>
          </li>
        </ul>
      </nav>
    </m.header>
  );
};
export default Header;
