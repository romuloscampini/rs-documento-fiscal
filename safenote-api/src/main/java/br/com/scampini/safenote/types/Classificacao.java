package br.com.scampini.safenote.types;

/**
 * Created by romuloscampini on 7/6/17.
 */
public enum Classificacao {

    PESSOAL("Pessoal"),
    CORPORATIVO("Corporativo"),
    GERAL("Geral");

    private String descricao;

    Classificacao(String descricao){
        this.descricao = descricao;
    }

    public String getDescricao(){
        return descricao;
    }
}
