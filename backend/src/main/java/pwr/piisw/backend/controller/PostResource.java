package pwr.piisw.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pwr.piisw.backend.models.Post;
import pwr.piisw.backend.models.PostPage;
import pwr.piisw.backend.services.PostService;

@RestController
@RequestMapping("/api")
public class PostResource {
  private final PostService postService;

  @Autowired
  public PostResource(PostService postService) {
    this.postService = postService;
  }

  // get posts for thread of given id
  @GetMapping("/threads/{id}/posts")
  public ResponseEntity<Page<Post>> getPosts(PostPage postPage, @PathVariable("id") int id) {
    Page posts = postService.getPosts(postPage, id);
    return new ResponseEntity<>(posts, HttpStatus.OK);
  }

  // add a post with a given threadId
  @PostMapping("posts")
  public ResponseEntity<Post> savePost(@RequestBody Post post) {
    return new ResponseEntity<>(postService.savePost(post), HttpStatus.OK);
  }
}
