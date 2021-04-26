package com.example.backend.api.coolsms;


import com.fasterxml.jackson.databind.ObjectMapper;
import net.nurigo.java_sdk.api.Message;
import net.nurigo.java_sdk.exceptions.CoolsmsException;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
public class CoolsmsService {

    private final String COOLSMS_API_KEY =  "NCSWR6TUBVHJZ0RR";
    private final String COOLSMS_API_SECRET =  "FJTG6U7BXKJQTJQS6PTIJLLIIXRASGSM";

    public void sendSms(Coolsms coolSms){
        ObjectMapper mapObject = new ObjectMapper();
        coolSms.setType("SMS");
        coolSms.setFrom(COOLSMS_API_SECRET);
        HashMap<String, String> params = mapObject.convertValue(coolSms, HashMap.class);
        Message coolsms = new Message(COOLSMS_API_KEY, COOLSMS_API_SECRET);

        try {
            coolsms.send(params);
        }catch (CoolsmsException e){
            e.printStackTrace();
        }
    }
}
