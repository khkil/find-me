package com.example.backend.util;


public class PageUtil {

    private final static String FORWARD_ORDER = " asc";
    private final static String REVERSE_ORDER = " desc";

    public static String orderBy(String standard, String order){

        if(order != null && !order.isEmpty()){
            return standard + REVERSE_ORDER;
        }
        return order + REVERSE_ORDER;
    }
}
