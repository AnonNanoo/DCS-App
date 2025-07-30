import {ModeToggle} from "@/components/theme/mode-toggle";
import logo from "/dcs_logo.svg";

export default function Header() {
  return (
      <>
          <header className="w-full bg-secondary text-secondary-foreground">
              <div className="container mx-auto max-w-7xl flex items-center justify-between px-8 py-4">
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

                  <div className="flex items-center gap-4">
                      <ModeToggle/>
                  </div>
              </div>
          </header>
      </>
  );
}