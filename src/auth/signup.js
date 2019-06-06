import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router'
import {AuthService} from '../common/services/auth-service'
import {EventAggregator} from 'aurelia-event-aggregator'


@inject(Router,AuthService,EventAggregator)
export class Signup {
  constructor(Router,AuthService,EventAggregator) {
    this.Router = Router;
    this.AuthService = AuthService;
    this.EA = EventAggregator;
  }
  
  
  
  signup(){
    this.AuthService.signup(this.name).then(()=>{
      this.EA.publish('toast',{type: 'success',message: 'Registration successful!'});
      this.EA.publish('user',"");
      this.Router.navigateToRoute('home')
    }).catch(error=>{
      this.EA.publish('toast',{type: 'error',message: 'User already exists'});
    })
  
  }







}
