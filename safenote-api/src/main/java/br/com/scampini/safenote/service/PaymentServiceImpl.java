package br.com.scampini.safenote.service;

import br.com.scampini.safenote.model.Documento;
import br.com.scampini.safenote.model.Pagamento;
import br.com.scampini.safenote.repository.PagamentoRepository;
import br.com.scampini.safenote.types.StatusPagamento;
import br.com.scampini.safenote.types.TipoDocumento;
import com.fasterxml.jackson.databind.ObjectMapper;
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

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

/**
 * Created by romuloscampini on 8/3/17.
 *
 * @author romuloscampini
 */
@Service
public class PaymentServiceImpl implements PaymentService {

    private static Logger LOGGER = Logger.getLogger(PaymentServiceImpl.class);

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
    public Pagamento save(String compraJson) throws Exception {
        try {
            Gson json = new Gson();
            Map<String, Object> pagamentoMap = json.fromJson(compraJson, Map.class);
            final ObjectMapper mapper = new ObjectMapper();
            final Pagamento pagamento = mapper.convertValue(pagamentoMap, Pagamento.class);
            return repository.save(pagamento);
        } catch (JsonSyntaxException ex) {
            System.out.println(ex);
            //TODO: Tratamento para identificar formato de data ou campo de data nulo
            throw new RuntimeException(ex);
        } catch (Exception ex) {
            System.out.println(ex);
            LOGGER.error(ex);
            throw new RuntimeException(ex);
        }

    }

    @Override
    public boolean uploadDocument(String objectId, MultipartFile file, TipoDocumento tipoDocumento) throws IOException{
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

    @Override
    public File downloadDocuments(String id) throws IOException{
        List<Documento> documents = mongoTemplate.findOne(Query.query(Criteria.where("_id").is(id)),
                Pagamento.class).getDocumentos();
        if (null != documents) {

            /**
             * filename = ObjectID-yyyyMMddHHmmss
             * Example: 56ajkljvalkbjji890ru9u190-20171012073010
             */
            String filename = id +"-" + new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());
            String extension = "zip";
    //        File file = File.createTempFile(filename, extension);
            File file = new File("/tmp/" + filename + "." + extension);
            ZipOutputStream zipFile = new ZipOutputStream(new FileOutputStream(file));
            documents
                    .forEach(document -> {
                        try {
                            ZipEntry zipEntry = new ZipEntry(document.getNomeArquivo());
                            zipFile.putNextEntry(zipEntry);
                            zipFile.write(document.getDocumento(), 0, document.getDocumento().length);
                            zipFile.closeEntry();
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    });
            LOGGER.debug("Quantidade de arquivos compactados do documento( " + id + "): " + documents.size());
            zipFile.close();
            return file;
        }
        return null;
    }
}
