package app.file;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.List;

@CrossOrigin
@RestController
public class FileOperation {
    @Autowired
    FileManage fileManage;
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
    @GetMapping("/files/{path}")
    public List<ImgFile> getFileList(@PathVariable(name = "path")String path){
        return fileManage.getFileList(path);
    }
}
