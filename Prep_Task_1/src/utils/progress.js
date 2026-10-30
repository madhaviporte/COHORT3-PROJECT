function percentOf(done, total) {
  return total === 0 ? 0 : Math.round((done / total) * 100);
}

export function getDSAProgress(problems = []) {
  const total = problems.length;
  const done = problems.filter((problem) => problem.completed).length;
  return { done, total, percent: percentOf(done, total) };
}

export function getQAProgress(questions = []) {
  const total = questions.length;
  const done = questions.filter((question) => question.reviewed).length;
  return { done, total, percent: percentOf(done, total) };
}

export function getTrackerProgress(questions = []) {
  const total = questions.length;
  const done = questions.filter((question) => question.status === 'Completed').length;
  return { done, total, percent: percentOf(done, total) };
}

export function getCustomSectionProgress(tasks = []) {
  const total = tasks.length;
  const done = tasks.filter((task) => task.completed).length;
  return { done, total, percent: percentOf(done, total) };
}

export function getCustomSectionsProgress(sections = []) {
  return sections.reduce(
    (result, section) => {
      const progress = getCustomSectionProgress(section.tasks || []);
      result.done += progress.done;
      result.total += progress.total;
      return result;
    },
    { done: 0, total: 0, percent: 0 },
  );
}

export function getWeekOverallProgress(week) {
  if (!week) return 0;

  const sections = [
    getDSAProgress(week.dsaProblems || []),
    getQAProgress(week.gitQuestions || []),
    getQAProgress(week.fullstackQuestions || []),
    getTrackerProgress(week.trackerQuestions || []),
    ...(week.customSections || []).map((section) => getCustomSectionProgress(section.tasks || [])),
  ].filter((section) => section.total > 0);

  if (sections.length === 0) return 0;
  const sum = sections.reduce((total, section) => total + section.percent, 0);
  return Math.round(sum / sections.length);
}

export function getDashboardStats(weeks = []) {
  const totals = weeks.reduce(
    (result, week) => {
      const dsa = getDSAProgress(week.dsaProblems || []);
      const git = getQAProgress(week.gitQuestions || []);
      const technical = getQAProgress(week.fullstackQuestions || []);
      const tracker = getTrackerProgress(week.trackerQuestions || []);

      result.dsa.done += dsa.done;
      result.dsa.total += dsa.total;
      result.reviewed.done += git.done + technical.done;
      result.reviewed.total += git.total + technical.total;
      result.tracker.done += tracker.done;
      result.tracker.total += tracker.total;
      result.overallSum += getWeekOverallProgress(week);
      return result;
    },
    {
      dsa: { done: 0, total: 0 },
      reviewed: { done: 0, total: 0 },
      tracker: { done: 0, total: 0 },
      overallSum: 0,
    },
  );

  return {
    weekCount: weeks.length,
    dsa: { ...totals.dsa, percent: percentOf(totals.dsa.done, totals.dsa.total) },
    reviewed: { ...totals.reviewed, percent: percentOf(totals.reviewed.done, totals.reviewed.total) },
    tracker: { ...totals.tracker, percent: percentOf(totals.tracker.done, totals.tracker.total) },
    averageProgress: weeks.length === 0 ? 0 : Math.round(totals.overallSum / weeks.length),
  };
}
