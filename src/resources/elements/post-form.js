import {bindable, inject} from 'aurelia-framework';
import {ValidationRules, ValidationControllerFactory, validationMessages} from 'aurelia-validation';
import {PostService} from '../../common/services/post-service';




@inject (ValidationControllerFactory,PostService)
export class PostForm {
  @bindable post;
  @bindable title;

  constructor(ValidationControllerFactory,PostService){
    this.controller = ValidationControllerFactory.createForCurrentScope();
    this.postService = PostService;


  }
  
  attached(){
    this.postService.allTags().then((data)=>{
      this.allTags = data.tags
    }).catch(error=>{
      this.error = error;
      console.log(error);
    });

  }
  submit(){
    


  }


  addTag(){
    this.post.tags.push(this.newTag);
    this.allTags.push(this.newTag);
    this.newTag = "";

  }

  postChanged(newValue, oldValue) {
    if(this.post){
      validationMessages['required'] = `You must enter a \${$displayName}`

      ValidationRules
      .ensure('title').displayName('Title').required().minLength(5)
      .ensure('body').displayName('Body').required().minLength(20)
      .on(this.post);

      this.controller.validate();

  }


    }
  }

