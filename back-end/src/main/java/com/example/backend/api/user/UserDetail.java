package com.example.backend.api.user;

import com.example.backend.api.group.Group;
import lombok.Data;

@Data
public class UserDetail {

    private User user;
    private Group group;
}
