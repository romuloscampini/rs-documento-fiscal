package br.com.scampini.safenote.model;

import br.com.scampini.safenote.types.ClassificacaoPagamento;
import br.com.scampini.safenote.types.StatusPagamento;
import br.com.scampini.safenote.types.Tipo;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

/**
 * Created by romuloscampini on 7/5/17.
 */
@Document
public class Pagamento {

    @Id
    public String id;

    private String nomeProduto;
    private String nomeLoja;
    private String nomeFornecedor;

    private Date dataCompra;

    private double valor;
    private ClassificacaoPagamento classificacaoPagamento;
    private Tipo tipo;
    private StatusPagamento statusPagamento;
    private List<Documento> documentos;

    public Pagamento(String nomeProduto, String nomeLoja, String nomeFornecedor, Date dataCompra, double valor, ClassificacaoPagamento classificacaoPagamento, Tipo tipo, StatusPagamento statusPagamento, List<Documento> documentos) {
        this.nomeProduto = nomeProduto;
        this.nomeLoja = nomeLoja;
        this.nomeFornecedor = nomeFornecedor;
        this.dataCompra = dataCompra;
        this.valor = valor;
        this.classificacaoPagamento = classificacaoPagamento;
        this.tipo = tipo;
        this.statusPagamento = statusPagamento;
        this.documentos = documentos;
    }

    public String getId() {
        return id;
    }

    public String getNomeProduto() {
        return nomeProduto;
    }

    public void setNomeProduto(String nomeProduto) {
        this.nomeProduto = nomeProduto;
    }

    public String getNomeLoja() {
        return nomeLoja;
    }

    public void setNomeLoja(String nomeLoja) {
        this.nomeLoja = nomeLoja;
    }

    public String getNomeFornecedor() {
        return nomeFornecedor;
    }

    public void setNomeFornecedor(String nomeFornecedor) {
        this.nomeFornecedor = nomeFornecedor;
    }

    public Date getDataCompra() {
        return dataCompra;
    }

    public void setDataCompra(Date dataCompra) {
        this.dataCompra = dataCompra;
    }

    public double getValor() {
        return valor;
    }

    public void setValor(double valor) {
        this.valor = valor;
    }

    public ClassificacaoPagamento getClassificacaoPagamento() {
        return classificacaoPagamento;
    }

    public void setClassificacaoPagamento(ClassificacaoPagamento classificacaoPagamento) {
        this.classificacaoPagamento = classificacaoPagamento;
    }

    public Tipo getTipo() {
        return tipo;
    }

    public void setTipo(Tipo tipo) {
        this.tipo = tipo;
    }

    public StatusPagamento getStatusPagamento() { return statusPagamento; }

    public void setStatusPagamento(StatusPagamento statusPagamento) {
        this.statusPagamento = statusPagamento;
    }

    public List<Documento> getDocumentos() {
        return documentos;
    }

    public void setDocumentos(List<Documento> documentos) {
        this.documentos = documentos;
    }

    @Override
    public String toString() {
        return "Pagamento{" +
                "id='" + id + '\'' +
                ", nomeProduto='" + nomeProduto + '\'' +
                ", nomeLoja='" + nomeLoja + '\'' +
                ", nomeFornecedor='" + nomeFornecedor + '\'' +
                ", dataCompra=" + dataCompra +
                ", valor=" + valor +
                ", tipo=" + tipo +
                ", documentos=" + documentos +
                '}';
    }
}
