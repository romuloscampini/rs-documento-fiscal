package br.com.scampini.safenote.despesa;

import br.com.scampini.safenote.documento.Documento;
import br.com.scampini.safenote.repository.PagamentoRepository;
import br.com.scampini.safenote.types.Status;
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
public class DespesaServiceImpl implements DespesaService {

    private static Logger LOGGER = Logger.getLogger(DespesaServiceImpl.class);

    @Autowired
    private PagamentoRepository repository;

    @Autowired
    protected MongoTemplate mongoTemplate;

    @Override
    public List<Despesa> getAll() {
        return repository.findAll();
    }

    @Override
    public List<Despesa> findByPaymentName(String nome) {
        return repository.findPagamentos(nome);
    }

    @Override
    public Despesa findById(String id) {
//        return repository.findOne(id);
        return mongoTemplate.findOne(Query.query(Criteria.where("_id").is(id)),
                Despesa.class);
    }

    @Override
    public boolean delete(String id) {
        repository.delete(id);
        return true;
    }


    @Override
    public List<Despesa> findByPaymentStatus(Status status) {
//        repository.find
        return repository.findPagamentos(status.getDescricao());
    }

    @Override
    public boolean save(String compraJson, Map<String, MultipartFile> files) throws Exception {
        try {
            Gson json = new Gson();
            Despesa despesa = json.fromJson(compraJson, Despesa.class);
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
            despesa.setDocumentos(documentos);
            repository.save(despesa);
            return true;
        } catch (JsonSyntaxException ex) {
            LOGGER.error(ex);
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
    public Despesa save(String compraJson) throws Exception {
        try {
            Gson json = new Gson();
            Map<String, Object> pagamentoMap = json.fromJson(compraJson, Map.class);
            final ObjectMapper mapper = new ObjectMapper();
            final Despesa despesa = mapper.convertValue(pagamentoMap, Despesa.class);
            return repository.save(despesa);
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
        mongoTemplate.updateFirst(Query.query(Criteria.where("id").is(objectId)), new Update().push("documentos", documento), Despesa.class);
        return true;
    }

    @Override
    public boolean save(Despesa despesa) {
        try {
            repository.save(despesa);
            return true;
        } catch (Exception ex) {
            LOGGER.error(ex);
            return false;
        }
    }

    @Override
    public File downloadDocuments(String id) throws IOException{
        List<Documento> documents = mongoTemplate.findOne(Query.query(Criteria.where("_id").is(id)),
                Despesa.class).getDocumentos();
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

    @Override
    public boolean confirmPayment(String objecjId) throws Exception {
        Despesa despesa = mongoTemplate.findOne(Query.query(Criteria.where("_id").is(objecjId)),
                Despesa.class);
        if(despesa.getStatus() == Status.PAGO){
            return false;
        }else{
            despesa.setStatus(Status.PAGO);
            mongoTemplate.updateFirst(Query.query(Criteria.where("id").is(objecjId)), new Update().set("status", Status.PAGO), Despesa.class);
            return true;
        }
    }
}
