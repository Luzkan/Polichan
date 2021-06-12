package pwr.piisw.backend.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import pwr.piisw.backend.models.ChanThread;

@Repository
public interface ChanThreadRepo extends PagingAndSortingRepository<ChanThread, Integer> {

  ChanThread findAllBythreadId(Integer threadId);

  // @Query(nativeQuery=true, value="SELECT *  FROM chan_thread")
  // Page<ChanThread> findRandomChanThreads(Pageable chanThreads);
}
