import { useEffect, useState } from "react";
import { DeviceFetcher } from "@/components/DevicesFetch.tsx";
import type { Device } from "@/types/device";

export default function Main() {
    const [devices, setDevices] = useState<Device[]>([]);
    const fetchDevices = async () => {
        const res = await fetch("http://localhost:8080/api/devices");
        const devices: Device[] = await res.json();

        // Fetch the most recent log entry for each and every device
        const updatedDevices = await Promise.all(
            devices.map(async (device) => {
                try {
                    const logRes = await fetch(`http://localhost:8080/api/status_logs/latest/${device.id}`);
                    if (!logRes.ok) return device;
                    const log = await logRes.json();
                    return {
                        ...device,
                        previousCheck: log.timestamp,
                        status: log.status,
                        latency: log.latency
                    };
                } catch {
                    return device;
                }
            })
        );
        setDevices(updatedDevices);
    };

    useEffect(() => {
        fetchDevices();
    }, []);

    return (
        <main className="flex-1">
            <div className="container mx-auto px-4 py-8">
                <DeviceFetcher
                    devices={devices}
                    setDevices={setDevices}
                    fetchDevices={fetchDevices}
                />
            </div>
        </main>
    );
}