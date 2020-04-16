package app.app;


import app.reponse.Reponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class Test {
    @GetMapping("test")
    public Reponse getData(){

        Reponse r = new Reponse<List>();
        List<String> lists = new ArrayList<>();
        lists.add("a");
        lists.add("b");
        r.setCode(200);
        r.setData(lists);
        r.setMessage("KS");
        return r;
    }
}
