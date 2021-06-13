package pwr.piisw.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pwr.piisw.backend.models.ChanThread;
import java.util.List;

@Repository
public interface ChanThreadRepo extends JpaRepository<ChanThread, Integer> {
  List<ChanThread> findAll();
  ChanThread findAllBythreadId(Integer threadId);

  // @Query(nativeQuery=true, value="SELECT *  FROM chan_thread")
  // Page<ChanThread> findRandomChanThreads(Pageable chanThreads);
}
