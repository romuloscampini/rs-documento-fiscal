package br.com.scampini.safenote.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.apache.log4j.Logger;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

public class TokenAuthenticationService {

    private static final Logger LOGGER = Logger.getLogger(TokenAuthenticationService.class);

    // EXPIRATION_TIME = 10 days
    private static final long EXPIRATION_TIME = 860_000_000;
    private static final String SECRET = "MySecret";
    private static final String TOKEN_PREFIX = "Bearer "; // DO NOT delete the trailing space!
    private static final String HEADER_STRING = "Authorization";

    static void addAuthentication(HttpServletResponse response, Authentication authentication) {
        Claims claims = Jwts.claims().setSubject(authentication.getName());
        claims.put("scopes", authentication.getAuthorities().stream().map(s -> s.toString()).collect(Collectors.toList()));

        String JWT = Jwts.builder()
                .setClaims(claims)
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, SECRET)
                .compact();

        response.addHeader(HEADER_STRING, TOKEN_PREFIX + " " + JWT);
        try {
            response.getWriter().print(JWT);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    static Authentication getAuthentication(HttpServletRequest request) {
        String token = request.getHeader(HEADER_STRING);
        LOGGER.debug("received request from token: " + token);

        if (token != null) {
            Claims claims = Jwts.parser()
                    .setSigningKey(SECRET)
                    .parseClaimsJws(token.replace(TOKEN_PREFIX, ""))
                    .getBody();

            String user = claims.getSubject();

            List<String> scopes = claims.get("scopes", List.class);
            if (scopes == null) {
                return null;
            }
            List<GrantedAuthority> authorities = scopes.stream()
                    .map(authority -> new SimpleGrantedAuthority(authority))
                    .collect(Collectors.toList());

            if (user != null) {
                return new UsernamePasswordAuthenticationToken(user, null, authorities);
            }
        }

        return null;
    }

}
