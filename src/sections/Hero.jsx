import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import HeroExperience from "../components/HeroModels/HeroExperience";

const Hero = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".hero-subtext",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, delay: 0.5, duration: 1.2, ease: "power2.out" }
    );
  }, []);

  return (
    <section
      id="hero"
      className="relative w-screen h-screen overflow-hidden transition-all duration-500"
    >
      <div
        id="hero-content"
         className="w-full h-full relative transition-all duration-500"
      >
        {/* Background Experience */}
        <figure className="absolute inset-0 z-0 w-full h-full">
          <HeroExperience />
        </figure>

        {/* Masked Text */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="relative w-full flex flex-col items-center justify-center">
            <svg
              className="w-[100vw] max-w-none scale-[1.2]"
              viewBox="0 0 1200 400"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <mask id="video-mask" x="0" y="0" width="100%" height="100%">
                  <rect width="100%" height="100%" fill="black" />
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="100"
                    fontFamily="sans-serif"
                    fontWeight="bold"
                    fill="white"
                  >
                    HERALD
                  </text>
                </mask>
              </defs>
              <foreignObject x="0" y="0" width="100%" height="100%">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                  style={{
                    mask: 'url(#video-mask)',
                    WebkitMask: 'url(#video-mask)',
                    maskRepeat: 'no-repeat',
                    WebkitMaskRepeat: 'no-repeat',
                    maskSize: 'cover',
                    WebkitMaskSize: 'cover',
                  }}
                >
                  <source src="/assets/videos/txt-video.mp4" type="video/mp4" />
                </video>
              </foreignObject>
            </svg>

            {/* Subtitle */}
            <p className="hero-subtext absolute top-[calc(50%+4vw)] left-1/2 -translate-x-1/2 text-white/80 font-light tracking-wider uppercase whitespace-nowrap text-[clamp(0.9rem,1.5vw,1.5rem)]">
              artificial intelligence developer
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
