import { Component, OnInit,Input } from '@angular/core';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
   
  @Input('movie') movie;
  @Input('genreList') genreList=[];
  watchListObj=[
    {
      "value":"not_watched",
      "display_name":"Not Watched"
    },
    {
      "value":"watched",
      "display_name":"Watched"
    },
    {
      "value":"watch_later",
      "display_name":"Watch Later"
    }
  ]
  showselectLoader=false;
  //base_imgUrl="https://image.tmdb.org/t/p/w154"; 
  constructor(private moviesService:MoviesService) { }
 
  ngOnInit() {
  }

  getGenres(genreIds=[]){
    let genres=[];
   // console.log(genreIds);
    if(this.genreList.length!=0){
       this.genreList.map(genreObj=>{
        // console.log(genreIds.includes(genreObj.id));
         if(genreIds.includes(genreObj.id)){
           genres.push(genreObj.name);
         }
       })
    }
    //console.log(genres);

    return genres;
  }

  modify_watchOption(watchElemObj,movie_id){
    console.log(watchElemObj.value);
    this.showselectLoader=true;
    this.moviesService.changeWatchState(watchElemObj.value,movie_id).subscribe(response=>{
       console.log(response);
       this.showselectLoader=false;
    })
  }

  setReviewContHeight(ImgELm){
      //console.log(ImgELm.height);
      return ImgELm.height;
  }

}
