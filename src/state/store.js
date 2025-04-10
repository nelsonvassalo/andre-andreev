import { create } from "zustand";

export const useStore = create((set) => ({
  videoCurTime: 0,
  setVideoTime: (time) => set({ videoCurTime: time }),
  current: null,
  setCurrent: (el) => set({ current: el }),
  viewMode: "list",
  setViewMode: (mode) => set({ viewMode: mode }),
  show: true,
  setShow: (timer) => set({ show: timer }),
  scroll: 0,
  setScroll: (val) => set({ scroll: val }),
}));
