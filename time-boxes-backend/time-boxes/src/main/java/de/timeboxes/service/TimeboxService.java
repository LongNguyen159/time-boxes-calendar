package de.timeboxes.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import de.timeboxes.entity.CalendarEntity;
import de.timeboxes.entity.TimeboxEntity;
import de.timeboxes.repository.CalendarRepository;
import de.timeboxes.repository.TimeboxRepository;

@Service
public class TimeboxService {
    // ******** CRUD Operations ********
    private final TimeboxRepository timeboxRepository;
    private final CalendarRepository calendarRepository;

    public TimeboxService(TimeboxRepository timeboxRepository, CalendarRepository calendarRepository) {
        this.timeboxRepository = timeboxRepository;
        this.calendarRepository = calendarRepository;
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

    public List<TimeboxEntity> getTimeboxesByCalendar(CalendarEntity calendar) {
        return timeboxRepository.findByCalendar(calendar);
    }

    @Transactional
    public TimeboxEntity addTimeboxToCalendar(Long calendarId, TimeboxEntity timebox) {
        CalendarEntity calendar = calendarRepository.findById(calendarId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Calendar not found"));
        timebox.setCalendar(calendar);
        return timeboxRepository.save(timebox);
    }

    @Transactional
    public TimeboxEntity updateTimeboxById(Long id, TimeboxEntity updatedTimebox) {
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
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Timebox not found"));
    }

    @Transactional
    public TimeboxEntity updateTimeboxByGuid(UUID guid, TimeboxEntity updatedTimebox) {
        return Optional.ofNullable(timeboxRepository.findByGuid(guid))
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
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Timebox not found"));
    }

    @Transactional
    public void deleteTimeboxById(Long id) {
        timeboxRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Timebox not found"));
        timeboxRepository.deleteById(id);
    }

    @Transactional
    public void deleteTimeboxByGuid(UUID guid) {
        TimeboxEntity timebox = timeboxRepository.findByGuid(guid);
        if (timebox == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Timebox not found");
        }
        timeboxRepository.deleteByGuid(guid);
    }
}
