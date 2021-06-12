package pwr.piisw.backend.services;

import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import pwr.piisw.backend.models.*;
import pwr.piisw.backend.repository.ChanThreadRepo;

@Service
public class ChanThreadService {
  private final ChanThreadRepo chanThreadRepo;

  @Autowired
  public ChanThreadService(ChanThreadRepo chanThreadRepo) {
    this.chanThreadRepo = chanThreadRepo;
  }

  public ChanThread saveThread(ChanThread chanThread) {
    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    Map<String, String> map = chanThread.getMap();
    map.put(chanThread.getNickname(), encoder.encode(chanThread.getPassword()));
    chanThread.setMap(map);
    chanThread.setDate(LocalDateTime.now());
    return chanThreadRepo.save(chanThread);
  }

  public ChanThread getChanThread(Integer chanThreadId) {
    return chanThreadRepo.findAllBythreadId(chanThreadId);
  }

  public Page<ChanThread> getAllChanThreads(ChanThreadPage chanThreadPage) {
    Sort sort = Sort.by(chanThreadPage.getSortDirection(), chanThreadPage.getSortBy());
    Pageable pageable =
        PageRequest.of(chanThreadPage.getPageNumber(), chanThreadPage.getPageSize(), sort);
    return chanThreadRepo.findAll(pageable);
  }

  public Page<ChanThread> getRandomChanThreads(ChanThreadPage chanThreadPage) {
    Sort sort = Sort.by(chanThreadPage.getSortDirection(), chanThreadPage.getSortBy());
    Pageable pageable =
        PageRequest.of(chanThreadPage.getPageNumber(), chanThreadPage.getPageSize(), sort);
    return chanThreadRepo.findAll(pageable);
  }
}
