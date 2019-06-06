import { Redirect } from "aurelia-router";
import { inject} from 'aurelia-framework';
import {AuthService} from '../common/services/auth-service'

@inject (AuthService)
export class AuthorizeStep{

  constructor(AuthService){
    this.AuthService = AuthService;
  }

  run(navigationInstruction,next){


    
    if (navigationInstruction.getAllInstructions().some(i=>i.config.settings.auth)){
      if (!this.AuthService.currentUser){
      return next.cancel(new Redirect('login'));
      }
    }
  

    return next();

  }

}
