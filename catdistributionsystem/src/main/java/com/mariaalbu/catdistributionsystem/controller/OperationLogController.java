package com.mariaalbu.catdistributionsystem.controller;

import com.mariaalbu.catdistributionsystem.model.OperationLog;
import com.mariaalbu.catdistributionsystem.model.User;
import com.mariaalbu.catdistributionsystem.service.OperationLogService;
import com.mariaalbu.catdistributionsystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/operationLogs")
public class OperationLogController {
    private final OperationLogService operationLogService;
    private final UserService userService;

    @Autowired
    public OperationLogController(OperationLogService operationLogService, UserService userService) {
        this.operationLogService = operationLogService;
        this.userService = userService;
    }

    @GetMapping
    public List<OperationLog> getAllOperationLogs() { return this.operationLogService.getAllOperationLogs(); }

    @PostMapping("/{userId}")
    public void addOperationLog(@PathVariable UUID userId, @RequestBody OperationLog operationLog) {
        try {
            operationLog.setId(null);
            operationLog.setPerformdate(LocalDateTime.now());

            User user = userService.getUserById(userId);
            operationLog.setUser(user);

            System.out.println("Received operation: " + operationLog);
            operationLogService.addOperationLog(operationLog);
        }
        catch (IllegalArgumentException e) {
            System.err.println(e.getMessage());
        }
    }
}
