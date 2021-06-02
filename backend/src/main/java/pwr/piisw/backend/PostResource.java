package pwr.piisw.backend;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pwr.piisw.backend.model.Post;
import pwr.piisw.backend.service.PostService;

import java.util.List;

@RestController
@RequestMapping("/")
public class PostResource {
    private final PostService postService;

    public PostResource(PostService postService) {
        this.postService = postService;
    }

    //      [ApiPatternKey.THREAD_POSTS]: '/thread/{id}/posts',

    @GetMapping("/thread/{id}/posts")
    public ResponseEntity<List<Post>> getPostsById (@PathVariable("id") int id) {
        List<Post> posts = postService.getPostsById(id);
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

   // @GetMapping("/posts")
    //public ResponseEntity<List<Post>> getAllPosts() {
      //  List<Post> posts = postService.getPosts();
        //return new ResponseEntity<>(posts, HttpStatus.OK);
   // }

    @PostMapping("/posts")
    public ResponseEntity<Post> addPost(@RequestBody Post post) {
        Post newPost = postService.savePost(post);
        return new ResponseEntity<>(newPost, HttpStatus.CREATED);
    }
}
