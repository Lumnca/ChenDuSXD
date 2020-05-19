package app.auth;

public class MenuRole {
    private Integer id;
    private String pattern;
    private String rname;
    private String rnameZh;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getPattern() {
        return pattern;
    }

    public void setPattern(String pattern) {
        this.pattern = pattern;
    }

    public String getRname() {
        return rname;
    }

    public void setRname(String rname) {
        this.rname = rname;
    }

    public String getRnameZh() {
        return rnameZh;
    }

    public void setRnameZh(String rnameZh) {
        this.rnameZh = rnameZh;
    }
}
