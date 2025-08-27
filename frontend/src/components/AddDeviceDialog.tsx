
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {type FormEvent, useState} from "react";
import { CircleFadingPlus } from "lucide-react";

const ipv4Regex = /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/;

type AddDeviceDialogProps = {
    fetchDevices: () => void;
};

export function AddDeviceDialog({ fetchDevices }: AddDeviceDialogProps) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [ipAddress, setIpAddress] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const isIpValid = ipv4Regex.test(ipAddress);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setError(null);

        if (!isIpValid) {
            setError("Please enter a valid IPv4 address.");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("http://localhost:8080/api/devices", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, ipAddress }),
            });
            if (!res.ok) {
                throw new Error("Device with this IP already exists or another error occurred.");
            }
            const createdDevice = await res.json();

            setName("");
            setIpAddress("");
            setOpen(false);

            console.log("Device created:", createdDevice);
            fetchDevices();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button><CircleFadingPlus />Add New Device</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add a New Device</DialogTitle>
                    <DialogDescription>Enter the device name and IP address.</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Name
                        </label>
                        <Input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            disabled={loading}
                            placeholder="Device name"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            IP Address
                        </label>
                        <Input
                            id="ipAddress"
                            type="text"
                            value={ipAddress}
                            onChange={(e) => setIpAddress(e.target.value)}
                            required
                            disabled={loading}
                            placeholder="192.168.1.1"
                            aria-invalid={!isIpValid && ipAddress.length > 0}
                        />
                        {!isIpValid && ipAddress.length > 0 && (<p className="text-red-600 text-sm mt-1">Invalid IPv4 address format.</p>)}
                    </div>

                    {error && <p className="text-red-600 text-sm">{error}</p>}

                    <DialogFooter>
                        <Button type="submit" disabled={loading || !isIpValid}>
                            {loading ? "Adding..." : "Add Device"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
