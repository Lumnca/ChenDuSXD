package app.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "datas")
public interface UserDataRep extends JpaRepository<UserData,Integer> {
}
