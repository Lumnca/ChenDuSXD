package app.jpa;

import app.auth.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface DbMapper {
    @Select("SELECT * FROM tb_article where uid = #{uid} and state = 1;")
    List<Article> getArtivle1(String uid);
    @Select("SELECT * FROM tb_article where uid = #{uid} and state = 0;")
    List<Article> getArtivle2(String uid);
    @Select("SELECT * FROM tb_article where uid = #{uid} and state = -1;")
    List<Article> getArtivle3(String uid);
}
