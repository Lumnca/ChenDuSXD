package app.auth;


import app.reponse.Response;
import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AuthController {
    @Autowired
    UserDao userDao;
    private BCryptPasswordEncoder  bc = new BCryptPasswordEncoder(10);
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
    @GetMapping("/admin/users")
    public List<UserManage> getUserManage(){
        return userDao.getUserManage();
    }
    @PostMapping("/admin/locked")
    public Response lockedUser(@RequestBody JSONObject object){

        if(userDao.lockedUser(object.get("name").toString(),Integer.parseInt(object.get("s").toString()))>=0){
            return new Response(200,"修改成功！");
        }
        else{
            return new Response(400,"修改失败！");
        }
    }
    @PostMapping("/admin/del/{name}")
    public Response deleteUser(@PathVariable(name = "name")String name){

        if(userDao.delUser(name)>0){
            return new Response(200,"禁用成功！");
        }
        else{
            return new Response(400,"禁用失败！");
        }
    }
    @PostMapping("admin/set")
    public Response setUserPassword(@RequestBody JSONObject object){
        String name = object.getString("username");
        String password = bc.encode(object.getString("password"));

        if(userDao.updateUserPassword(password,name)>0){
            return new Response(200,"修改密码成功！");
        }
        else{
            return new Response(400,"修改密码失败！");
        }
    }
}
