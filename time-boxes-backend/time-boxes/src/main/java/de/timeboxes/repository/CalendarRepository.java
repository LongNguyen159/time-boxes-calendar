package de.timeboxes.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import de.timeboxes.entity.CalendarEntity;

public interface CalendarRepository extends JpaRepository<CalendarEntity, Long> {
}

