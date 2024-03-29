import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Swiper from 'swiper';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  @ViewChild('slides', { static: true }) slide: Swiper;
  isEnd:boolean = false;
  slides:any[]=[
    {
      img:'../../../assets/images/deliveryboy-bike.webp',
      msg:' Send your package to destination as fast as Flash',
    },
    {
      img:'../../../assets/images/deliveryboy-home2.jpeg',
      msg:'Receive Your Parcel In a Hustle Free Way'
    }
  ]
  constructor(private router:Router) { }

  ngOnInit() {
    console.log("Intro")
    localStorage.setItem('intro','false')
  }

  swiperSlideChanged(e:any)
  {
    console.log("Hello")
    console.log(e)
    // console.log(e.detail[0].activeIndex)
    // console.log(e.detail[0].isEnd)
    this.isEnd = e.detail[0].isEnd;
  }
  
  onLogin(){
    localStorage.setItem('intro','true')
    this.router.navigate(['/login'])
  }

}
