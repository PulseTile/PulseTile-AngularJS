import ReferralsListComponent from './referrals-list.component';
import ReferralsDetailComponent from './referrals-detail.component';
import ReferralsCreateComponent from './referrals-create.component';

angular.module('ripple-ui.referrals', [])
  .component('referralsListComponent', ReferralsListComponent)
  .component('referralsDetailComponent', ReferralsDetailComponent)
  .component('referralsCreateComponent', ReferralsCreateComponent);