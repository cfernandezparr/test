import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderMenus } from 'src/app/Models/header-menus.dto';
import { PostDTO } from 'src/app/Models/post.dto';
import { HeaderMenusService } from 'src/app/Services/header-menus.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { PostService } from 'src/app/Services/post.service';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  posts!: PostDTO[];
  showButtons: boolean;

  constructor(
    private postService: PostService,
    private localStorageService: LocalStorageService,
    private sharedService: SharedService,
    private router: Router,
    private headerMenusService: HeaderMenusService
  ) {
    this.showButtons = false;
  }

  ngOnInit(): void {
    this.loadPosts();

    this.headerMenusService.headerManagement.subscribe(
      (headerInfo: HeaderMenus) => {
        if (headerInfo) {
          this.showButtons = headerInfo.showAuthSection;
        }
      }
    );
  }

  private loadPosts(): void {
    const userId = this.localStorageService.get('user_id');
    if (userId) {
      this.showButtons = true;
    }

    this.postService.getPosts().subscribe({
      next: (data) => {
        this.posts = data;
      },
      error: (error) => {
        const errorResponse = error.error;
        this.sharedService.errorLog(errorResponse);
      },
    });
  }

  like(postId: string): void {
    this.postService.likePost(postId).subscribe({
      next: () => {
        this.loadPosts(); // actualizar después de dar like
      },
      error: (error) => {
        const errorResponse = error.error;
        this.sharedService.errorLog(errorResponse);
      },
    });
  }

  dislike(postId: string): void {
    this.postService.dislikePost(postId).subscribe({
      next: () => {
        this.loadPosts(); // actualizar después de dislike
      },
      error: (error) => {
        const errorResponse = error.error;
        this.sharedService.errorLog(errorResponse);
      },
    });
  }
}
