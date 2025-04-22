"use client";

import { useCallback } from "react";
import { useTransitionRouter } from "next-view-transitions";
import { useStore } from "@/state/store";

// Custom hook to handle navigation with scroll restoration during view transitions
export function useViewTransitionWithScroll() {
  const router = useTransitionRouter();
  const { scrollPosition, setScroll } = useStore();

  const navigateToProject = useCallback(
    (slug) => {
      // Save current scroll position
      setScroll(window.scrollY);

      // Use router to push to new page
      router.push(`/projects/${slug}`);
    },
    [router, setScroll]
  );

  // Navigate back to list with scroll restoration
  const navigateBackToList = useCallback(() => {
    // Get stored scroll position
    const targetPosition = scrollPosition;

    // Use View Transitions API if available
    if (document.startViewTransition) {
      const transition = document.startViewTransition(async () => {
        await router.push("/");
      });

      // Once transition is ready (but before animation starts),
      // restore the scroll position
      transition.ready.then(() => {
        // Use requestAnimationFrame to ensure DOM is ready
        requestAnimationFrame(() => {
          window.scrollTo({
            top: targetPosition,
            behavior: "instant",
          });
        });
      });

      return;
    }

    // Fallback without View Transitions API
    router.push("/");
    requestAnimationFrame(() => {
      window.scrollTo({
        top: targetPosition,
        behavior: "instant",
      });
    });
  }, [router, scrollPosition]);

  return {
    navigateToProject,
    navigateBackToList,
  };
}
