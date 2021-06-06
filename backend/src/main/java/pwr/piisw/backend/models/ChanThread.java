package pwr.piisw.backend.models;

        import java.io.Serializable;
        import java.time.LocalDateTime;

        import javax.persistence.Column;
        import javax.persistence.Entity;
        import javax.persistence.GeneratedValue;
        import javax.persistence.Id;

        import lombok.AllArgsConstructor;
        import lombok.Getter;
        import lombok.NoArgsConstructor;
        import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class ChanThread implements Serializable {
    @Id
    @GeneratedValue
    @Column(nullable = false, updatable = false)
    private Integer threadId;
    private ChanThreadCategory category;
    private String nickname;
    private String password;
    private String content;
    private String imgUrl;
    private LocalDateTime date;
}
