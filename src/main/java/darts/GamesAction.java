package darts;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.opensymphony.xwork2.ActionSupport;
import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.apache.struts2.ServletActionContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: rquinn
 * Date: 12/24/12
 * Time: 1:04 PM
 * To change this template use File | Settings | File Templates.
 */
public class GamesAction extends ActionSupport {

    private static final Logger slf4jLogger = LoggerFactory.getLogger(GamesAction.class);

    private SqlSessionFactory getSqlSession()  {
        String resource = "mybatis-config.xml";
        InputStream inputStream = null;
        try {
            inputStream = Resources.getResourceAsStream(resource);
        } catch (IOException e) {
            slf4jLogger.error("problem getting sql session: " + e);
        }
        return new SqlSessionFactoryBuilder().build(inputStream);
    }

    public String insertTwenties() throws Exception {
        SqlSessionFactory sqlSessionFactory = getSqlSession();
        SqlSession session = sqlSessionFactory.openSession();

        HttpServletRequest request = ServletActionContext.getRequest();
        TwentiesResult tw = null;
        try {
            BufferedReader is = new BufferedReader(new InputStreamReader(request.getInputStream()));
            Type listType = new TypeToken<ArrayList<RoundResult>>() {}.getType();
            ArrayList<RoundResult> roundResultList = new Gson().fromJson(is, listType);


            tw = new TwentiesResult(roundResultList);
            Subject currentUser = SecurityUtils.getSubject();
            tw.setUsername(currentUser.getPrincipal().toString());
            DartsResultService dartsResultService = new DartsResultService();
            dartsResultService.insertTwenties(tw);
            tw.initializeDates();
        } catch (IOException e) {
            slf4jLogger.error("Error inserting data: " + e);
        }  finally {
            session.close();
        }

        if (tw != null) {
            Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
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

    public String loadTwenties() throws Exception {
        slf4jLogger.trace("Load us some twenties!");

        Subject currentUser = SecurityUtils.getSubject();

        SqlSessionFactory sqlSessionFactory = getSqlSession();

        List<DartsResult> resultList = null;

        SqlSession session = sqlSessionFactory.openSession();
        try {
            DartsResultService dartsResultService = new DartsResultService();
            resultList = dartsResultService.getTenResults(currentUser.getPrincipal().toString(), GameType.TWENTIES);
        } finally {
            session.close();
        }

        if (resultList != null && resultList.size() > 0) {
            Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
            String json = gson.toJson(resultList);
            HttpServletResponse response = ServletActionContext.getResponse();
            response.setHeader("Content-type", "application/json");
            PrintWriter out = response.getWriter();
            out.print(json);
            out.flush();
        }
        return NONE;
    }

    public String loadAllTwenties() throws Exception {
        slf4jLogger.trace("Load us all the twenties!");


        Subject currentUser = SecurityUtils.getSubject();

        slf4jLogger.debug("Hi, {}", currentUser.getPrincipal().toString());
        slf4jLogger.info("Welcome to the HelloWorld example of Logback.");
        slf4jLogger.warn("Dummy warning message.");
        slf4jLogger.error("Dummy error message.");

        SqlSessionFactory sqlSessionFactory = getSqlSession();

        List<DartsResult> resultList = null;

        SqlSession session = sqlSessionFactory.openSession();
        try {
            DartsResultService dartsResultService = new DartsResultService();
            resultList = dartsResultService.getAllResults(currentUser.getPrincipal().toString(), GameType.TWENTIES);
        } finally {
            session.close();
        }

        if (resultList != null && resultList.size() > 0) {
            Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
            String json = gson.toJson(resultList);
            HttpServletResponse response = ServletActionContext.getResponse();
            response.setHeader("Content-type", "application/json");
            PrintWriter out = response.getWriter();
            out.print(json);
            out.flush();
        }
        return NONE;
    }

}
