package anonnanoo.dcs.repository;

import anonnanoo.dcs.entity.StatusLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface StatusLogRepository extends JpaRepository<StatusLog, Long> {
}