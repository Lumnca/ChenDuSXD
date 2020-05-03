package app.auth;

import java.util.List;

public class UserManage {
    private Integer _id;
    private String _username;
    private String _enabled;
    private String _locked;
    private String nameZh;
    private List<String> roles;

    public Integer get_id() {
        return _id;
    }

    public void set_id(Integer _id) {
        this._id = _id;
    }

    public String get_username() {
        return _username;
    }

    public void set_username(String _username) {
        this._username = _username;
    }

    public String get_enabled() {
        return _enabled;
    }

    public void set_enabled(String _enabled) {
        this._enabled = _enabled;
    }

    public String get_locked() {
        return _locked;
    }

    public void set_locked(String _locked) {
        this._locked = _locked;
    }

    public String getNameZh() {
        return nameZh;
    }

    public void setNameZh(String nameZh) {
        this.nameZh = nameZh;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }
}
