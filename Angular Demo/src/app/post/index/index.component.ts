// Extrenal imports
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
// Internal imports
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndexComponent implements OnInit, OnDestroy {
  public sort: any = {};
  public isAdmin: boolean = false; // is admin
  public posts: Post[] = []; // holds list of post
  public reservedPosts: Post[] = []; // holds list of post

  constructor(public postService: PostService, private cdr: ChangeDetectorRef) { }
  /**
   * @author om kanada
   * @description This function is used to get all post from api.
   */
  private getAllPost(): void {
    this.postService.getAll().subscribe((data: Post[]) => {
      this.posts = data;
      this.reservedPosts = data;
      this.cdr.detectChanges();
    });
  }
  /**
   * @author om kanada
   * @description This function is used to delete post on based on id.
   */
  public deletePost(id: number) {
    this.postService.delete(id).subscribe(res => {
      // remove from post list
      this.posts = this.posts.filter(item => item.id !== id);
      this.cdr.detectChanges();
    }, (error) => {
      window.alert('Error While deleting post.');
    });
  }
  /**
   * @author om kanada
   * @description This function is used to identify obj per array.
   */
  public identify(index: number, item: Post) {
    return item.id;
  }
  /**
 * @author om kanada
 * @description This function is provide search filter for table.
 */
  public filter(event): void {
    const value = event.target.value;
    if (value) {
      this.posts = this.reservedPosts.filter(post => post.id.toString().indexOf(value) !== -1 || post.body.indexOf(value) !== -1 || post.title.indexOf(value) !== -1);
    } else {
      this.posts = this.reservedPosts;
    }
    this.cdr.detectChanges();
  }
  /**
   * @author om kanada
   * @description This function is used to sort table in ascending and descending order.
   */
  public sortFilter(sortName: string): void {
    this.setSortType(sortName);
    if (this.sort[sortName] === 'dsc') {
      if (sortName === 'id') {
        this.posts.sort((a, b) => b[sortName] - a[sortName]);
      } else {
        this.posts.sort((a, b) => ('' + b[sortName]).localeCompare(a[sortName]));
      }
    } else {
      if (sortName === 'id') {
        this.posts.sort((a, b) => a[sortName] - b[sortName]);
      } else {
        this.posts.sort((a, b) => ('' + a[sortName]).localeCompare(b[sortName]));
      }
    }
    this.cdr.detectChanges();
  }
  /**
   * @author om kanada
   * @description This function is used to set sort type on base of sortname.
   */
  private setSortType(sortName: string): void {
    if (!this.sort[sortName] || this.sort[sortName] === 'dsc') {
      this.sort[sortName] = 'asc';
    } else {
      this.sort[sortName] = 'dsc';
    }
  }

  ngOnInit(): void {
    this.getAllPost();
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    this.isAdmin = userDetails.isAdmin;
  }

  ngOnDestroy(): void {
    //  deatch change detection ref
    if (this.cdr) {
      this.cdr.detach();
    }
  }

}
