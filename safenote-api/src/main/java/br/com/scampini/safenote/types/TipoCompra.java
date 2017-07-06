package br.com.scampini.safenote.types;

/**
 * Created by romuloscampini on 7/6/17.
 */
public enum TipoCompra {

    SERVICO("Servico"),
    PRODUTO("Produto");

    private String descricao;

    TipoCompra(String descricao){
        this.descricao = descricao;
    }

    public String getDescricao(){
        return descricao;
    }
}
