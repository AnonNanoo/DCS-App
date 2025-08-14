import {ModeToggle} from "@/components/theme/mode-toggle";
import logo from "/dcs_logo.svg";
import AnimatedContent from "@/components/anim/Animations/AnimatedContent/AnimatedContent.tsx";


export default function Header() {
    return (
      <header className="w-screen bg-secondary text-secondary-foreground m-0 p-0 z-20">
          <div className="w-full max-w-none flex items-center justify-between px-4 py-3">
              <AnimatedContent
                  distance={150}
                  direction="horizontal"
                  reverse={true}
                  duration={0.5}
                  ease="horizontal"
                  initialOpacity={0.0}
                  animateOpacity
                  scale={1.0}
                  threshold={0.2}
                  delay={0.75}
              >
                  <div className="flex items-center gap-3">
                      <img
                      className="hover:cursor-pointer transition-transform hover:scale-105 w-20 h-10"
                      src={logo}
                      alt="DCS Logo"
                      />
                      <div className="flex flex-col">
                          <span className="text-3xl font-bold">DCS</span>
                      </div>
                  </div>
              </AnimatedContent>
              <AnimatedContent
                  distance={150}
                  direction="horizontal"
                  reverse={false}
                  duration={0.5}
                  ease="horizontal"
                  initialOpacity={0.0}
                  animateOpacity
                  scale={1.0}
                  threshold={0.2}
                  delay={0.75}
              >
                <div className="flex items-center gap-4">
                    <ModeToggle/>
                </div>
              </AnimatedContent>
          </div>
      </header>
  );
}