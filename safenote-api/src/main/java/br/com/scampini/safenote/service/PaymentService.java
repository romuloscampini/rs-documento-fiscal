package br.com.scampini.safenote.service;

import br.com.scampini.safenote.model.Pagamento;
import br.com.scampini.safenote.types.StatusPagamento;
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
public interface PaymentService {

    List<Pagamento> getAll();

    List<Pagamento> findByPaymentName(String nome);

    Pagamento findById(String id);

    boolean delete(String id);

    List<Pagamento> findByPaymentStatus(StatusPagamento statusPagamento);

    /**
     * Método para salvar uma compra
     * @param compra - Esse objeto deve ser um json, e convertido para o modelo de Pagamento
     * @return true, se a compra foi salva com sucesso, e false, se não foi.
     *
     */
    boolean save(String compra, Map<String, MultipartFile> files) throws Exception;

    Pagamento save(String compra) throws Exception;

    boolean uploadDocument(String objectId, MultipartFile file, TipoDocumento tipoDocumento) throws IOException;

    boolean save(Pagamento pagamento);

    File downloadDocuments(String id) throws IOException;

    boolean confirmPayment(String objecjId) throws Exception;


}
