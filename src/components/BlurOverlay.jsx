import { motion as m } from "motion/react";

const BlurOverlay = ({ classes }) => (
  <m.div
    className={`gradient-blur ${classes ? classes : ""}`}
    initial={{ y: "100%" }}
    transition={{ duration: 0.4 }}
    animate={{ y: "0%" }}
    exit={{ y: "100%" }}
    key={"bottom"}
    style={{
      viewTransitionName: `blur-${Math.random()}`,
      viewTransitionClass: "null",
    }}
  >
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </m.div>
);

export default BlurOverlay;
