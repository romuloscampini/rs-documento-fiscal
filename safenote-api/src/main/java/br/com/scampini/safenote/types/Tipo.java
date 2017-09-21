package br.com.scampini.safenote.types;

/**
 * Created by romuloscampini on 7/6/17.
 */
public enum Tipo {

    SERVICO("Servico"),
    PRODUTO("Produto");

    private String descricao;

    Tipo(String descricao){
        this.descricao = descricao;
    }

    public String getDescricao(){
        return descricao;
    }
}
