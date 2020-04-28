package app.admin;

public class Log {
    private Integer id;
    private String user;
    private String date;
    private String info;
    public Log(){

    }
    public Log(Integer id, String user, String date, String info) {
        this.id = id;
        this.user = user;
        this.date = date;
        this.info = info;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getInfo() {
        return info;
    }

    public void setInfor(String info) {
        this.info = info;
    }
}
