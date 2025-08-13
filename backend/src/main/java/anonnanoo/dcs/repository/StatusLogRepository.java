package anonnanoo.dcs.repository;

import anonnanoo.dcs.entity.Device;
import anonnanoo.dcs.entity.StatusLog;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface StatusLogRepository extends JpaRepository<StatusLog, Long> {
    Optional<StatusLog> findById(UUID id);

    @Transactional
    void deleteByDeviceId(UUID id);

    List<StatusLog> findByDeviceId(UUID deviceId);

    StatusLog findFirstByDeviceIdOrderByTimestampDesc(UUID deviceId);
}