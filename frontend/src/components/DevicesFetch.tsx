import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DeleteDeviceDialog } from "@/components/DeleteDeviceDialog";
import { EditDeviceDialog } from "@/components/EditDeviceDialog";
import { type Device } from "@/types/device";
import type {Dispatch, SetStateAction} from "react";
import {PingDeviceButton} from "@/components/PingDeviceButton.tsx";
import {DeviceLogs} from "@/components/DeviceLogs.tsx";
import {Badge} from "@/components/ui/badge";
import {Info} from "lucide-react";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@radix-ui/react-hover-card";

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
                        <Card
                            key={device.id}
                            className="relative w-96 min-h-40 flex flex-col justify-between"
                        >
                            <div className="absolute top-4 right-4">
                                <Badge variant={device.status === "ONLINE" ? "online" : "offline"}>
                                    {device.status ?? "OFFLINE"}
                                </Badge>
                            </div>

                            <div className="w-full">
                                <CardHeader  className="px-10 pt-4 pb-0 flex items-center gap-2">
                                    <CardTitle>{device.name}</CardTitle>
                                    <CardDescription>{device.ipAddress}</CardDescription>
                                </CardHeader>
                                <CardContent className="justify-self-start">
                                    <div className="mt-1">
                                        <HoverCard>
                                            <HoverCardTrigger className="mt-2 text-sm text-muted-foreground group inline-flex">
                                                Mac Address: {device.macAddress ?? "Unknown"}
                                                <Info className="ml-1 w-4 h-4 text-muted-foreground cursor-pointer" />
                                            </HoverCardTrigger>
                                            <HoverCardContent asChild={true}>
                                                <Card className="w-60">
                                                    <CardHeader>
                                                        <CardDescription>
                                                            Unique device identifier, though often randomized or hidden on modern systems.
                                                        </CardDescription>
                                                    </CardHeader>
                                                </Card>
                                            </HoverCardContent>
                                        </HoverCard>
                                        <p className="mt-2 ml-10 text-sm text-muted-foreground">
                                            &nbsp;&nbsp;Last checked:{" "}
                                            {device.previousCheck
                                                ? new Date(device.previousCheck).toLocaleString()
                                                : "Unknown"}
                                        </p>
                                        <p className="pl-10 mt-2 text-sm text-muted-foreground justify-self-start">
                                            &nbsp;&nbsp;Latency:{" "}
                                            {device.latency !== undefined
                                                ? `${device.latency} ms`
                                                : "Unknown"}
                                        </p>
                                    </div>
                                </CardContent>
                            </div>

                            <CardFooter className="flex gap-2 self-end mt-3 pr-10">
                                <DeleteDeviceDialog
                                    id={device.id}
                                    name={device.name}
                                    onDeleted={() => fetchDevices()}
                                />
                                <EditDeviceDialog
                                    device={{
                                        id: device.id,
                                        name: device.name,
                                        ipAddress: device.ipAddress,
                                    }}
                                    onUpdated={() => fetchDevices()}
                                />
                                <PingDeviceButton deviceId={device.id} setDevices={setDevices} />
                                <DeviceLogs deviceId={device.id} />
                            </CardFooter>
                        </Card>
                    ))}
                </div>

            )}
        </>
    );
}