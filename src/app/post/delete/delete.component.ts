import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostService } from '../post.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css'],
})
export class DeleteComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private postService: PostService
  ) {}

  ngOnInit(): void {}

  confirmDelete() {
    this.postService.delete(this.data.id).subscribe(() => {
      this.dialogRef.close(this.data.id);
    });
  }
}
