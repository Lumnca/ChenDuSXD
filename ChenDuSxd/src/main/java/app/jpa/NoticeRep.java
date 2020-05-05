package app.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "notices")
public interface NoticeRep  extends JpaRepository<Notice,Integer> {
}
