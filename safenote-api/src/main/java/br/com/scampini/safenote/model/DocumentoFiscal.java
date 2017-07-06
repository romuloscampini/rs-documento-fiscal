package br.com.scampini.safenote.model;

import org.springframework.data.annotation.Id;

import java.util.Arrays;
import java.util.Date;

/**
 * Created by romuloscampini on 7/6/17.
 */
public class DocumentoFiscal {

    @Id
    public String id;

    public Date dataRecebimento;
    public byte[] documento;

    public DocumentoFiscal(Date dataRecebimento, byte[] documento) {
        this.dataRecebimento = dataRecebimento;
        this.documento = documento;
    }

    public String getId() {
        return id;
    }

    public Date getDataRecebimento() {
        return dataRecebimento;
    }

    public void setDataRecebimento(Date dataRecebimento) {
        this.dataRecebimento = dataRecebimento;
    }

    public byte[] getDocumento() {
        return documento;
    }

    public void setDocumento(byte[] documento) {
        this.documento = documento;
    }

    @Override
    public String toString() {
        return "DocumentoFiscal{" +
                "id='" + id + '\'' +
                ", dataRecebimento=" + dataRecebimento +
                ", documento=" + Arrays.toString(documento) +
                '}';
    }
}
