package app.log;

import org.aspectj.lang.JoinPoint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;


import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;


@ControllerAdvice
public class CustomExceptionHandler {
    @Autowired
    RunLogMapper runLogMapper;
    @ExceptionHandler(Exception.class)
    public void upLoadException(Exception e)throws IOException {
        /**
         * 全局异常处理
         */
        Integer id = Integer.parseInt(runLogMapper.length().toString());
        runLogMapper.addLog(new RunLog(id+1,getDate(false),"ERROR", "错误信息:  "+e.getMessage(),"全局异常处理"));
    }
    public String getDate(boolean type){
        SimpleDateFormat simpleDateFormat1 = new SimpleDateFormat("yyyy-MM-dd");
        SimpleDateFormat simpleDateFormat2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        if(type){
            return simpleDateFormat1.format(new Date());
        }
        else{
            return simpleDateFormat2.format(new Date());
        }
    }
}