package app.log;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;


@RepositoryRestResource(path = "ols")
public interface OperationRep extends JpaRepository<OperationLog,Integer> {
}
