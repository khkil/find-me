package com.example.backend.api.group;

import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GroupMapper {

    List<Group> getGroupList();

}
