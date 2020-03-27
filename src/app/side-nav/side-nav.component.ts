import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import {MoviesService} from '../movies.service';
import { ActivatedRoute } from '@angular/router';
//import {worker} from '../web-worker/worker.worker';

@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  constructor(private moviesService:MoviesService,private route:ActivatedRoute) { }
  @Input('show') show=false;
  @Input('genreList') genreList=[];
  @Input('genreName') genreName=null;
  movieList=[];
  @Output() navChange = new EventEmitter();
  @Output() movieListChange= new EventEmitter();
  ngOnInit() {
    console.log("fires");
    
  }


   unHideNav(show){
    this.show=!this.show;
    this.navChange.emit(this.show)
  }

  showMovieList(genreId){
      this.movieListChange.emit(genreId);
      this.show=!this.show;
      this.navChange.emit(this.show)
  }

}
