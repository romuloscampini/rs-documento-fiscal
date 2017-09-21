package br.com.scampini.safenote.repository;

import br.com.scampini.safenote.model.Pagamento;
import br.com.scampini.safenote.types.StatusPagamento;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

/**
 * @author romuloscampini
 */

public interface PagamentoRepository extends MongoRepository<Pagamento, String> {

    Pagamento findById(String id);

    @Query("{pagamento:'?0'}")
    List<Pagamento> findPagamentos(String pagamento);

//    List<Pagamento> findPagamentos(StatusPagamento statusPagamento);

}
