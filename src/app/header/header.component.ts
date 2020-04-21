import { Component, OnInit, Input } from '@angular/core';
import { Client } from './../models/client';
import { LoginService } from '../services/login-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() title: string;
  @Input() client: Client;

  constructor(private loginService:LoginService) { }

  ngOnInit() {
    this.client = new Client();
    this.loginService.clientObervable.subscribe((c:Client)=> this.client = c);
  }

}
