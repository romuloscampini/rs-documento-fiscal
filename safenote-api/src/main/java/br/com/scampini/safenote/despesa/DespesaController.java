package br.com.scampini.safenote.despesa;

import br.com.scampini.safenote.types.*;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.util.Date;
import java.util.List;

/**
 * Created by romuloscampini on 7/6/17.
 */

@RestController
@RequestMapping("/api/pagamentos")
public class DespesaController {

    @Autowired
    private DespesaService service;

    private static Logger LOGGER = Logger.getLogger(DespesaController.class);

    @PostMapping("/mock")
    private boolean mockCompras(){
        Despesa pag1 = new Despesa("Monitor LED",
                "Balao da Informatica",
                "ACER",
                new Date(),
                700.0,
                Origem.COMPRA,
                Classificacao.PESSOAL,
                Tipo.PRODUTO,
                Status.PAGO,
                null);
        // save a couple of customers
        Despesa pag2 = new Despesa("DARF",
                "Receita Federal",
                "Governo Federal",
                new Date(),
                1230.00,
                Origem.CONTA,
                Classificacao.GERAL,
                Tipo.SERVICO,
                Status.PENDENTE,
                null);

        service.save(pag1);
        service.save(pag2);

        return true;
    }

    @GetMapping
    private List<Despesa> listDespesas(){
        return service.getAll();
    }

    @GetMapping("/{id}")
    private Despesa buscarPagamento(@PathVariable String id){
        LOGGER.warn("ID RECEBIDO ======>>>>>>    " + id);
        return service.findById(id);
    }

//    @CrossOrigin(origins = "*")
    @DeleteMapping("/{id}")
    private ResponseEntity deletarRegistro(@PathVariable String id){
        LOGGER.info("Vai apagar...");
        boolean deleted = service.delete(id);
        if(deleted){
            return new ResponseEntity("OK", HttpStatus.OK);
        }else {
            return new ResponseEntity("ERROR", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/pay")
    public boolean confirmPayment(@RequestParam("id") String id){
        try {
            return service.confirmPayment(id);
        }catch (Exception ex){
            return false;
        }
    }
//    5a0b31238d8aa91762c5db35



//    @GetMapping("/buscar")
//    private @ResponseBody() List<Despesa> procurarPagamentoPorNomeProduto(@RequestParam Map<String, String> queryMap){
//        LOGGER.info("Buscando...");
//        LOGGER.info(queryMap.toString());
//
//        return service.findByPaymentName(queryMap.toString());
//        if (null != nomeProduto || !nomeProduto.isEmpty()) {
//            LOGGER.info("Por nome do produto: " + nomeProduto);
//            return service.findByPaymentName(nomeProduto);
//        }else if(null != statusPagamento){
//            LOGGER.info("Por Status de Despesa: " + statusPagamento.getDescricao());
//            return service.findByPaymentStatus(statusPagamento);
//        }
//        return null;
//    }


    @PostMapping(path ="/salvar")
    private @ResponseBody
    Despesa salvarCompra(@RequestBody String body, HttpServletResponse response) throws Exception {
        try {
            return service.save(body);
        }catch (Exception ex){
            LOGGER.error(ex.getMessage());
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return null;
        }
    }

    private boolean salvarCompraMap(@RequestParam("pagamento") String body, @RequestParam("documentos")  MultiValueMap<String, MultipartFile> documentos) throws Exception{
        return service.save(body, documentos.toSingleValueMap());
    }

    @PostMapping("/upload")
    private boolean uploadFile(@RequestParam("id") String paymentId, @RequestParam("documento") MultipartFile file, @RequestParam("tipoDocumento") TipoDocumento tipoDocumento) throws Exception{
        LOGGER.info(file.getOriginalFilename());
        return service.uploadDocument(paymentId, file, tipoDocumento);
    }

    @GetMapping(path="/download", produces="application/zip")
    private @ResponseBody FileSystemResource downloadDocuments(@RequestParam("id") String paymentId, HttpServletResponse response) throws Exception{
        File f = service.downloadDocuments(paymentId);
        if(f != null) {
            FileSystemResource fsr = new FileSystemResource(f);
            response.setHeader("Content-Disposition", "attachment; filename=" + fsr.getFilename());
            LOGGER.info(fsr.getFilename());
            return fsr;
        }
        return null;
    }




}
