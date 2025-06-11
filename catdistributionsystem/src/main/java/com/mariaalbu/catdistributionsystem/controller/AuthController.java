package com.mariaalbu.catdistributionsystem.controller;

import com.mariaalbu.catdistributionsystem.model.User;
import com.mariaalbu.catdistributionsystem.service.EmailService;
import com.mariaalbu.catdistributionsystem.service.UserService;
import com.mariaalbu.catdistributionsystem.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;
    private final JwtUtil jwtUtil;

    @Autowired
    public AuthController(UserService userService, AuthenticationManager authenticationManager, JwtUtil jwtUtil, EmailService emailService) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.emailService = emailService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        try {
            // The passwordhash field will be handled by the service
            User registeredUser = userService.registerNewUser(user);
            return ResponseEntity.ok(registeredUser);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        try {
            String username = credentials.get("username");
            String password = credentials.get("password");

            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password)
            );

            final String jwt = jwtUtil.generateToken(username);
            User user = userService.getUserByUsername(username);
            
            if (user.getEmail() == null || user.getEmail().isEmpty()) {
                throw new IllegalArgumentException("User email not found");
            }

            Random random = new Random();
            String authCode = String.format("%07d", random.nextInt(10000000));
            
            try {
                emailService.sendVerificationCode(user.getEmail(), authCode);
            } catch (Exception e) {
                return ResponseEntity.internalServerError()
                    .body(Map.of("error", "Failed to send verification email"));
            }

            Map<String, Object> response = new HashMap<>();
            response.put("token", jwt);
            response.put("user", user);
            response.put("auth", authCode);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Invalid username or password");
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
}
