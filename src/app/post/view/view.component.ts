// Extrenal imports
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// Internal imports
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewComponent implements OnInit, OnDestroy {

  public post: Post; // holds details of post

  constructor(
    public postService: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }
  /**
   * @author om kanada
   * @description This function is used to get post details on based on id.
   */
  private getPostDetails(id: number): void {
    this.postService.find(id).subscribe((data: Post) => {
      this.post = data;
      this.cdr.detectChanges();
    });
  }

  ngOnInit(): void {
    // get post id from route
    const id = this.route.snapshot.params['postId'];
    this.getPostDetails(id);
  }
  ngOnDestroy(): void {
    if (this.cdr) {
      this.cdr.detach();
    }
  }
}
