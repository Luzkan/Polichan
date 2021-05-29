package pwr.piisw.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pwr.piisw.backend.model.Post;
import pwr.piisw.backend.repo.PostRepo;

import java.util.List;

@Service
public class PostService {
    private final PostRepo postRepo;

    @Autowired
    public PostService(PostRepo postRepo) {
        this.postRepo = postRepo;
    }

    public Post savePost(Post post){
        post.setContent("content");
        return postRepo.save(post);
    }

    public List<Post>  getPosts(String threadId){
        return postRepo.findAllBythreadId(threadId);
    }
}
