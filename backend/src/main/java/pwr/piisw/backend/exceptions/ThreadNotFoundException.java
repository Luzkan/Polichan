package pwr.piisw.backend.exceptions;

public class ThreadNotFoundException extends RuntimeException {
  public ThreadNotFoundException(String message) {
    super(message);
  }
}
