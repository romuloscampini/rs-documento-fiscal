package br.com.scampini.safenote.controller;

import br.com.scampini.safenote.model.Compra;
import br.com.scampini.safenote.service.CompraService;
import br.com.scampini.safenote.types.TipoCompra;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

/**
 * Created by romuloscampini on 7/6/17.
 */
@RestController
@RequestMapping("/api/pagamentos")
public class CompraController {

//    @Autowired
//    private CompraRepository repository;

    @Autowired
    private CompraService compra;

    private static Logger LOGGER = Logger.getLogger(CompraController.class);

    @PostMapping
    @RequestMapping("/mock")
    private boolean mockCompras(){

        try {
            // save a couple of customers
            compra.save(new Compra("Monitor LED",
                    "Balao da Informatica",
                    "ACER",
                    new Date(),
                    630.0,
                    TipoCompra.PRODUTO,
                    null,
                    null,
                    null,
                    null));
            compra.save(new Compra("DARF IRPF - Financiamento - Parcela 12",
                    "Receita Federal",
                    "Governo",
                    new Date(),
                    330.0,
                    TipoCompra.SERVICO,
                    null,
                    null,
                    null,
                    null));

            return true;
        }catch (Exception ex){
            return false;
        }

    }

    @GetMapping
    private List<Compra> listarCompras(){
        return compra.getAll();
    }


    @PostMapping
    @RequestMapping("/salvar")
    private boolean salvarCompra(@RequestBody String body){
        return compra.save(body);
    }




}
