import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';
import { ActivatedRoute } from '@angular/router';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-movie-home',
  templateUrl: './movie-home.component.html',
  styleUrls: ['./movie-home.component.scss']
})
export class MovieHomeComponent implements OnInit {

  genreList=[];
  movieList=[];
  movie_genre="";
  isMovieList=false;
  genreName=null;
  filterMovieList=[];
  constructor(private moviesService:MoviesService,
    private route:ActivatedRoute) { }
    show=false;
    showLoader=false;
  ngOnInit() {
    //console.log("called");
    let genreList$=this.moviesService.GenreList();
    genreList$.subscribe(genreResponse=>{
      this.genreList=genreResponse["genres"];
      this.route.queryParamMap.subscribe(params=>{
        this.genreName=params.get('genre');
        console.log(this.genreName);
        let genreId=-1;
        if(this.genreName ==null){
          if(!this.isMovieList){
            this.fetchMovieList(genreId,true);
          }
        }else{
        console.log(this.genreName);
          this.genreList.map(genreObj=>{
            if(genreObj.name==this.genreName){
                genreId=genreObj.id;
                if(!this.isMovieList){
                  this.fetchMovieList(genreId,true);
                }             
            }
          });
        }     
      })
    })
  }

  toggleShow(show){
    console.log("show is called");
    this.show=show;
  }

  fetchMovieList(genreId,sub_flg=false){
    this.showLoader=true;
  let subscription=  this.moviesService.movieList(genreId).pipe(take(1)).subscribe(moviesResponse=>{
           this.showLoader=false;
           if(!this.isMovieList){
             this.isMovieList=true;
           }

           this.filterMovieList=this.movieList=moviesResponse["results"];
           console.log(this.movieList);
          if(sub_flg){
            subscription.unsubscribe();
            //this.isMovieList=false;
          }
      });

    }

  searchMovies(titleKeyword){
      console.log(titleKeyword);
      this.filterMovieList=((titleKeyword!="")?this.movieList.filter(movie=>movie.original_title.includes(titleKeyword)):this.movieList);
      console.log(this.filterMovieList);
  }  

}
