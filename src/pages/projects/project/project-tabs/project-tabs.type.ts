import {
  eventsPath,
  formsPath,
  participantsPath,
  reportsPath,
  settingsPath,
  solversPath,
  tablesPath,
  tasksPath,
} from '~/utils/configuration/routes-paths';

export const PROJECT_TABS = {
  TABLES: tablesPath,
  TASKS: tasksPath,
  REPORTS: reportsPath,
  SETTINGS: settingsPath,
  PARTICIPANTS: participantsPath,
  EVENTS: eventsPath,
  SOLVERS: solversPath,
  FORMS: formsPath,
};

export type ProjectTabValue = (typeof PROJECT_TABS)[keyof typeof PROJECT_TABS];
