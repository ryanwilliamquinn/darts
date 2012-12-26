package darts;

/**
 * Created with IntelliJ IDEA.
 * User: rquinn
 * Date: 12/10/12
 * Time: 10:38 PM
 * To change this template use File | Settings | File Templates.
 */

import org.apache.ibatis.session.SqlSession;
import java.util.List;
import org.apache.ibatis.session.SqlSession;

public class DartsResultService
{

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
     * @param twenties
     * @return
     */
    public void insertTwenties(TwentiesResult twenties) {
        SqlSession sqlSession = MyBatisUtil.getSqlSessionFactory().openSession();
        try {
            DartsMapper dartsMapper = sqlSession.getMapper(DartsMapper.class);
            dartsMapper.insertGame(twenties);
            int primaryKey = dartsMapper.getPrimaryKey();
            for (RoundResult result : twenties.getRoundResult()) {
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

    public List<DartsResult> getAllResults(String userName, GameType type) {
        SqlSession sqlSession = MyBatisUtil.getSqlSessionFactory().openSession();
        try{
            DartsMapper dartsMapper = sqlSession.getMapper(DartsMapper.class);
            return dartsMapper.getAllResults(userName, type.getType());
        }finally{
            sqlSession.close();
        }
    }

    public List<DartsResult> getTenResults(String userName, GameType type) {
        SqlSession sqlSession = MyBatisUtil.getSqlSessionFactory().openSession();
        try{
            DartsMapper dartsMapper = sqlSession.getMapper(DartsMapper.class);
            return dartsMapper.getTenResults(userName, type.getType());
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