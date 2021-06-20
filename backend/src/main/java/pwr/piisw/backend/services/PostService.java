package pwr.piisw.backend.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import pwr.piisw.backend.exceptions.BadPasswordException;
import pwr.piisw.backend.exceptions.ThreadNotFoundException;
import pwr.piisw.backend.helper.OffsetBasedPageRequest;
import pwr.piisw.backend.models.ChanThread;
import pwr.piisw.backend.models.Image;
import pwr.piisw.backend.models.Post;
import pwr.piisw.backend.repository.ChanThreadRepo;
import pwr.piisw.backend.repository.ImageRepo;
import pwr.piisw.backend.repository.PostRepo;

@Service
public class PostService {
  private final PostRepo postRepo;
  private final ChanThreadRepo chanThreadRepo;
  private final ImageRepo imageRepo;

  @Autowired
  public PostService(PostRepo postRepo, ChanThreadRepo chanThreadRepo, ImageRepo imageRepo) {
    this.postRepo = postRepo;
    this.chanThreadRepo = chanThreadRepo;
    this.imageRepo = imageRepo;
  }

  public Post savePost(Post post) throws ThreadNotFoundException, BadPasswordException {
    post.setDate(LocalDateTime.now());
    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    ChanThread chanThread =
        chanThreadRepo
            .findById(post.getThreadId())
            .orElseThrow(() -> new ThreadNotFoundException("Thread not found exception"));
    Map<String, String> accounts = chanThread.getAccounts();

    String image_id = post.getImageResourceId();
    if (image_id != null && !image_id.equals("")) {
      Optional<Image> i = imageRepo.findById(post.getImageResourceId());
      if (i.isPresent()) {
        post.setImgUrl("/api/resources/" + post.getImageResourceId());
      }
    }

    if (accounts.containsKey(post.getNickname())) {
      if (encoder.matches(post.getPassword(), accounts.get(post.getNickname()))) {
        return postRepo.save(post);
      } else {
        throw new BadPasswordException("User password does not match");
      }
    } else {
      accounts.put(post.getNickname(), encoder.encode(post.getPassword()));
      chanThreadRepo.save(chanThread);
      return postRepo.save(post);
    }
  }

  /*
   public List<ChanThread> getAllChanThreads (int limit, int offset) {
     Pageable pageable = new OffsetBasedPageRequest(limit, offset, "threadId", Sort.Direction.DESC);
     return chanThreadRepo.findAll(pageable).getContent();
   }
  */

  public List<Post> getPosts(Integer threadId, int limit, int offset) {
    Pageable pageable = new OffsetBasedPageRequest(limit, offset, "id", Sort.Direction.ASC);
    return postRepo.findAllBythreadId(pageable, threadId);
  }
}
