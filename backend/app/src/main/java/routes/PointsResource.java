package routes;

import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

import data.HitResult;
import database.DataBaseManager;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/points")
public class PointsResource {

    @Inject
    DataBaseManager dataBaseManager;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getPoints() {
        dataBaseManager.cachePointsFromDatabase();

        List<HitResult> list = dataBaseManager.getCachedPoints();

        AtomicInteger counter = new AtomicInteger(0);

        String json = list.stream()
                .map(data -> "\"%d\": {%s}\n".formatted(counter.getAndIncrement(), data.toJsonFields()))
                .collect(Collectors.joining(", ", "{", "}"));

        return json;
    }
}
