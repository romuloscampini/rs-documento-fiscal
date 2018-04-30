package br.com.scampini.safenote.repository;

import br.com.scampini.safenote.despesa.Despesa;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

/**
 * @author romuloscampini
 */

public interface PagamentoRepository extends MongoRepository<Despesa, String> {

//    Despesa findById(String id);

    @Query("{pagamento:'?0'}")
    List<Despesa> findPagamentos(String pagamento);

//    List<Despesa> findPagamentos(Status statusPagamento);

}
