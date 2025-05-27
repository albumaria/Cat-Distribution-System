package com.mariaalbu.catdistributionsystem.service;

import com.mariaalbu.catdistributionsystem.model.User;
import com.mariaalbu.catdistributionsystem.repository.IUserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {
    private final IUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(IUserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
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

    @Transactional
    public User registerNewUser(User user) {
        System.out.println("reached REGISTER NEW USER");
        user.setCreatedate(LocalDateTime.now());
        user.setIsMonitored(false);
        String rawPassword = user.getPasswordhash();
        String encodedPassword = passwordEncoder.encode(rawPassword);
        user.setPasswordhash(encodedPassword);
        return userRepository.save(user);
    }
}