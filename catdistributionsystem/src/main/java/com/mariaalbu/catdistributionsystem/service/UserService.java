package com.mariaalbu.catdistributionsystem.service;

import com.mariaalbu.catdistributionsystem.model.MischiefRecord;
import com.mariaalbu.catdistributionsystem.model.User;
import com.mariaalbu.catdistributionsystem.repository.IUserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {
    private final IUserRepository userRepository;

    public UserService(IUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return this.userRepository.findAll();
    }

    public User getUserById(UUID id) {
        return this.userRepository.findById(id).orElse(null);
    }

    public User getUserByUsername(String username) {
        return this.userRepository.findByUsername(username).orElse(null);
    }

    @Transactional
    public void addUser(User user) {
        user.setCreatedate(LocalDateTime.now());
        this.userRepository.save(user);
    }

    public Optional<User> findById(UUID id) {
        return userRepository.findById(id);
    }

    public List<User> getMonitoredUsers() {

        return userRepository.findByIsMonitoredTrue();
    }
}
