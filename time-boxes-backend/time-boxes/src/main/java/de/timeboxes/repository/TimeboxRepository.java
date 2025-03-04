package de.timeboxes.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import de.timeboxes.entity.TimeboxEntity;

public interface TimeboxRepository extends JpaRepository<TimeboxEntity, Long> {
    TimeboxEntity findByGuid(UUID guid);
}
