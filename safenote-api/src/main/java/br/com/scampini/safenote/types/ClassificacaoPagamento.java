package br.com.scampini.safenote.types;

/**
 * Created by romuloscampini on 7/6/17.
 */
public enum ClassificacaoPagamento {

    PESSOAL("Pessoal"),
    GERAL("Geral");

    private String descricao;

    ClassificacaoPagamento(String descricao){
        this.descricao = descricao;
    }

    public String getDescricao(){
        return descricao;
    }
}
