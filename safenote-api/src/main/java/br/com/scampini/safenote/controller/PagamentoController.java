package br.com.scampini.safenote.controller;

import br.com.scampini.safenote.model.Pagamento;
import br.com.scampini.safenote.service.PagamentoService;
import br.com.scampini.safenote.types.ClassificacaoPagamento;
import br.com.scampini.safenote.types.StatusPagamento;
import br.com.scampini.safenote.types.Tipo;
import br.com.scampini.safenote.types.TipoDocumento;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.Date;
import java.util.List;

/**
 * Created by romuloscampini on 7/6/17.
 */
@RestController
@RequestMapping("/api/pagamentos")
public class PagamentoController {

    @Autowired
    private PagamentoService service;

    private static Logger LOGGER = Logger.getLogger(PagamentoController.class);

    @PostMapping("/mock")
    private boolean mockCompras(){
        Pagamento pag1 = new Pagamento("Monitor LED",
                "Balao da Informatica",
                "ACER",
                new Date(),
                700.0,
                ClassificacaoPagamento.PESSOAL,
                Tipo.PRODUTO,
                StatusPagamento.PAGO,
                null);
        // save a couple of customers
        Pagamento pag2 = new Pagamento("DARF",
                "RF",
                "Governo",
                new Date(),
                1230.00,
                ClassificacaoPagamento.GERAL,
                Tipo.SERVICO,
                StatusPagamento.PENDENTE,
                null);

        service.save(pag1);
        service.save(pag2);

        return true;
    }

    @GetMapping
    private List<Pagamento> listarCompras(){
        return service.getAll();
    }


//    @GetMapping("/buscar")
//    private @ResponseBody() List<Pagamento> procurarPagamentoPorNomeProduto(@RequestParam Map<String, String> queryMap){
//        LOGGER.info("Buscando...");
//        LOGGER.info(queryMap.toString());
//
//        return service.findByNomeProduto(queryMap.toString());
//        if (null != nomeProduto || !nomeProduto.isEmpty()) {
//            LOGGER.info("Por nome do produto: " + nomeProduto);
//            return service.findByNomeProduto(nomeProduto);
//        }else if(null != statusPagamento){
//            LOGGER.info("Por Status de Pagamento: " + statusPagamento.getDescricao());
//            return service.findByStatusPagamento(statusPagamento);
//        }
//        return null;
//    }


    @PostMapping(path ="/salvar")
    @ResponseBody
    private Pagamento salvarCompra(@RequestBody String body) throws Exception{
        return service.save(body);
    }

    private boolean salvarCompraMap(@RequestParam("pagamento") String body, @RequestParam("documentos")  MultiValueMap<String, MultipartFile> documentos) throws Exception{
        return service.save(body, documentos.toSingleValueMap());
    }

    @PostMapping("/upload")
    private boolean uploadFile(@RequestParam("id") String idPagamento, @RequestParam("documento") MultipartFile file, @RequestParam("tipoDocumento") TipoDocumento tipoDocumento) throws Exception{
        LOGGER.error(file.getOriginalFilename());
        return service.uploadDocumento(idPagamento, file, tipoDocumento);
    }




}
