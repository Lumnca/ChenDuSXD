package app.auth;

import app.jpa.Users;
import com.alibaba.fastjson.JSONObject;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

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


}