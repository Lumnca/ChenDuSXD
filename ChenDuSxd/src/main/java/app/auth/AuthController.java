package app.auth;


import app.reponse.Response;
import com.alibaba.fastjson.JSONObject;
import org.apache.ibatis.annotations.Delete;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AuthController {
    @Autowired
    UserDao userDao;
    @Autowired
    MenuMapper menuMapper;
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
    @GetMapping("/admin/menuR")
    public List<MenuRole> getMenuRole(){
        return menuMapper.getMenuRole();
    }

    @PostMapping("/admin/insertMenu")
    public  Response insertMenu(@RequestBody JSONObject object){
        Integer id = object.getInteger("id");
        String pattern = object.getString("pattern");
        if(menuMapper.insertMenu(id,pattern)>0){
            return new Response(200,"添加成功！");
        }
        else{
            return new Response(400,"添加失败！");
        }
    }
    @PostMapping("/admin/updateMenu")
    public Response updateMenu(@RequestBody JSONObject object){
        Integer id = object.getInteger("id");
        String pattern = object.getString("pattern");
        if(menuMapper.updateMenu(id,pattern)>0){
            return new Response(200,"修改成功！");
        }
        else{
            return new Response(400,"修改失败！");
        }
    }
    @DeleteMapping("/admin/deleteMenu/{id}")
    public Response deleteMenu(@PathVariable(name = "id") Integer id){
        if(menuMapper.deleteMenu(id)>0){
            return new Response(200,"删除成功！");
        }
        else{
            return new Response(400,"删除失败！");
        }
    }
    @PostMapping("/admin/addMenuRole")
    public Response addxa(@RequestBody JSONObject object){
        Integer id = Integer.parseInt(menuMapper.getMRCount().toString());
        Integer mid = object.getInteger("mid");
        Integer rid = object.getInteger("rid");

        if(menuMapper.addMenuRole(id+1,mid,rid)>0){
            return new Response(200,"添加成功！");
        }
        else{
            return new Response(400,"添加失败！");
        }
    }
    @DeleteMapping("/admin/deleteMenuRole/{id}")
    public Response deleteMenuRole(@PathVariable(name = "id") Integer id){
        if(menuMapper.deleteMenuRole(id)>0){
            return new Response(200,"删除成功！");
        }
        else{
            return new Response(400,"删除失败！");
        }
    }
}
