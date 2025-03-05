package de.timeboxes.entity;

import jakarta.persistence.*;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class CalendarEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToMany(mappedBy = "calendar", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<TimeboxEntity> timeboxes;

    // Constructors
    public CalendarEntity() {}

    public CalendarEntity(String name) {
        this.name = name;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<TimeboxEntity> getTimeboxes() {
        return timeboxes;
    }

    public void setTimeboxes(List<TimeboxEntity> timeboxes) {
        this.timeboxes = timeboxes;
    }
}