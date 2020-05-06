package app.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "messages")
public interface MessageRep extends JpaRepository<Message,Integer> {
}
