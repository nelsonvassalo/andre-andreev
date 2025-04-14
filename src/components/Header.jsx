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

    // Disable UI on project pages
    if (pathname.includes("projects")) {
      timer = setTimeout(() => {
        setShow(false);
      }, 1000);

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

  useEffect(() => {
    const menus = Array.from(header.current.querySelectorAll("ul"));
    const linkMap = menus.map((menu, mI) => {
      const links = Array.from(menu.querySelectorAll("a"));
      return links;
    });

    linkMap.forEach((menu, mI) => {
      // Each language menu
      menu.forEach((link, index) => {
        // Each link in the menu
        link.addEventListener("mouseenter", () => {
          linkMap[0][index].style.fontWeight = "300";
          linkMap[1][index].style.fontWeight = "300";
          console.log("hovered");
        });
        link.addEventListener("mouseleave", () => {
          linkMap[0][index].style.fontWeight = "100";
          linkMap[1][index].style.fontWeight = "100";
        });
      });
    });
  }, []);

  return (
    <m.header animate={{ opacity: show ? 1 : 0 }} ref={header}>
      <nav
        className="fixed top-0 w-full text-white uppercase font-[100] tracking-[0.13em] text-[.8125rem] z-20"
        style={{ viewTransitionName: "nav-top", viewTransitionClass: "null" }}
      >
        <ul className="flex justify-between w-full p-4">
          <li className="w-1/3">
            <Link href="/" className="transition-all">
              Projects
            </Link>
          </li>
          <m.li
            className="tracking-[0.15em] text-center"
            initial={{ y: "-100%", opacity: 0 }}
            animate={{
              y: headerScrolled ? 0 : "-100%",
              opacity: headerScrolled ? 1 : 0,
            }}
          >
            Andre Андреев
          </m.li>
          <li className="w-1/3 text-right">
            <Link href="/info" className="transition-all">
              Info
            </Link>
          </li>
        </ul>
      </nav>

      <nav
        className="fixed bottom-0 w-full text-white uppercase font-[100] tracking-[0.13em] text-[.8125rem] z-20"
        style={{
          viewTransitionName: "nav-bottom",
          viewTransitionClass: "null",
        }}
      >
        <ul className="flex justify-between w-full p-4">
          <li className="w-1/3">
            <Link href="/" className="transition-all">
              Проекти
            </Link>
          </li>
          <m.li
            className="tracking-[0.15em] text-center w-1/3"
            initial={{ y: "100%" }}
            animate={{
              y: headerScrolled ? 0 : "100%",
              opacity: headerScrolled ? 1 : 0,
            }}
          >
            Andre Андреев
          </m.li>
          <li className="w-1/3 text-right">
            <Link href="info" className="transition-all">
              Инфо
            </Link>
          </li>
        </ul>
      </nav>
    </m.header>
  );
};
export default Header;
