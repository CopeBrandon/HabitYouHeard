package com.habityouheard.habityouheard.models.DTO;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

public class DaysWeek {
    @NotNull
    private List<String> days = new ArrayList<>();

    public DaysWeek(){}
    public DaysWeek(List<String> days){
        this.days = days;
    }
    public List<String> getDays(){ return days;}
    public void setDays(List<String> days){ this.days = days; }
}
