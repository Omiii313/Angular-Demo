// Extrenal imports
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// Internal imports
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditComponent implements OnInit {

  private id: number; // holds value of id
  public updatePostForm: FormGroup; // holds form details
  public submitted: boolean = false; // while form submit

  constructor(
    public postService: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }
  /**
   * @author om kanada
   * @description This function is used to initalize update post form.
   */
  private initUpdatePostForm(): void {
    this.updatePostForm = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required]
    });
  }
  /**
   * @author om kanada
   * @description This function is used to get post details by id.
   */
  private getPostById(): void {
    this.postService.find(this.id).subscribe((data: Post) => {
      this.updatePostForm.patchValue(data);
    }, (error) => {
      window.alert('Error while getting post details');
    });
  }
  /**
   * @author om kanada
   * @description This function is used to update post details.
   */
  public submit(): void {
    this.submitted = true;
    if (this.updatePostForm.valid) {
      this.postService.update(this.id, this.updatePostForm.value).subscribe(res => {
        this.router.navigateByUrl('post/index');
      });
    }
  }
  /**
   * @author om kanada
   * @description This function is used to return form controls
   * .
   */
  get f() {
    return this.updatePostForm.controls;
  }

  ngOnInit(): void {
    // get post id from route
    this.id = this.route.snapshot.params['postId'];
    this.getPostById();
    this.initUpdatePostForm();
  }
}
