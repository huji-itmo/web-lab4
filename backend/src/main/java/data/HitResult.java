package data;

import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

import exceptions.BadParameterException;
import exceptions.MissingParametersException;
import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class HitResult extends PanacheEntity {
    @Column(name = "x")
    private Double x;
    @Column(name = "y")
    private Double y;
    @Column(name = "r")
    private Long r;
    @Column(name = "hit")
    private Boolean hit;
    @Column(name = "durationMilliSeconds")
    private String durationMilliSeconds;
    @Column(name = "serverTime")
    private String serverTime;
    @Column(name = "owner")
    private String owner;

    public String toJsonFields() {
        return String.format(Locale.US, """
                "x": "%.3f", "y": "%.3f", "r": "%d", "hit":%s, "duration_milliseconds": "%s", "server_time": "%s"
                """, x, y, r, hit ? "true" : "false", durationMilliSeconds, serverTime);
    }

    public String toHTMLTable() {
        return String.format(Locale.US, """
                <tr>
                    <td>%.3f</td>
                    <td>%.3f</td>
                    <td>%d</td>
                    <td>%s</td>
                    <td>%s</td>
                    <td>%s</td>
                </tr>
                    """, x, y, r, hit ? "true" : "false", durationMilliSeconds, serverTime);
    }

    public HitResult(String owner, Double x, Double y, Long r, boolean hit, long durationNanoSeconds) {
        DateTimeFormatter customFormatter = DateTimeFormatter.ofPattern("HH:mm:ss");
        String formattedDateCustom = ZonedDateTime.now().format(customFormatter);

        this.serverTime = formattedDateCustom;
        this.x = x;
        this.y = y;
        this.r = r;
        this.hit = hit;
        this.durationMilliSeconds = "%.3f ms".formatted((double) durationNanoSeconds / 1000000D);
        this.owner = owner;
    }

    public static HitResult createNewHitData(String owner, Double x, Double y, Long r, long startTime)
            throws MissingParametersException, BadParameterException {

        RequestData data = new RequestData(x, y, r);
        data.throwIfBadData();
        boolean hitResult = CoordinateSpace.testHit(data);
        long durationNanoSeconds = System.nanoTime() - startTime;
        HitResult hitData = new HitResult(owner, data.getX(), data.getY(), data.getR(), hitResult, durationNanoSeconds);

        return hitData;
    }

    public static HitResult createNewHitData(String owner, RequestData data, long startTime)
            throws MissingParametersException, BadParameterException {
        data.throwIfBadData();
        boolean hitResult = CoordinateSpace.testHit(data);
        long durationNanoSeconds = System.nanoTime() - startTime;
        HitResult hitData = new HitResult(owner, data.getX(), data.getY(), data.getR(), hitResult, durationNanoSeconds);

        return hitData;
    }
}
