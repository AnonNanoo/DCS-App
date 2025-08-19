export interface Log {
    id: string;
    ipAddress: string;
    status: string;
    timestamp: string;
    message: string;
    latency?: number;
}