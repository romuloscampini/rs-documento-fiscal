package br.com.scampini.safenote;

import java.util.Scanner;

/**
 * @author romuloscampini
 * @since
 */
public class Ex2 {

    public static void main(String[] args) {

        Scanner entrada = new Scanner(System.in);


        double numdigitado = 1.00;
        double resultado = 1.00;

        System.out.println("Digite um numero");
        numdigitado = entrada.nextDouble();

        while(numdigitado != 0){
            resultado = resultado * numdigitado;
            System.out.println("Digite um numero");
            numdigitado = entrada.nextDouble();
        }
        System.out.println("O produto dos números digitados é:");
        System.out.println(resultado);

    }
}
