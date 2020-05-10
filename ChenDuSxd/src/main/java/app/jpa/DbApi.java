package app.jpa;

import app.reponse.Response;
import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    @CrossOrigin
    @GetMapping("/active")
    public List<Active> getActive(){
        return dbMapper.getActive();
    }
    @CrossOrigin
    @PostMapping("/enrollA")
    public Response enrollActive(@RequestBody Enroll enroll){
        Response response = new Response(0,"");

        if(dbMapper.enrollActive(enroll)!=0){
            dbMapper.activeAddNumber(enroll.getAid());
            response.setCode(200);
            response.setMessage("添加数据成功！");
        }
        else{
            response.setCode(400);
            response.setMessage("添加数据失败！");
        }
        return  response;
    }

    @CrossOrigin
    @GetMapping("/enrollM/{id}")
    public List<Enroll> myEnrollActive(@PathVariable Integer id){
        return dbMapper.getMyActive(id);
    }

    @CrossOrigin
    @GetMapping("/user/{id}")
    public Users getUserData(@PathVariable Integer id){
        return dbMapper.getUserData(id);
    }

    @CrossOrigin
    @GetMapping("/admin/acp/{id}")
    public List<Enroll> getActivePeople(@PathVariable Integer id){
        return dbMapper.getActivePeople(id);
    }
    @CrossOrigin
    @PostMapping("/ac")
    public Response peopleAc(@RequestBody JSONObject object){
        Integer state = Integer.parseInt(object.getString("s"));
        Integer aid = Integer.parseInt(object.getString("aid"));
        Integer uid = Integer.parseInt(object.getString("uid"));
        dbMapper.peopleJoinA(state,aid,uid);
        return new Response(200,"修改成功！");
    }
    @CrossOrigin
    @GetMapping("/message/{name}")
    public List<Message> getUserMessage(@PathVariable String name){
        return dbMapper.getUserMessage(name);
    }
    @GetMapping("/ts/{n}")
    public int getA(@PathVariable(name = "n")int n){
        return 5/n;
    }
}
