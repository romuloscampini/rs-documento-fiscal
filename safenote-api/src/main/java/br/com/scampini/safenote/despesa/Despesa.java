package br.com.scampini.safenote.despesa;

import br.com.scampini.safenote.documento.Documento;
import br.com.scampini.safenote.types.Classificacao;
import br.com.scampini.safenote.types.Origem;
import br.com.scampini.safenote.types.Status;
import br.com.scampini.safenote.types.Tipo;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

/**
 * Created by romuloscampini on 7/5/17.
 */
@Document
public class Despesa {

    @Id
    public String id;

    private String nomeProduto;
    private String nomeLoja;
    private String nomeFornecedor;

    private Date dataOcorrenciaDespesa;
    private Date dataVencimento;
    private Date dataPagamento;

    private double valor;
    private Origem origemDespesa;
    private Classificacao classificacaoDespesa;
    private Tipo tipoDespesa;
    private Status status;
    private List<Documento> documentos;

    public Despesa() {
    }

    @Deprecated
    public Despesa(String nomeProduto, String nomeLoja, String nomeFornecedor, Date dataOcorrenciaDespesa, double valor, Origem origemDespesa, Classificacao classificacaoDespesa, Tipo tipoDespesa, Status status, List<Documento> documentos) {
        this.nomeProduto = nomeProduto;
        this.nomeLoja = nomeLoja;
        this.nomeFornecedor = nomeFornecedor;
        this.dataOcorrenciaDespesa = dataOcorrenciaDespesa;
        this.valor = valor;
        this.origemDespesa = origemDespesa;
        this.classificacaoDespesa = classificacaoDespesa;
        this.tipoDespesa = tipoDespesa;
        this.status = status;
        this.documentos = documentos;
    }

    public Despesa(String nomeProduto, String nomeLoja, String nomeFornecedor, Date dataOcorrenciaDespesa, Date dataVencimento, Date dataPagamento, double valor, Origem origemDespesa, Classificacao classificacaoDespesa, Tipo tipoDespesa, Status status, List<Documento> documentos) {
        this.nomeProduto = nomeProduto;
        this.nomeLoja = nomeLoja;
        this.nomeFornecedor = nomeFornecedor;
        this.dataOcorrenciaDespesa = dataOcorrenciaDespesa;
        this.dataVencimento = dataVencimento;
        this.dataPagamento = dataPagamento;
        this.valor = valor;
        this.origemDespesa = origemDespesa;
        this.classificacaoDespesa = classificacaoDespesa;
        this.tipoDespesa = tipoDespesa;
        this.status = status;
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

    public Date getDataOcorrenciaDespesa() {
        return dataOcorrenciaDespesa;
    }

    public void setDataOcorrenciaDespesa(Date dataOcorrenciaDespesa) {
        this.dataOcorrenciaDespesa = dataOcorrenciaDespesa;
    }

    public double getValor() {
        return valor;
    }

    public void setValor(double valor) {
        this.valor = valor;
    }

    public Origem getOrigemDespesa() {
        return origemDespesa;
    }

    public void setOrigemDespesa(Origem origemDespesa) {
        this.origemDespesa = origemDespesa;
    }

    public Classificacao getClassificacaoDespesa() {
        return classificacaoDespesa;
    }

    public void setClassificacaoDespesa(Classificacao classificacaoDespesa) {
        this.classificacaoDespesa = classificacaoDespesa;
    }

    public Tipo getTipoDespesa() {
        return tipoDespesa;
    }

    public void setTipoDespesa(Tipo tipoDespesa) {
        this.tipoDespesa = tipoDespesa;
    }

    public Status getStatus() { return status; }

    public void setStatus(Status status) {
        this.status = status;
    }

    public List<Documento> getDocumentos() {
        return documentos;
    }

    public void setDocumentos(List<Documento> documentos) {
        this.documentos = documentos;
    }

    @Override
    public String toString() {
        return "{\"Despesa\":{"
                + "                        \"id\":\"" + id + "\""
                + ",                         \"nomeProduto\":\"" + nomeProduto + "\""
                + ",                         \"nomeLoja\":\"" + nomeLoja + "\""
                + ",                         \"nomeFornecedor\":\"" + nomeFornecedor + "\""
                + ",                         \"dataOcorrenciaDespesa\":" + dataOcorrenciaDespesa
                + ",                         \"dataVencimento\":" + dataVencimento
                + ",                         \"dataPagamento\":" + dataPagamento
                + ",                         \"valor\":\"" + valor + "\""
                + ",                         \"origemDespesa\":\"" + origemDespesa + "\""
                + ",                         \"classificacaoDespesa\":\"" + classificacaoDespesa + "\""
                + ",                         \"tipoDespesa\":\"" + tipoDespesa + "\""
                + ",                         \"status\":\"" + status + "\""
                + ",                         \"documentos\":" + documentos
                + "}}";
    }

    public Date getDataVencimento() {
        return dataVencimento;
    }

    public void setDataVencimento(Date dataVencimento) {
        this.dataVencimento = dataVencimento;
    }

    public Date getDataPagamento() {
        return dataPagamento;
    }

    public void setDataPagamento(Date dataPagamento) {
        this.dataPagamento = dataPagamento;
    }
}
