package pwr.piisw.backend.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import pwr.piisw.backend.dto.ChanThreadDto;
import pwr.piisw.backend.dto.PostDto;
import pwr.piisw.backend.models.ChanThread;
import pwr.piisw.backend.models.Post;
import pwr.piisw.backend.services.ChanThreadService;
import pwr.piisw.backend.services.PostService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("threads")
@RequiredArgsConstructor
public class ChanThreadResource {
  private final ChanThreadService chanThreadService;

  private final ModelMapper modelMapper;
  private final PostService postService;

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  @ResponseBody
  public ChanThreadDto saveThread(@RequestBody ChanThread chanThread) {
    return convertChanThreadToDto(chanThreadService.saveThread(chanThread));
  }

  @GetMapping("/{id}")
  @ResponseBody
  public ChanThreadDto getChanThread(@PathVariable("id") int id) {
    ChanThread chanThread = chanThreadService.getChanThread(id);
    return convertChanThreadToDto(chanThread);
  }

  @GetMapping
  @ResponseBody
  public List<ChanThreadDto> getAllChanThread(
      @RequestParam(required = false, defaultValue = "5") int limit,
      @RequestParam(required = false, defaultValue = "0") int offset) {
    List<ChanThread> allChanThreads = chanThreadService.getAllChanThreads(limit, offset);
    return allChanThreads.stream().map(this::convertChanThreadToDto).collect(Collectors.toList());
  }

  @GetMapping("/{id}/posts")
  @ResponseBody
  public List<PostDto> getPosts(
      @PathVariable("id") int id,
      @RequestParam(required = false, defaultValue = "5") int limit,
      @RequestParam(required = false, defaultValue = "0") int offset) {
    List<Post> posts = postService.getPosts(id, limit, offset);
    return posts.stream().map(this::convertPostToDto).collect(Collectors.toList());
  }

  private ChanThreadDto convertChanThreadToDto(ChanThread chanThread) {
    return modelMapper.map(chanThread, ChanThreadDto.class);
  }

  private PostDto convertPostToDto(Post post) {
    return modelMapper.map(post, PostDto.class);
  }
}
