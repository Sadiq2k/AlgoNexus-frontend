import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss'
})
export class ExampleComponent {
  
  @ViewChild('editorContainer') editorContainer!: ElementRef;

  editorCode: string = '';
  editorOptions = { 
    theme: 'vs-dark',
    language: 'javascript'  // Change this to the language you want to support
  };

  ngAfterViewInit() {
    this.initMonacoEditor();
  }

  initMonacoEditor() {
    monaco.editor.create(this.editorContainer.nativeElement, {
      value: this.editorCode,
      language: this.editorOptions.language,
      theme: this.editorOptions.theme
    });
  }
}
