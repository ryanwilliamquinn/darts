package darts;

import org.apache.ibatis.annotations.Param;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: rquinn
 * Date: 12/10/12
 * Time: 10:25 PM
 * To change this template use File | Settings | File Templates.
 */
public interface DartsMapper {

    public void insertResult(DartsResult dartsResult);

    public void insertGame(SimplePracticeResult simplePracticeResult);

    public void insertUser(@Param("name") String name, @Param("encryptedPassword") String encryptedPassword);

    public void insertRound(@Param("foreignKey") int foreignKey, @Param("roundResult") RoundResult roundResult);

    public int getPrimaryKey();

    public DartsResult getResultById(Integer id);

    public List<DartsResult> getAllResults(@Param("username") String username, @Param("type") String type);

    public List<DartsResult> getTenResults(@Param("username") String username, @Param("type") String type);

    public int getNumResults(@Param("username") String username, @Param("type") String type);

    public void updateResult(DartsResult dartsResult);

    public void deleteResult(Integer userId);

}


