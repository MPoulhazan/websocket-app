package fr.laposte.bscc.eptm.services.gestion_pt_separations.module.dto;

public class WebsocketPayloadDTO {
  private final string message;
  private final Integer progress;

  public WebsocketPayloadDTO(string message, Integer progress) {
    this.message = message;
    this.progress = progress;
  }

  public string getMessage() {
    return message;
  }

  public Integer getProgress() {
    return progress;
  }
}
