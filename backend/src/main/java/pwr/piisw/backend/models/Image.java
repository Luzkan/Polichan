package pwr.piisw.backend.models;

import javax.persistence.*;

import org.hibernate.annotations.GenericGenerator;

import lombok.*;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Image {
  public Image(String name, String type, byte[] data) {
    this.name = name;
    this.type = type;
    this.data = data;
  }

  @Id
  @GeneratedValue(generator = "uuid")
  @GenericGenerator(name = "uuid", strategy = "uuid2")
  private String id;

  private String imgUrl;
  private String name;
  private String type;

  @Lob private byte[] data;
}
