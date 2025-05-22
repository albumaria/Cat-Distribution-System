package com.mariaalbu.catdistributionsystem.controller;

import com.mariaalbu.catdistributionsystem.model.User;
import com.mariaalbu.catdistributionsystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return this.userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable UUID id) {
        return this.userService.getUserById(id);
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable String username) {
        User user = userService.getUserByUsername(username);

        if (user == null) {
            User defaultUser = new User();
            defaultUser.setUsername("USER_NOT_FOUND");
            defaultUser.setPasswordhash("");
            return ResponseEntity.ok(defaultUser);
        }

        return ResponseEntity.ok(user);
    }

    @GetMapping("/monitored-users")
    public List<User> getMonitoredUsers() {
        return this.userService.getMonitoredUsers();
    }

    @PostMapping
    public void addUser(@RequestBody User user) {
        try {
            user.setIsMonitored(false);
            userService.addUser(user);
        }
        catch (IllegalArgumentException e) {
            System.err.println(e.getMessage());
        }
    }
}
