package pwr.piisw.backend.controller;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import pwr.piisw.backend.dto.PostDto;
import pwr.piisw.backend.models.Post;
import pwr.piisw.backend.services.PostService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("posts")
@RequiredArgsConstructor
public class PostResource {
  private final PostService postService;
  private final ModelMapper modelMapper;

  // add a post with a given threadId
  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  @ResponseBody
  public PostDto savePost(@RequestBody Post post) {
    return convertPostToDto(postService.savePost(post));
  }

  private PostDto convertPostToDto(Post post) {
    return modelMapper.map(post, PostDto.class);
  }
}
