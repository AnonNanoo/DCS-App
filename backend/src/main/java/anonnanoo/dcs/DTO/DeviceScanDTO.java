package anonnanoo.dcs.DTO;

import anonnanoo.dcs.entity.DeviceStatus;

public class DeviceScanDTO {
    private String ipAddress;
    private String macAddress;
    private String hostName;
    private double latency; // in milliseconds
    private DeviceStatus status;

    public DeviceScanDTO() {}

    public DeviceScanDTO(String ipAddress, String macAddress, String hostName, double latency, DeviceStatus status) {
        this.ipAddress = ipAddress;
        this.macAddress = macAddress;
        this.hostName = hostName;
        this.latency = latency;
        this.status = status;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    public String getMacAddress() {
        return macAddress;
    }

    public void setMacAddress(String macAddress) {
        this.macAddress = macAddress;
    }

    public String getHostName() {
        return hostName;
    }

    public void setHostName(String hostName) {
        this.hostName = hostName;
    }

    public double getLatency() {
        return latency;
    }

    public void setLatency(double latency) {
        this.latency = latency;
    }

    public DeviceStatus getStatus() {
        return status;
    }

    public void setStatus(DeviceStatus status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "DeviceScanDTO{" +
                "ipAddress='" + ipAddress + '\'' +
                ", macAddress='" + macAddress + '\'' +
                ", hostName='" + hostName + '\'' +
                ", latency=" + latency +
                ", status=" + status +
                '}';
    }
}
