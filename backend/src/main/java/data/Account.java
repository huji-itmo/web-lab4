package data;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Account extends PanacheEntityBase {
    @Id
    String username;
    String password;

    public static boolean findByUsernameAndPassword(String username, String password) {
        return find("username = ?1 and password = ?2", username, password).firstResult() != null;
    }

    public static boolean existsAccountWithUsername(String username) {
        return find("username = ?1", username).firstResult() != null;
    }
}
