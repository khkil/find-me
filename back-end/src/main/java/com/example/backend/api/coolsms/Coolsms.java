package com.example.backend.api.coolsms;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class Coolsms {

    private String from;
    private String to;
    private String type;
    private String text;

    public Coolsms(String text, String to){
        this.text = text;
        this.to = to;
    }
}
