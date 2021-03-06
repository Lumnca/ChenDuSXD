package app.auth;

import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.hierarchicalroles.RoleHierarchy;
import org.springframework.security.access.hierarchicalroles.RoleHierarchyImpl;
import org.springframework.security.authentication.*;
import org.springframework.security.config.annotation.ObjectPostProcessor;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.access.intercept.FilterSecurityInterceptor;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

@Configuration
public class MySecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    UserServer userServer;
    @Autowired
    UserDao userDao;
    @Bean
    PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder(10);
    }
    @Override
    protected void configure(AuthenticationManagerBuilder auth)throws Exception{
        auth.userDetailsService(userServer);
    }
    @Bean
    RoleHierarchy roleHierarchy(){
        RoleHierarchyImpl roleHierarchy = new RoleHierarchyImpl();
        String hir = "ROLE_dba > ROLE_admin > ROLE_user";
        roleHierarchy.setHierarchy(hir);
        return roleHierarchy;
    }
    @Bean CustomFilterInvocationSecurityMetadataSource cfisms() {
        return new CustomFilterInvocationSecurityMetadataSource();
    }
    @Bean CustomAccessDecisionManager cadm() {
        return new CustomAccessDecisionManager();
    }
    @Override
    protected void configure(HttpSecurity http)throws Exception{
        http.authorizeRequests()
                .withObjectPostProcessor(new ObjectPostProcessor<FilterSecurityInterceptor>() {
                    @Override
                    public <O extends FilterSecurityInterceptor> O postProcess(O object) {
                        object.setSecurityMetadataSource(cfisms());
                        object.setAccessDecisionManager(cadm());
                        return object;
                    }
                })
                .and()
                .formLogin()
                .loginProcessingUrl("/login")
                .successHandler(new AuthenticationSuccessHandler() {
                    @Override
                    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response
                            , Authentication auth)throws IOException {
                        response.setContentType("text/html");
                        response.setCharacterEncoding("UTF-8");
                        PrintWriter out = response.getWriter();
                        if(!request.getParameter("code").toLowerCase().equals(request.getSession().getAttribute("code").toString().toLowerCase())){
                            out.print("<script type='text/javascript'>alert('验证码错误！'); window.location.href='/logout';</script>");
                            return;
                        }
                        Object principal = auth.getPrincipal();
                        request.getSession().setAttribute("user",principal);
                        out.print("<script type='text/javascript'>alert('登录成功！');  window.localStorage.setItem('_user','"+JSONObject.toJSONString(principal) +"');  window.location.href='index.html';</script>");
                    }
                    //登录失败处理
                }).failureHandler(new AuthenticationFailureHandler(){
            @Override
            public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException e) throws IOException, ServletException {
                response.setContentType("text/html;charset=utf-8");
                PrintWriter out = response.getWriter();
                response.setStatus(401);
                Map<String,Object> map = new HashMap<>();
                map.put("status",401);
                if(e instanceof LockedException){
                    map.put("msg","账户被锁定，登录失败");
                }
                else  if(e instanceof BadCredentialsException){
                    map.put("msg","用户名或密码错误，登录失败");
                }
                else  if(e instanceof DisabledException){
                    map.put("msg","账户被禁用，登录失败");
                }
                else  if(e instanceof AccountExpiredException){
                    map.put("msg","账户已过期，登录失败");
                }
                else  if(e instanceof CredentialsExpiredException){
                    map.put("msg","密码已过期，登录失败");
                }
                else {
                    map.put("msg","未知错误，登录失败，请联系管理人员");
                }
                out.print("<script type='text/javascript'>alert('"+JSONObject.toJSONString(map)+"');window.location.href='index.html';</script>");
            }
        }).and()
                .logout()
                .logoutUrl("/logout")             //注销接口
                .clearAuthentication(true)        //清除认证信息
                .invalidateHttpSession(true)      //是否使Session失效
                .addLogoutHandler(new LogoutHandler() {        //配置登出处理器
                    @Override
                    public void logout(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Authentication authentication) {

                    }
                }).logoutSuccessHandler(new LogoutSuccessHandler() {
            @Override
            //处理器
            public void onLogoutSuccess(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Authentication authentication) throws IOException, ServletException {
                //重定向，也可以进行其他操作
                httpServletResponse.sendRedirect("index.html");
            }
        }).permitAll()
                .and().csrf().disable();
    }
}