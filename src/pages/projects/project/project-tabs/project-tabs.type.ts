import {
  eventsPath,
  participantsPath,
  reportsPath,
  settingsPath,
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
};

export type ProjectTabValue = (typeof PROJECT_TABS)[keyof typeof PROJECT_TABS];
