package com.example.backend.util.enumerator;

public enum  SearchTypes {
    INFO("info"),
    PHONE("phone");

    private String searchType;

    SearchTypes(String searchType) {
        this.searchType = searchType;
    }
}
