package app.log;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "rls")
public interface RunLogRep extends JpaRepository<RunLog,Integer> {

}
