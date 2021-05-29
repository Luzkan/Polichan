package pwr.piisw.backend.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import pwr.piisw.backend.model.Thread;

import java.util.Optional;

public interface ThreadRepo extends JpaRepository<Thread, String> {

}
