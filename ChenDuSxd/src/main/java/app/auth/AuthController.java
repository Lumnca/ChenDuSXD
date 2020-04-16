package app.auth;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {
    @GetMapping("admin/index")
    public String admin(){
        return "admin";
    }
    @GetMapping("user/index")
    public String index(){
        return  "index";
    }
    @GetMapping("a")
    public String a(){
        return "a";
    }
}
