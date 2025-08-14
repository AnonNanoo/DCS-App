package anonnanoo.dcs.utilities;

import anonnanoo.dcs.entity.Device;
import anonnanoo.dcs.entity.DeviceStatus;
import anonnanoo.dcs.entity.StatusLog;
import anonnanoo.dcs.repository.DeviceRepository;
import anonnanoo.dcs.repository.StatusLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.util.UUID;

import java.time.LocalDateTime;

@Component
public class Seeder implements CommandLineRunner {

    private final DeviceRepository deviceRepository;
    private final StatusLogRepository statusLogRepository;

    @Autowired
    public Seeder(DeviceRepository deviceRepository, StatusLogRepository statusLogRepository) {
        this.deviceRepository = deviceRepository;
        this.statusLogRepository = statusLogRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (deviceRepository.count() == 0) {

            Device device1 = new Device(
                    null,
                    "10.10.10.1",
                    "Device One"
            );

            Device device2 = new Device(
                    null,
                    "172.67.9.1",
                    "Device Two"
            );

            deviceRepository.save(device1);
            deviceRepository.save(device2);
            UUID Device1ID = device1.getId();
            UUID Device2ID = device2.getId(); // For the Log

            System.out.println("Sample Devices have been added to the database.");

            if (statusLogRepository.count() == 0) {
                StatusLog Device1Log = new StatusLog(
                        null,
                        "10.10.10.1",
                        DeviceStatus.OFFLINE,
                        LocalDateTime.now().minusMinutes(10),
                        "System is operational",
                        Device1ID
                );

                StatusLog Device2Log = new StatusLog(
                        null,
                        "172.67.9.1",
                        DeviceStatus.ONLINE,
                        LocalDateTime.now().minusMinutes(3),
                        "System is operational",
                        Device2ID
                );

                statusLogRepository.save(Device1Log);
                statusLogRepository.save(Device2Log);
                System.out.println("Status Log(s) have been added to the database.");
            }
        }
    }

}
