package com.employee.employeehub.controller;

import com.employee.employeehub.entity.AppUser;
import com.employee.employeehub.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AppUser user) {
        try {
            AppUser savedUser = authService.registerUser(user);

            return ResponseEntity.status(HttpStatus.CREATED).body(
                    Map.of(
                            "message", "Registration successful",
                            "id", savedUser.getId(),
                            "name", savedUser.getName(),
                            "email", savedUser.getEmail()
                    )
            );

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(
                    Map.of("message", e.getMessage())
            );
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {

        String email = request.get("email");
        String password = request.get("password");

        if (email == null || password == null) {
            return ResponseEntity.badRequest().body(
                    Map.of("message", "Email and password are required")
            );
        }

        try {
            String token = authService.loginUser(email, password);

            return ResponseEntity.ok(
                    Map.of(
                            "message", "Login successful",
                            "token", token
                    )
            );

        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    Map.of("message", "Invalid email or password")
            );
        }
    }

}