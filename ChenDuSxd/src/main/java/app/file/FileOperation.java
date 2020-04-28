package app.file;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;

@CrossOrigin
@RestController
public class FileOperation {
    @PostMapping("/upload")
    public  void upload(MultipartFile uploadFile, HttpServletRequest request){
        if (uploadFile.isEmpty()) {
            System.out.println("NULL");
        }

        String fileName = uploadFile.getOriginalFilename();
        String filePath = System.getProperty("user.dir") ;
        System.out.println(filePath+fileName);
        File dest = new File(filePath+"/static/public/"+fileName);
        try {
            uploadFile.transferTo(dest);

        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}
