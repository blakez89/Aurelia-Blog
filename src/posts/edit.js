import {PostService} from '../common/services/post-service'
import {AuthService} from '../common/services/auth-service'
import {EventAggregator} from 'aurelia-event-aggregator'
import {Router} from 'aurelia-router'
import {inject} from 'aurelia-framework';



@inject (EventAggregator,AuthService,PostService,Router)
export class Edit {
  constructor(EventAggregator,AuthService,PostService,Router) {
      this.EA = EventAggregator;
      this.AuthService = AuthService;
      this.PostService = PostService;
    this.Router = Router;

 
    }


  activate(params) {
    this.title= "Edit Post";
    this.PostService.find(params.slug).then(data=>{

      if(data.post.author !== this.AuthService.currentUser){
       this.Router.navigateToRoute('home');
     }


      this.post = data.post;
    }).catch(error=>{
      this.error = error.message;
      console.log(error)
    });
  }



  editPost()  {
     this.PostService.update(this.post).then((data)=>{
     this.EA.publish('post-updated',Date());
     this.Router.navigateToRoute('post-view',{slug:data.slug})
    }).catch(error=>{
      this.error = error;
      console.log(error);
    })
  } 
  

}
