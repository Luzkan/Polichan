package pwr.piisw.backend.services;

import java.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import pwr.piisw.backend.models.Post;
import pwr.piisw.backend.models.PostPage;
import pwr.piisw.backend.repository.PostRepo;

@Service
public class PostService {
  private final PostRepo postRepo;

  @Autowired
  public PostService(PostRepo postRepo) {
    this.postRepo = postRepo;
  }

  public Post savePost(Post post) {
    post.setDate(LocalDateTime.now());
    return postRepo.save(post);
  }

  public Page<Post> getPosts(PostPage postPage, Integer threadId) {
    Sort sort = Sort.by(postPage.getSortDirection(), postPage.getSortBy());
    Pageable pageable = PageRequest.of(postPage.getPageNumber(), postPage.getPageSize(), sort);

    //return postRepo.findAll(pageable);
    return postRepo.findAllBythreadId(pageable, threadId);

  }
}
