import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import type { Device } from "@/types/device";

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
            <Badge variant="online">Online: {onlineCount}</Badge>
            <Badge variant="offline">Offline: {offlineCount}</Badge>
        </div>
    );
}