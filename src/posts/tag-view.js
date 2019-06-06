import {inject} from 'aurelia-framework';
import {PostService} from '../common/services/post-service';

@inject (PostService)
export class TagView {
  constructor(PostService) {
    this.PostService = PostService;
  }

  activate(params){
    this.tag = params.tag;
    this.PostService.postsByTag(this.tag).then(data => {
      this.posts = data.posts;
    }).catch(error => {
      this.error = error.message;
    });
  }


}
