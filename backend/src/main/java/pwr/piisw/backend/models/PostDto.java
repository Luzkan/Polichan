package pwr.piisw.backend.models;

import java.time.LocalDateTime;

import lombok.*;

@Data
public class PostDto {
  private Integer id;
  private Integer threadId;
  private String nickname;
  private String password;
  private String content;
  private String imgUrl;
  private LocalDateTime date;

  public PostDto(Post entity) {
    this.id = entity.getId();
    this.threadId = entity.getThreadId();
    this.nickname = entity.getNickname();
    this.content = entity.getContent();
    this.imgUrl = entity.getImgUrl();
    this.date = entity.getDate();
  }
}
