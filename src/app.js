import { PLATFORM, inject} from 'aurelia-framework';
import {PostService} from './common/services/post-service';
import {AuthService} from './common/services/auth-service';
import {EventAggregator} from 'aurelia-event-aggregator';
import {AuthorizeStep} from './pipeline-steps/authorize-step';
import * as toastr from 'toastr';


@inject (EventAggregator,PostService,AuthService)
export class App {
  
  constructor(EventAggregator,PostService,AuthService) {
    this.EA = EventAggregator;
    this.PostService = PostService;
    this.AuthService = AuthService;
  }

  attached() {
    this.currentUser = this.AuthService.currentUser;

    this.subscription = this.EA.subscribe('user', ()=>{
      this.currentUser = this.AuthService.currentUser;
    });
    this.updateSidebar();
    this.postSubscription = this.EA.subscribe('post-updated',updatedAt=>{
      this.updateSidebar();
    })

    this.toastSubscription = this.EA.subscribe('toast',toast=>{
      toastr[toast.type](toast.message)
    });


  }

  detached(){
    this.subscription.dispose();
    this.postSubscription.dispose();
    this.toastSubscription.dispose();


  }


  updateSidebar(){
    this.PostService.allTags().then(data=> {
      this.tags = data.tags;
    }).catch(error => {
      this.error = error.message;
    });
  
    this.PostService.allArchives().then(data=> {
      this.archives = data.archives;
    }).catch(error => {
      this.error = error.message;
    });
    
  }



  logout(){
    this.AuthService.logout().then(()=>{
      this.EA.publish('user',"");
      this.EA.publish('toast',{type: 'success',message: 'Logout successful'});
      this.router.navigateToRoute('home');
    }).catch(error=>{
      console.log(error);
    })
  }



  configureRouter(config, router) {
    config.options.root = '/';
    config.addAuthorizeStep(AuthorizeStep);
    config.map([
      { route: [''],   name: 'home',    moduleId: PLATFORM.moduleName('posts/index'), title: 'All Posts' },
      { route: ['login'],   name: 'login',    moduleId: PLATFORM.moduleName('auth/login'), title: 'Login' },
      { route: ['signup'],   name: 'signup',    moduleId: PLATFORM.moduleName('auth/signup'), title: 'Sign Up' },
      { route: ['create'],   name: 'create',    moduleId: PLATFORM.moduleName('posts/create'), title: 'Create Post',settings:{auth:true} },
      { route: ['post/:slug/edit'],   name: 'edit',    moduleId: PLATFORM.moduleName('posts/edit'), title: 'Edit' ,settings:{auth:true} },
      { route: ['post/:slug'],   name: 'post-view',    moduleId: PLATFORM.moduleName('posts/view'), title: 'View Post' },
      { route: ['tag/:tag'],   name: 'tag-view',    moduleId: PLATFORM.moduleName('posts/tag-view'), title: 'View Post By Tags' },
      { route: ['archive/:archive'],   name: 'archive-view',    moduleId: PLATFORM.moduleName('posts/archive-view'), title: 'View Archive' }


    ]);

    this.router = router;
  }
}

