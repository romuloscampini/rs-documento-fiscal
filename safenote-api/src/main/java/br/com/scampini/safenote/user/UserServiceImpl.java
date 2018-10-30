package br.com.scampini.safenote.user;

import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * @author romuloscampini
 * @since
 */
@Service
public class UserServiceImpl implements UserDetailsService, UserService {

    @Autowired
    protected UserRepository repository;

    @Autowired
    protected MongoTemplate mongoTemplate;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = mongoTemplate.findOne(Query.query(Criteria.where("email").is(username)),
                User.class);
        if(user != null){
            String email = user.getEmail();
            String password = user.getPassword();
            String[] authorities = user.getAuthorities();
            UserAuthDetails userAuthDetails = new UserAuthDetails(email, password, authorities);
            return userAuthDetails;
        }
        return null;
    }


    @Override
    public void save(String userJson) {
        User user = new Gson().fromJson(userJson, User.class);
        repository.save(user);
    }
}
