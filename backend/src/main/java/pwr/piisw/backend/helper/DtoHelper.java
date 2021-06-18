package pwr.piisw.backend.helper;

import org.modelmapper.ModelMapper;

import pwr.piisw.backend.dto.ChanThreadDto;
import pwr.piisw.backend.dto.ChanThreadDtoPOST;
import pwr.piisw.backend.dto.PostDto;
import pwr.piisw.backend.dto.PostDtoPOST;
import pwr.piisw.backend.models.ChanThread;
import pwr.piisw.backend.models.Post;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class DtoHelper {
  private final ModelMapper modelMapper;

  public PostDto convertPostToDto(Post post) {
    return modelMapper.map(post, PostDto.class);
  }

  public Post convertPostDtoPOSTToEntity(PostDtoPOST postDtoPOST) {
    return modelMapper.map(postDtoPOST, Post.class);
  }

  public ChanThreadDto convertChanThreadToDto(ChanThread chanThread) {
    return modelMapper.map(chanThread, ChanThreadDto.class);
  }

  public ChanThread convertChanThreadDtoPOSTToEntity(ChanThreadDtoPOST chanThreadDtoPOST) {
    return modelMapper.map(chanThreadDtoPOST, ChanThread.class);
  }
}
