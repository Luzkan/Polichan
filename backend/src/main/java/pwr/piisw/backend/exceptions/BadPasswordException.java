package pwr.piisw.backend.exceptions;

public class BadPasswordException extends RuntimeException {
  public BadPasswordException(String message) {
    super(message);
  }
}
