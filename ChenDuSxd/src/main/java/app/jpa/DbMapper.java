package app.jpa;

import app.auth.User;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface DbMapper {
    @Select("SELECT * FROM tb_article where uid = #{uid} and state = 1;")
    List<Article> getArtivle1(String uid);

    @Select("SELECT * FROM tb_article where uid = #{uid} and state = 0;")
    List<Article> getArtivle2(String uid);

    @Select("SELECT * FROM tb_article where uid = #{uid} and state = -1;")
    List<Article> getArtivle3(String uid);

    @Select("SELECT * FROM Authentication.tb_active")
    List<Active> getActive();

    @Insert("insert into Authentication.tb_enroll values(#{aid},#{uid},#{state},#{date},#{name},#{telphone},#{aname})")
    Integer enrollActive(Enroll enroll);

    @Select("SELECT * FROM Authentication.tb_enroll where uid = #{id}")
    List<Enroll> getMyActive(Integer id);

    @Select("SELECT * FROM Authentication.tb_users where uid = #{id}")
    Users getUserData(Integer id);

    @Select("SELECT * FROM Authentication.tb_enroll where aid = #{id}")
    List<Enroll> getActivePeople(Integer id);

    @Select("UPDATE Authentication.tb_enroll SET state = #{s} WHERE aid = #{aid} and uid =  #{uid}")
    Integer peopleJoinA(Integer s,Integer aid,Integer uid);

    @Select("SELECT * FROM Authentication.tb_message where object = #{user}")
    List<Message> getUserMessage(String user);

    @Update("UPDATE Authentication.tb_active SET number = (number+1) WHERE id = #{aid}")
    Integer activeAddNumber(Integer aid);
}
