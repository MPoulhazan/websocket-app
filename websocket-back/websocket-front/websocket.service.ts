import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { environment } from '@environments/environment';
import { DataLoggerService } from './data-logger.service';



@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  /**
 * URL de l'API "Séparation" définie par une variable d'environnemnt
 */
  private readonly apiUrlSeparation = environment.apiUrlSeparation;

  /**
   * Version de l'API "Séparation" définie par une variable d'environnemnt
   */
  private readonly apiVersionSeparation = environment.apiVersionSeparation;

  /**
   * Path de l'api socket
   */
  private readonly apiPath = 'socket';

  private APISocketSeparation = `${this.apiUrlSeparation}`;
  private stompClient;
  public mapEndpointSubscription: Map<string, any> = new Map();

  constructor(
    private readonly logger: DataLoggerService,
  ) { }

  public async initWebSocket() {
    this.APISocketSeparation = this.apiUrlSeparation + this.apiVersionSeparation + this.apiPath;
    this.logger.log('WebsocketService: initWebSocket() with path ', this.APISocketSeparation);
    return new Promise<void>((resolve) => {
      if (!this.stompClient) {
        const ws = new SockJS(this.APISocketSeparation);
        this.stompClient = Stomp.over(ws);
        this.stompClient.connect({}, resolve);
      } else {
        resolve();
      }
    });
  }

  public async subscribe(name: string, fnc: (event) => void) {
    this.logger.log('WebsocketService: subscribe()');
    const subscription = this.stompClient.subscribe(`/${name}`, (event) => {
      fnc({ ...event, body: JSON.parse(event.body) })
    });
    this.mapEndpointSubscription.set(name, subscription);
  }

  public unsubscribeToWebSocketEvent(name: string) {
    this.logger.log('WebsocketService: unsubscribeToWebSocketEvent()');
    const subscription = this.mapEndpointSubscription.get(name);
    if (subscription) {
      subscription.unsubscribe();
    }
  }

  public send(name: string, body: any) {
    this.logger.log('WebsocketService: send()');
    this.stompClient.send(`/app/topic/${name}`, {}, JSON.stringify(body));
  }

  public disconnect() {
    this.logger.log('WebsocketService: disconnect()');
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
  }
}