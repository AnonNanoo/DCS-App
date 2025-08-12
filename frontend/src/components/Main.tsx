import { useEffect, useState } from "react";
import { DeviceFetcher } from "@/components/DevicesFetch.tsx";
import { AddDeviceDialog } from "@/components/AddDeviceDialog";
import type { Device } from "@/types/device";

export default function Main() {
    const [devices, setDevices] = useState<Device[]>([]);
    const fetchDevices = () => {
        fetch("http://localhost:8080/api/devices")
            .then((res) => res.json())
            .then((data) => setDevices(data));
    };

    useEffect(() => {
        fetchDevices();
    }, []);

    return (
        <main className="flex-1">
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-center mb-8">
                    <AddDeviceDialog fetchDevices={fetchDevices} />
                </div>
                <DeviceFetcher
                    devices={devices}
                    setDevices={setDevices}
                    fetchDevices={fetchDevices}
                />
            </div>
        </main>
    );
}