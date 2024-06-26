package com.habityouheard.habityouheard.repositories;

import com.habityouheard.habityouheard.models.Habit;
import com.habityouheard.habityouheard.models.HabitMeta;
import com.habityouheard.habityouheard.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

/**
 * Created by Micah Young
 */
@Repository
public interface HabitRepository extends JpaRepository<Habit, Integer> {

    @Transactional
    @Modifying
    @Query(value = "UPDATE habit SET is_active = 0 WHERE id = ?1", nativeQuery = true)
    void stopHabit(@Param("habitId") int id);

    @Transactional
    @Modifying
    @Query(value = "UPDATE habit SET is_active = 1 WHERE id = ?1", nativeQuery = true)
    void resumeHabit(@Param("habitId") int id);

    @Query(value = "SELECT * FROM habit WHERE is_active=1 AND user_id = ?1", nativeQuery = true)
    List<Habit> findAllActiveHabits(@Param("userId") int userId);

    @Query(value = "SELECT * FROM habit WHERE is_active=0 AND user_id = ?1", nativeQuery = true)
    List<Habit> findAllInactiveHabits(@Param("userId") int userId);

    @Transactional
    @Modifying
    @Query(value = "UPDATE habit SET description=?3 WHERE user_id = ?1 AND id=?2", nativeQuery = true)
    void updateDescription(@Param("userId") int userId, @Param("id") int id, String description);

    @Query(value = "SELECT * FROM habit WHERE user_id=?1 AND id=?2", nativeQuery = true)
    List<Habit> findHabitByUserAndId(@Param("userId") int userId, @Param("id") int id);

   @Transactional
   @Query(value = "SELECT h.id FROM habit AS h INNER JOIN habit_selected_days AS hs ON h.id = hs.habit_id INNER JOIN habit_meta AS hm ON h.id = hm.habit_id WHERE hs.selected_days LIKE DAYNAME(CURDATE()) AND NOT DATE(hm.date_of_completion) = DATE(CURDATE())", nativeQuery = true)
    List<Integer> findAllUnaffirmedScheduledHabitsForDay();

    @Transactional
    @Query(value = "SELECT h.id FROM habit AS h INNER JOIN habit_selected_days AS hs ON h.id = hs.habit_id WHERE hs.selected_days LIKE DAYNAME(CURDATE())", nativeQuery = true)
    List<Integer> findAllScheduledHabitIDsForDay();

    @Transactional
    @Query(value = "SELECT h.* FROM habit AS h INNER JOIN habit_selected_days AS hs ON h.id = hs.habit_id WHERE hs.selected_days LIKE DAYNAME(CURDATE())", nativeQuery = true)
    List<Habit> findAllScheduledHabitsForDay();
    @Transactional
    @Query(value = "SELECT h.* FROM habit AS h INNER JOIN habit_selected_days AS hs ON h.id = hs.habit_id WHERE hs.selected_days LIKE DAYNAME(CURDATE()-1)", nativeQuery = true)
    List<Habit> findAllScheduledHabitsForYesterday();


    @Transactional
    @Modifying
    @Query(value = "UPDATE habit SET streak = 0 WHERE id = ?1", nativeQuery = true)
    void resetStreakToZero(@Param("habitId") int id);
}
