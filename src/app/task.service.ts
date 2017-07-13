import { Injectable } from '@angular/core';

@Injectable()
export class TaskService {
    update(title): Promise<any> {
        console.log(`Updated ${title}`);
        return Promise.resolve('success');
    }
}
