package app.log;


import app.Run;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface RunLogMapper {
    @Insert("INSERT INTO Authentication.run_log  VALUES (#{id}, #{date}, #{type},#{info},#{source})")
    Integer addLog(RunLog log);
    @Select("SELECT count(*) FROM Authentication.run_log")
    Object length();
}
