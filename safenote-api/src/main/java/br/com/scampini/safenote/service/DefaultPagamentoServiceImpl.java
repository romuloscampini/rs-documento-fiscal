package br.com.scampini.safenote.service;

import br.com.scampini.safenote.model.Pagamento;
import br.com.scampini.safenote.repository.PagamentoRepository;
import br.com.scampini.safenote.types.ClassificacaoPagamento;
import br.com.scampini.safenote.types.StatusPagamento;
import br.com.scampini.safenote.types.Tipo;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Date;

/**
 * Created by romuloscampini on 8/15/17.
 *
 * @author romuloscampini
 */
public class DefaultPagamentoServiceImpl {

    @Autowired
    private PagamentoRepository repository;

//    public DefaultPagamentoServiceImpl(){
//        Pagamento pag1 = new Pagamento("Monitor LED",
//                "Balao da Informatica",
//                "ACER",
//                new Date(),
//                700.0,
//                ClassificacaoPagamento.PESSOAL,
//                Tipo.PRODUTO,
//                StatusPagamento.PAGO,
//                null,
//                null,
//                null,
//                null);
//        // save a couple of customers
//        Pagamento pag2 = new Pagamento("DARF",
//                "RF",
//                "Governo",
//                new Date(),
//                1230.00,
//                ClassificacaoPagamento.GERAL,
//                Tipo.SERVICO,
//                StatusPagamento.PENDENTE,
//                null,
//                null,
//                null,
//                null);

//        repository.save(pag1);
//        repository.save(pag2);
//    }
}
