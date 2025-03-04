package de.timeboxes.controller;

import org.springframework.web.bind.annotation.*;

import de.timeboxes.entity.CalendarEntity;
import de.timeboxes.entity.TimeboxEntity;
import de.timeboxes.service.CalendarService;
import de.timeboxes.service.TimeboxService;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/timebox")
@CrossOrigin(origins = "http://localhost:4200")
public class TimeboxController {

    private final TimeboxService timeboxService;
    private final CalendarService calendarService;

    public TimeboxController(TimeboxService timeboxService, CalendarService calendarService) {
        this.timeboxService = timeboxService;
        this.calendarService = calendarService;
    }

    @GetMapping
    public List<TimeboxEntity> getAllTimeboxes() {
        return timeboxService.getAllTimeboxes();
    }

    @GetMapping("/id")
    public Optional<TimeboxEntity> getTimeboxById(@RequestParam("id") Long id) {
        return timeboxService.getTimeboxById(id);
    }

    @GetMapping("/guid")
    public Optional<TimeboxEntity> getTimeboxByGuid(@RequestParam("guid") UUID guid) {
        return timeboxService.getTimeboxByGuid(guid);
    }

    @GetMapping("/calendar")
    public List<TimeboxEntity> getTimeboxesByCalendar(@RequestParam("calendarId") Long calendarId) {
        CalendarEntity calendar = calendarService.getCalendarById(calendarId)
                .orElseThrow(() -> new RuntimeException("Calendar not found"));
        return timeboxService.getTimeboxesByCalendar(calendar);
    }

    @PostMapping("/calendar")
    public TimeboxEntity addTimeboxToCalendar(@RequestParam("calendarId") Long calendarId, @RequestBody TimeboxEntity timebox) {
        return timeboxService.addTimeboxToCalendar(calendarId, timebox);
    }

    @PutMapping("/id")
    public TimeboxEntity updateTimeboxById(@RequestParam("id") Long id, @RequestBody TimeboxEntity updatedTimebox) {
        return timeboxService.updateTimeboxById(id, updatedTimebox);
    }

    @PutMapping("/guid")
    public TimeboxEntity updateTimeboxByGuid(@RequestParam("guid") UUID guid, @RequestBody TimeboxEntity updatedTimebox) {
        return timeboxService.updateTimeboxByGuid(guid, updatedTimebox);
    }

    @DeleteMapping("/id")
    public void deleteTimebox(@RequestParam("id") Long id) {
        timeboxService.deleteTimeboxById(id);
    }

    @DeleteMapping("/guid")
    public void deleteTimebox(@RequestParam("guid") UUID guid) {
        timeboxService.deleteTimeboxByGuid(guid);
    }
}
