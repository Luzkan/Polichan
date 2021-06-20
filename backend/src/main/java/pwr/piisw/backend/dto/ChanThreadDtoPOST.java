package pwr.piisw.backend.dto;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

import pwr.piisw.backend.models.ChanThreadCategory;

import lombok.Data;

@Data
public class ChanThreadDtoPOST {
  @NotNull(message = "category may not be null")
  private ChanThreadCategory category;

  @NotNull(message = "password may not be null")
  @Length(min = 3, message = "Length must be more than 3")
  private String password;

  @NotNull(message = "nickname may not be null")
  @Length(min = 3, message = "Length must be more than 3")
  private String nickname;
}
