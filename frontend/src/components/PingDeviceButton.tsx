import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import {type Dispatch, type SetStateAction, useState} from "react";
import type { Device } from "@/types/device";

type PingDeviceButtonProps = {
    deviceId: string;
    setDevices: Dispatch<SetStateAction<Device[]>>;
};

export function PingDeviceButton({ deviceId, setDevices }: PingDeviceButtonProps) {
    const [loading, setLoading] = useState(false);

    async function handlePing() {
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:8080/api/devices/scan/${deviceId}`);
            if (!res.ok) throw new Error("Ping failed");
            const data = await res.json();

            setDevices(prev =>
                prev.map(device =>
                    device.id === deviceId
                        ? {
                            ...device,
                            status: data.status,
                            latency: data.latency,
                            previousCheck: new Date().toISOString()
                        }
                        : device
                )
            );

            // for logging purposes
            const logRes = await fetch(`http://localhost:8080/api/status_logs`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    deviceId: deviceId,
                    status: data.status,
                    message: "Manual ping pressed",
                }),
            });

            if (!logRes.ok) {
                console.warn("Failed to create status log");
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Button onClick={handlePing} disabled={loading}>
            {loading && <Loader2Icon className="w-5 h-5 mr-2 animate-spin" />}
            {loading ? "Pinging..." : "Ping"}
        </Button>
    );
}