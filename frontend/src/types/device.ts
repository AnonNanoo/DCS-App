export interface Device {
    id: string;
    name: string;
    ipAddress: string;
    status: "ONLINE" | "OFFLINE";
    previousCheck: string | null;
}