package de.timeboxes.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import de.timeboxes.entity.CalendarEntity;
import de.timeboxes.entity.TimeboxEntity;

public interface TimeboxRepository extends JpaRepository<TimeboxEntity, Long> {
    TimeboxEntity findByGuid(UUID guid);
    List<TimeboxEntity> findByCalendar(CalendarEntity calendar);
    void deleteByGuid(UUID guid);
}
