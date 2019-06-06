import {PostService} from '../common/services/post-service'
import {EventAggregator} from 'aurelia-event-aggregator'
import {Router} from 'aurelia-router'
import {inject} from 'aurelia-framework';



@inject (EventAggregator,PostService,Router)
export class Create {
  constructor(EventAggregator,PostService,Router,) {
      this.EA = EventAggregator;
      this.postService = PostService;
    this.Router = Router;

 
    }

  attached(){    

    this.post = 
    {
      title: '',
      body: '',
      tags: []
    };
    this.title= "Create Post";


  }



  createPost(){
    this.postService.create(this.post).then((data)=>{
     this.EA.publish('post-updated',Date());
     this.Router.navigateToRoute('post-view',{slug:data.slug})
    }).catch(error=>{
      this.error = error;
      console.log(error);
    })
  }


}
