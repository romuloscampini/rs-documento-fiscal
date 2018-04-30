package br.com.scampini.safenote.types;

public enum Origem {

    COMPRA("Compra"),
    CONTA("Conta"),
    REEMBOLSO("Reembolso");

    private String descricao;

    Origem(String descricao){
        this.descricao = descricao;
    }

    public String getDescricao(){
        return descricao;
    }

}
