package pwr.piisw.backend.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import pwr.piisw.backend.dto.PostDto;
import pwr.piisw.backend.models.Post;
import pwr.piisw.backend.services.PostService;

@RestController
@RequestMapping("/api")
public class PostResource {
  private final PostService postService;

  @Autowired private ModelMapper modelMapper;

  @Autowired
  public PostResource(PostService postService) {
    this.postService = postService;
  }

  // get posts for thread of given id
  @GetMapping("/threads/{id}/posts")
  @ResponseBody
  public List<PostDto> getPosts(
      @PathVariable("id") int id,
      @RequestParam(required = false) int limit,
      @RequestParam(required = false) int offset) {
    List<Post> posts = postService.getPosts(id, limit, offset);
    return posts.stream().map(this::convertToDto).collect(Collectors.toList());
  }

  // add a post with a given threadId
  @PostMapping("posts")
  @ResponseStatus(HttpStatus.CREATED)
  @ResponseBody
  public PostDto savePost(@RequestBody Post post) {
    Post post_created = postService.savePost(post);
    return convertToDto(post_created);
  }

  private PostDto convertToDto(Post post) {
    return modelMapper.map(post, PostDto.class);
  }
}
