package darts;

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

    public DartsResult getResultById(Integer id);

    public List<DartsResult> getAllResults();

    public void updateResult(DartsResult dartsResult);

    public void deleteResult(Integer userId);

}


