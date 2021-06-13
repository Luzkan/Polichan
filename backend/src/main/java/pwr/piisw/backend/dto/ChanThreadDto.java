package pwr.piisw.backend.dto;

import java.time.LocalDateTime;

import pwr.piisw.backend.models.ChanThreadCategory;

import lombok.*;

@Data
public class ChanThreadDto {
  private Integer threadId;
  private ChanThreadCategory category;
  private String nickname;
  private String content;
  private String imgUrl;
  private LocalDateTime date;
}
