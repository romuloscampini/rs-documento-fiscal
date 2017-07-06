package br.com.scampini.safenote.repository;

import br.com.scampini.safenote.model.Compra;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

/**
 * Created by romuloscampini on 7/6/17.
 */
public interface CompraRepository extends MongoRepository<Compra, String>{

        Compra findById(String id);
        List<Compra> findByNomeProduto(String nomeProduto);
}
