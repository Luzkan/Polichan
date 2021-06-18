package pwr.piisw.backend.dto;

import lombok.Data;

@Data
public class PostDtoPOST {
  private Integer id;
  private Integer threadId;
  private String nickname;
  private String password;
  private String content;
  private String imgUrl;
}
