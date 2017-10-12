package br.com.scampini.safenote.controller;

import br.com.scampini.safenote.model.Pagamento;
import br.com.scampini.safenote.service.PaymentService;
import br.com.scampini.safenote.types.ClassificacaoPagamento;
import br.com.scampini.safenote.types.StatusPagamento;
import br.com.scampini.safenote.types.Tipo;
import br.com.scampini.safenote.types.TipoDocumento;
import org.apache.commons.io.IOUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
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
public class PaymentController {

    @Autowired
    private PaymentService service;

    private static Logger LOGGER = Logger.getLogger(PaymentController.class);

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

    @GetMapping("/{id}")
    private Pagamento buscarPagamento(@PathVariable String id){
        LOGGER.warn("ID RECEBIDO ======>>>>>>    " + id);
        return service.findById(id);
    }

//    @CrossOrigin(origins = "*")
    @DeleteMapping("/{id}")
    private boolean deletarRegistro(@PathVariable String id){
        LOGGER.info("Vai apagar...");
        return service.delete(id);
    }


//    @GetMapping("/buscar")
//    private @ResponseBody() List<Pagamento> procurarPagamentoPorNomeProduto(@RequestParam Map<String, String> queryMap){
//        LOGGER.info("Buscando...");
//        LOGGER.info(queryMap.toString());
//
//        return service.findByPaymentName(queryMap.toString());
//        if (null != nomeProduto || !nomeProduto.isEmpty()) {
//            LOGGER.info("Por nome do produto: " + nomeProduto);
//            return service.findByPaymentName(nomeProduto);
//        }else if(null != statusPagamento){
//            LOGGER.info("Por Status de Pagamento: " + statusPagamento.getDescricao());
//            return service.findByPaymentStatus(statusPagamento);
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
