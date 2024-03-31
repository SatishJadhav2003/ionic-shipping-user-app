import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  user= {
    name:'Satish'
  }
  showCopyMessage:boolean
  constructor() { }

  ngOnInit() {
    console.log('Home Page')
  }
  
  copyOrderId() {
    // Get the text from the element with the specified ID
    const textToCopy = document.getElementById('orderid') as HTMLParagraphElement;
    const text = textToCopy.innerText;

    // Create a temporary textarea element
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = text;
    document.body.appendChild(tempTextArea);

    // Select the text within the textarea
    tempTextArea.select();
    
    // Execute the copy command
    document.execCommand('copy');

    // Remove the temporary textarea
    document.body.removeChild(tempTextArea);

    // Optionally, provide some feedback to the user
    this.showCopyMessage = true;
    setTimeout(() => {
      this.showCopyMessage = false;
    }, 1300); // Hide after 1 seconds
  }

}
