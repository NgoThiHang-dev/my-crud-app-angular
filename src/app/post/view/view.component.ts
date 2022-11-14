import { Component, Inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../post';
import { PostService } from '../post.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  id!: number;
  post!: Post;
  // @Input() id: number;

  // @Input() title: string;
  // @Input() body: string;

  constructor(
    // public dialogRef: MatDialogRef<ViewComponent>,
    // @Inject(MAT_DIALOG_DATA) public post: any
    private router: Router,
    private route: ActivatedRoute,
    public postService: PostService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['postId'];
    this.postService.find(this.id).subscribe((data: Post) => {
      this.post = data;
    });
  }
}
