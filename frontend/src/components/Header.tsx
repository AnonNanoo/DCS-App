import {ModeToggle} from "@/components/theme/mode-toggle";
import logo from "/dcs_logo.svg";
import {AddDeviceDialog} from "@/components/AddDeviceDialog.tsx";


export default function Header() {
    return (
      <header className="w-screen bg-secondary text-secondary-foreground m-0 p-0">
          <div className="w-full max-w-none flex items-center justify-between px-4 py-3">
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
              <div>
                  <AddDeviceDialog />
              </div>

              <div className="flex items-center gap-4">
                  <ModeToggle/>
              </div>
          </div>
      </header>
  );
}