package darts;

import org.apache.commons.lang3.StringUtils;

/**
 * Created with IntelliJ IDEA.
 * User: rquinn
 * Date: 12/25/12
 * Time: 7:12 PM
 * To change this template use File | Settings | File Templates.
 */
public enum PracticeType {

    TWENTIES ("twenties", true),
    THREE_OH_ONE ("301", true),
    BULLS ("bulls", true);

    private String value;
    private boolean simple;

    private PracticeType(String value, boolean simple) {
        this.value = value;
        this.simple = simple;
    }


    public String getValue() {
        return value;
    }

    public boolean isSimple() {
        return simple;
    }

    public static PracticeType getPracticeTypeForString(String type) {
        PracticeType pt = null;
        for (PracticeType t : PracticeType.values()) {
            if (StringUtils.equalsIgnoreCase(t.getValue(), type)) {
                pt = t;
            }
        }
        return  pt;
    }
}
