package br.com.scampini.safenote.types;

/**
 * Created by romuloscampini on 7/6/17.
 */
public enum TipoDocumentoFiscal {

    DANFE("DANFE"),
    NFE("NFE"),
    OUTROS("Outros");

    private String descricao;

    TipoDocumentoFiscal(String descricao){ this.descricao = descricao; }

    public String getDescricao(){
        return descricao;
    }

}
