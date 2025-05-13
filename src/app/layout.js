import "./index.scss";

import { ViewTransitions } from "next-view-transitions";
import Header from "@/components/Header";

export const metadata = {
  title: "Andre Andreev, Director",
  description:
    "Bulgarian-born Andre Andreev is equal parts thinker and maker. He is a film director and executive producer whose work falls at the intersection of fact and fiction. He is known for capturing deep, empathic stories through expressive visual storytelling. His decade long experience as a filmmaker brings clarity and poise to complex narratives for both brands and audiences alike.",
};

export default function RootLayout({ children }) {
  return (
    <ViewTransitions>
      <html lang="en" className="snap-y snap-mandatory">
        <body className={`antialiased bg-black`}>
          <Header />
          {children}
        </body>
      </html>
    </ViewTransitions>
  );
}
