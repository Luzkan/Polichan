package pwr.piisw.backend.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import pwr.piisw.backend.helper.OffsetBasedPageRequest;
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
    Map<String, String> accounts = chanThread.getAccounts();
    accounts.put(chanThread.getNickname(), encoder.encode(chanThread.getPassword()));
    chanThread.setAccounts(accounts);
    chanThread.setDate(LocalDateTime.now());
    return chanThreadRepo.save(chanThread);
  }

  public ChanThread getChanThread(Integer chanThreadId) {
    return chanThreadRepo.findAllBythreadId(chanThreadId);
  }

  //  public Page<ChanThread> getAllChanThreads(ChanThreadPage chanThreadPage) {
  //    Sort sort = Sort.by(chanThreadPage.getSortDirection(), chanThreadPage.getSortBy());
  //    Pageable pageable =
  //        PageRequest.of(chanThreadPage.getPageNumber(), chanThreadPage.getPageSize(), sort);
  //    return chanThreadRepo.findAll(pageable);
  //  }

  public List<ChanThread> getAllChanThreads(int limit, int offset) {
    Pageable pageable = new OffsetBasedPageRequest(limit, offset, "threadId", Sort.Direction.DESC);
    return chanThreadRepo.findAll(pageable).getContent();
  }
}
