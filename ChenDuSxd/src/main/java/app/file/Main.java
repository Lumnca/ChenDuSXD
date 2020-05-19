package app.file;

import java.io.File;

public class Main {
    public static void main(String[] args){

        File file = new File(System.getProperty("user.dir")+"/static/");

        for (File f : file.listFiles()
             ) {
            if(f.isDirectory()){
                for (File f2 :f.listFiles()
                     ) {
                    System.out.println(f2.getName());
                }
            }
            else{
                System.out.println(f.getName());
            }
        }
    }
}
