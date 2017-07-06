package br.com.scampini.safenote.model;

import br.com.scampini.safenote.types.TipoCompra;
import org.springframework.data.annotation.Id;

import java.util.Date;
import java.util.List;

/**
 * Created by romuloscampini on 7/5/17.
 */
public class Compra {

    @Id
    public String id;

    private String nomeProduto;
    private String nomeLoja;
    private String nomeFornecedor;

    private Date dataCompra;

    private double valor;
    private TipoCompra tipoCompra;
    private List<DocumentoPagamento> documentosPagamento;
    private List<Comprovante> comprovantes;
    private List<DocumentoFiscal> documentosFiscais;
    private List<RegistroFiscal> registrosFiscais;


    public Compra(String nomeProduto, String nomeLoja, String nomeFornecedor, Date dataCompra, double valor, TipoCompra tipoCompra, List<DocumentoPagamento> documentosPagamento, List<Comprovante> comprovantes, List<DocumentoFiscal> documentosFiscais, List<RegistroFiscal> registrosFiscais) {
        this.nomeProduto = nomeProduto;
        this.nomeLoja = nomeLoja;
        this.nomeFornecedor = nomeFornecedor;
        this.dataCompra = dataCompra;
        this.valor = valor;
        this.tipoCompra = tipoCompra;
        this.documentosPagamento = documentosPagamento;
        this.comprovantes = comprovantes;
        this.documentosFiscais = documentosFiscais;
        this.registrosFiscais = registrosFiscais;
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

    public TipoCompra getTipoCompra() {
        return tipoCompra;
    }

    public void setTipoCompra(TipoCompra tipoCompra) {
        this.tipoCompra = tipoCompra;
    }

    public List<DocumentoPagamento> getDocumentosPagamento() {
        return documentosPagamento;
    }

    public void setDocumentosPagamento(List<DocumentoPagamento> documentosPagamento) {
        this.documentosPagamento = documentosPagamento;
    }

    public List<Comprovante> getComprovantes() {
        return comprovantes;
    }

    public void setComprovantes(List<Comprovante> comprovantes) {
        this.comprovantes = comprovantes;
    }

    public List<DocumentoFiscal> getDocumentosFiscais() {
        return documentosFiscais;
    }

    public void setDocumentosFiscais(List<DocumentoFiscal> documentosFiscais) {
        this.documentosFiscais = documentosFiscais;
    }

    public List<RegistroFiscal> getRegistrosFiscais() {
        return registrosFiscais;
    }

    public void setRegistrosFiscais(List<RegistroFiscal> registrosFiscais) {
        this.registrosFiscais = registrosFiscais;
    }

    @Override
    public String toString() {
        return "Compra{" +
                "id='" + id + '\'' +
                ", nomeProduto='" + nomeProduto + '\'' +
                ", nomeLoja='" + nomeLoja + '\'' +
                ", nomeFornecedor='" + nomeFornecedor + '\'' +
                ", dataCompra=" + dataCompra +
                ", valor=" + valor +
                ", tipoCompra=" + tipoCompra +
                ", documentosPagamento=" + documentosPagamento +
                ", comprovantes=" + comprovantes +
                ", documentosFiscais=" + documentosFiscais +
                ", registrosFiscais=" + registrosFiscais +
                '}';
    }
}
