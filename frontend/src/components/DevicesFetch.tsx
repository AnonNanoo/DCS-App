import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DeleteDeviceDialog } from "@/components/DeleteDeviceDialog";
import { EditDeviceDialog } from "@/components/EditDeviceDialog";
import { type Device } from "@/types/device";
import type {Dispatch, SetStateAction} from "react";
import {PingDeviceButton} from "@/components/PingDeviceButton.tsx";
import {DeviceLogs} from "@/components/DeviceLogs.tsx";

type DeviceFetcherProps = {
    devices: Device[];
    setDevices: Dispatch<SetStateAction<Device[]>>;
    fetchDevices: () => void;
};

export function DeviceFetcher({ devices, setDevices, fetchDevices }: DeviceFetcherProps) {
    return (
        <>
            {devices.length === 0 ? (
                <>
                    <h1 className="text-4xl font-bold text-center">Welcome to DCS</h1>
                    <p className="text-center mt-4 text-muted-foreground">Your Devices will show here.</p>
                </>
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
                                        {device.status ?? "OFFLINE"}
                                    </Badge>
                                </p>
                                <p className="mt-2 text-sm text-muted-foreground">
                                    Last checked:{" "}
                                    {device.previousCheck
                                        ? new Date(device.previousCheck).toLocaleString()
                                        : "Never, so do it."}
                                </p>
                            </CardContent>
                            <CardFooter>
                                <DeleteDeviceDialog
                                    id={device.id}
                                    name={device.name}
                                    onDeleted={() => fetchDevices()}
                                />
                                <EditDeviceDialog
                                    device={{ id: device.id, name: device.name, ipAddress: device.ipAddress }}
                                    onUpdated={() => fetchDevices()}
                                />
                                <PingDeviceButton
                                    deviceId={device.id}
                                    setDevices={setDevices}
                                />
                                <DeviceLogs deviceId={device.id} />
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </>
    );
}