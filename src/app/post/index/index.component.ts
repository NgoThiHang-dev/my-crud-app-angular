import { Component, OnInit, ViewChild } from '@angular/core';
import { Post } from '../post';
import { PostService } from '../post.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ViewComponent } from '../view/view.component';
import { ActivatedRoute } from '@angular/router';
import { DeleteComponent } from '../delete/delete.component';
import { CreateComponent } from '../create/create.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  posts: Post[] = [];

  displayedColumns: string[] = ['id', 'title', 'body'];

  currentPerPage: number = 1;
  total: number = 0;
  itemsPerPage: number = 10;

  // @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private postService: PostService,
    public dialog: MatDialog // private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.get();
  }

  // ngAfterViewInit() {
  //   this.posts.paginator = this.paginator;
  // }

  get() {
    this.postService.getAll().subscribe((data: Post[]) => {
      this.posts = data;
      // console.log(this.posts);
    });
  }

  pageChangeEvent(event: number) {
    this.currentPerPage = event;
    this.get();
  }

  // openDialog(
  //   enterAnimationDuration: string,
  //   exitAnimationDuration: string
  // ): void {
  //   this.dialog.open(ViewComponent, {
  //     width: '450px',
  //     enterAnimationDuration,
  //     exitAnimationDuration,
  //   });
  // }

  openDialog(): void {
    this.dialog.open(ViewComponent, {
      width: '450px',
      // data: { id: this.id, title: this.title, body: this.body },
    });
  }

  // deletePost(id: number) {
  //   this.postService.delete(id).subscribe((res) => {
  //     this.posts = this.posts.filter((item) => item.id !== id);
  //     console.log('Post deleted successfully!');
  //   });
  // }

  openDeleteModal(id: number) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '250px',
      data: { id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.posts = this.posts.filter((_) => _.id !== id);
      }
    });
  }
}
