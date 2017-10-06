package br.com.scampini.safenote.service;

import br.com.scampini.safenote.model.Documento;
import br.com.scampini.safenote.model.Pagamento;
import br.com.scampini.safenote.repository.PagamentoRepository;
import br.com.scampini.safenote.types.StatusPagamento;
import br.com.scampini.safenote.types.Tipo;
import br.com.scampini.safenote.types.TipoDocumento;
import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by romuloscampini on 8/3/17.
 *
 * @author romuloscampini
 */
@Service
public class PagamentoServiceImpl implements PagamentoService {

    private static Logger LOGGER = Logger.getLogger(PagamentoServiceImpl.class);

    @Autowired
    private PagamentoRepository repository;

    @Autowired
    protected MongoTemplate mongoTemplate;

    @Override
    public List<Pagamento> getAll() {
        return repository.findAll();
    }

    @Override
    public List<Pagamento> findByPaymentName(String nome) {
        return repository.findPagamentos(nome);
    }

    @Override
    public Pagamento findById(String id) {
//        return repository.findOne(id);
        return mongoTemplate.findOne(Query.query(Criteria.where("_id").is(id)),
                Pagamento.class);
    }

    @Override
    public boolean delete(String id) {
        repository.delete(id);
        return true;
    }


    @Override
    public List<Pagamento> findByPaymentStatus(StatusPagamento statusPagamento) {
//        repository.find
        return repository.findPagamentos(statusPagamento.getDescricao());
    }

    @Override
    public boolean save(String compraJson, Map<String, MultipartFile> files) throws Exception {
        try {
            Gson json = new Gson();
            Pagamento pagamento = json.fromJson(compraJson, Pagamento.class);
            System.out.println(compraJson);
            List<Documento> documentos = new ArrayList<Documento>();
            files.forEach((tipo, file) -> {
                TipoDocumento tipoDocumento = TipoDocumento.valueOf(tipo);
                Documento d = new Documento();
                d.setNomeArquivo(file.getOriginalFilename());
                d.setTipoDocumento(tipoDocumento);
                try {
                    d.setDocumento(file.getBytes());
                } catch (IOException ex) {
                    throw new RuntimeException(ex);
                }
                documentos.add(d);
            });
            pagamento.setDocumentos(documentos);
            repository.save(pagamento);
            return true;
        } catch (JsonSyntaxException ex) {
            System.out.println(ex);
            //TODO: Tratamento para identificar formato de data ou campo de data nulo
            return false;
        } catch (Exception ex) {
            System.out.println(ex);
            LOGGER.error(ex);
            return false;
        }

    }

    /**
     * Salva
     * @param compraJson
     * @return
     * @throws IOException
     */
    @Override
    public Pagamento save(String compraJson) throws IOException {
        try {
            Gson json = new Gson();
            Pagamento pagamento = json.fromJson(compraJson, Pagamento.class);
            System.out.println(compraJson);
            return repository.save(pagamento);
        } catch (JsonSyntaxException ex) {
            System.out.println(ex);
            //TODO: Tratamento para identificar formato de data ou campo de data nulo
            return null;
        } catch (Exception ex) {
            System.out.println(ex);
            LOGGER.error(ex);
            return null;
        }

    }

    @Override
    public boolean uploadDocumento(String objectId, MultipartFile file, TipoDocumento tipoDocumento) throws IOException{
        Documento documento = new Documento();
        documento.setNomeArquivo(file.getOriginalFilename());
        documento.setDocumento(file.getBytes());
        documento.setTipoDocumento(tipoDocumento);
        mongoTemplate.updateFirst(Query.query(Criteria.where("id").is(objectId)), new Update().push("documentos", documento), Pagamento.class);
        return true;
    }

    @Override
    public boolean save(Pagamento pagamento) {
        try {
            repository.save(pagamento);
            return true;
        } catch (Exception ex) {
            LOGGER.error(ex);
            return false;
        }
    }
}
