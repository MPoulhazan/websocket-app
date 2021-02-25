import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '@shared/services/websocket.service';

@Component({
  selector: 'app-websocket',
  templateUrl: './websocket.component.html',
  styleUrls: ['./websocket.component.scss']
})
export class WebsocketComponent implements OnInit {

  msg: string;
  progress = 0;

  constructor(private websocketService: WebsocketService) { }

  ngOnInit() {
     this.websocketService.initWebSocket().then(() => {
      this.websocketService.subscribe('topic/progress', (event) => {
        this.msg = event.body.message;
        this.progress = event.body.progress;
      });
    });
  }

  callWebSocket() {
    this.websocketService.send('', 'Test');
  }

}
