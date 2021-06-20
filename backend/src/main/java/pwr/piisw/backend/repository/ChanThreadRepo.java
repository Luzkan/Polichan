package pwr.piisw.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import pwr.piisw.backend.models.ChanThread;
import pwr.piisw.backend.models.ChanThreadCategory;

@Repository
public interface ChanThreadRepo extends JpaRepository<ChanThread, Integer> {
  List<ChanThread> findAll();
  // ChanThread findAllBythreadId(Integer threadId);
  Page<ChanThread> findByCategory(Pageable pageable, ChanThreadCategory category);

  Optional<ChanThread> findById(Integer id);

  @Query(nativeQuery = true, value = "SELECT *  FROM chan_thread ORDER by RAND()")
  Page<ChanThread> findRandomChanThreads(Pageable chanThreads);
}
