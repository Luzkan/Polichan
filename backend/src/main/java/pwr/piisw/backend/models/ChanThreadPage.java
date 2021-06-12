package pwr.piisw.backend.models;

import org.springframework.data.domain.Sort;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChanThreadPage {
  private int pageNumber = 0;
  private int pageSize = 5;
  private Sort.Direction sortDirection = Sort.Direction.DESC;
  private String sortBy = "threadId";
}
