package app.file;

import app.reponse.Response;

import java.util.List;

public interface Operation {
    Response createFile();
    Response deleteFile();
    //创建目录
    Response mkdir(String path);
    //删除文件
    Response delete(String file);
    //返回文件信息列表
    List<ImgFile> getFileList(String path);
}
