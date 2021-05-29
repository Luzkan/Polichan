package pwr.piisw.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pwr.piisw.backend.exception.ThreadNotFoundException;
import pwr.piisw.backend.model.Thread;
import pwr.piisw.backend.repo.ThreadRepo;

import java.util.List;
import java.util.Optional;

@Service
public class ThreadService {
    private final ThreadRepo threadRepo;

    @Autowired
    public ThreadService(ThreadRepo threadRepo) {
        this.threadRepo = threadRepo;
    }

    //podstawa szkieletu

    public Thread saveThread(Thread thread){
        thread.setContent("content");
        return threadRepo.save(thread);
    }

    public Thread getThread(String threadId){
        return threadRepo.findById(threadId)
                .orElseThrow(()-> new ThreadNotFoundException("Post by id" + threadId + "was not found"));
    }

    public List<Thread> getThreads(){
        return threadRepo.findAll();
    }

    public List<Thread> getRandomThreads(){
        return threadRepo.findAll();
    }

}
