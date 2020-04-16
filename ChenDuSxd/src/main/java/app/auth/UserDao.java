package app.auth;

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
    public User loadUserByUsername(String username) {
        return userMapper.loadUserByUsername(username);
    }
}