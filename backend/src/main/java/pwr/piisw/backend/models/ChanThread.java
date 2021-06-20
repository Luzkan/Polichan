package pwr.piisw.backend.models;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import javax.persistence.*;

import lombok.*;

@Entity
@Data
public class ChanThread implements Serializable {
  @Id
  @GeneratedValue
  @Column(nullable = false, updatable = false)

  // zmienic na id
  private Integer threadId;

  private ChanThreadCategory category;
  private String nickname;
  private String password;
  private String content;
  private String imgUrl;
  private String imageResourceId;
  private LocalDateTime date;

  @ElementCollection private Map<String, String> accounts = new HashMap<>();
}
