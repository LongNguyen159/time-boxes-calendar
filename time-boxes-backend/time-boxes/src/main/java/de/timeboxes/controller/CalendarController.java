package de.timeboxes.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import de.timeboxes.entity.CalendarEntity;
import de.timeboxes.service.CalendarService;

@RestController
@RequestMapping("/calendar")
@CrossOrigin(origins = "http://localhost:4200")
public class CalendarController {

    private final CalendarService calendarService;

    public CalendarController(CalendarService calendarService) {
        this.calendarService = calendarService;
    }

    @GetMapping
    public List<CalendarEntity> getAllCalendars() {
        return calendarService.getAllCalendars();
    }

    @GetMapping("/id")
    public Optional<CalendarEntity> getCalendarById(@RequestParam("id") Long id) {
        return calendarService.getCalendarById(id);
    }

    @PostMapping
    public CalendarEntity createCalendar(@RequestBody CalendarEntity calendar) {
        return calendarService.createCalendar(calendar);
    }

    @PutMapping("/id")
    public CalendarEntity updateCalendar(@RequestParam("id") Long id, @RequestBody CalendarEntity updatedCalendar) {
        return calendarService.updateCalendar(id, updatedCalendar);
    }

    @DeleteMapping("/id")
    public ResponseEntity<Void> deleteCalendar(@RequestParam("id") Long id) {
        calendarService.deleteCalendar(id);
        return ResponseEntity.noContent().build();
    }
}
