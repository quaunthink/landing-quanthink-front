import React from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import BackgroundVideo from "./components/decors/BackgroundVideo";
import Cursor from "./components/ui/Cursor";
import SocialRail from "./components/ui/SocialRail";
import ScrollToSection from "./components/transitions/ScrollToSection";
import SmoothScroll from "./components/transitions/SmoothScroll";
import GradientBeams from "./components/decors/GradientBeams";
import NoiseOverlay from "./components/decors/NoiseOverlay";
import PageTransitions from "./components/transitions/PageTransitions";

export default function App(){
  return (
    <div className="min-h-svh flex flex-col">
      <BackgroundVideo />
      <NoiseOverlay />
      <GradientBeams />
      <SmoothScroll />
      <Cursor />
      <Navbar />

      <main className="flex-1">
        <ScrollToSection>
          <PageTransitions />
        </ScrollToSection>
      </main>

      <Footer />
      <SocialRail />
    </div>
  );
}
