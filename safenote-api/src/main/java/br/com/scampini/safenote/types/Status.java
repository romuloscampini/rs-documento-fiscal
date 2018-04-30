package br.com.scampini.safenote.types;

/**
 *
 * @author romuloscampini
 */
public enum Status {

    PENDENTE("Pendente"),
    LANCADO("Lançado"),
    PAGO("Pago");

    private String descricao;

    Status(String descricao){
        this.descricao = descricao;
    }

    public String getDescricao(){
        return descricao;
    }
}
