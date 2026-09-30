import { Component, OnInit } from '@angular/core';
import { DatePipe, LowerCasePipe, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-list-posts',
  imports: [NgFor, DatePipe, LowerCasePipe],
  templateUrl: './list-posts.html',
  styleUrl: './list-posts.css',
})
export class ListPosts implements OnInit {
  posts?: Post[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    this.http.get<Post[]>('https://localhost:7195/api/post').subscribe({
      next: (data: Post[]) => {
        this.posts = data;
        console.log(this.posts);
      },
    });
  }
}