package de.timeboxes.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import de.timeboxes.entity.TimeboxEntity;
import de.timeboxes.repository.TimeboxRepository;

@Service
public class TimeboxService {
    // ******** CRUD Operations ********
    private final TimeboxRepository timeboxRepository;

    public TimeboxService(TimeboxRepository timeboxRepository) {
        this.timeboxRepository = timeboxRepository;
    }

    public List<TimeboxEntity> getAllTimeboxes() {
        return timeboxRepository.findAll();
    }

    public Optional<TimeboxEntity> getTimeboxById(Long id) {
        return timeboxRepository.findById(id);
    }

    public Optional<TimeboxEntity> getTimeboxByGuid(UUID guid) {
        return Optional.ofNullable(timeboxRepository.findByGuid(guid));
    }

    public TimeboxEntity createTimebox(TimeboxEntity timebox) {
        return timeboxRepository.save(timebox);
    }

    public TimeboxEntity updateTimebox(Long id, TimeboxEntity updatedTimebox) {
        return timeboxRepository.findById(id)
                .map(timebox -> {
                    timebox.setSubject(updatedTimebox.getSubject());
                    timebox.setStartTime(updatedTimebox.getStartTime());
                    timebox.setEndTime(updatedTimebox.getEndTime());
                    timebox.setIsAllDay(updatedTimebox.getIsAllDay());
                    timebox.setStartTimezone(updatedTimebox.getStartTimezone());
                    timebox.setEndTimezone(updatedTimebox.getEndTimezone());
                    timebox.setRecurrenceRule(updatedTimebox.getRecurrenceRule());
                    return timeboxRepository.save(timebox);
                })
                .orElseThrow(() -> new RuntimeException("Timebox not found"));
    }

    public void deleteTimebox(Long id) {
        timeboxRepository.deleteById(id);
    }
}
