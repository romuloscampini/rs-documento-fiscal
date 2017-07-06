package br.com.scampini.safenote;

/**
 * Created by romuloscampini on 7/24/17.
 *
 * @author romuloscampini
 */
public class SandboxDebug {

    public static void debug(Object obj){
        System.out.println("Object recebido");
        System.out.println("Iniciando conversao...");
        obj.toString();
        System.out.println("Finalizando conversao...");
    }
}
