package darts;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: rquinn
 * Date: 12/14/12
 * Time: 5:55 PM
 * To change this template use File | Settings | File Templates.
 */
public class TwentiesResult extends DartsResult {

    private List<RoundResult> rounds;

    public TwentiesResult(List<RoundResult> rounds) {
        this.rounds = rounds;
    }

    public List<RoundResult> getRoundResult() {
        return rounds;
    }

    public void setRoundResult(List<RoundResult> roundScore) {
        this.rounds = roundScore;
    }

    public void setRound(int round, int score) {
        if (rounds == null) {
            rounds = new ArrayList<RoundResult>();
        }
        rounds.add(new RoundResult(round, score));
    }

    public String toString() {
        StringBuilder sb = new StringBuilder();
        if (rounds != null) {
            for (RoundResult round : rounds) {
                sb.append("round ").append(round.getRound()).append(" score was ").append(round.getScore()).append("\n");
            }
        }
        return sb.toString();
    }

}
