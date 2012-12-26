package darts;

/**
 * Created with IntelliJ IDEA.
 * User: rquinn
 * Date: 12/14/12
 * Time: 10:18 PM
 * To change this template use File | Settings | File Templates.
 */
public class RoundResult {

    private int id;
    private int round;
    private int score;

    public RoundResult(int round, int score) {
        this.round = round;
        this.score = score;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public int getRound() {
        return round;
    }

    public void setRound(int round) {
        this.round = round;
    }

    public String toString() {
        return "RoundResult: round " + round + " score was " + score;
    }
}
