package br.com.scampini.safenote.service;

import br.com.scampini.safenote.model.Compra;

import java.util.List;

/**
 * Created by romuloscampini on 8/3/17.
 *
 * @author romuloscampini
 */
public interface CompraService {

    List<Compra> getAll();

    /**
     * Método para salvar uma compra
     * @param compra - Esse objeto deve ser um json, e convertido para o modelo de Compra
     * @return true, se a compra foi salva com sucesso, e false, se não foi.
     *
     */
    boolean save(String compra);

    boolean save(Compra compra);


}
