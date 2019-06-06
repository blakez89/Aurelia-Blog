import {inject} from 'aurelia-framework';
import {PostService} from '../common/services/post-service';


@inject (PostService)
export class Index {
  constructor(PostService) {
    this.PostService = PostService;
  }

  attached() {
    this.error = '';
    this.PostService.allPostPreviews().then(data=>{
      this.posts = data.posts;
    }).catch(error=>{
      this.error = error.message;
    });
  }
}
