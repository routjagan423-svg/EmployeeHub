
package com.employee.employeehub.service;

import com.employee.employeehub.entity.AppUser;
import com.employee.employeehub.repository.AppUserRepository;
import com.employee.employeehub.Security.JwtService;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final AppUserRepository appUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(
            AppUserRepository appUserRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {

        this.appUserRepository = appUserRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public AppUser registerUser(AppUser user) {

        if (appUserRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email is already registered");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return appUserRepository.save(user);
    }

    public String loginUser(String email, String password) {

        AppUser user = appUserRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Invalid email or password"));

        boolean passwordMatches = passwordEncoder.matches(
                password,
                user.getPassword()
        );

        if (!passwordMatches) {
            throw new RuntimeException("Invalid email or password");
        }

        return jwtService.generateToken(user.getEmail());
    }
}
