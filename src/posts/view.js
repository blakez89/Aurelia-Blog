import {inject} from 'aurelia-framework';
import {PostService} from '../common/services/post-service'
import {AuthService} from '../common/services/auth-service'


@inject (AuthService,PostService)
export class View {
  constructor(AuthService,PostService) {
    this.AuthService = AuthService;
    this.PostService = PostService;
  }

  activate(params) {
    this.error = '';
    this.PostService.find(params.slug).then(data=>{
      this.post = data.post;
    }).catch(error=>{
      this.error = error.message;
    });
  }
}
