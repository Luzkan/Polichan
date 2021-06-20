package pwr.piisw.backend.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pwr.piisw.backend.models.Post;

@Repository
public interface PostRepo extends JpaRepository<Post, Integer> {
  List<Post> findAllBythreadId(Pageable posts, Integer threadId);
}
