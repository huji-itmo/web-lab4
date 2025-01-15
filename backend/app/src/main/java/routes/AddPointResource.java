package routes;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import data.HitResult;
import data.RequestData;
import database.DataBaseManager;
import jakarta.annotation.PostConstruct;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/add-point")
public class AddPointResource {

    @Inject
    DataBaseManager dataBaseManager;

    private Gson gson = null;

    @PostConstruct
    public void init() {
        if (gson == null) {
            gson = new GsonBuilder()
                    // .registerTypeAdapter(Double.class, new SmartDouble())
                    .setPrettyPrinting()
                    .create();
        }
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addPoint(String jsonString) {
        try {
            RequestData data = gson.fromJson(jsonString, RequestData.class);
            if (data == null) {
                throw new Exception("The request body is empty. Expected JSON with fields x,y,r");
            }
            data.throwIfBadData();

            HitResult newPoint = HitResult.createNewHitData(data, System.nanoTime());
            dataBaseManager.addPointToDatabase(newPoint);

            return Response.ok("{" + newPoint.toJsonFields() + "}").build();

        } catch (Exception e) {
            return Response
                    .status(Response.Status.BAD_REQUEST)
                    .entity("{\"error\": \"" + e.getMessage().replace("\"", "\'") + "\"}")
                    .build();
        }

    }
}
