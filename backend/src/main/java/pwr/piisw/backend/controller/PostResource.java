package pwr.piisw.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import pwr.piisw.backend.exceptions.BadPasswordException;
import pwr.piisw.backend.exceptions.ThreadNotFoundException;
import pwr.piisw.backend.models.Post;
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
  public ResponseEntity<List<Post>> getPosts(
      @PathVariable("id") int id,
      @RequestParam(required = false) int limit,
      @RequestParam(required = false) int offset) {
    List<Post> posts = postService.getPosts(id, limit, offset);
    return new ResponseEntity<>(posts, HttpStatus.OK);
  }

  // add a post with a given threadId
  @PostMapping("posts")
  public ResponseEntity<Post> savePost(@RequestBody Post post) {
    try {
      Post new_post = postService.savePost(post);
      return new ResponseEntity<>(new_post, HttpStatus.OK);
    } catch (ThreadNotFoundException t) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    } catch (BadPasswordException b) {
      return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }
  }
}
