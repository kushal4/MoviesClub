import { Component,EventEmitter,Output, Input,OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
})
export class BsNavbarComponent implements OnInit {

  works=[
    "test",
    "test1",
    "test2",
    "test3",
    "test4"
  ]
  constructor(private router:Router) { }

  @Output() valueChange = new EventEmitter();
  @Output() searchChange = new EventEmitter();
  @Input('showHamburger') show=false;
  ngOnInit() {
  }

  logout(){
    localStorage.removeItem("access_token");
    this.router.navigate(['/login']);
    
  }

  toggle(){
    console.log("toggle");
    this.show=!this.show;
    this.valueChange.emit(this.show);
  }

  searchMovie(inputValue){
     console.log(inputValue);
     this.searchChange.emit(inputValue);
  }

}
