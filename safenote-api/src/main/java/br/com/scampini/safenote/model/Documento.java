package br.com.scampini.safenote.model;

import br.com.scampini.safenote.types.TipoDocumento;
import org.springframework.data.annotation.Id;

/**
 * Created by romuloscampini on 9/7/17.
 *
 * @author romuloscampini
 * @since
 */
public class Documento {

    @Id
    private Long id;

    private String nomeArquivo;

    private byte[] documento;
    private TipoDocumento tipoDocumento;

    public Long getId() {
        return id;
    }

    public String getNomeArquivo() {
        return nomeArquivo;
    }

    public void setNomeArquivo(String nomeArquivo) {
        this.nomeArquivo = nomeArquivo;
    }

    public byte[] getDocumento() {
        return documento;
    }

    public void setDocumento(byte[] documento) {
        this.documento = documento;
    }

    public TipoDocumento getTipoDocumento() {
        return tipoDocumento;
    }

    public void setTipoDocumento(TipoDocumento tipoDocumento) {
        this.tipoDocumento = tipoDocumento;
    }
}
