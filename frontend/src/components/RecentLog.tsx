import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import type { Log } from "@/types/log";

interface RecentLogProps {
    deviceId: string;
    refreshKey?: number;
}

export function RecentLog({ deviceId, refreshKey }: RecentLogProps) {
    const [log, setLog] = useState<Log | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        const url = `http://localhost:8080/api/status_logs/latest/${deviceId}?_=${Date.now()}`;
        fetch(url)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch log");
                return res.json();
            })
            .then((data: Log) => {
                setLog(data);
                setError(null);
            })
            .catch(() => {
                setLog(null);
                setError(null);
            })
            .finally(() => setLoading(false));
    }, [deviceId, refreshKey]);

    return (
        <>
            {loading && <p>Loading recent log...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}
            {!loading && !error && !log && <p>Status: <Badge variant="offline">OFFLINE</Badge></p>}
            {log && (
                <div className="space-y-3 mt-4">
                    Status:{" "}
                    <Badge variant={log.status === "ONLINE" ? "online" : "offline"}>
                        {log.status ?? "OFFLINE"}
                    </Badge>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Last checked:{" "}
                        {log.timestamp
                            ? new Date(log.timestamp).toLocaleString()
                            : "Never, so do it."}
                    </p>
                </div>
            )}
        </>
    );
}