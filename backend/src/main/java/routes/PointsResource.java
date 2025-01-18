package routes;

import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

import data.HitResult;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.HeaderParam;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("points")
public class PointsResource {

    @Inject
    AccountResource accountResource;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("list")
    public Response getPoints(@HeaderParam("Authorization") String authHeader) {
        try {
            String owner = accountResource.getSessionToUsername().get(authHeader);

            if (owner == null) {
                return Response.status(Response.Status.UNAUTHORIZED)
                        .entity("{ \"error: \": \"not authorized\" }")
                        .build();
            }

            List<HitResult> results = HitResult.list("owner = ?1", owner);

            AtomicInteger counter = new AtomicInteger(0);

            String json = results.stream()
                    .map(data -> "\"%d\": {%s}\n".formatted(counter.getAndIncrement(), data.toJsonFields()))
                    .collect(Collectors.joining(", ", "{", "}"));

            return Response.ok(json).build();
        } catch (Throwable e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("{ \"error: \": \"" + e.getMessage().replace('"', '\'') + "\" }")
                    .build();
        }

    }
}
