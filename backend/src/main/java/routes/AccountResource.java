package routes;

import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

import data.Account;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.HeaderParam;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import lombok.Getter;

@Path("account")
@ApplicationScoped
public class AccountResource {

    @Getter
    private Map<String, String> sessionToUsername = new HashMap<>();

    private static final String SALT = Objects.requireNonNullElse(System.getenv("SALT"),
            "there's supposed to be a salt env variable but there isn't");

    private String hash(String pass) {
        MessageDigest digest;
        try {
            digest = MessageDigest.getInstance("SHA-256");
            byte[] hashBytes = digest.digest(
                    (pass + SALT).getBytes(StandardCharsets.UTF_8));
            String hash = new String(hashBytes, Charset.defaultCharset());

            return hash;
        } catch (NoSuchAlgorithmException e) {
            return pass + SALT;
        }
    }

    public static String generateSessionString() {
        int sessionLength = 32;

        byte[] randomBytes = new byte[sessionLength];

        SecureRandom secureRandom = new SecureRandom();
        secureRandom.nextBytes(randomBytes);

        String sessionString = Base64.getUrlEncoder().withoutPadding().encodeToString(randomBytes);

        return sessionString;
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    @Path("register")
    public String register(@HeaderParam("Authorization") String authHeader) {
        try {
            int separator = authHeader.lastIndexOf(':');

            String username = authHeader.substring(0, separator);
            String password = hash(authHeader.substring(separator + 1));

            if (Account.existsAccountWithUsername(username)) {
                return "{ \"success\": false, \"error: \": \"Account with this username already exists.\" }";
            }

            Account account = new Account(username, password);
            account.persist();

            return "{ \"success\": true }";
        } catch (Throwable e) {
            return "{ \"success\": false, \"error: \": \"" + e.getMessage().replace('"', '\'') + "\" }";
        }
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("login")
    @Transactional
    public String login(@HeaderParam("Authorization") String authHeader) {
        try {
            int separator = authHeader.lastIndexOf(':');

            String username = authHeader.substring(0, separator);
            String password = hash(authHeader.substring(separator + 1));

            boolean found = Account.findByUsernameAndPassword(username, password);

            if (!found) {
                return "{ \"success\": false, \"error\": \"Wrong username or password.\"}";
            }

            String newSession = generateSessionString();

            sessionToUsername.put(newSession, username);

            return "{ \"success\": true, \"session\": \"" + newSession + "\" }";

        } catch (

        Throwable e) {
            return "{ \"success\": false, \"error: \": \"" + e.getMessage().replace('"', '\'') + "\" }";
        }
    }
}
