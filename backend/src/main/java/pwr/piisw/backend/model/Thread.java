package pwr.piisw.backend.model;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Thread implements Serializable {
    @Id
    @GeneratedValue
    @Column(nullable = false, updatable = false)
    private Integer id;

    private ThreadCategory category;
    private String nickname;
    private String content;
    private String imgUrl;
    private LocalDateTime date;

    @Override
    public String toString() {
        return "Thread{" +
                "id='" + id + '\'' +
                ", category=" + category +
                ", nickname='" + nickname + '\'' +
                ", content='" + content + '\'' +
                ", imgUrl='" + imgUrl + '\'' +
                ", date=" + date +
                '}';
    }
}

