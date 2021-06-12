package pwr.piisw.backend.services;

import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import pwr.piisw.backend.exceptions.BadPasswordException;
import pwr.piisw.backend.exceptions.ThreadNotFoundException;
import pwr.piisw.backend.models.ChanThread;
import pwr.piisw.backend.models.Post;
import pwr.piisw.backend.models.PostPage;
import pwr.piisw.backend.repository.ChanThreadRepo;
import pwr.piisw.backend.repository.PostRepo;

@Service
public class PostService {
  private final PostRepo postRepo;
  private final ChanThreadRepo chanThreadRepo;

  @Autowired
  public PostService(PostRepo postRepo, ChanThreadRepo chanThreadRepo) {
    this.postRepo = postRepo;
    this.chanThreadRepo = chanThreadRepo;
  }

  public Post savePost(Post post) throws ThreadNotFoundException, BadPasswordException {
    post.setDate(LocalDateTime.now());
    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    ChanThread chanThread =
        chanThreadRepo
            .findById(post.getThreadId())
            .orElseThrow(() -> new ThreadNotFoundException("Thread not found exception"));
    Map<String, String> map = chanThread.getMap();

    if (map.containsKey(post.getNickname())) {
      if (encoder.matches(post.getPassword(), map.get(post.getNickname()))) {
        return postRepo.save(post);
      } else {
        throw new BadPasswordException("User password does not match");
      }
    } else {
      map.put(post.getNickname(), encoder.encode(post.getPassword()));
      chanThreadRepo.save(chanThread);
      return postRepo.save(post);
    }
  }

  public Page<Post> getPosts(PostPage postPage, Integer threadId) {
    Sort sort = Sort.by(postPage.getSortDirection(), postPage.getSortBy());
    Pageable pageable = PageRequest.of(postPage.getPageNumber(), postPage.getPageSize(), sort);
    return postRepo.findAllBythreadId(pageable, threadId);
  }
}
