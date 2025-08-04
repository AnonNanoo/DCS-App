import { useEffect, useState } from "react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Badge} from "@/components/ui/badge.tsx";

interface Device {
    id: string;
    name: string;
    ipAddress: string;
    status: "ONLINE" | "OFFLINE";
    previousCheck: string | null;
}

export default function DeviceFetcher() {
    const [devices, setDevices] = useState<Device[]>([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/devices")
            .then((res) => res.json())
            .then((data) => {
                setDevices(data);
            });
    }, []);


    return (
        <>
            {devices.length === 0 ? (
                <><h1 className="text-4xl font-bold text-center">Welcome to DCS</h1><p
                    className="text-center mt-4 text-muted-foreground">Your Devices will show here.</p></>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {devices.map((device) => (
                        <Card key={device.id}>
                            <CardHeader>
                                <CardTitle>{device.name}</CardTitle>
                                <CardDescription>{device.ipAddress}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>
                                    Status:{" "}
                                    <Badge variant={device.status === "ONLINE" ? "online" : "offline"}>
                                        {device.status}
                                    </Badge>
                                </p>
                                <p className="mt-2 text-sm text-muted-foreground">
                                    Last checked:{" "}
                                    {device.previousCheck
                                        ? new Date(device.previousCheck).toLocaleString()
                                        : "Never"}
                                </p>
                            </CardContent>
                            <CardFooter>
                                <p>Hi</p>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </>
    );

}
