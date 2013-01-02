package darts;

/**
 * Created with IntelliJ IDEA.
 * User: rquinn
 * Date: 12/10/12
 * Time: 10:38 PM
 * To change this template use File | Settings | File Templates.
 */

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

public class DartsResultService
{

    private static final Logger slf4jLogger = LoggerFactory.getLogger(DartsResultService.class);

    public void insertResult(DartsResult dartsResult) {
        SqlSession sqlSession = MyBatisUtil.getSqlSessionFactory().openSession();
        try{
            DartsMapper dartsMapper = sqlSession.getMapper(DartsMapper.class);
            dartsMapper.insertResult(dartsResult);
            sqlSession.commit();
        }finally{
            sqlSession.close();
        }
    }


    /**
     * This method does the initial insert of the round with the total score and the game type, into darts result
     * It returns the primary key, to be used for the foreign key in the insertRounds method.
     * @param spr
     * @return
     */
    public void insertTwenties(SimplePracticeResult spr) {
        SqlSession sqlSession = MyBatisUtil.getSqlSessionFactory().openSession();
        try {
            DartsMapper dartsMapper = sqlSession.getMapper(DartsMapper.class);
            dartsMapper.insertGame(spr);
            int primaryKey = dartsMapper.getPrimaryKey();
            for (RoundResult result : spr.getRoundResult()) {
                dartsMapper.insertRound(primaryKey, result);
            }
            sqlSession.commit();
        }finally{
            sqlSession.close();
        }
    }

    public DartsResult getResultById(Integer id) {
        SqlSession sqlSession = MyBatisUtil.getSqlSessionFactory().openSession();
        try{
            DartsMapper dartsMapper = sqlSession.getMapper(DartsMapper.class);
            return dartsMapper.getResultById(id);
        }finally{
            sqlSession.close();
        }
    }

    public DartsResultResponse getAllResults(String userName, PracticeType type) {
        SqlSession sqlSession = MyBatisUtil.getSqlSessionFactory().openSession();
        try{
            DartsMapper dartsMapper = sqlSession.getMapper(DartsMapper.class);
            String typeValue = type.getValue();
            DartsResultResponse dartsResultResponse = new DartsResultResponse();
            List<DartsResult> resultsList =  dartsMapper.getAllResults(userName, typeValue);
            dartsResultResponse.setDartsResults(resultsList);
            int totalNumResults = dartsMapper.getNumResults(userName, typeValue);
            dartsResultResponse.setTotalNumResults(totalNumResults);
            return dartsResultResponse;
        }finally{
            sqlSession.close();
        }
    }

    public DartsResultResponse getTenResults(String userName, PracticeType type) {
        SqlSession sqlSession = MyBatisUtil.getSqlSessionFactory().openSession();
        try{
            DartsMapper dartsMapper = sqlSession.getMapper(DartsMapper.class);
            String typeValue = type.getValue();
            slf4jLogger.debug("sql info for get ten results - username: " + userName + ", type: " + typeValue);
            DartsResultResponse dartsResultResponse = new DartsResultResponse();
            List<DartsResult> dartsResults = dartsMapper.getTenResults(userName, typeValue);
            dartsResultResponse.setDartsResults(dartsResults);
            int totalNumResults = dartsMapper.getNumResults(userName,typeValue);
            dartsResultResponse.setTotalNumResults(totalNumResults);
            return dartsResultResponse;
        }finally{
            sqlSession.close();
        }
    }

    public void updateResult(DartsResult dartsResult) {
        SqlSession sqlSession = MyBatisUtil.getSqlSessionFactory().openSession();
        try{
            DartsMapper dartsMapper = sqlSession.getMapper(DartsMapper.class);
            dartsMapper.updateResult(dartsResult);
            sqlSession.commit();
        }finally{
            sqlSession.close();
        }

    }

    public void deleteResult(Integer id) {
        SqlSession sqlSession = MyBatisUtil.getSqlSessionFactory().openSession();
        try{
            DartsMapper dartsMapper = sqlSession.getMapper(DartsMapper.class);
            dartsMapper.deleteResult(id);
            sqlSession.commit();
        }finally{
            sqlSession.close();
        }

    }

}