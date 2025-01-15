package database;


import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

import data.HitResult;
import jakarta.annotation.PostConstruct;
import jakarta.enterprise.context.ApplicationScoped;
import lombok.Getter;

@ApplicationScoped
public class DataBaseManager {
    private SessionFactory sessionFactory;
    @Getter
    private List<HitResult> cachedPoints;

    @PostConstruct
    public void init() {
        try {
            sessionFactory = HibernateSessionFactory.getSessionFactory();

        } catch (Throwable ex) {
            System.err.println("Инициализация SessionFactory завершилась неудачей: " + ex);
            throw new RuntimeException(ex);
        }
    }

    public void addPointToDatabase(HitResult hitResult) {
        cachedPoints.add(hitResult);

        Transaction transaction = null;
        try (Session session = sessionFactory.openSession()) {
            transaction = session.beginTransaction();
            session.persist(hitResult);
            transaction.commit();
            System.out.println("added " + hitResult);
        } catch (Exception e) {
            if (transaction != null) {
                transaction.rollback();
            }
            e.printStackTrace();
        }
    }

    public void shutdown() {
        if (sessionFactory != null) {
            sessionFactory.close();
        }
    }

    public List<HitResult> cachePointsFromDatabase() {
        try (Session session = sessionFactory.openSession()) {
            cachedPoints = session.createQuery("FROM HitResult", HitResult.class).getResultList();
        }

        return cachedPoints;
    }
}
