package pwr.piisw.backend.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import pwr.piisw.backend.dto.ChanThreadDto;
import pwr.piisw.backend.models.ChanThread;
import pwr.piisw.backend.services.ChanThreadService;

@RestController
public class ChanThreadResource {
  private final ChanThreadService chanThreadService;

  @Autowired private ModelMapper modelMapper;

  public ChanThreadResource(ChanThreadService chanThreadService) {
    this.chanThreadService = chanThreadService;
  }

  @PostMapping("threads")
  @ResponseStatus(HttpStatus.CREATED)
  @ResponseBody
  public ChanThreadDto saveThread(@RequestBody ChanThread chanThread) {
    return convertToDto(chanThreadService.saveThread(chanThread));
  }

  @GetMapping("/threads/{id}")
  @ResponseBody
  public ChanThreadDto getChanThread(@PathVariable("id") int id) {
    ChanThread chanThread = chanThreadService.getChanThread(id);
    return convertToDto(chanThread);
  }

  @GetMapping("threads")
  @ResponseBody
  public List<ChanThreadDto> getAllChanThread(
      @RequestParam(required = false, defaultValue = "5") int limit,
      @RequestParam(required = false, defaultValue = "0") int offset) {
    List<ChanThread> allChanThreads = chanThreadService.getAllChanThreads(limit, offset);
    return allChanThreads.stream().map(this::convertToDto).collect(Collectors.toList());
  }

  private ChanThreadDto convertToDto(ChanThread chanThread) {
    return modelMapper.map(chanThread, ChanThreadDto.class);
  }
}
