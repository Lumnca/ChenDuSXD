package app.app;


import app.auth.User;
import app.auth.UserDao;
import app.auth.UserRole;
import app.jpa.Users;
import app.reponse.Response;
import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
public class Test {
    public BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(10);
    @Autowired
    UserDao userDao;
    @GetMapping("/test")
    public String showData(){
        return userDao.getRoleCount().toString();
    }
    @PostMapping("/adduser")
    public Response addUser(@RequestBody User user){

        user.set_password(bCryptPasswordEncoder.encode(user.getPassword()));
        user.set_id(userDao.getUserCount()+1);
        UserRole userRole = new UserRole();
        userRole.setId(userDao.getRoleCount()+1);
        userRole.setUid(user.get_id());
        userRole.setRid(3);
        if(userDao.addUser(user)!=0&&userDao.addRole(userRole)!=0&&userDao.addUserData(new Users(user.get_id()))!=0){
            return new Response(200,"插入成功！");
        }
        else{
            return new Response(400,"插入失败！");
        }
    }
}
