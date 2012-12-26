package darts;

import com.sun.xml.internal.ws.server.StatefulInstanceResolver;

/**
 * Created with IntelliJ IDEA.
 * User: rquinn
 * Date: 12/25/12
 * Time: 7:12 PM
 * To change this template use File | Settings | File Templates.
 */
public enum GameType {

    TWENTIES ("twenties");

    private String type;

    private GameType(String type) {
        this.type = type;
    }

    public String getType() {
        return type;
    }
}
