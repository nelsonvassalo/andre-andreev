import { create } from "zustand";

export const useStore = create((set) => ({
  viewMode: "list",
  setViewMode: (mode) => set({ viewMode: mode }),
  current: null,
  setCurrent: (index) => set({ current: index }),
  show: true,
  setShow: (value) => set({ show: value }),
  scrollPosition: 0,
  setScroll: (value) => set({ scrollPosition: value }),
  autoPlay: false,
  setAutoPlay: (value) => set({ autoPlay: value }),
  headerScrolled: false,
  setHeaderScrolled: (value) => set({ headerScrolled: value }),
  projects: [],
  setProjects: (val) => set({ projects: val }),
}));
