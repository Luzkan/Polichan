package pwr.piisw.backend.dto;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import pwr.piisw.backend.models.ChanThreadCategory;

import lombok.Data;

@Data
public class ChanThreadDtoPOST {
  private Integer threadId;
  private ChanThreadCategory category;
  private String password;
  private String nickname;
  private String content;
  private String imgUrl;
  private LocalDateTime date;
  private Map<String, String> accounts = new HashMap<>();
}
