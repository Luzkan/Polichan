package pwr.piisw.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import pwr.piisw.backend.dto.PostDto;
import pwr.piisw.backend.dto.PostDtoPOST;
import pwr.piisw.backend.helper.DtoHelper;
import pwr.piisw.backend.services.PostService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("posts")
@RequiredArgsConstructor
public class PostResource {
  private final PostService postService;
  private final DtoHelper dtoHelper;

  // add a post with a given threadId
  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  @ResponseBody
  public PostDto savePost(@RequestBody PostDtoPOST postDtoPOST) {
    return dtoHelper.convertPostToDto(
        postService.savePost(dtoHelper.convertPostDtoPOSTToEntity(postDtoPOST)));
  }
}
