"use client";

import { usePathname } from "next/navigation";
import { motion as m } from "motion/react";
import { useEffect, useState } from "react";
import { useStore } from "@/state/store";

const Header = () => {
  const { show, setShow } = useStore();
  const pathname = usePathname();

  useEffect(() => {
    let timer;
    if (pathname.includes("projects")) {
      timer = setTimeout(() => {
        console.log("timed out");
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

    return () => {
      clearTimeout(timer);
    };
  }, [pathname]);

  return (
    <m.header animate={{ opacity: show ? 1 : 0 }}>
      <nav
        className="fixed top-0 w-full text-white uppercase font-[100] tracking-[0.13em] text-[.8125rem] z-20"
        style={{ viewTransitionName: "nav-top", viewTransitionClass: "null" }}
      >
        <ul className="flex justify-between w-full p-4">
          <li>Projects</li>
          <li className="tracking-[0.15em]">Andre Андреев</li>
          <li>Info</li>
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
          <li>Проекти</li>
          <li className="tracking-[0.15em]">Andre Андреев</li>
          <li>Инфо</li>
        </ul>
      </nav>
    </m.header>
  );
};
export default Header;
