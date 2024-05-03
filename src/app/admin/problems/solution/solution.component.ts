import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MonacoEditorLoaderService, MonacoStandaloneCodeEditor } from '@materia-ui/ngx-monaco-editor';

@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styleUrl: './solution.component.scss'
})
export class SolutionComponent implements AfterViewInit {

  constructor(private router:Router,
    private monacoLoaderService: MonacoEditorLoaderService
  ){}

  @ViewChild('editorContainer') editorContainer!: ElementRef;

  editorCode: string = '';
  editorOptions = { 
    theme: 'vs-dark', language: 'javascript'  
  };

  editorInstance: MonacoStandaloneCodeEditor | undefined;

  ngAfterViewInit() {
    console.log("ngAfterViewInit called");
    // Accessing the editor instance after the view is initialized
    this.monacoLoaderService.isMonacoLoaded$.subscribe(isLoaded => {
      if (isLoaded) {
        // Accessing the editor instance
        if (this.editorContainer && this.editorContainer.nativeElement) {
          console.log("Editor container found:", this.editorContainer.nativeElement);
          this.editorInstance = this.editorContainer.nativeElement.editor;
          console.log('Editor instance:', this.editorInstance);
        } else {
          console.log("Editor container not found");
        }
      } else {
        console.log("Monaco editor not loaded");
      }
    });
  }
  
  onEditorContentChange(content: string) {
    console.log('Editor content changed:', content);
  }


  gotToAddExample(){
    this.router.navigateByUrl('/admin/dashboard', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/admin/problems/example']);
    });
    
  }
}
