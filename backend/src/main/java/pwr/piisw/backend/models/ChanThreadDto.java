package pwr.piisw.backend.models;


import lombok.*;
import javax.persistence.ElementCollection;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Data

public class ChanThreadDto {
    private Integer threadId;
    private ChanThreadCategory category;
    private String nickname;
    private String password;
    private String content;
    private String imgUrl;
    private LocalDateTime date;
    @ElementCollection
    private Map<String, String> map = new HashMap<String, String>();

    public ChanThreadDto(ChanThread entity) {
        this.threadId = entity.getThreadId();
        this.nickname = entity.getNickname();
        this.content = entity.getContent();
        this.imgUrl = entity.getImgUrl();
        this.date = entity.getDate();
        this.map = entity.getMap();
    }
}
