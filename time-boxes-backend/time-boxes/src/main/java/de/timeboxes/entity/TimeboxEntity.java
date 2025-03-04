package de.timeboxes.entity;

import java.time.ZonedDateTime;
import java.util.Calendar;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class TimeboxEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String subject;

    private ZonedDateTime startTime;
    private ZonedDateTime endTime;
    private Boolean isAllDay;

    private String startTimezone;
    private String endTimezone;
    private String recurrenceRule;

    @Column(unique = true, nullable = false)
    private UUID guid;

    @ManyToOne
    @JoinColumn(name = "calendar_id", nullable = false)
    private Calendar calendar;

    // Constructors
    public TimeboxEntity() {}

    public TimeboxEntity(String subject, ZonedDateTime startTime, ZonedDateTime endTime, Boolean isAllDay, 
                   String startTimezone, String endTimezone, String recurrenceRule, UUID guid, Calendar calendar) {
        this.subject = subject;
        this.startTime = startTime;
        this.endTime = endTime;
        this.isAllDay = isAllDay;
        this.startTimezone = startTimezone;
        this.endTimezone = endTimezone;
        this.recurrenceRule = recurrenceRule;
        this.guid = guid;
        this.calendar = calendar;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public ZonedDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(ZonedDateTime startTime) {
        this.startTime = startTime;
    }

    public ZonedDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(ZonedDateTime endTime) {
        this.endTime = endTime;
    }

    public Boolean getIsAllDay() {
        return isAllDay;
    }

    public void setIsAllDay(Boolean isAllDay) {
        this.isAllDay = isAllDay;
    }

    public String getStartTimezone() {
        return startTimezone;
    }

    public void setStartTimezone(String startTimezone) {
        this.startTimezone = startTimezone;
    }

    public String getEndTimezone() {
        return endTimezone;
    }

    public void setEndTimezone(String endTimezone) {
        this.endTimezone = endTimezone;
    }

    public String getRecurrenceRule() {
        return recurrenceRule;
    }

    public void setRecurrenceRule(String recurrenceRule) {
        this.recurrenceRule = recurrenceRule;
    }

    public UUID getGuid() {
        return guid;
    }

    public void setGuid(UUID guid) {
        this.guid = guid;
    }

    public Calendar getCalendar() {
        return calendar;
    }

    public void setCalendar(Calendar calendar) {
        this.calendar = calendar;
    }
}
