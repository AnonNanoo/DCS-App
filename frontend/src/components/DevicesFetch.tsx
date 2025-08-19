import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DeleteDeviceDialog } from "@/components/DeleteDeviceDialog";
import { EditDeviceDialog } from "@/components/EditDeviceDialog";
import { type Device } from "@/types/device";
import type {Dispatch, SetStateAction} from "react";
import {PingDeviceButton} from "@/components/PingDeviceButton.tsx";
import {DeviceLogs} from "@/components/DeviceLogs.tsx";
import {Badge} from "@/components/ui/badge";

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
                <div className="flex flex-row flex-wrap gap-x-4 gap-y-4">
                    {devices.map((device) => (
                        <Card key={device.id} className="w-300 min-h-40">
                            <CardHeader>
                                    <CardTitle>{device.name}</CardTitle>
                                    <CardDescription>{device.ipAddress}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3 mt-4">
                                    Status:{" "}
                                    <Badge variant={device.status === "ONLINE" ? "online" : "offline"}>
                                        {device.status ?? "OFFLINE"}
                                    </Badge>
                                    <p className="mt-2 text-sm text-muted-foreground">
                                        Last checked:{" "}
                                        {device.previousCheck
                                            ? new Date(device.previousCheck).toLocaleString()
                                            : "Never, so do it."}
                                    </p>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between items-center">
                                <div className="flex gap-2">
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
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </>
    );
}