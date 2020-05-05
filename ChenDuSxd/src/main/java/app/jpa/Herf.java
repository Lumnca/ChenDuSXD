package app.jpa;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity(name = "tb_herf")
public class Herf  {
    @Id
    private Integer id;
    private String herf;
    private String title;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getHerf() {
        return herf;
    }

    public void setHerf(String herf) {
        this.herf = herf;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
