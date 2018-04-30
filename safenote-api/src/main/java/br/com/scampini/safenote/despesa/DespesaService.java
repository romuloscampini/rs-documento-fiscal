package br.com.scampini.safenote.despesa;

import br.com.scampini.safenote.despesa.Despesa;
import br.com.scampini.safenote.types.Status;
import br.com.scampini.safenote.types.TipoDocumento;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;

/**
 * Created by romuloscampini on 8/3/17.
 *
 * @author romuloscampini
 */
public interface DespesaService {

    List<Despesa> getAll();

    List<Despesa> findByPaymentName(String nome);

    Despesa findById(String id);

    boolean delete(String id);

    List<Despesa> findByPaymentStatus(Status status);

    /**
     * Método para salvar uma compra
     * @param compra - Esse objeto deve ser um json, e convertido para o modelo de Despesa
     * @return true, se a compra foi salva com sucesso, e false, se não foi.
     *
     */
    boolean save(String compra, Map<String, MultipartFile> files) throws Exception;

    Despesa save(String compra) throws Exception;

    boolean uploadDocument(String objectId, MultipartFile file, TipoDocumento tipoDocumento) throws IOException;

    boolean save(Despesa despesa);

    File downloadDocuments(String id) throws IOException;

    boolean confirmPayment(String objecjId) throws Exception;


}
