package br.com.scampini.safenote.model;

import br.com.scampini.safenote.types.TipoFormaPagamento;
import org.springframework.data.annotation.Id;

import java.util.Date;

/**
 * Created by romuloscampini on 7/6/17.
 */
public class DocumentoPagamento {

    @Id
    public String id;

    public String nrDocPagamento;
    public TipoFormaPagamento tipoFormaPagamento;
    public Date dataVencimento;
    public double valor;
    public double desconto;
    public byte[] documento;


    public DocumentoPagamento(String nrDocPagamento, TipoFormaPagamento tipoFormaPagamento, Date dataVencimento, double valor, double desconto, byte[] documento) {
        this.nrDocPagamento = nrDocPagamento;
        this.tipoFormaPagamento = tipoFormaPagamento;
        this.dataVencimento = dataVencimento;
        this.valor = valor;
        this.desconto = desconto;
        this.documento = documento;
    }

    public String getId() {
        return id;
    }

    public String getNrDocPagamento() {
        return nrDocPagamento;
    }

    public void setNrDocPagamento(String nrDocPagamento) {
        this.nrDocPagamento = nrDocPagamento;
    }

    public TipoFormaPagamento getTipoFormaPagamento() {
        return tipoFormaPagamento;
    }

    public void setTipoFormaPagamento(TipoFormaPagamento tipoFormaPagamento) {
        this.tipoFormaPagamento = tipoFormaPagamento;
    }

    public Date getDataVencimento() {
        return dataVencimento;
    }

    public void setDataVencimento(Date dataVencimento) {
        this.dataVencimento = dataVencimento;
    }

    public double getValor() {
        return valor;
    }

    public void setValor(double valor) {
        this.valor = valor;
    }

    public double getDesconto() {
        return desconto;
    }

    public void setDesconto(double desconto) {
        this.desconto = desconto;
    }

    @Override
    public String toString() {
        return "DocumentoPagamento{" +
                "id='" + id + '\'' +
                ", nrDocPagamento='" + nrDocPagamento + '\'' +
                ", tipoFormaPagamento=" + tipoFormaPagamento +
                ", dataVencimento=" + dataVencimento +
                ", valor=" + valor +
                ", desconto=" + desconto +
                '}';
    }
}
