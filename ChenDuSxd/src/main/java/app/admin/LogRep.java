package app.admin;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "lls")
public interface LogRep extends JpaRepository<LoginLog,Integer> {
}
