import HomePage from '../../../pages/HomePage';
import LoginPage from '../../../pages/LoginPage';
import AppRunTimePage from '../../../pages/AppRunTimePage';
import BpcLoginPage from '../../../pages/BpcLoginPage';
import StoryPage from '../../../pages/StoryPage';
import ModelPage from '../../../pages/ModelPage';
import keepCookies from '../../../util/keepCookies';
import DataAuditStoryPage from '../../../pages/DataAuditStoryPage';
import DataAuditReportPage from '../../../pages/DataAuditReportPage';
import DataAuditModelPage from '../../../pages/DataAuditModelPage';
import moment from 'moment';  //use npm to install meoment

import {
  URL_CLOUD_INTEG_T01, URL_APP_DESIGNER_FRONT, APP_BPC_PLS_Test_CHAR_FORMULA_APP_ID,
  URL_APP_DESIGNER_END, APP_BPS_PLS_Test_CHAR_FORMULA_APP_ID, APP_BPC_PLS_Test_CHAR_FORMULA_PLS10_ID
} from '../../../constant/bpcConstant';
describe('Test_FilterNoResult_44_Part1', { testIsolation: false }, () => {

  const moment = require('moment'); //moment

  var modelName = 'NewModelDataAuditAutoND';

  before(() => {
    cy.clearCookies();
    //Login 
    cy.visit(`${Cypress.config('integrationTenantUrl')}`);
    LoginPage.login(Cypress.env('cy_userName'), Cypress.env('cy_password'));

    DataAuditModelPage.delete(modelName)
  });

  after(() => {

  });


  beforeEach(() => {
    //keepCookies();
  });

  it('441.prepareModelAndData_Test', () => {
    
    DataAuditModelPage.create()
    DataAuditModelPage.enableDataAudit()
    DataAuditModelPage.save(modelName)
    DataAuditStoryPage.newStory();
    DataAuditStoryPage.addModelAsTable(modelName);
    DataAuditStoryPage.unbookedData1();
    DataAuditStoryPage.maintainAndPublishData(modelName, "480000000"); //New
    DataAuditStoryPage.maintainAndPublishData(modelName, " ");//Delete
    DataAuditStoryPage.leaveAndDiscardToReportX();
    //check report has data check not empty
    DataAuditReportPage.searchAndOpen0(modelName);
    DataAuditReportPage.checkAuditDataIsNotEmpty();
  });

  it('44.FilterNoResult_Test', () => {
    DataAuditReportPage.refresh()
    DataAuditReportPage.filterOnModify();
    DataAuditReportPage.checkIsEmpty();
  });

});
