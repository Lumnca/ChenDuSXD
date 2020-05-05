package app.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "hrefs")
public interface HrefRep  extends JpaRepository<Herf,Integer> {
}
