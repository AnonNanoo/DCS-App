export interface Device {
    id: string;
    name: string;
    ipAddress: string;
    macAddress?: string;
    latency?: number;
    status?: "ONLINE" | "OFFLINE";
    previousCheck: string;
}