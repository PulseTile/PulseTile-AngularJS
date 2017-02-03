import ContactsListComponent from './contacts-list.component';
import ContactsCreateComponent from './contacts-create.component';
import ContactsDetailComponent from './contacts-detail.component';

angular.module('ripple-ui.contacts', [])
  .component('contactsListComponent', ContactsListComponent)
  .component('contactsCreateComponent', ContactsCreateComponent)
  .component('contactsDetailComponent', ContactsDetailComponent);