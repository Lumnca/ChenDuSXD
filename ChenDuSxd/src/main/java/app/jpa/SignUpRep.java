package app.jpa;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "signs")
public interface SignUpRep extends JpaRepository<SignUp,Integer> {
}
