import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import {Trash2} from "lucide-react";

type DeleteDeviceDialogProps = {
    id: string
    name: string
    onDeleted: (id: string) => void
}

export function DeleteDeviceDialog({ id, name, onDeleted }: DeleteDeviceDialogProps) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function handleDelete() {
        setLoading(true)
        setError(null)

        try {
            const res = await fetch(`http://localhost:8080/api/devices/${id}`, {
                method: "DELETE",
            })

            if (!res.ok) {
                throw new Error("Failed to delete device")
            }

            onDeleted(id)
            setOpen(false)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="destructive" size="sm"><Trash2 />Delete</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Device</DialogTitle>
                </DialogHeader>

                <p className="text-sm">
                    Are you sure you want to <strong>permanently</strong> delete <strong>{name}</strong>?
                    This action cannot be undone.

                </p>

                {error && <p className="text-sm text-red-500">{error}</p>}

                <DialogFooter>
                    <Button
                        variant="secondary"
                        onClick={() => setOpen(false)}
                        disabled={loading}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={loading}
                    >
                        {loading ? "Deleting..." : "Delete"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
