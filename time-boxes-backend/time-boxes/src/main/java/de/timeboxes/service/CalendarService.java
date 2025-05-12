package de.timeboxes.service;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import de.timeboxes.repository.CalendarRepository;
import de.timeboxes.entity.CalendarEntity;
import de.timeboxes.entity.TimeboxEntity;;

@Service
public class CalendarService {

    // ******** CRUD Operations ********
    private final CalendarRepository calendarRepository;

    public CalendarService(CalendarRepository calendarRepository) {
        this.calendarRepository = calendarRepository;
    }

    public List<CalendarEntity> getAllCalendars() {
        return calendarRepository.findAll();
    }

    public Optional<CalendarEntity> getCalendarById(Long id) {
        return calendarRepository.findById(id);
    }

    @Transactional
    public CalendarEntity createCalendar(CalendarEntity calendar) {
        for (TimeboxEntity timebox : calendar.getTimeboxes()) {
            timebox.setCalendar(calendar);
        }
        return calendarRepository.save(calendar);
    }

    @Transactional
    public CalendarEntity updateCalendar(Long id, CalendarEntity updatedCalendar) {
        return calendarRepository.findById(id)
                .map(calendar -> {
                    calendar.setName(updatedCalendar.getName());
                    return calendarRepository.save(calendar);
                })
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Calendar not found"));
    }

    @Transactional
    public void deleteCalendar(Long id) {
        CalendarEntity calendar = calendarRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Calendar not found"));
        calendarRepository.delete(calendar);
    }
}
