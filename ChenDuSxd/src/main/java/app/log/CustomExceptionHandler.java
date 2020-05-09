package app.log;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;


import java.io.IOException;


@ControllerAdvice
public class CustomExceptionHandler {
    @ExceptionHandler(Exception.class)
    public void upLoadException(Exception e)throws IOException {
        /**
         * 全局异常处理
         */
        System.out.println(e.getMessage());
    }
}