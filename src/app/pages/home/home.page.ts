import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  user= {
    name:'Satish'
  }
  constructor() { }

  ngOnInit() {
    console.log('Home Page')
  }

}
