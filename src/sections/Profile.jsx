import { useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Profile = () => {
  useGSAP(() => {
    const hero = document.getElementById("hero-content");

    if (!hero) return;

    ScrollTrigger.create({
      trigger: "#about",
      start: "top bottom-=100", // About top is 100px above bottom of screen
      end: "top top",           // About top reaches top of screen
      scrub: true,
      onUpdate: (self) => {
        const blur = self.progress * 10; // up to 10px blur
        gsap.set(hero, {
          filter: `blur(${blur}px)`,
        });
      },
    });
  }, []);

  return (
    <section
      id="about"
      className="relative min-h-screen z-10 text-white flex items-center bg-transparent"
    >
      <div className="layout-container py-20 bg-black/60 backdrop-blur-md rounded-xl shadow-xl">
        {/* Content goes here */}
      </div>
    </section>
  );
};

export default Profile;
