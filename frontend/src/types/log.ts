export interface Log {
    id: string;
    ipAddress: string;
    macAddress?: string;
    timestamp: string;
    message: string;
    latency?: number;
    status?: "ONLINE" | "OFFLINE";
}