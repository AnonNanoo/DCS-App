import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";

type Log = {
    id: string;
    status: string;
    timestamp: string;
    message: string;
};

interface DeviceLogsProps {
    deviceId: string;
}

export function DeviceLogs({ deviceId }: DeviceLogsProps) {
    const [logs, setLogs] = useState<Log[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch logs when dialog opens
    const [open, setOpen] = useState(false);
    useEffect(() => {
        if (open) {
            setLoading(true);
            fetch(`http://localhost:8080/api/status_logs/${deviceId}`)
                .then((res) => {
                    if (!res.ok) throw new Error("Failed to fetch logs");
                    return res.json();
                })
                .then((data: Log[]) => {
                    setLogs(data);
                    setError(null);
                })
                .catch((err) => setError(err.message))
                .finally(() => setLoading(false));
        }
    }, [open, deviceId]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>{open ? "Hide Logs" : "Show Logs"}</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg max-h-[70vh] overflow-auto">
                <DialogHeader>
                    <DialogTitle>Device Logs</DialogTitle>
                    <DialogDescription>
                        View recent status logs for this device.
                    </DialogDescription>
                </DialogHeader>

                {loading && <p>Loading logs...</p>}
                {error && <p className="text-red-500">Error: {error}</p>}
                {!loading && !error && logs.length === 0 && <p>No existing logs.</p>}

                <div className="space-y-3 mt-4">
                    {logs.map((log) => (
                        <div key={log.id} className="p-2 border rounded hover:bg-gray-100">
                            <div className="flex justify-between items-center">
                                <Badge variant={log.status === "ONLINE" ? "online" : "offline"}>
                                    {log.status}
                                </Badge>
                                <small>{new Date(log.timestamp).toLocaleString()}</small>
                            </div>
                            <p>{log.message}</p>
                        </div>
                    ))}
                </div>

                <DialogClose asChild>
                    <Button className="mt-6 w-full">Close</Button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
}
