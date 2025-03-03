package de.timeboxes.controller;

import org.springframework.web.bind.annotation.*;

import de.timeboxes.entity.TimeboxEntity;
import de.timeboxes.service.TimeboxService;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/timebox")
@CrossOrigin(origins = "http://localhost:4200")
public class TimeboxController {

    private final TimeboxService timeboxService;

    public TimeboxController(TimeboxService timeboxService) {
        this.timeboxService = timeboxService;
    }

    @GetMapping
    public List<TimeboxEntity> getAllTimeboxes() {
        return timeboxService.getAllTimeboxes();
    }

    @GetMapping("/{id}")
    public Optional<TimeboxEntity> getTimeboxById(@PathVariable Long id) {
        return timeboxService.getTimeboxById(id);
    }

    @GetMapping("/guid/{guid}")
    public Optional<TimeboxEntity> getTimeboxByGuid(@PathVariable UUID guid) {
        return timeboxService.getTimeboxByGuid(guid);
    }

    @PostMapping
    public TimeboxEntity createTimebox(@RequestBody TimeboxEntity timebox) {
        return timeboxService.createTimebox(timebox);
    }

    @PutMapping("/{id}")
    public TimeboxEntity updateTimebox(@PathVariable Long id, @RequestBody TimeboxEntity updatedTimebox) {
        return timeboxService.updateTimebox(id, updatedTimebox);
    }

    @DeleteMapping("/{id}")
    public void deleteTimebox(@PathVariable Long id) {
        timeboxService.deleteTimebox(id);
    }
}
