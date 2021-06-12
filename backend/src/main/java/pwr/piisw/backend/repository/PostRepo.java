package pwr.piisw.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import pwr.piisw.backend.models.Post;

@Repository
public interface PostRepo extends PagingAndSortingRepository<Post, Integer> {
  Page<Post> findAllBythreadId(Pageable posts, Integer threadId);
}
