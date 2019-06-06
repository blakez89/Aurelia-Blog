import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router'
import {AuthService} from '../common/services/auth-service'
import {EventAggregator} from 'aurelia-event-aggregator'

@inject (EventAggregator,Router,AuthService)
export class Login {
  constructor(EventAggregator,Router,AuthService) {
    this.EA = EventAggregator;
    this.Router = Router;
    this.AuthService = AuthService;
  }




login(){
  this.AuthService.login(this.name).then((data)=>{
    this.EA.publish('user',"");
    this.EA.publish('toast',{type: 'success',message: 'Login successful!'});
    this.Router.navigateToRoute('home');
  }).catch(error=>{
    this.EA.publish('toast',{type: 'error',message: 'Invalid Credentials'});
  })

}


}
