package app.log;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LogTest {
    @GetMapping("/ts/{n}")
    public int getA(@PathVariable(name = "n")int n){
        return 5/n;
    }
}
