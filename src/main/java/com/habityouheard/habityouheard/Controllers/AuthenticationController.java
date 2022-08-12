package com.habityouheard.habityouheard.controllers;

import com.habityouheard.habityouheard.models.User;
import com.habityouheard.habityouheard.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.*;

import java.security.MessageDigest;

import java.util.Map;
import java.util.Optional;

/**
 * Created by Micah Young
 */
@RestController
@RequestMapping("api/auth")
public class AuthenticationController {
    @Autowired
    UserRepository userRepository;
    @PostMapping ("token")
    public ResponseEntity<String> provideToken(@RequestBody Map<String, String> json) {
        Optional<User> optUser = userRepository.findByUsername(json.get("username"));

        if(optUser.isPresent()){

            User user = (User) optUser.get();


            if(BCrypt.checkpw(json.get("password"),user.getPassword())){
                String hashCode = String.valueOf(user.hashCode());
                return new ResponseEntity<>(hashCode, HttpStatus.OK);
            }
        }
        return new ResponseEntity<>("How dare you", HttpStatus.FORBIDDEN);
    }
}
