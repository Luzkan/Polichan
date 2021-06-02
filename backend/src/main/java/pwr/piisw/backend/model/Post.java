package pwr.piisw.backend.model;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Post implements Serializable {
    @Id
    @GeneratedValue
    @Column(nullable = false, updatable = false)
    private Integer id;
    @Column(nullable = false, updatable = false)
    private String threadId;
    private String nickname;
    private String password;
    private String content;
    private String imgUrl;
    private LocalDateTime date;

    // toString
    @Override
    public String toString() {
        return "Post{" +
                "id='" + id + '\'' +
                ", threadId='" + threadId + '\'' +
                ", nickname='" + nickname + '\'' +
                ", password='" + password + '\'' +
                ", content='" + content + '\'' +
                ", imgUrl='" + imgUrl + '\'' +
                ", date=" + date +
                '}';
    }
}

