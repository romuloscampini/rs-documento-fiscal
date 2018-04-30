package br.com.scampini.safenote.service;

import br.com.scampini.safenote.repository.PagamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Created by romuloscampini on 8/15/17.
 *
 * @author romuloscampini
 */
public class DefaultPagamentoServiceImpl {

    @Autowired
    private PagamentoRepository repository;

//    public DefaultPagamentoServiceImpl(){
//        Despesa pag1 = new Despesa("Monitor LED",
//                "Balao da Informatica",
//                "ACER",
//                new Date(),
//                700.0,
//                Classificacao.PESSOAL,
//                Tipo.PRODUTO,
//                Status.PAGO,
//                null,
//                null,
//                null,
//                null);
//        // save a couple of customers
//        Despesa pag2 = new Despesa("DARF",
//                "RF",
//                "Governo",
//                new Date(),
//                1230.00,
//                Classificacao.GERAL,
//                Tipo.SERVICO,
//                Status.PENDENTE,
//                null,
//                null,
//                null,
//                null);

//        repository.save(pag1);
//        repository.save(pag2);
//    }
}
