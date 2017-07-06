package br.com.scampini.safenote.model;

import br.com.scampini.safenote.types.TipoDocumentoFiscal;
import org.springframework.data.annotation.Id;

/**
 * Created by romuloscampini on 7/6/17.
 */
public class RegistroFiscal {

    @Id
    public String id;

    public TipoDocumentoFiscal tipoDocumentoFiscal;
    public byte[] documento;
}
