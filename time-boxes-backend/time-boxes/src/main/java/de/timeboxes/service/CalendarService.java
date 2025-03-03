package de.timeboxes.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import de.timeboxes.repository.CalendarRepository;

import de.timeboxes.entity.CalendarEntity;;

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

    public CalendarEntity createCalendar(CalendarEntity calendar) {
        return calendarRepository.save(calendar);
    }

    public CalendarEntity updateCalendar(Long id, CalendarEntity updatedCalendar) {
        return calendarRepository.findById(id)
                .map(calendar -> {
                    calendar.setName(updatedCalendar.getName());
                    return calendarRepository.save(calendar);
                })
                .orElseThrow(() -> new RuntimeException("Calendar not found"));
    }

    public void deleteCalendar(Long id) {
        calendarRepository.deleteById(id);
    }
}
