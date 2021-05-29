package pwr.piisw.backend.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import pwr.piisw.backend.model.Post;

import java.util.List;
import java.util.Optional;

public interface PostRepo extends JpaRepository<Post, String> {

    List<Post> findAllBythreadId(String threadId);
}
