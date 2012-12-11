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

    public DartsResult getResultById(Integer id) {
        SqlSession sqlSession = MyBatisUtil.getSqlSessionFactory().openSession();
        try{
            DartsMapper dartsMapper = sqlSession.getMapper(DartsMapper.class);
            return dartsMapper.getResultById(id);
        }finally{
            sqlSession.close();
        }
    }

    public List<DartsResult> getAllResults() {
        SqlSession sqlSession = MyBatisUtil.getSqlSessionFactory().openSession();
        try{
            DartsMapper dartsMapper = sqlSession.getMapper(DartsMapper.class);
            return dartsMapper.getAllResults();
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