package app.auth;

import com.alibaba.fastjson.JSONObject;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface MenuMapper {
    List<Menu> getAllMenus();

    @Update("UPDATE Authentication.menu SET pattern = #{pattern} WHERE id = #{id} ")
    Integer updateMenu(Integer id,String pattern);

    @Insert("INSERT INTO Authentication.menu  VALUES ( #{id}, #{pattern} )")
    Integer insertMenu(Integer id,String pattern);

    @Delete("DELETE FROM Authentication.menu WHERE id = #{id}")
    Integer deleteMenu(Integer id);
    @Select("SELECT m.*,r.name AS rname,r.nameZh AS rnameZh FROM menu m LEFT JOIN menu_role mr ON m.id = mr.mid LEFT JOIN role r ON mr.rid=r.id")
    List<MenuRole>  getMenuRole();

    @Select("SELECT id FROM Authentication.menu_role order by id desc limit  1")
    Object getMRCount();

    @Insert("INSERT INTO Authentication.menu_role  VALUES (#{id},#{mid},#{rid})")
    Integer addMenuRole(Integer id,Integer mid,Integer rid);

    @Delete("DELETE FROM Authentication.menu_role WHERE mid = #{mid} and id > 0")
    Integer deleteMenuRole(Integer mid);
}
