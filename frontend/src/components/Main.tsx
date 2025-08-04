import DeviceFetcher from './DevicesFetch';

export default function Main() {
    return (
        <main className="flex-1">
            <div className="container mx-auto px-4 py-8">
                <DeviceFetcher />
            </div>
        </main>
    );
}