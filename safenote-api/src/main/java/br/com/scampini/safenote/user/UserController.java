package br.com.scampini.safenote.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;

/**
 * @author romuloscampini
 * @since
 */
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService service;

    @PostMapping("/save")
    private ResponseEntity save(@RequestBody String body) {
        try{
            service.save(body);
            return new ResponseEntity<String>("OK", HttpStatus.CREATED);
        }catch (Exception ex){
            return new ResponseEntity<String>("ERROR: " + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
