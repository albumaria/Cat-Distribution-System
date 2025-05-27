package com.mariaalbu.catdistributionsystem.util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Component
public class JwtUtil {
    private final String SECRET = "739357422cf34cca3b7de821c6d0c2f5b97992d7cdcfc16d00681f457c750a0f731d5dd3343a58f0acf16db325713f389c63f25353542ef1a9f491f971879c4de6fc6fac323f765729d9e69f2c521dc3a994b7402ba24eea2ffc97a802a5a860ebcd894743eb66bd8086b1c7f708e3ea535fb6a93bd32b5a5a18132ce9279746806eeef64e83559806474ab14ec8842319629dfee47dcf9a4dbc98174a4ed049e89828472c1cd86e10dffd7d118cc2e301bcb39fcb01bc6afbd57e0eab97db911b51cefdfe91485c32356c9e60e7c777ce83dfa1c430988a2b66c5b857f280351b10a5e018f60eb6c7b36fb97e5ca2e4d95027aacbc6b5acfeff2a3cd4f6b8d7";
    private final SecretKey secretKey = Keys.hmacShaKeyFor(SECRET.getBytes());

    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(Date.from(Instant.now().plus(1, ChronoUnit.HOURS)))
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractUsername(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }


    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public Date extractExpiration(String token) {
        return extractAllClaims(token).getExpiration();
    }

    public boolean isTokenValid(String token) {
        try {
            extractUsername(token); // fails if invalid
            return true;
        } catch (JwtException e) {
            return false;
        }
    }

    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        try {
            final String username = extractUsername(token);
            return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
        } catch (ExpiredJwtException e) {
            System.out.println("JWT expired");
        } catch (JwtException e) {
            System.out.println("JWT invalid");
        }
        return false;
    }
}
