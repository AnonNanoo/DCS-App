package anonnanoo.dcs.utilities;

import anonnanoo.dcs.entity.Device;
import anonnanoo.dcs.entity.DeviceStatus;
import anonnanoo.dcs.entity.StatusLog;
import anonnanoo.dcs.repository.DeviceRepository;
import anonnanoo.dcs.repository.StatusLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

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
                    "Device One",
                    DeviceStatus.ONLINE,
                    LocalDateTime.now().minusMinutes(5)
            );
            Device device2 = new Device(
                    null,
                    "172.67.9.1",
                    "Device Two",
                    DeviceStatus.OFFLINE,
                    LocalDateTime.now().minusHours(1)
            );

            deviceRepository.save(device1);
            deviceRepository.save(device2);

            System.out.println("Sample Devices have been added to the database.");
        }

        if (statusLogRepository.count() == 0) {
            StatusLog systemStatusLog = new StatusLog(
                    null,
                    DeviceStatus.ONLINE,
                    LocalDateTime.now().minusMinutes(3)
            );

            statusLogRepository.save(systemStatusLog);
            System.out.println("Global Status Log has been added to the database.");
        }
    }
}
