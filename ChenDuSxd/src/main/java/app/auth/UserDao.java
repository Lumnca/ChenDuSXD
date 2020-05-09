package app.auth;

import app.log.LoginLog;
import app.jpa.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserDao implements UserMapper {
    @Autowired
    UserMapper userMapper;
    @Override
    public List<Role> getUserRolesByUid(Integer id) {
        return userMapper.getUserRolesByUid(id);
    }

    @Override
    public Integer addUser(User user) {
        return userMapper.addUser(user);
    }

    @Override
    public Integer addRole(UserRole userRole) {
        return userMapper.addRole(userRole);
    }

    @Override
    public Integer addUserData(Users users) {
        return userMapper.addUserData(users);
    }

    @Override
    public Integer getRoleCount() {
        return  Integer.parseInt( userMapper.getRoleCount().toString()) ;
    }

    @Override
    public Integer getUserCount() {
        return Integer.parseInt( userMapper.getUserCount().toString()) ;
    }

    @Override
    public Integer addLoLog(LoginLog log) {
        return userMapper.addLoLog(log);
    }

    @Override
    public List<UserManage> getUserManage() {
        return userMapper.getUserManage();
    }

    @Override
    public Integer lockedUser(String name,Integer s) {
        return userMapper.lockedUser(name,s);
    }

    @Override
    public Integer delUser(String name) {
        return userMapper.delUser(name);
    }

    @Override
    public Integer updateUserPassword(String password, String name) {
        return userMapper.updateUserPassword(password,name);
    }

    @Override
    public User loadUserByUsername(String username) {
        return userMapper.loadUserByUsername(username);
    }
}