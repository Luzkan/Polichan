package pwr.piisw.backend.dto;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

import lombok.Data;

@Data
public class PostDtoPOST {
  @NotNull(message = "threadId may not be null")
  private Integer threadId;

  @NotNull(message = "nickname may not be null")
  @Length(min = 3, message = "Length must be more than 3")
  private String nickname;

  @NotNull(message = "password may not be null")
  @Length(min = 3, message = "Length must be more than 3")
  private String password;

  @NotNull(message = "content may not be null")
  private String content;

  private String imgUrl;
}
