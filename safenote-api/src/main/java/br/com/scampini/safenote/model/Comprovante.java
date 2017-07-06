package br.com.scampini.safenote.model;

import org.springframework.data.annotation.Id;

import java.util.Arrays;
import java.util.Date;

/**
 * Created by romuloscampini on 7/6/17.
 */
public class Comprovante {

    @Id
    public String id;

    public Date dataPagamento;
    public double valorPago;
    public String nomeContaDebito;
    public byte[] documento;

    public Comprovante(Date dataPagamento, double valorPago, String nomeContaDebito, byte[] documento) {
        this.dataPagamento = dataPagamento;
        this.valorPago = valorPago;
        this.nomeContaDebito = nomeContaDebito;
        this.documento = documento;
    }

    public String getId() {
        return id;
    }

    public Date getDataPagamento() {
        return dataPagamento;
    }

    public void setDataPagamento(Date dataPagamento) {
        this.dataPagamento = dataPagamento;
    }

    public double getValorPago() {
        return valorPago;
    }

    public void setValorPago(double valorPago) {
        this.valorPago = valorPago;
    }

    public String getNomeContaDebito() {
        return nomeContaDebito;
    }

    public void setNomeContaDebito(String nomeContaDebito) {
        this.nomeContaDebito = nomeContaDebito;
    }

    public byte[] getDocumento() {
        return documento;
    }

    public void setDocumento(byte[] documento) {
        this.documento = documento;
    }

    @Override
    public String toString() {
        return "Comprovante{" +
                "id='" + id + '\'' +
                ", dataPagamento=" + dataPagamento +
                ", valorPago=" + valorPago +
                ", nomeContaDebito='" + nomeContaDebito + '\'' +
                ", documento=" + Arrays.toString(documento) +
                '}';
    }
}
