package br.com.scampini.safenote.service;

import br.com.scampini.safenote.model.Compra;
import br.com.scampini.safenote.repository.CompraRepository;
import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by romuloscampini on 8/3/17.
 *
 * @author romuloscampini
 */
@Service
public class CompraServiceImpl implements CompraService{

    private static Logger LOGGER = Logger.getLogger(CompraServiceImpl.class);

    @Autowired
    private CompraRepository repository;

    @Override
    public List<Compra> getAll() {
        return repository.findAll();
    }

    @Override
    public boolean save(String compraJson) {
        try {
            Gson json = new Gson();
            Compra compra = json.fromJson(compraJson, Compra.class);
            repository.save(compra);
            return true;
        }
        catch (JsonSyntaxException ex){
            //TODO: Tratamento para identificar formato de data ou campo de data nulo
            return false;
        }
        catch (Exception ex){
            LOGGER.error(ex);
            return false;
        }

    }

    @Override
    public boolean save(Compra compra) {
        try {
            repository.save(compra);
            return true;
        }
        catch (Exception ex){
            LOGGER.error(ex);
            return false;
        }
    }
}
