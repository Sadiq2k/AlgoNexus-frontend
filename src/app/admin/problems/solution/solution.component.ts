import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MonacoEditorLoaderService, MonacoStandaloneCodeEditor } from '@materia-ui/ngx-monaco-editor';
import { DataShareService } from '../../../dataShare/data-share.service';
import { AdminStateService } from '../../../adminState/AdminStateService/admin-state.service';
import { ProblemControllerService } from '../../../problem-services/services';

@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styleUrl: './solution.component.scss'
})
export class SolutionComponent implements AfterViewInit, OnInit {

  problemVerifiedResponse: any;
  statusText: any;
  testCasesData: { input: string | string[], output: string }[] = [];
  newEditorCode!: string;
  editorCode: string = '';
  editorInstance: MonacoStandaloneCodeEditor | undefined;
  languages: any
  base64EncodedNewContent!: string;
  showNewEditor: boolean = false;
  hideContinuesButton: boolean = true;
  allDataContent!: any
  loading: boolean = false;
  requestBody: any

  // Array to store test case input and output pairs
  testCases: { input: string, output: string }[] = [{ input: '', output: '' }];
  selectedLanguage: number | null = 62;

  constructor(private router: Router,
    private monacoLoaderService: MonacoEditorLoaderService,
    private shareDataService: DataShareService,
    private problemControllerService: ProblemControllerService
  ) { }


  @ViewChild('editorContainer') editorContainer!: ElementRef;


  newEditorOptions = {
    theme: 'vs-dark', language: 'java',
    suggest: {},
    completionItemProvider: {
      triggerCharacters: ['.'] // Specify trigger characters for package import suggestions
    },
  }
  editorOptions = {
    theme: 'vs-dark', language: 'java',
    suggest: {},
    completionItemProvider: {
      triggerCharacters: ['.']
    },

  };


  ngOnInit(): void {
    this.setCodeBasedOnLanguage(62)//java id judge0
  }

  addTestCase() {
    this.testCases.push({ input: '', output: '' });
  }

  deleteInputField(index: number) {
    this.testCases.splice(index, 1);
    this.testCasesData.splice(index, 1);
  }


  printValues(value: string | string[] | number, index: number, isInput: boolean) {
    if (isInput) {
      if (!this.testCasesData[index]) {
        this.testCasesData[index] = { input: '', output: '' };
      }
      if (Array.isArray(value)) {
        this.testCasesData[index].input = value;
      } else {
        this.testCasesData[index].input = String(value);
      }
    } else {
      if (!this.testCasesData[index]) {
        this.testCasesData[index] = { input: '', output: '' };
      }
      this.testCasesData[index].output = String(value);
    }
    console.log(this.testCasesData);
  }


  ngAfterViewInit() {
    this.monacoLoaderService.isMonacoLoaded$.subscribe(isLoaded => {
      if (isLoaded) {
        if (this.editorContainer && this.editorContainer.nativeElement) {
          this.editorInstance = this.editorContainer.nativeElement.editor;
        } else {
          console.log("Editor container not found");
        }
      } else {
        console.log("Monaco editor not loaded");
      }
    });
  }

  onEditorContentChange(content: string) {
    this.editorCode = content;
    console.log('Editor content changed:', content);
  }

  onNewEditorContentChange(newContent: string) {
    this.newEditorCode = newContent;
    console.log("editor new content ", this.newEditorCode)
    this.base64EncodedNewContent = btoa(this.newEditorCode);
  }


  gotToAddExample() {
    this.router.navigateByUrl('/admin/dashboard', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/admin/problems/example']);
    });
  }

  onContinueClicked() {
    const editorContent = this.editorCode;
    const data = this.requestBody
    this.showNewEditor = true;
    this.hideContinuesButton = false;
    console.log("on continues function ", editorContent)
    const base64EncodedContent = btoa(editorContent);
    data.sourceCode = base64EncodedContent;
    this.allDataContent = {
      state: {
        data: data
      }
    };
    this.newEditorCode = 'Enter solution templete ';
    console.log('Editor Content all:', this.allDataContent)
  }

  addSolution() {
    const base64SolutionTempleteCode = this.base64EncodedNewContent
    const DriverCodePluseContent = this.allDataContent
    const testCasesToSend = DriverCodePluseContent?.state?.data?.testCases.slice(0, 3);
    const sendDataParentComponent = {
      data: DriverCodePluseContent,
      solutionTempete: base64SolutionTempleteCode
    }
    this.shareDataService.sendFormDataSolution(sendDataParentComponent);
    this.router.navigate(['admin/problems/example', { testCases: JSON.stringify(testCasesToSend) }]);

  }


  onLanguageSelect(event: any) {
    console.log("-------------", event.target.value)
    switch (parseInt(event.target.value, 10)) {
      case 62://java id
        this.setCodeBasedOnLanguage(62);
        break;
      case 63:
        this.setCodeBasedOnLanguage(63);
        break;
      default:
        this.setCodeBasedOnLanguage(62);
        break;
    }
  }

  setCodeBasedOnLanguage(language: number) {
    switch (language) {
      case 62:
        this.editorCode = `import java.util.*;

class Algo {
  public int calculateSum(int[] array) {
      int sum = 0;
      for (int num : array) {
          sum += num;
      }
      return sum;
  }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String inputString = sc.nextLine();
        String[] stringArray = inputString.split(" ");
        int[] intArray = new int[stringArray.length];
        for (int i = 0; i < stringArray.length; i++) {
            if (!stringArray[i].isEmpty()) {
                intArray[i] = Integer.parseInt(stringArray[i]);
            }
        }
        Algo obj = new Algo();
        int sum = obj.calculateSum(intArray);
        System.out.println(sum);
    }
} 
        `;
        this.editorOptions = {
          theme: 'vs-dark',
          language: 'java',
          suggest: {
            showWords: true,
            showFiles: true,
            showVariables: true,
            showClasses: true,
            showConstructors: true,
            showFunctions: true,
            showMethods: true,
            showFields: true,
            showEnums: true,
            showInterfaces: true,
            showModules: true,
            showProperties: true,
            showEvents: true,
            showOperators: true,
            showUnitTests: true,
            showValues: true,
            showConstants: true,
            showStructs: true,
            showKeywords: true,
            showReferences: true,
            showSnippets: true,
            showTypes: true,
            showIssues: true,
            showUser: true,
            showSuggestions: true,
            showImports: true
          }, completionItemProvider: {
            triggerCharacters: ['.'] // Specify trigger characters for package import suggestions
          }

        };
        break;
      case 63:
        this.editorCode = `const readline = require('readline');
      
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askForInput(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

function calculateSum(array) {
  let sum = 0;
  for (let num of array) {
    sum += num;
  }
  return sum;
}

async function main() {
  try {
    const inputString = await askForInput('');
    const stringArray = inputString.split(' ');
    const intArray = stringArray.map(str => {
      if (str.trim() !== '') {
        return parseInt(str);
      } else {
        return 0;
      }
    });
    const sum = calculateSum(intArray);
    console.log(sum); // Ensure the sum is logged
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    rl.close();
  }
}

main();
          `;

        this.editorOptions = {
          theme: 'vs-dark',
          language: 'javascript',
          suggest: {
            showWords: true,
            showFiles: true,
            showVariables: true,
            showClasses: true,
            showConstructors: true,
            showFunctions: true,
            showMethods: true,
            showFields: true,
            showEnums: true,
            showInterfaces: true,
            showModules: true,
            showProperties: true,
            showEvents: true,
            showOperators: true,
            showUnitTests: true,
            showValues: true,
            showConstants: true,
            showStructs: true,
            showKeywords: true,
            showReferences: true,
            showSnippets: true,
            showTypes: true,
            showIssues: true,
            showUser: true,
            showSuggestions: true,
            showImports: true
          },
          completionItemProvider: {
            triggerCharacters: ['.']
          }
        };
        break;
      default:
        // this.editorCode = `// Default code goes here`;
        break;
    }
  }

  onRunClick() {
    this.loading = true;
    this.statusText = "";
    const base64EncodedContent = btoa(this.editorCode);
    const languageId = this.selectedLanguage ?? 62;
    const joinedInput = this.testCasesData.map(item => Array.isArray(item.input) ? item.input.join(' ') : item.input);
    const joinedOutput = this.testCasesData.map(item => Array.isArray(item.output) ? item.output.join(' ') : item.output);
    this.requestBody = {
      sourceCode: base64EncodedContent,
      languageId: languageId,
      testCases: this.testCasesData.map((item, index) => ({
        testCaseInput: typeof joinedInput[index] === 'string' ? joinedInput[index] : '',
        expectedOutput: typeof joinedOutput[index] === 'string' ? joinedOutput[index] : ''
      }))
    };
    
    this.problemControllerService.verifyProblem({ body: this.requestBody }).subscribe({
      next: (response) => {
        this.problemVerifiedResponse = response;
        console.log("=========", this.problemVerifiedResponse);
        this.loading = false;
      }, error: (err) => {
        console.log("error occure to the solution component run the solution", err)
        if (err.error.message) {
          this.statusText = err.error.message;
          this.loading = false;
          return;
        } else {
          this.statusText = err.statusText
          this.loading = false;
        }
      }
    });
  }

}
