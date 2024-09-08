import { Component, OnInit } from '@angular/core';
import { PublisherCardComponent } from './publisher-card/publisher-card.component';
import { CommonModule } from '@angular/common';
import { Domain, Publisher } from '../../types';
import { HttpService } from '../../http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';



@Component({
    selector: 'app-publishers-container',
    standalone: true,
    imports: [PublisherCardComponent, CommonModule,ReactiveFormsModule],
    templateUrl: './publishers-container.component.html',
    styleUrl: './publishers-container.component.css',
})
export class PublishersContainerComponent implements OnInit {
    constructor(private httpService: HttpService, private fb: FormBuilder) {}
    
    publishers: Array<Publisher> = [];
    domains: Array<Domain> = [];
    publisherForm!: FormGroup;
    isPublisherFormVisible = false;


    ngOnInit(): void {
        this.loadData();
        this.initForm();
    }

    loadData() {
        this.httpService.getPublishers().subscribe((publishers: Array<Publisher>) => {
            this.publishers = publishers;
        });
        this.httpService.getDomains().subscribe((domains: Array<Domain>) => {
            this.domains = domains;
            console.log('Domains:', this.domains);
        });
    }

    initForm() {
        this.publisherForm = this.fb.group({
            publisherName: ['', Validators.required]
          });
    }

    showAddPublisherForm() {
        this.isPublisherFormVisible = true; 
      }

      cancelPublisherForm(){
        this.isPublisherFormVisible = false; 
        this.publisherForm.reset(); 
      }

    addPublisher() {
        if (this.publisherForm.valid) {
            const { publisherName } = this.publisherForm.value;
      
            if (this.publishers.some(p => p.publisher.toLowerCase() === publisherName.toLowerCase())) {
              alert("Publisher already exists.");
            } else {
              
              this.httpService.addPublisher(publisherName).subscribe({
                next: () => {
                  console.log('Publisher added successfully');
                  this.publishers.unshift({ publisher: publisherName, domains: [] });
                },
                error: (err) => {
                  console.error('Server error adding publisher:', err);
                }
              });
              this.publisherForm.reset(); 
              this.isPublisherFormVisible = false;
            }
          } else {
            alert("Please provide a valid publisher name.");
          }
      
    }

    deletePublisher(publisher: Publisher) {
        this.httpService.deletePublisher(publisher).subscribe({
          next: () => {
            console.log('Publisher deleted successfully');
            this.publishers = this.publishers.filter(p => p.publisher !== publisher.publisher);
          },
          error: (err) => {
            console.error('Error deleting publisher:', err);
          }
        });
      }
}
