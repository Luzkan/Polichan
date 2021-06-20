package pwr.piisw.backend.dto;

import java.time.LocalDateTime;

import lombok.*;

@Data
public class PostDto {
  private Integer id;
  private Integer threadId;
  private String nickname;
  private String content;
  private String imgUrl;
  private LocalDateTime date;
}
