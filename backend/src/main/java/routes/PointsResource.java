package routes;

import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

import data.HitResult;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("points")
public class PointsResource {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("list")
    public String getPoints() {
        try {
            List<HitResult> results = HitResult.listAll();

            AtomicInteger counter = new AtomicInteger(0);

            String json = results.stream()
                    .map(data -> "\"%d\": {%s}\n".formatted(counter.getAndIncrement(), data.toJsonFields()))
                    .collect(Collectors.joining(", ", "{", "}"));

            return json;
        } catch (Throwable e) {
            return "{ \"error: \": \"" + e.getMessage().replace('"', '\'') + "\" }";
        }

    }
}
