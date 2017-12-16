import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
    selector: 'app-counter',
    templateUrl: './counter.component.html'
})
export class CounterComponent {
    public currentCount = 0;

    public incrementCounter() {
        this.currentCount++;
    }

    cform = new FormGroup({});

    userMessageModel: any = {}; // { Email: "", Comment: "", Name: "", Id: 1 };

    userOptions = {
      formState: {
        myState: 'State'
      }
    };

    userMessageFields: Array<FormlyFieldConfig> = [
      {
        type: 'input',
        key: 'Email',
        templateOptions: {
          label: 'Email',
          required: true,
          width: 6
        }
      },
      {
        type: 'input',
        key: 'Name',
        templateOptions: {
          label: 'Name',
          required: true,
          width: 6
        }
      },
      {
        type: 'textarea',
        key: 'Comment',
        templateOptions: {
          label: 'Add Your Comment',
          required: true,
          width: 12,
          rows: 10
        }
      }
    ];

    sendUserMessage(userMessageModel) {
      console.log(userMessageModel);
    }
}
