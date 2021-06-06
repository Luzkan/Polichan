package pwr.piisw.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pwr.piisw.backend.exceptions.ThreadNotFoundException;
import pwr.piisw.backend.models.*;
import pwr.piisw.backend.repository.ChanThreadRepo;

import java.time.LocalDateTime;

@Service
public class ChanThreadService {
    private final ChanThreadRepo chanThreadRepo;

    @Autowired
    public ChanThreadService(ChanThreadRepo chanThreadRepo) {
        this.chanThreadRepo = chanThreadRepo;
    }

    public ChanThread saveThread(ChanThread chanThread) {
        chanThread.setDate(LocalDateTime.now());
        return chanThreadRepo.save(chanThread);
    }

    public ChanThread getChanThread(Integer chanThreadId) {
        return chanThreadRepo.findAllBythreadId(chanThreadId);
    }
}


