import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, LowerCasePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post-detail',
  imports: [DatePipe, LowerCasePipe],
  templateUrl: './post-detail.html',
  styleUrl: './post-detail.css',
})
export class PostDetail implements OnInit, OnDestroy {
  private routeSub: Subscription = new Subscription();
  private id: number = 0;

  post?: Post;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.initData();
  }

  initData(): void {
    this.http.get<Post>('https://localhost:7195/api/post/' + this.id).subscribe({
      next: (data: Post) => {
        this.post = data;
        console.log(this.post);
      },
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}