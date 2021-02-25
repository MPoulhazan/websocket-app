package fr.laposte.bscc.eptm.services.gestion_pt_separations.module.websocket;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class WebsocketService {

    private static final Logger LOGGER = LoggerFactory.getLogger(WebsocketService.class);

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    public void notify() {
        // Get next user or empty user
        LOGGER.info("Notification web socket");
        WebsocketPayloadDTO message = new WebsocketPayloadDTO("New message at " +  System.currentTimeMillis() / 1000, 10);
        messagingTemplate.convertAndSend("/topic/progress", message);
    }
}
