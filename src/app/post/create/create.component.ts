//  Extrenal imports
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// Internal imports
import { PostService } from '../post.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateComponent implements OnInit {

  public createPostForm: FormGroup; // holds form details
  public submitted: boolean = false; // while form submit

  constructor(
    public postService: PostService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }
  /**
 * @author om kanada
 * @description This function is used to intialize create form.
 */
  private initCreateForm(): void {
    this.createPostForm = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required]
    });
  }
  /**
   * @author om kanada
   * @description This function is used to return form control.
   */
  get f() {
    return this.createPostForm.controls;
  }
  /**
   * @author om kanada
   * @description This function is used to create post.
   */
  public submit(): void {
    this.submitted = true;
    if (this.createPostForm.valid) {
      this.postService.create(this.createPostForm.value).subscribe(res => {
        this.router.navigate(['post', 'index']);
      });
    }
  }

  ngOnInit(): void {
    this.initCreateForm();
  }
}
