package app.jpa;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "actives")
public interface ActiveRep extends JpaRepository<Active,Integer> {
}
