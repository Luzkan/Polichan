package pwr.piisw.backend;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pwr.piisw.backend.model.Thread;
import pwr.piisw.backend.service.ThreadService;

import java.util.List;

@RestController
@RequestMapping("/")
public class ThreadResource {
    private final ThreadService threadService;

    public ThreadResource(ThreadService threadService) {
        this.threadService = threadService;
    }

    @PostMapping("/saveThread")
    public ResponseEntity<Thread> addThread(@RequestBody Thread thread) {
        Thread newThread = threadService.saveThread(thread);
        return new ResponseEntity<>(newThread, HttpStatus.CREATED);
    }

    @GetMapping("/threads/{id}")
    public ResponseEntity<Thread> getThreadById (@PathVariable("id") int id) {
        Thread thread = threadService.getThread(id);
        return new ResponseEntity<>(thread, HttpStatus.OK);
    }

    @GetMapping("/threads")
    public ResponseEntity<List<Thread>> getAllThreads () {
        List<Thread> threads = threadService.getThreads();
        return new ResponseEntity<>(threads, HttpStatus.OK);
    }


}
