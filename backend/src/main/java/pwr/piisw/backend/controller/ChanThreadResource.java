package pwr.piisw.backend.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import pwr.piisw.backend.dto.ChanThreadDto;
import pwr.piisw.backend.dto.ChanThreadDtoPOST;
import pwr.piisw.backend.dto.PostDto;
import pwr.piisw.backend.helper.DtoHelper;
import pwr.piisw.backend.models.ChanThread;
import pwr.piisw.backend.models.Post;
import pwr.piisw.backend.services.ChanThreadService;
import pwr.piisw.backend.services.PostService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class ChanThreadResource {
  private final ChanThreadService chanThreadService;
  private final PostService postService;
  private final DtoHelper dtoHelper;

  @PostMapping("threads")
  @ResponseStatus(HttpStatus.CREATED)
  @ResponseBody
  public ChanThreadDto saveThread(@RequestBody ChanThreadDtoPOST chanThreadDtoPOST) {
    return dtoHelper.convertChanThreadToDto(
        chanThreadService.saveThread(
            dtoHelper.convertChanThreadDtoPOSTToEntity(chanThreadDtoPOST)));
  }

  @GetMapping("threads/{id}")
  @ResponseBody
  public ChanThreadDto getChanThread(@PathVariable("id") int id) throws Exception {
    ChanThread chanThread = chanThreadService.getChanThread(id);
    return dtoHelper.convertChanThreadToDto(chanThread);
  }

  @GetMapping("threads")
  @ResponseBody
  public List<ChanThreadDto> getAllChanThread(
      @RequestParam(required = false, defaultValue = "5") int limit,
      @RequestParam(required = false, defaultValue = "0") int offset,
      @RequestParam(required = false, defaultValue = "false") boolean random,
      @RequestParam(required = false, defaultValue = "false") String category) {
    List<ChanThread> allChanThreads =
        chanThreadService.getAllChanThreads(limit, offset, random, category);
    return allChanThreads.stream()
        .map(dtoHelper::convertChanThreadToDto)
        .collect(Collectors.toList());
  }

  @GetMapping("thread/{id}/posts")
  @ResponseBody
  public List<PostDto> getPosts(
      @PathVariable("id") int id,
      @RequestParam(required = false, defaultValue = "5") int limit,
      @RequestParam(required = false, defaultValue = "0") int offset) {
    List<Post> posts = postService.getPosts(id, limit, offset);
    return posts.stream().map(dtoHelper::convertPostToDto).collect(Collectors.toList());
  }
}
