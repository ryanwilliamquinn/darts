package darts;

import com.google.gson.*;
import com.google.gson.reflect.TypeToken;
import com.google.gson.stream.JsonReader;
import com.opensymphony.xwork2.ActionSupport;
import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.mgt.*;
import org.apache.shiro.mgt.SecurityManager;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.util.Factory;
import org.apache.shiro.web.config.WebIniSecurityManagerFactory;
import org.apache.struts2.ServletActionContext;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class MainController extends ActionSupport {

    private String name;
    private List<DartsResult> resultsList;

    public String getUserName() {
        return name;
    }

    public void setUserName(String name) {
        this.name = name;
    }

    public List<DartsResult> getResultsList() {
        return resultsList;
    }

    public void setResultsList(List<DartsResult> resultsList) {
        this.resultsList = resultsList;
    }


    /*
    public String execute() throws Exception {
        HttpServletRequest request = ServletActionContext.getRequest();
        String uri = request.getRequestURI();
        String name = StringUtils.substringAfter(uri, "user/");

        SqlSessionFactory sqlSessionFactory = getSqlSession();

        List<DartsResult> resultList = null;

        SqlSession session = sqlSessionFactory.openSession();
        try {
            DartsResultService dartsResultService = new DartsResultService();
            resultList = dartsResultService.getAllResults();
        } finally {
            session.close();
        }

        setResultsList(resultList);

        setUserName(name);

        Subject currentUser = SecurityUtils.getSubject();
        System.out.println(currentUser.getPrincipal());
        if (currentUser.getPrincipal().toString().equals(name)) {
            System.out.println("this is our page");
        }

        return SUCCESS;
    }
    */

    public String sqlTest() throws Exception {
        SqlSessionFactory sqlSessionFactory = getSqlSession();
        SqlSession session = sqlSessionFactory.openSession();
        try {
            DartsResultService dartsResultService = new DartsResultService();
            DartsResult dartsResult = new DartsResult();
            dartsResult.setScore(30);
            dartsResult.setType("twenties");
            dartsResultService.insertResult(dartsResult);
        } finally {
            session.close();
        }

        return SUCCESS;
    }


    public String insert() throws Exception {
        SqlSessionFactory sqlSessionFactory = getSqlSession();
        SqlSession session = sqlSessionFactory.openSession();

        HttpServletRequest request = ServletActionContext.getRequest();
        TwentiesResult tw = null;
        try {
            BufferedReader is = new BufferedReader(new InputStreamReader(request.getInputStream()));
            Type listType = new TypeToken<ArrayList<RoundResult>>() {}.getType();
            ArrayList<RoundResult> roundResultList = new Gson().fromJson(is, listType);
            //System.out.println(gson.toJson(roundResultList));

            tw = new TwentiesResult(roundResultList);
            DartsResultService dartsResultService = new DartsResultService();
            dartsResultService.insertTwenties(tw);
            tw.initializeDates();
        } catch (IOException e) {
            // log it here when logging is all set up
        }  finally {
            session.close();
        }

        if (tw != null) {
            Gson gson = new Gson();
            String json = gson.toJson(tw);
            //System.out.println(json);
            HttpServletResponse response = ServletActionContext.getResponse();
            response.setHeader("Content-type", "application/json");
            PrintWriter out = response.getWriter();
            out.print(json);
            out.flush();
        }

        return NONE;
    }


    private SqlSessionFactory getSqlSession()  {
        String resource = "mybatis-config.xml";
        InputStream inputStream = null;
        try {
            inputStream = Resources.getResourceAsStream(resource);
        } catch (IOException e) {
            // log here when logging is figured out.
        }
        return new SqlSessionFactoryBuilder().build(inputStream);
    }

	

}
