package app.jpa;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
public class DbApi {
    @Autowired
    DbMapper dbMapper;
    @CrossOrigin
    @GetMapping("/tg_article/{id}")
    public List<Article> getTGArticle(@PathVariable String id){
        return dbMapper.getArtivle1(id);
    }
    @CrossOrigin
    @GetMapping("/er_article/{id}")
    public List<Article> getERArticle(@PathVariable String id){
        return dbMapper.getArtivle3(id);
    }
    @CrossOrigin
    @GetMapping("/sh_article/{id}")
    public List<Article> getTSHArticle(@PathVariable String id){
        return dbMapper.getArtivle2(id);
    }
}
