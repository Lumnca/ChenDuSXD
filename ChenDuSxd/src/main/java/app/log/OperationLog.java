package app.log;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity(name = "op_log")
public class OperationLog {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Integer id;
    private String user;
    private String date;
    private String info;
    private String operation;

    public OperationLog(){

    }
    public OperationLog(Integer id, String user, String date, String info) {
        this.id = id;
        this.user = user;
        this.date = date;
        this.info = info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public String getOperation() {
        return operation;
    }

    public void setOperation(String operation) {
        this.operation = operation;
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
