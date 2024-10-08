package com.habityouheard.habityouheard.controllers;

import com.habityouheard.habityouheard.models.DTO.DaysWeek;
import com.habityouheard.habityouheard.models.Habit;
import com.habityouheard.habityouheard.models.HabitMeta;
import com.habityouheard.habityouheard.models.User;
import com.habityouheard.habityouheard.repositories.HabitMetaRepository;
import com.habityouheard.habityouheard.repositories.HabitRepository;
import com.habityouheard.habityouheard.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import javax.validation.Valid;
import java.lang.reflect.Field;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

///api/Habit
@CrossOrigin
@RestController
@RequestMapping("api/habit")
public class HabitController {
    @Autowired
    EntityManager entityManager;
    @Autowired
    UserRepository userRepository;
    @Autowired
    HabitRepository habitRepository;
    @Autowired
    HabitMetaRepository habitMetaRepository;

    // get a habit
    @GetMapping("{id}")
    public ResponseEntity<Habit> viewHabit(@PathVariable int id) {
        Optional optHabit = habitRepository.findById(id);
        if (optHabit.isPresent()) {
            Habit habit = (Habit) optHabit.get();
            return ResponseEntity.ok().body(habit);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // add a habit
    @Transactional
    @PostMapping("create")
    public ResponseEntity<String> createHabit(@RequestBody @Valid Habit newHabit, @RequestHeader(value="Authorization") String authToken, Errors errors) {
        if (authToken == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        Optional<User> userReference = userRepository.findByAuthToken(authToken);

        if (errors.hasErrors()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        if (!userReference.isPresent()) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        User user = (User) userReference.get();
        newHabit.setUser(user);
        Date date = Calendar.getInstance().getTime();
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

        newHabit.setStartDate(dateFormat.format(date));
        newHabit.setActive(true);
        user.getHabits().add(newHabit);
        entityManager.persist(user);
        entityManager.flush();

        return new ResponseEntity(newHabit, HttpStatus.CREATED);
    }

    @PostMapping("{id}/stop")
    public ResponseEntity<Long> stopHabitById(@PathVariable(value= "id") int id) {

        if (!habitRepository.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        habitRepository.stopHabit(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("{id}/resume")
    public ResponseEntity<Long> resumeHabitById(@PathVariable(value= "id") int id) {

        if (!habitRepository.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        // switch habit status to 0.
        habitRepository.resumeHabit(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Transactional
    @PostMapping("{id}/affirm")
    public ResponseEntity affirmHabitToday(@PathVariable(value= "id") int id) {

        Optional optHabit = habitRepository.findById(id);
        if (!optHabit.isPresent()) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }

        Habit habit = (Habit) optHabit.get();
        LocalDateTime todaysDate = LocalDateTime.now();
        DateTimeFormatter formattedTodaysDate = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        Optional<HabitMeta> latestHabitMetaReference = habitMetaRepository.findLatestDateByTodaysHabitId(id);

        HabitMeta habitMeta = new HabitMeta(true, habit);
        Boolean newHabitMeta = true;
        if(latestHabitMetaReference.isPresent()) {
            habitMeta = (HabitMeta) latestHabitMetaReference.get();
            newHabitMeta = false;
        }

        habitMeta.setCompletedHabit(true);

        habit.updateStreak(true);
        int streakBonus = habit.getStreak() >= 7 ? 1 : 0;
        int scoreAdd = habit.getLastPointValue() + 1 + streakBonus;
        habit.setPointValue(scoreAdd);

        if(newHabitMeta) {
            habit.getHabitMetaList().add(habitMeta);
        }
        entityManager.persist(habit);
        entityManager.flush();
        return new ResponseEntity(habit, HttpStatus.OK);
    }

    @Transactional
    @PostMapping("{id}/defirm")
    public ResponseEntity defirmHabitToday(@PathVariable(value= "id") int id) {
        Optional optHabit = habitRepository.findById(id);
        if (!optHabit.isPresent()) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }

        Habit habit = (Habit) optHabit.get();
        LocalDateTime todaysDate = LocalDateTime.now();
        DateTimeFormatter formattedTodaysDate = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        Optional<HabitMeta> latestHabitMetaReference = habitMetaRepository.findLatestDateByTodaysHabitId(id);

        HabitMeta habitMeta = new HabitMeta(false, habit);
        Boolean newHabitMeta = true;
        if(latestHabitMetaReference.isPresent()) {
            habitMeta = (HabitMeta) latestHabitMetaReference.get();
            newHabitMeta = false;
        }

        habitMeta.setCompletedHabit(false);

        habit.updateStreak(false);
        int habitPoints = habit.getLastPointValue();
        habit.setPointValue(habitPoints > 0 ? habitPoints - 1 : 0);

        if(newHabitMeta) {
            habit.getHabitMetaList().add(habitMeta);
        }
        entityManager.persist(habit);
        entityManager.flush();
        return new ResponseEntity(habit, HttpStatus.OK);
    }

    @PatchMapping("{id}/description")
    public ResponseEntity editDescription(@PathVariable(value= "id") int id, @RequestBody String description, @RequestHeader(value="Authorization") String authToken, Errors errors){
        if(errors.hasErrors()) {
            return new ResponseEntity<>(Map.of("error", errors.toString()), HttpStatus.BAD_REQUEST);
        }
        if(authToken == null){
            return new ResponseEntity<>(Map.of("error", "Token is null."),HttpStatus.UNAUTHORIZED);
        }
        if(description.length() > 512){
            return new ResponseEntity<>(Map.of("error", "Description must be less than 512 characters."), HttpStatus.BAD_REQUEST);
        }
        Optional<User> userReference = userRepository.findByAuthToken(authToken);
        if(!userReference.isPresent()){
            return new ResponseEntity<>(Map.of("error","No user with that token"), HttpStatus.UNAUTHORIZED);
        }
        User user = userReference.get();
        List<Habit> habits = habitRepository.findHabitByUserAndId(user.getId(), id);
        if(habits.size()!=1){
            return new ResponseEntity<>(Map.of("error", "User/Habit mismatch"), HttpStatus.NOT_FOUND);
        }

        habitRepository.updateDescription(user.getId(), id, description);
        Map<String, String> responseBody = new HashMap<>();
        responseBody.put("message", "Description updated to: '" + description + "'.");
        return new ResponseEntity<>(responseBody, HttpStatus.OK );
    }
    //TODO: Need either a repository method or another way to update the selected_days table. The SQL query is gonna be a nightmare so I'm leaving that for tomorrow.
    @PatchMapping("{id}/days")
    public ResponseEntity editSelectedDays(@PathVariable(value="id") int id, @Valid @RequestBody DaysWeek daysWeek, @RequestHeader(value="Authorization") String authToken, Errors errors) throws IllegalAccessException {
        if(errors.hasErrors()){
            return new ResponseEntity<>(Map.of("error", errors.toString()), HttpStatus.BAD_REQUEST);
        }
        if(authToken == null){
            return new ResponseEntity<>(Map.of("error", "Token is null"), HttpStatus.UNAUTHORIZED);
        }
        Optional<User> optUser = userRepository.findByAuthToken(authToken);
        if(!optUser.isPresent()){
            return new ResponseEntity<>(Map.of("error", "No user with that token"), HttpStatus.UNAUTHORIZED);
        }

        List<String> days = daysWeek.getDays();
        List<String> daysWeekActual = List.of("monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday");
        for(int i=0; i<days.size(); i++){
            if(!daysWeekActual.contains(days.get(i))){
                return new ResponseEntity<>(Map.of("error", "Invalid day input."), HttpStatus.BAD_REQUEST);
            }
        }

        Optional<Habit> optHabit = habitRepository.findById(id);
        if(!optHabit.isPresent()){
            return new ResponseEntity(Map.of("error", "Habit does not exist with that ID."), HttpStatus.BAD_REQUEST);
        }
        User user = optUser.get();
        Habit habit = optHabit.get();
        if(habit.getUser().getId() != user.getId()){
            return new ResponseEntity(Map.of("error", "User is not authenticated to edit that habit."), HttpStatus.UNAUTHORIZED);
        }

        habit.setSelectedDays(days);
        entityManager.persist(habit);
        entityManager.flush();
        return new ResponseEntity(HttpStatus.OK);
    }
}

