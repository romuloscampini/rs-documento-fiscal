import java.util.Date;
import java.text.SimpleDateFormat;

public class Main {

  public static void main(String[] args){
    System.out.println(new SimpleDateFormat("yyyyMMdd-HHmmss").format(new Date()));
  }
}
