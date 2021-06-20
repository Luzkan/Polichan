package pwr.piisw.backend;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import pwr.piisw.backend.helper.DtoHelper;

@Configuration
public class BackendApplicationConfig {
  @Bean
  public ModelMapper modelMapper() {
    ModelMapper m = new ModelMapper();
    m.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
    return m;
  }

  @Bean
  public DtoHelper dtoHelper() {
    return new DtoHelper(modelMapper());
  }
}
