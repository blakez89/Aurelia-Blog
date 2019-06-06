import {bindable} from 'aurelia-framework';
import {AuthService} from '../../common/services/auth-service'
import {inject} from 'aurelia-framework';

//@inject (AuthService)
export class BlogPost {
  @bindable post;

/*   constructor(AuthService) {
    this.AuthService = AuthService;

    if(this.AuthService.curentUser === this.post.author){
      this.editable = true;
    }
    // if the post's author is the same as the current user, set editable equal to true

  } */

  


  valueChanged(newValue, oldValue) {
    //
  }
}
