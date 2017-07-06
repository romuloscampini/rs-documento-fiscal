package br.com.scampini.safenote.types;

/**
 * Created by romuloscampini on 7/6/17.
 */
public enum TipoFormaPagamento {

    CARTAO_CREDITO("Cartao-Credito"),
    BOLETO("Boleto"),
    TRANSFERENCIA("Transferencia"),
    OUTROS("Outros");

    private String descricao;

    TipoFormaPagamento(String descricao){
        this.descricao = descricao;
    }

    public String getDescricao(){
        return descricao;
    }
}
