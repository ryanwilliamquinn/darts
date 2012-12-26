package darts;

/**
 * Created with IntelliJ IDEA.
 * User: rquinn
 * Date: 12/10/12
 * Time: 10:46 PM
 * To change this template use File | Settings | File Templates.
 */

import java.util.List;

import org.junit.AfterClass;
import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;

public class DartsResultServiceTest
{
    private static DartsResultService dartsResultService;

    @BeforeClass
    public static void setup()
    {
        dartsResultService = new DartsResultService();
    }

    @AfterClass
    public static void teardown()
    {
        dartsResultService = null;
    }

    @Test
    public void testGetUserById()
    {
        DartsResult dartsResult = dartsResultService.getResultById(1);
        Assert.assertNotNull(dartsResult);
    }


    @Test
    public void testInsertUser()
    {
        DartsResult dartsResult = new DartsResult();
        dartsResult.setType("twenties");
        dartsResult.setScore(30);

        dartsResultService.insertResult(dartsResult);
        Assert.assertTrue(dartsResult.getId() != 0);
        DartsResult createdResult = dartsResultService.getResultById(dartsResult.getId());
        Assert.assertNotNull(createdResult);
        Assert.assertEquals(createdResult.getScore(), createdResult.getScore());
        Assert.assertEquals(createdResult.getType(), createdResult.getType());
    }

    @Test
    public void testUpdateUser()
    {
        long timestamp = System.currentTimeMillis();
        DartsResult dartsResult = dartsResultService.getResultById(2);
        /*
        dartsResult.setType("TestType" + timestamp);
        dartsResult.setScore(25);
        dartsResultService.updateResult(dartsResult);
        DartsResult updatedResult = dartsResultService.getResultById(2);
        Assert.assertEquals(dartsResult.getScore(), updatedResult.getScore());
        Assert.assertEquals(dartsResult.getType(), updatedResult.getType());
        */
    }

    @Test
    public void testDeleteUser()
    {
        DartsResult dartsResult = dartsResultService.getResultById(1);
        dartsResultService.deleteResult(dartsResult.getId());
        DartsResult deletedResult = dartsResultService.getResultById(1);
        Assert.assertNull(deletedResult);

    }
}
