import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  constructor() {
  }

  public ws: Subject<string>;
  public stompClient: any;
  private url: string;
  private datapath: string;
  // public createObservableSocket(url: string): Observable<string> {
  //     this.ws = new WebSocket(url);

  //     return Observable.create(observer => {
  //             this.ws.onmessage = event => observer.next(event.data);
  //             this.ws.onerror = event => observer.error(event);
  //             this.ws.onclose = event => observer.complete();
  //         });
  //     }

  public createSocketConnection(url: string, datapath: string): any {
    this.url = url;
    this.datapath = datapath;
    this.ws = new Subject();
    let socket = new WebSocket(url);
    this.stompClient = Stomp.over(socket);
    const _this = this;
    _this.stompClient.connect({}, function (frame) {
      _this.stompClient.subscribe(datapath, function (sdkEvent) {
        _this.ws.next(sdkEvent);
      });
    }, this.errorCallBack);
  };

  public sendMessage(message: any): void {
    this.stompClient.send('/app/message', {}, JSON.stringify(message));
  }

  public disconnect(): void {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
  }

  public errorCallBack(error) {
    console.log('errorCallBack -> ' + error);
    setTimeout(() => {
      this.createSocketConnection(this.url, this.datapath);
    }, 5000);
  }
}
