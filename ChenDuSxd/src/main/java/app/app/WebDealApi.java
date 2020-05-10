package app.app;


import app.auth.User;
import app.auth.UserDao;
import app.auth.UserRole;
import app.jpa.Users;
import app.reponse.Response;
import app.sms.MailServer;
import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.Random;

@RestController
public class WebDealApi {
    public BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(10);
    @Autowired
    UserDao userDao;
    @Autowired
    MailServer mailServer;
    @PostMapping("/sendMail")
    public String send(@RequestBody JSONObject object,HttpServletRequest request){
        String to = object.getString("to");
        int auth = new Random().nextInt(99999);
        request.getSession().setAttribute("auth",auth);
       mailServer.sendSimpleMail("724119519@qq.com",to,"724119519@qq.com",
                "验证码服务","您的验证码为"+auth+"，请在一分钟内完成！");
        return "发送验证码成功！请注意查收";
    }
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
            return new Response(200,"注册成功！");
        }
        else{
            return new Response(400,"注册失败！");
        }
    }
    @GetMapping("/session/{key}")
    public Response getSessionByKey(@PathVariable(name = "key") String key, HttpServletRequest request){
        Response response = new Response(0,"");
        if(request.getSession().getAttribute(key)!=null){
            response.setMessage("获取Session信息成功！");
            response.setCode(200);
            response.setData(request.getSession().getAttribute(key));
        }
        else{
            response.setMessage("Session信息为空");
            response.setCode(404);
        }
        return response;
    }
    @PostMapping("/write")
    public Response writeSession(@RequestBody JSONObject object,HttpServletRequest request){
        String key = object.getString("key");
        Object value = object.get("value");
        Response response = new Response(200,"写入成功！");
        try {
            request.getSession().setAttribute(key,value);
        }
        catch (Exception e){
            response.setCode(400);
            response.setMessage("插入Session失败！");
        }
       return  response;
    }
    @PostMapping("/reuser")
    public Response reUserPassword(@RequestBody JSONObject object,HttpServletRequest request){
        String username = object.getString("username");
        String auth = object.getString("auth");
        String password = object.getString("password");
        if(auth.equals(request.getSession().getAttribute("auth").toString())&&userDao.updateUserPassword(bCryptPasswordEncoder.encode(password),username)>0){
            System.out.println("YES");
            return new Response(200,"密码重置成功！");
        }
        else{
            return new Response(400,"重置失败！");
        }

    }
}
