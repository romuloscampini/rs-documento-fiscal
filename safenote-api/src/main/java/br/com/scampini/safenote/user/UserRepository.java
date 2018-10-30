package br.com.scampini.safenote.user;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * @author romuloscampini
 * @since
 */
public interface UserRepository extends MongoRepository<User, String> {
}
