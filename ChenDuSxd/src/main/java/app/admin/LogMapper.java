package app.admin;


import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LogMapper {
    @Insert("INSERT INTO lo_log  VALUES (#{id},#{date},#{ip},#{address},#{username})")
    Integer addLoLog(LoginLog log);
}
