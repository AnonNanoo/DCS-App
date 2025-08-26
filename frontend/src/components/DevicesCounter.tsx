import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import type { Device } from "@/types/device";
import Counter from "@/components/anim/Components/Counter/Counter";
import {Wifi, WifiOff} from "lucide-react";

export function DevicesCounter({ devices }: { devices: Device[] }) {
    const [onlineCount, setOnlineCount] = useState(0);
    const [offlineCount, setOfflineCount] = useState(0);

    useEffect(() => {
        const online = devices.filter(device => device.status === "ONLINE").length;
        const offline = devices.filter(device => device.status !== "ONLINE").length;

        setOnlineCount(online);
        setOfflineCount(offline);
    }, [devices]);

    return (
        <div className="flex gap-4 p-4">
            <Badge variant="online" className="flex items-center gap-1">
                <Wifi className="w-4 h-4 mr-1" />
                Online:
                <Counter
                    value={onlineCount}
                    places={[1]}
                    fontSize={15}
                    textColor="white"
                    fontWeight={500}
                    gradientHeight={0}
                />
            </Badge>
            <Badge variant="offline" className="flex items-center gap-1">
                <WifiOff className="w-4 h-4 mr-1" />
                Offline:
                <Counter
                    value={offlineCount}
                    places={[1]}
                    fontSize={15}
                    textColor="white"
                    fontWeight={500}
                    gradientHeight={0}
                />
            </Badge>
        </div>
    );
}