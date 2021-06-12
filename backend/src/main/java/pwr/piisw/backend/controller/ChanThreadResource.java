package pwr.piisw.backend.controller;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import pwr.piisw.backend.models.ChanThread;
import pwr.piisw.backend.models.ChanThreadPage;
import pwr.piisw.backend.services.ChanThreadService;

@RestController
@RequestMapping("/api")
public class ChanThreadResource {
  private final ChanThreadService chanThreadService;

  public ChanThreadResource(ChanThreadService chanThreadService) {
    this.chanThreadService = chanThreadService;
  }

  @PostMapping("threads")
  public ResponseEntity<ChanThread> saveThread(@RequestBody ChanThread chanThread) {
    return new ResponseEntity<>(chanThreadService.saveThread(chanThread), HttpStatus.OK);
  }

  @GetMapping("/threads/{id}")
  public ResponseEntity<ChanThread> getChanThread(@PathVariable("id") int id) {
    ChanThread chanThread = chanThreadService.getChanThread(id);
    return new ResponseEntity<>(chanThread, HttpStatus.OK);
  }

  @GetMapping("threads")
  public ResponseEntity<Page<ChanThread>> getAllChanThread(
      ChanThreadPage chanThreadPage, @RequestParam(required = false) boolean random) {
    if (random) {
      Page randomChanThreads = chanThreadService.getRandomChanThreads(chanThreadPage);
      return new ResponseEntity<>(randomChanThreads, HttpStatus.OK);
    } else {
      Page allChanThreads = chanThreadService.getAllChanThreads(chanThreadPage);
      return new ResponseEntity<>(allChanThreads, HttpStatus.OK);
    }
  }
}
