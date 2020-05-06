package app.auth;

import app.admin.LoginLog;
import app.jpa.Users;
import com.alibaba.fastjson.JSONObject;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface UserMapper {
    @Select("select * from user where _username = #{username}")
    User  loadUserByUsername(String username);
    @Select(" SELECT * FROM role r, user_role ur where r.id = ur.rid and ur.uid = #{id}")
    List<Role> getUserRolesByUid(Integer id);
    @Insert("insert into user values(#{_id},#{_username},#{_password},#{_enabled},#{_locked})")
    Integer addUser(User user);
    @Insert("INSERT INTO user_role  VALUES (#{id},#{uid},#{rid})")
    Integer addRole( UserRole userRole);
    @Insert("INSERT INTO tb_users VALUES (#{uid},#{name},#{birthday},#{phonenum},#{school},#{parentname},#{ispublic},#{profile})")
    Integer addUserData(Users users);
    @Select("SELECT count(*) FROM user_role")
    Object getRoleCount();
    @Select("SELECT count(*) FROM user;")
    Object getUserCount();

    @Insert("INSERT INTO lo_log  VALUES (#{id},#{date},#{ip},#{address},#{username})")
    Integer addLoLog(LoginLog log);

    @Select("SELECT user._id,user._username, user._enabled,user._locked,role.nameZh FROM user ,role ,user_role where user._id = user_role.uid  and user_role.rid = role.id")
    List<UserManage> getUserManage();

    @Update("UPDATE Authentication.user SET _locked = #{s} WHERE _username = #{name} and _id > 0")
    Integer lockedUser(String name,Integer s);
    @Update("UPDATE user SET _enabled = 0 WHERE  _username = #{name} and _id > 0")
    Integer delUser(String name);

    @Update("UPDATE user SET _password = #{password} WHERE  _username = #{name} and _id > 0")
    Integer updateUserPassword(String password,String name);
}